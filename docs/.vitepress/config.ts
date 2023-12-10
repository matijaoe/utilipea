import { readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { defineConfig } from 'vitepress'

async function getFiles(directoryPath: string) {
  try {
    const fileNames = await readdir(directoryPath)
    const filePaths = fileNames.map((fn) => join(directoryPath, fn))
    return filePaths
  } catch (err) {
    console.error(err)
  }
}

async function generateSidebar(dirName: string) {
  const files = await getFiles(join(__dirname, `../../src/${dirName}`))
  const filteredFiles = files?.filter((file) => {
    const isTs = file.endsWith('.ts')
    const isIndex = file.endsWith('index.ts')
    const isTest = file.endsWith('.test.ts')
    const isHelpers = file.endsWith('.helpers.ts')
    return isTs && !isIndex && !isTest && !isHelpers
  }) ?? []

  const sidebar = filteredFiles.map((file) => {
    const text = file.split('/').pop()?.replace('.ts', '') ?? ''
    const link = `/${dirName}/${text}`
    return { text, link }
  })

  return sidebar
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '@matijaoe/utils',
  description: 'yet another utility library',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Array',
        items: await generateSidebar('array')
      },
      {
        text: 'Object',
        items: await generateSidebar('object')
      },
      {
        text: 'Collection',
        items: await generateSidebar('collection')
      },
      {
        text: 'String',
        items: await generateSidebar('string')
      },
      {
        text: 'Async',
        items: await generateSidebar('async')
      },
    ].sort((a, b) => a.text.localeCompare(b.text)),

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
