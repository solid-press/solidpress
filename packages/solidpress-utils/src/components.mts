import type {Component} from '@solidpress/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LoadableComponent<T = any> = Promise<{
  default: Component<T>;
}>;

export function loadable<T>(componentLoader: Promise<Component<T>>) {
  return async (): LoadableComponent<T> => {
    const component = await componentLoader;
    return {
      default: component,
    };
  };
}
