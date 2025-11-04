/**
 * Shared types used across multiple packages.
 */

/**
 * Useful for type-level assertions and conditional types.
 *
 * Note: This does not compare structural compatibility, only strict type equivalence.
 *
 * @example
 *   type IsString = Equals<string, string>; // true
 *   type IsNumber = Equals<string, number>; // false
 */
export type Equals<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false

/**
 * Type-level trick to satisfy Drizzle’s requirement that enum be a non-empty
 * tuple. It ensures the library can infer a literal union type from the array.
 */
export type NonEmptyTuple<T> = [T, ...T[]]

export type * from '../enums'
