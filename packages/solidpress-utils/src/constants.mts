import pkg from '../package.json' assert {type: 'json'};

export const SOLIDPRESS_VERSION: string = pkg.version;
export const isServer = typeof window === 'undefined';
export const EXTERNAL_URL_RE = /^[a-z]+:/i;
export const HASH_RE = /#.*$/
export const EXT_RE = /(index)?\.(md|html)$/
