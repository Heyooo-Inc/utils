import { isBoolean, isEmpty, isNumber, isString, isTrue, isValid } from './validate'

export function toBool(value: unknown, defaults?: boolean): boolean {
  if (isEmpty(value)) {
    return defaults || false
  }

  if (isBoolean(value)) {
    return value as boolean
  }

  return isTrue(value)
}

export function toInteger(value: unknown, defaults?: number, maxValue?: number): number | undefined {
  let val: number

  if (isNumber(value)) {
    val = Number(value)
  } else {
    val = parseInt(value as string, 10)
  }

  if (!isFinite(val)) {
    return defaults
  }

  return maxValue ? Math.min(maxValue, val) : val
}

export function toFloat(value: unknown, defaults?: number, maxValue?: number): number | undefined {
  let val: number

  if (isNumber(value)) {
    val = Number(value)
  } else {
    val = parseFloat(value as string)
  }

  if (!isFinite(val)) {
    return defaults
  }

  return maxValue ? Math.min(maxValue, val) : val
}

export function toJSON<T extends object>(text: unknown, defaults?: T): T | undefined {
  let value: T | undefined

  if (isValid(text) && isString(text)) {
    try {
      value = JSON.parse(text as string)
    } catch (e) {
      // eslint-disable-line
    }
  }

  if (!!defaults && !value) {
    value = defaults
  }

  return value
}
