type HeadAttributes = {[key: string]: string};

export type HeadConfig =
  | [string, HeadAttributes, string]
  | [string, HeadAttributes];

export type HeadConfigs = HeadConfig[];
