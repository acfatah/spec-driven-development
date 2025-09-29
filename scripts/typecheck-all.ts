#!/usr/bin/env bun

/**
 * Script to typecheck all Bun projects in the 'apps' and 'packages' directories.
 */

import type { Dirent } from 'node:fs'
import Bun from 'bun'
import process from 'node:process'
import { join } from 'pathe'
import { readDir } from './utils'

const TARGET_DIRS = ['apps', 'packages'] as const
const tsgo = Bun.argv[2] === '--tsgo'

/** Script names that can be used to typecheck an app. */
type TypecheckScript = 'typecheck' | 'typecheck:tsgo'

/**
 * Typechecks a single app by running its package.json script.
 *
 * @param dirent - Directory entry for the app folder (from `fs.readdir` with `withFileTypes: true`).
 * @param scriptName - The script to run for typechecking. Allowed: `typecheck` | `typecheck:tsgo`.
 * @returns Resolves when the script finishes; logs progress and errors to the console.
 */
async function typecheckApp(
  dirent: Dirent,
  scriptName: TypecheckScript,
): Promise<void> {
  const path = join((dirent as any).parentPath, dirent.name)

  console.log(`Typechecking "${path}" using script "${scriptName}"`)

  const proc = Bun.spawn(['bun', 'run', scriptName], {
    cwd: path,
    stdout: 'inherit',
    stderr: 'inherit',
  })

  // Safety timeout to avoid hanging forever (default 10 minutes)
  const timeoutMs = Number(process.env.TYPECHECK_TIMEOUT_MS ?? 10 * 60 * 1000)
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
    console.error(`Typechecking "${path}" timed out after ${timeoutMs}ms and was killed.`)

    return
  }

  if (exitCode) {
    console.error(`Error typechecking "${path}" (exit ${exitCode}). See output above.`)
  }
  else {
    console.log(`"${path}" is OK.`)
  }
}

async function getScriptNameIfExists(appPath: string): Promise<TypecheckScript | null> {
  try {
    const pkgFile = Bun.file(join(appPath, 'package.json'))

    if (!(await pkgFile.exists()))
      return null

    const json = await pkgFile.json()
    const scripts = (json && json.scripts) || {}
    const desired = tsgo ? 'typecheck:tsgo' : 'typecheck'

    return scripts[desired] ? desired : null
  }
  catch {
    return null
  }
}

async function main() {
  for (const baseDir of TARGET_DIRS) {
    let dir: Dirent[]
    try {
      dir = await readDir(baseDir, { withFileTypes: true }) as Dirent[]
    } catch {
      console.warn(`Skipping missing directory "${baseDir}".`)
      continue
    }

    for (const dirent of dir) {
      if (!dirent.isDirectory())
        continue

      const appPath = join((dirent as any).parentPath, dirent.name)
      const scriptName = await getScriptNameIfExists(appPath)

      if (!scriptName) {
        console.log(`Skipping "${appPath}": no ${tsgo ? 'typecheck:tsgo' : 'typecheck'} script in package.json`)
        continue
      }

      try {
        await typecheckApp(dirent, scriptName)
      }
      catch (error) {
        console.error(`Unexpected error while typechecking "${appPath}":`, error)
      }
    }
  }

  console.log('All typechecks completed.')
}

main()
