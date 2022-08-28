interface NamespaceReturn {
  kls: string
  e: (e: string) => string
  m: (m: string) => string
  em: (e: string, m: string) => string
}

export const ns = (namespace: string): NamespaceReturn => {
  return {
    kls: namespace,
    e: (element: string) => `${namespace}__${element}`,
    m: (modifier: string) => `${namespace}--${modifier}`,
    em: (element: string, modifier: string) =>
      `${namespace}__${element}--${modifier}`
  }
}

export const is = (type: string): string => `is-${type}`
