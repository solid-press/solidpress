import fg from 'fast-glob'

export const fetchPages = async (
  dir: string,
  ignore: string[]
): Promise<string[]> => {
  // sort the pages with their names alphabetically.
  return (await fg(['**.md'], {
    cwd: dir,
    ignore,
  })).sort()
}