import rfdc from 'rfdc'
import { isArray, isNil, isObject, isPlainObject } from './validator'

import merge, { Options } from 'deepmerge'
import { getProperty, setProperty, hasProperty, deleteProperty } from 'dot-prop'

export const getObjectProperty = getProperty
export const setObjectProperty = setProperty
export const hasObjectProperty = hasProperty
export const deleteObjectProperty = deleteProperty

export function deepMerge<T>(x: Partial<T>, y: Partial<T>, options?: Options): T | undefined {
  if (isObject(x) && isObject(y)) {
    return merge(x, y, options)
  }
}

export function deepClone<T extends Object>(value: T): T {
  // jsdom don't support `structuredClone` testing
  // see https://github.com/jsdom/jsdom/issues/3363
  if (globalThis.structuredClone) {
    return globalThis.structuredClone(value)
  }

  return rfdc({ circles: true })(value)
}

export interface PickOptions {
  ignoreNil?: boolean
  deepClone?: boolean
}

export const DEFAULT_PICK_OPTIONS: PickOptions = {
  ignoreNil: false,
  deepClone: false
}

export function pickObject<T extends Object>(
  target: T,
  fields: Array<keyof T | [keyof T, string]>,
  options?: PickOptions
): T | undefined {
  if (!isPlainObject(target)) {
    return
  }

  const opt = { ...DEFAULT_PICK_OPTIONS, ...options }
  const to = {} as T

  for (const field of fields) {
    let path = field as keyof T
    let alias: keyof T | undefined

    if (isArray(field)) {
      path = field[0]

      if (field.length > 1) {
        alias = field[1] as keyof T
      }
    }

    let value = getProperty(target, path as string) as T[keyof T]

    if (isNil(value)) {
      if (opt.ignoreNil) {
        continue
      }
    } else if (opt.deepClone) {
      value = deepClone(value as unknown as Object) as T[keyof T]
    }

    to[alias || path] = value
  }

  return to
}

export function excludeObject<T extends Object>(
  target: T,
  fields: Array<keyof T>,
  options?: PickOptions
): T | undefined {
  if (!isPlainObject(target)) {
    return
  }

  const allFields = Object.keys(target) as Array<keyof T>
  const includedFields = allFields.filter(f => !fields.includes(f))

  return pickObject(target, includedFields, options)
}
