import { mergeConfig } from 'vite'
import { is, isNil } from 'ramda'
import type { UserConfig }  from './types'

const isObj = (obj: unknown): obj is UserConfig => is(Object, obj)

export function mergeUserConfig(a: UserConfig, b: UserConfig, isRoot = true) {
  const merged: { [key: string]: any } = { ...a }
  for (const key in b) {
    const value = b[key as keyof UserConfig]
    if (value == null) {
      continue
    }
    const existing = merged[key]
    if (Array.isArray(existing) && Array.isArray(value)) {
      merged[key] = [...existing, ...value]
      continue
    }
    if (isObj(existing) && isObj(value)) {
      if (isRoot && key === 'vite') {
        merged[key] = mergeConfig(existing, value)
      } else {
        merged[key] = mergeUserConfig(existing, value, false)
      }
      continue
    }
    merged[key] = value
  }
  return merged
}

export const mergeWithDefault = <T extends { [key: string]: any }>(a: T, b: Partial<T>): T => {
  const t = {} as T
  Object.keys(b).map((key: keyof typeof b) => {
    if (isNil(a[key])) {
      t[key] = b[key]!
    } else {
      t[key] = a[key]
    }
  })
  return t
}