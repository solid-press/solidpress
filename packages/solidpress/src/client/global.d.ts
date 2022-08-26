export {};

declare global {
  interface Window {
    __SP_HASH_MAP__: {
      [key: string]: string;
    };
  }
}
