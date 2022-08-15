type HeadAttributes = Record<string, string | boolean>

export type HeadConfig =
| [string, HeadAttributes, string]
| [string, HeadAttributes]

export type HeadConfigs = HeadConfig[]
