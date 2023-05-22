import cloneDeep from 'lodash.clonedeep'
import { isArray, isNil, isObject, isPlainObject } from './validate'

import merge, { Options } from 'deepmerge'

export function deepMerge<T>(x: Partial<T>, y: Partial<T>, options?: Options): T | undefined {
  if (isObject(x) && isObject(y)) {
    try {
      return merge(x, y, options)
    } catch {}
  }
}

export function deepClone<T extends Object>(value: T): T {
  // jsdom don't support `structuredClone` testing
  // see https://github.com/jsdom/jsdom/issues/3363
  if (globalThis.structuredClone) {
    return globalThis.structuredClone(value)
  }

  return cloneDeep(value)
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
    let key = field as keyof T
    let alias: keyof T | undefined

    if (isArray(field)) {
      key = field[0]

      if (field.length > 1) {
        alias = field[1] as keyof T
      }
    }

    let value = target[key]

    if (isNil(value)) {
      if (opt.ignoreNil) {
        continue
      }
    } else if (opt.deepClone) {
      value = deepClone(value as unknown as Object) as T[keyof T]
    }

    to[alias || key] = value
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
