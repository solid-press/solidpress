import { createSignal } from 'solid-js';
import { isServer } from 'solid-js/web';
import { scrollTo, pathToFile, withBase } from '@solidpress/utils';
import { siteData$ } from '../contexts/site-data'

import type { Accessor, Component, createContext } from 'solid-js';
import type { PageData, Route } from '@solidpress/types';

export type ContextProviderComponent = ReturnType<
  typeof createContext
>['Provider'];

export type Router = {
  go: (path?: string) => Promise<void>;
  route: Accessor<Route>;
};

export type PageLoader = (
  path: string,
  scrollPos: number,
  isRetry?: boolean,
) => Promise<void>;

export const createRouter = (fallback: Component): Router => {
  const [route, setRoute] = createSignal<Route>();

  const fakeHost = 'https://22eq35.lib';

  function go(path = isServer ? '/' : location.href) {
    let newPath = path;
    const url = new URL(path, fakeHost);
    if (!url.pathname.endsWith('/') && !url.pathname.endsWith('.html')) {
      url.pathname += '.html';
      newPath = `${url.pathname}${url.search}${url.hash}`;
    }

    if (!isServer) {
      history.replaceState({ scrollPosition: window.scrollY }, document.title);
      history.pushState(null, '', newPath);
    }

    return loadPage(newPath);
  }

  let latestPendingPage: string | null = null;

  async function loadPage(path: string, scrollPosition = 0, isRetry = false) {
    const url = new URL(path, fakeHost);
    const pendingPath = (latestPendingPage = url.pathname);

    try {
      const pageData = await pageLoader(pendingPath);

      if (latestPendingPage === pendingPath) {
        latestPendingPage = null;

        const { default: component, pageData: data } = pageData;

        if (!component) {
          throw new Error(
            `[SolidPress:client] invalid route component ${component}`,
          );
        }

        setRoute((prev) => {
          return {
            ...prev,
            path: isServer
              ? withBase(pendingPath, siteData$().base)
              : pendingPath,
            component,
            data,
          };
        });

        if (!isServer) {
          if (url.hash && !scrollPosition) {
            try {
              const target = document.querySelector(
                decodeURIComponent(url.hash),
              ) as HTMLElement;
              if (target) {
                scrollTo(target, url.hash);
                return;
              }
            } catch (e) {
              console.warn(e);
            }
            window.scrollTo(0, scrollPosition);
          }
        }
      }
    } catch (e) {
      if (!isRetry) {
        try {
          const res = await fetch(`${siteData$().base}hashmap.json`);
          window.__SP_HASH_MAP__ = await res.json();
          await loadPage(path, scrollPosition, true);
          return;
        } catch { }
      }

      if (latestPendingPage === pendingPath) {
        latestPendingPage = null;
        setRoute({
          path: isServer
            ? withBase(pendingPath, siteData$().base)
            : pendingPath,
          component: fallback,
          data: {
            relativePath: '',
            title: '404 Not Found',
            description: 'Page Not Found',
            headers: [],
            frontmatter: { sidebar: false, layout: 'page' },
          } as PageData,
        });
      }
    }
  }

  type LoadedPage = {
    default: Component;
    pageData: PageData;
  };

  let initLoad = !isServer;
  let initPath: string;

  async function pageLoader(path: string): Promise<LoadedPage> {
    let filePath = pathToFile(path);

    if (initLoad) {
      initPath = filePath;
    }

    if (initLoad || initPath === filePath) {
      filePath = filePath.replace(/\.js$/, '.lean.js');
    }

    if (!isServer) {
      initLoad = false;
    }

    return import(/*@vite-ignore*/ filePath);
  }

  injectDOMHook(loadPage, go);

  return {
    go,
    route,
  };
};

function injectDOMHook(
  loadPage: PageLoader,
  go: (path: string) => ReturnType<PageLoader>,
) {
  window.addEventListener(
    'click',
    (e: MouseEvent) => {
      const link = (e.target as Element).closest('a');
      if (link) {
        const { href, origin, pathname, hash, search, target } = link;
        const currentUrl = window.location;
        const extMatch = pathname.match(/\.\w+$/);
        // only intercept inbound links
        if (
          !e.ctrlKey &&
          !e.shiftKey &&
          !e.altKey &&
          !e.metaKey &&
          target !== `_blank` &&
          origin === currentUrl.origin &&
          // don't intercept if non-html extension is present
          !(extMatch && extMatch[0] !== '.html')
        ) {
          e.preventDefault();
          if (
            pathname === currentUrl.pathname &&
            search === currentUrl.search
          ) {
            // scroll between hash anchors in the same page
            if (hash && hash !== currentUrl.hash) {
              history.pushState(null, '', hash);
              // still emit the event so we can listen to it in themes
              window.dispatchEvent(new Event('hashchange'));
              // use smooth scroll when clicking on header anchor links
              scrollTo(link, hash, link.classList.contains('header-anchor'));
            }
          } else {
            go(href);
          }
        }
      }
    },
    { capture: true },
  );

  window.addEventListener('popstate', (e: PopStateEvent) => {
    loadPage(location.href, e.state?.scrollPosition || 0);
  });

  window.addEventListener('hashchange', ({ preventDefault }: HashChangeEvent) => {
    preventDefault();
  });
}

