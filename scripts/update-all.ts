#!/usr/bin/env bun

/**
 * Script to update all Bun apps in the specified directories.
 */

import type { Dirent } from 'node:fs'
import Bun from 'bun'
import process from 'node:process'
import { join } from 'pathe'
import { readDir } from './utils'

const TARGET_DIRS = ['apps', 'packages'] as const

/**
 * Update dependencies in the given directory.
 */
async function updateDeps(target: string | Dirent): Promise<void> {
  const path = typeof target === 'string' ? target : join(target.parentPath, target.name)
  const versionFile = join(path, '.bun-version')
  const pathName = path === '.' ? 'root' : `"${path}"`
  const packageFile = Bun.file(join(path, 'package.json'))

  if (!await packageFile.exists()) {
    console.log(`Skipping "${pathName}", no package.json found.`)
    return
  }

  // Update .bun-version file to follow the Bun version on the system
  await Bun.$`bun --version > ${versionFile}`

  // Update packages
  console.log(`Updating "${pathName}"`)

  const proc = Bun.spawn(['bun', 'update'], {
    cwd: path,
    stdout: 'inherit',
    stderr: 'inherit',
  })

  // Safety timeout (default 5 minutes; override with UPDATE_TIMEOUT_MS)
  const timeoutMs = Number(process.env.UPDATE_TIMEOUT_MS ?? 5 * 60 * 1000)
  let timedOut = false
  const timer = setTimeout(() => {
    timedOut = true
    try {
      proc.kill()
    }
    catch {}
  }, timeoutMs)

  const exitCode = await proc.exited.finally(() => clearTimeout(timer))

  if (timedOut) {
    console.error(`Update for ${pathName} timed out after ${timeoutMs}ms and was killed.`)

    return
  }

  if (exitCode) {
    console.error(`ERROR: Failed to update "${path}" (exit ${exitCode}). See output above.`)
  }
  else {
    console.log(`Done updating "${pathName}".`)
  }
}

async function processTargetDirectory(base: string) {
  let dir: Dirent[]
  try {
    dir = await readDir(base, { withFileTypes: true }) as Dirent[]
  }
  catch (e) {
    console.warn(`Skipping "${base}" (not found or unreadable).`)
    return
  }

  for (const dirent of dir) {
    if (!dirent.isDirectory())
      continue
    try {
      await updateDeps(dirent)
    }
    catch (error) {
      console.error(`An error occurred during the update of "${join(dirent.parentPath, dirent.name)}":`, error)
    }
  }
}

async function main() {
  // Update root directory
  await Bun.$`bun --version > .bun-version`
  await updateDeps('.')

  // Sequentially process each target directory
  for (const target of TARGET_DIRS) {
    await processTargetDirectory(target)
  }

  console.log('All updates completed.')
}

main()
