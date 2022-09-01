import fs from 'fs-extra'

export const fetchVersionedMetaData = async (
  versionedPath: string
): Promise<string[]> => {
  const files = await fs.readdir(versionedPath)
  return files
}