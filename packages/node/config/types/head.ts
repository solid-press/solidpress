type HeadAttributes = Record<string, string>

export type HeadConfig =
| [string, HeadAttributes, string]
| [string, HeadAttributes]

export type HeadConfigs = HeadConfig[]
