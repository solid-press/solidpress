import {normalizePath} from 'vite';
import path from 'path';

export const resolve = (...paths: string[]): string =>
  normalizePath(path.resolve(...paths));

export const slash = (p: string): string => p.replace(/\\/g, '/');
