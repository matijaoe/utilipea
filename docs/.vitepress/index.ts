import { readdir } from 'node:fs/promises'
import * as path from 'node:path'
import { join } from 'node:path'
import process from 'node:process'
import { sort, titlecase } from '../../packages/package/src'

export async function getFiles(directoryPath: string) {
  try {
    const fileNames = await readdir(directoryPath)
    const filePaths = fileNames.map((fn) => join(directoryPath, fn))
    return filePaths
  } catch (err) {
    console.error(err)
  }
}

const methodPageTemplate = (category: string, name: string) => `---
category: ${titlecase(category)}
title: '${name}'
---

# ${name}

`

export async function generateMarkdownFiles(dirName: string) {
  const files = await getFilesFromDirectory(dirName)
  const filteredFiles = filterFiles(files)
  return generateMarkdown(filteredFiles, dirName)
}

async function getFilesFromDirectory(dirName: string) {
  const directoryPath = path.resolve(process.cwd(), 'packages', 'package', 'src', dirName)
  return await getFiles(directoryPath)
}

function filterFiles(files?: string[]) {
  const filesToIgnore = ['index.ts', 'test.ts', 'helpers.ts']
  return files?.filter((file) => {
    const isTs = file.endsWith('.ts')
    return isTs && !filesToIgnore.some((f) => file.endsWith(f))
  }) ?? []
}

function generateMarkdown(files: string[], dirName: string) {
  return files.map((file) => {
    const name = getFileNameWithoutExtension(file)
    const link = `/${dirName}/${name}`
    const content = methodPageTemplate(dirName, name)
    return { dirName, name, link, content }
  })
}

function getFileNameWithoutExtension(file: string) {
  return file.split('/').pop()?.replace('.ts', '') ?? ''
}

export async function writeFile(path: string, content: string) {
  const file = Bun.file(path)
  if (await file.exists()) { return }
  await Bun.write(path, content)
}

export async function generateSidebarCategory(dirName: string) {
  const files = await getFiles(path.resolve(process.cwd(), 'packages', 'package', 'src', dirName))
  const filteredFiles = filterFiles(files)

  const sidebar = filteredFiles.map((file) => {
    const text = getFileNameWithoutExtension(file)
    const link = `/${dirName}/${text}`
    return { text, link }
  })
  return sidebar
}

export const listDirectories = async () => {
  const files = await getFiles(path.resolve(process.cwd(), 'packages', 'package', 'src'))
  const directories = files?.map((file) => file.split('/').pop())
  return directories
}

export async function listAllCategories() {
  const exclude = ['tests', 'models', 'helpers']
  const files = await readdir(path.resolve(process.cwd(), 'packages', 'package', 'src'), { withFileTypes: true })
  const directories = files.filter((f) => f.isDirectory()).map((f) => f.name)
  return sort(directories.filter((dir) => !exclude.includes(dir)))
}

export const generateDocumentation = async () => {
  const dirs = await listAllCategories()
  const dirMarkdowns = await getDirMarkdowns(dirs)
  await writeMarkdownFiles(dirMarkdowns)
}

async function getDirMarkdowns(dirs: string[]) {
  const dirMarkdownPromises = dirs.map(generateMarkdownFiles)
  const dirMarkdownsResults = await Promise.allSettled(dirMarkdownPromises)

  return dirMarkdownsResults
    .filter((result): result is PromiseFulfilledResult<any> => result.status === 'fulfilled')
    .map((result) => result.value)
}

async function writeMarkdownFiles(dirMarkdowns: any[]) {
  const filePromises = dirMarkdowns.flatMap((markdowns) =>
    markdowns.map(({ dirName, name, content }) =>
      writeFile(path.resolve(process.cwd(), 'docs', dirName, `${name}.md`), content)
    )
  )

  await Promise.allSettled(filePromises)
}

export async function generateSidebar() {
  const dirs = await listAllCategories()

  // should return array of objects with { title: string, items }
  // TODO: do not use await inside map
  const promises = dirs.map(generateSidebarCategory)
  const itemsArray = await Promise.all(promises)

  const final = dirs.map((dir, index) => {
    return { text: titlecase(dir), items: itemsArray[index] }
  })

  return final
}

await generateDocumentation()
