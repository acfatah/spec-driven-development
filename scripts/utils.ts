import { existsSync } from 'node:fs'
import { readdir } from 'node:fs/promises'

/**
 * Utility functions for general purposes.
 */

/**
 * Reads the contents of a directory.
 */
export async function readDir(
  path: string,
  options: {
    withFileTypes: boolean
    recursive?: boolean
    encoding?: string
  } = { withFileTypes: true },
) {
  if (!existsSync(path)) {
    throw new Error(`The directory "${path}" does not exist.`)
  }
  // @ts-expect-error Ignore readdir options type mismatch
  return readdir(path, options)
}

import Bun from 'bun'

/**
 * Reads a file as text.
 */
export async function readFile(filepath: string, _options = {}) {
  const file = Bun.file(filepath)
  if (!file.exists())
    throw new Error(`The path "${filepath}" does not exists.`)
  return await file.text()
}

import process from 'node:process'
import Readline from 'node:readline'

/**
 * Reads a line from stdin.
 */
export function readLine(): Promise<string> {
  return new Promise((resolve) => {
    const rl = Readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })
    rl.on('line', (line) => {
      resolve(line.trim())
      rl.close()
    })
  })
}

/**
 * Writes data to a file.
 */
export async function writeFile(
  destination: string,
  data: string | Blob | BlobPart[] | ArrayBufferLike | NodeJS.TypedArray | ArrayBufferLike,
) {
  // @ts-expect-error Bunfile type mismatch
  Bun.write(destination, data)
}
