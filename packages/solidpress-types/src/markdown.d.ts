import type MD from 'markdown-it'

export type Header = {
  level: number
  title: string
  slug: string
}

export type Headers = Header[]

export type ParsedData = {
  links?: string[]
  headers?: Headers
}

export type MDEnhanced = {
  __path: string
  __relativePath: string
  __data: ParsedData
} & MD

export type MDOutput = {
  pageData: PageData
  html: string
}

export type PageData = {
  description: string
  frontmatter: { [key: string]: unknown }
  headers: Headers
  secondaryTitle?: string | boolean
  title: string
  relativePath: string
}