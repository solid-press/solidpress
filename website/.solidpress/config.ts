import { defineConfig } from '@solidpress/core'

export default defineConfig({
  themeConfig: {
    navbar: {
      name: 'SolidPress',
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
      ],
      logo: {
        alt: 'Solid Logo',
        src: 'imgs/solid-logo.svg',
        width: '36px',
        height: '40px',
      },
    }
  }
})