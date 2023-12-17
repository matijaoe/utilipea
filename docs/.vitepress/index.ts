import { readdirSync } from 'node:fs'
import { readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { sort, titlecase } from '../../src'

export async function getFiles(directoryPath: string) {
  try {
    const fileNames = await readdir(directoryPath)
    const filePaths = fileNames.map((fn) => join(directoryPath, fn))
    return filePaths
  } catch (err) {
    console.error(err)
  }
}

const methodPageTemplate = (category: string, name: string) => {
  return `---
category: ${titlecase(category)}
title: '${name}'
---

# ${name}

`
}

export async function generateMarkdownFiles(dirName: string) {
  const files = await getFiles(join(__dirname, `../../src/${dirName}`))
  const filteredFiles = files?.filter((file) => {
    const isTs = file.endsWith('.ts')
    const isIndex = file.endsWith('index.ts')
    const isTest = file.endsWith('test.ts')
    const isHelpers = file.endsWith('helpers.ts')
    return isTs && !isIndex && !isTest && !isHelpers
  }) ?? []

  const markdownFiles = filteredFiles.map((file) => {
    const name = file.split('/').pop()?.replace('.ts', '') ?? ''
    const link = `/${dirName}/${name}`
    const content = methodPageTemplate(dirName, name)

    return { name, link, content }
  })

  return markdownFiles
}

export async function writeFile(path: string, content: string) {
  // check if directory esx
  const file = Bun.file(path)
  if (await file.exists()) {
    return
  }
  await Bun.write(path, content)
}

export async function generateSidebarCategory(dirName: string) {
  const files = await getFiles(join(__dirname, `../../src/${dirName}`))
  const filteredFiles = files?.filter((file) => {
    const isTs = file.endsWith('.ts')
    const isIndex = file.endsWith('index.ts')
    const isTest = file.endsWith('test.ts')
    const isHelpers = file.endsWith('helpers.ts')
    return isTs && !isIndex && !isTest && !isHelpers
  }) ?? []

  const sidebar = filteredFiles.map((file) => {
    const text = file.split('/').pop()?.replace('.ts', '') ?? ''
    const link = `/${dirName}/${text}`
    return { text, link }
  })

  return sidebar
}

export const listDirectories = async () => {
  const files = await getFiles(join(__dirname, '../../src'))
  const directories = files?.map((file) => {
    const dir = file.split('/').pop()
    return dir
  })
  return directories
}

export function listAllCategories() {
  const exclude = ['tests', 'models', 'helpers']
  const files = readdirSync(join(__dirname, '../../src'), { withFileTypes: true })
  const directories = files.filter((f) => f.isDirectory()).map((f) => f.name)
  return sort(directories.filter((dir) => !exclude.includes(dir)))
}

export const generateDocumentation = async () => {
  const dirs = listAllCategories()
  for (const dirName of dirs) {
    // eslint-disable-next-line no-await-in-loop
    const obj = await generateMarkdownFiles(dirName)
    for (const { name, content } of obj) {
    // eslint-disable-next-line no-await-in-loop
      await writeFile(join(__dirname, `../../docs/${dirName}/${name}.md`), content)
    }
  }
}

export async function generateSidebar() {
  const dirs = listAllCategories()

  // should return array of objects with { title: string, items }
  // TODO: do not use await inside map
  const promises = dirs.map(generateSidebarCategory)
  const itemsArray = await Promise.all(promises)

  const final = dirs.map((dir, index) => {
    return { text: titlecase(dir), items: itemsArray[index] }
  })

  return final
}

// await generateDocumentation()
