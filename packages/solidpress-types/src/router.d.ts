import type { Component } from 'solid-js'
import type { PageData } from './markdown'

export interface Route {
  component: Component
  data: PageData
  path: string
}