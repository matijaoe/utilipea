import { readdir } from 'node:fs/promises'
import path, { join } from 'node:path'
import process from 'node:process'
import { camelCase } from 'scule'
import { sort, titlecase } from '../../packages/core/src'

type MarkdownData = {
  dirName: string
  name: string
  link: string
  content: string
}

export async function getFiles(directoryPath: string): Promise<string[]> {
  try {
    const fileNames = await readdir(directoryPath, { withFileTypes: true })
    return fileNames.map((fn) => join(directoryPath, fn.name))
  } catch (err) {
    console.error(err)
    return []
  }
}

export async function getDirectories(directoryPath: string): Promise<string[]> {
  try {
    const fileNames = await readdir(directoryPath, { withFileTypes: true })
    return fileNames.filter((fn) => fn.isDirectory()).map((fn) => fn.name)
  } catch (err) {
    console.error(err)
    return []
  }
}

const packageSrc = path.resolve(process.cwd(), 'packages', 'package', 'src')

const methodPageTemplate = (category: string, name: string) => `---
category: ${titlecase(category)}
title: '${camelCase(name)}'
---

# {{ $frontmatter.title }}

`

function filterFiles(files?: string[]) {
  const filesToIgnore = ['index.ts', 'test.ts', 'helpers.ts']
  return files?.filter((file) => {
    const isTs = file.endsWith('.ts')
    return isTs && !filesToIgnore.some((f) => file.endsWith(f))
  }) ?? []
}

function generateMarkdownMeta(files: string[], dirName: string): MarkdownData[] {
  return files.map((file) => {
    const name = getFileNameWithoutExtension(file)
    const link = `/${dirName}/${name}`
    const content = methodPageTemplate(dirName, name)
    return { dirName, name, link, content }
  })
}

export async function generateMarkdownFilesForCategory(dirName: string) {
  const files = await getFiles(path.resolve(packageSrc, dirName))
  const filteredFiles = filterFiles(files)
  return generateMarkdownMeta(filteredFiles, dirName)
}

function getFileNameWithoutExtension(file: string) {
  return file.split('/').pop()?.replace('.ts', '') ?? ''
}

export async function writeFile(path: string, content: string) {
  const file = Bun.file(path)
  if (await file.exists()) { return }
  await Bun.write(path, content)
}

export async function generateCategorySidebarItem(dirName: string) {
  const files = await getFiles(path.resolve(packageSrc, dirName))
  const filteredFiles = filterFiles(files)

  const sidebar = filteredFiles.map((file) => {
    const text = getFileNameWithoutExtension(file)
    const link = `/${dirName}/${text}`
    return { text: camelCase(text), link }
  })
  return sidebar
}

export async function listCategories() {
  const exclude = ['tests', 'models', 'helpers']
  const directories = await getDirectories(packageSrc)
  return sort(directories.filter((dir) => !exclude.includes(dir)))
}

async function getDirMarkdowns(dirs: string[]): Promise<MarkdownData[][]> {
  const dirMarkdownPromises = dirs.map(generateMarkdownFilesForCategory)
  const markdownFilesPerCategoryRes = await Promise.allSettled(dirMarkdownPromises)

  return markdownFilesPerCategoryRes
    .filter((result): result is PromiseFulfilledResult<MarkdownData[]> => result.status === 'fulfilled')
    .map((result) => result.value)
}

async function writeMarkdownFiles(dirMarkdowns: MarkdownData[][]) {
  const filePromises = dirMarkdowns.flatMap((markdowns) =>
    markdowns.map(({ dirName, name, content }) => {
      return writeFile(path.resolve(process.cwd(), 'docs', dirName, `${name}.md`), content)
    })
  )

  await Promise.allSettled(filePromises)
}

export async function generateSidebar() {
  const categories = await listCategories()

  const promises = categories.map(generateCategorySidebarItem)
  const items = await Promise.all(promises)

  return categories.map((dir, idx) => ({ text: titlecase(dir), items: items.at(idx) }))
}

export const generateDocumentation = async () => {
  const categories = await listCategories()
  const markdownContentPerGroup = await getDirMarkdowns(categories)
  await writeMarkdownFiles(markdownContentPerGroup)
}

await generateDocumentation()
