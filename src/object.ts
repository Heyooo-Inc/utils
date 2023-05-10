import _cloneDeep from 'lodash.clonedeep'
import { isArray, isNil, isPlainObject } from './validate'

export const cloneDeep = _cloneDeep

export interface PickOptions {
  ignoreNil?: boolean
  cloneDeep?: boolean
}

export const DEFAULT_PICK_OPTIONS: PickOptions = {
  ignoreNil: false,
  cloneDeep: false
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
    } else if (opt.cloneDeep) {
      value = cloneDeep(value)
    }

    to[alias || key] = value
  }

  return to
}