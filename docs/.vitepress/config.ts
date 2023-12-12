import { readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { defineConfig } from 'vitepress'
import { sort } from '../../src'

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

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '@matijaoe/utils',
  description: 'yet another utility library',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: 'local'
    },

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: sort([
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
      {
        text: 'Function',
        items: await generateSidebar('async')
      },
      {
        text: 'Number',
        items: await generateSidebar('number')
      },
    ], { by: (item) => item.text }),

    socialLinks: [
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16"><path fill="currentColor" d="M1 2.885C1 1.844 1.844 1 2.885 1h10.23C14.156 1 15 1.844 15 2.885v10.23A1.885 1.885 0 0 1 13.115 15H2.885A1.885 1.885 0 0 1 1 13.115V2.885Zm1.885-.27a.27.27 0 0 0-.27.27v10.23c0 .15.12.27.27.27h5.653v-7a.808.808 0 1 1 1.616 0v7h2.961a.27.27 0 0 0 .27-.27V2.885a.27.27 0 0 0-.27-.27H2.885Z"/></svg>'
        },
        link: 'https://www.npmjs.com/package/@matijaoe/utils'
      },
      { icon: 'github', link: 'https://github.com/matijaoe/utils' },
    ]
  }
})
