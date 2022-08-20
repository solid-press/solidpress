import { defineConfig } from '../../packages/node'

export default defineConfig({
  themeConfig: {
    navbar: {
      items: [
        {
          type: 'doc',
          position: 'left',
          docId: 'introduction',
          label: 'Docs',
        },
        {
          type: 'docSidebar',
          position: 'left',
          sidebarId: 'api',
          label: 'API',
        },
        {to: 'blog', label: 'Blog', position: 'left'},
        {to: 'showcase', label: 'Showcase', position: 'left'},
      ]
    }
  }
})