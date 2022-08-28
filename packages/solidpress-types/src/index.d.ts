import type { lazy } from 'solid-js';

export type { Component } from 'solid-js';
export type {
  Header,
  Headers,
  Processor,
  MDOutput,
  PageData,
  ParsedData,
} from './markdown';
export type { UserConfig, SiteData, SiteConfig } from './site';
export type { Route } from './router';
export type { ThemeConfig, NavItem, Navbar, Logo } from './theme-classic';

export type LoadableComponent = Parameters<typeof lazy>[0];
