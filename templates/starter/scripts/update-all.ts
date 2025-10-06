#!/usr/bin/env bun

/**
 * Script to update all Bun apps in the "apps" directory.
 */

import type { Dirent } from 'node:fs'
import Bun from 'bun'
import { join } from 'pathe'
import { readDir } from './utils'

const DEFAULT_APP_PATH = 'apps'

async function updateTemplate(dirent: Dirent): Promise<void> {
  const appPath = join(dirent.parentPath, dirent.name)
  const versionFile = join(appPath, '.bun-version')

  // Update .bun-version file
  await Bun.$`bun --version > ${versionFile}`

  // Update packages
  console.log(`Updating "${appPath}" apps...`)

  const proc = Bun.spawn(
    ['bun', 'update'],
    {
      cwd: appPath,
      stdout: 'ignore',
      stderr: 'pipe',
    },
  )

  const exitCode = await proc.exited

  if (exitCode) {
    let errorMessage = ''

    if (proc.stderr) {
      const chunks: Uint8Array[] = []

      for await (const chunk of proc.stderr) {
        chunks.push(chunk)
      }

      errorMessage = new TextDecoder().decode(Buffer.concat(chunks))
    }

    console.group(`Error updating "${appPath}":`)
    console.error(errorMessage)
    console.groupEnd()
  }
  else {
    console.log(`Done updating "${appPath}".`)
  }
}

async function main() {
  // Update .bun-version file
  await Bun.$`bun --version > .bun-version`

  const dir = await readDir(DEFAULT_APP_PATH, {
    withFileTypes: true,
  }) as Dirent[]

  const tasks: Promise<void>[] = []

  for (const dirent of dir) {
    if (!dirent.isDirectory())
      continue

    tasks.push(
      updateTemplate(dirent),
    )
  }

  try {
    await Promise.all(tasks)
    console.log('All updates completed.')
  }
  catch (error) {
    console.error('An error occurred during the update:', error)
  }
}

main()
