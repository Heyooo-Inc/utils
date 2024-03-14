import { objectType } from './type'
import {
  IsBase64Options,
  IsEmailOptions,
  IsURLOptions,
  isBase64 as _isBase64,
  isEmail as _isEmail,
  isURL as _isURL,
  isUUID as _isUUID,
  isMobilePhone as _isMobilePhone,
  MobilePhoneLocale,
  IsMobilePhoneOptions
} from 'validator'

const WHITE_SPACE_REGX =
  /^[\s\f\n\r\t\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000\ufeff\x09\x0a\x0b\x0c\x0d\x20\xa0]+$/

export function hasOwnProp(obj: any, key: string): boolean {
  if (isNull(obj)) {
    return false
  }

  return Object.prototype.hasOwnProperty.call(obj, key)
}

export function isType(value: unknown, type: string) {
  return objectType(value) === type
}

export function isBoolean(value: unknown): boolean {
  return isType(value, 'boolean')
}

export function isString(value: unknown): boolean {
  return isType(value, 'string')
}

export function isNumber(value: unknown): boolean {
  return isType(value, 'number') && isFinite(value as number)
}

export function isInt(value: unknown): boolean {
  return isNumber(value) && Number.isInteger(value)
}

export function isFloat(value: unknown): boolean {
  return isNumber(value) && !Number.isInteger(value)
}

export const isArray = Array.isArray

export function isValidArray(value: unknown): boolean {
  return isArray(value) && value.length > 0
}

export function isSet(value: unknown): boolean {
  return isType(value, 'set')
}

export function isWeakSet(value: unknown): boolean {
  return isType(value, 'weakset')
}

export function isMap(value: unknown): boolean {
  return isType(value, 'map')
}

export function isWeakMap(value: unknown): boolean {
  return isType(value, 'weakmap')
}

export function isSymbol(value: unknown): boolean {
  return isType(value, 'symbol')
}

export function isObject(value: unknown): boolean {
  return isType(value, 'object')
}

export function isDate(value: unknown): boolean {
  return isType(value, 'date')
}

export function isRegExp(value: unknown): boolean {
  return isType(value, 'regexp')
}

export function isError(value: unknown): boolean {
  return isType(value, 'error')
}

export function isFunction(value: unknown): boolean {
  return isType(value, 'function')
}

export function isNull(value: unknown): boolean {
  return isType(value, 'null')
}

export function isUndefined(value: unknown): boolean {
  return isType(value, 'undefined')
}

export function isNil(value: unknown): boolean {
  return isNull(value) || isUndefined(value)
}

export function isNotNil(value: unknown): boolean {
  return !isNil(value)
}

export function isPlainObject(value: unknown): boolean {
  if (!isObject(value)) return false

  const ctor = (value as Object).constructor
  if (typeof ctor !== 'function') return false

  const proto = ctor.prototype
  if (!isObject(proto)) return false

  return proto.hasOwnProperty('isPrototypeOf')
}

export function isEmpty(value: any): boolean {
  if (isNil(value)) return true

  if (isBoolean(value)) return false

  if (isNumber(value)) return false

  if (isString(value)) {
    return value.length === 0 || WHITE_SPACE_REGX.test(value)
  }

  if (isFunction(value) || isArray(value)) {
    return value.length === 0
  }

  switch (objectType(value)) {
    case 'file':
    case 'map':
    case 'weakmap':
    case 'set':
    case 'weakset': {
      return value.size === 0
    }

    case 'object': {
      for (const key in value) {
        if (hasOwnProp(value, key)) {
          return false
        }
      }
      return true
    }

    default:
      break
  }

  return false
}

export function isValid(value: unknown): boolean {
  return !isEmpty(value)
}

export function isEqual(value: unknown, arg2: any): boolean {
  return String(value) === String(arg2)
}

export function isNotEqual(value: unknown, arg2: any): boolean {
  return !isEqual(value, arg2)
}

export function isTrue(value: unknown): boolean {
  return value === true || isEqual(value, 'true') || isEqual(value, '1')
}

export function isFalse(value: unknown): boolean {
  return value === false || isEqual(value, 'false') || isEqual(value, '0')
}

export function isBool(value: unknown): boolean {
  return isTrue(value) || isFalse(value)
}

export function isFormData(value: unknown): boolean {
  return isType(value, 'formdata')
}

export function isPromise<T = any>(value: unknown): value is Promise<T> {
  return isType(value, 'promise')
}

export function isBlob(value: unknown): boolean {
  return isType(value, 'blob')
}

export function isBase64(value: unknown, options?: IsBase64Options) {
  return isValid(value) && _isBase64(value as string, options)
}

export function isEmail(value: unknown, options?: IsEmailOptions) {
  return isValid(value) && _isEmail(value as string, options)
}

export function isURL(value: unknown, options?: IsURLOptions) {
  return isValid(value) && _isURL(value as string, options)
}

export function isUUID(value: unknown) {
  return isValid(value) && _isUUID(value as string)
}

export function isMobilePhone(
  value: unknown,
  locale?: MobilePhoneLocale | MobilePhoneLocale[],
  options?: IsMobilePhoneOptions
) {
  return isValid(value) && _isMobilePhone(value as string, locale, options)
}
