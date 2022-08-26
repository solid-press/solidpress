import type { Processor as UnifiedProcessor } from 'unified'

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

export type Processor = {
  __path: string
  __relativePath: string
  __data: ParsedData
} & UnifiedProcessor

export type MDOutput = {
  pageData: PageData
  component: string
}

export type PageData = {
  description: string
  frontmatter: { [key: string]: unknown }
  headers: Headers
  secondaryTitle?: string | boolean
  title: string
  relativePath: string
}