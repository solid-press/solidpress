import { isNil, equals } from 'ramda'
import {
  EXTERNAL_URL_RE,
  HASH_RE, EXT_RE,
  isServer
} from './constants.mjs'

export const isExternalLink = (link: string): boolean => EXTERNAL_URL_RE.test(link)

const initHash = (isServer ? '' : location.hash)

export const normalize = (path: string): string => {
  return decodeURI(path).replace(HASH_RE, '').replace(EXT_RE, '')
}

export const asRegxrMatch =
  (matchString?: string, val?: string): boolean => {
    if (isNil(matchString) || isNil(val)) {
      return false
    }
    return new RegExp(matchString, 'gi').test(val)
  }

export const isActive = (
  path: string,
  matchPath?: string,
  asRegxr?: boolean,
): boolean => {
  if (isNil(matchPath)) {
    return false
  }

  const normalizedPath = normalize(`/${path}`)

  if (asRegxr) {
    return asRegxrMatch(matchPath, normalizedPath)
  }

  if (normalize(matchPath) !== normalizedPath) {
    return false
  }

  const hashMatch = matchPath.match(HASH_RE)

  if (hashMatch) {
    return equals(initHash, hashMatch[0])
  }

  return true
}

export const isSamePath = (
  p1: string | undefined,
  p2: string | undefined
): boolean => {
  return normalize(p1) === normalize(p2)
}