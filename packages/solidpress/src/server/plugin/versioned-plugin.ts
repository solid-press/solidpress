import fs from 'fs-extra'

export const fetchVersionedMetaData = async (
  versionedPath: string
): Promise<string[]> => {
  if (await fs.pathExists(versionedPath)) {
    const files = await fs.readdir(versionedPath)
    return files
  }
  return []
}