import {
  hasOwnProp,
  isBase64,
  isBlob,
  isBool,
  isDate,
  isEmail,
  isEmpty,
  isEqual,
  isError,
  isFloat,
  isFormData,
  isInt,
  isMap,
  isMobilePhone,
  isNil,
  isNotEqual,
  isNotNil,
  isPlainObject,
  isPromise,
  isRegExp,
  isSet,
  isSymbol,
  isURL,
  isUUID,
  isValid,
  isValidArray,
  isWeakMap,
  isWeakSet
} from './validator'
import { expect, test } from 'vitest'

test('null does not have own prop', () => {
  expect(hasOwnProp(null, 'x')).toBe(false)
})

test("' ' is empty", () => {
  expect(isEmpty(' ')).toBe(true)
})

test('[] is empty', () => {
  expect(isEmpty([])).toBe(true)
})

test('{} is empty', () => {
  expect(isEmpty({})).toBe(true)
})

test('new Set() is empty', () => {
  expect(isEmpty(new Set())).toBe(true)
})

test('new Map() is empty', () => {
  expect(isEmpty(new Map())).toBe(true)
})

test('null is empty', () => {
  expect(isEmpty(null)).toBe(true)
})

test('boolean is not empty', () => {
  expect(isEmpty(false)).toBe(false)
})

test('number is not empty', () => {
  expect(isEmpty(0)).toBe(false)
})

test('file is empty', () => {
  const file = new File([], 'test.kit')
  expect(isEmpty(file)).toBe(true)
})

test('str is valid', () => {
  expect(isValid('str')).toBe(true)
})

test('[1] is valid', () => {
  expect(isValid([1])).toBe(true)
})

test('{ x: 1 } is valid', () => {
  expect(isValid({ x: 1 })).toBe(true)
})

test('Symbol() is valid', () => {
  expect(isValid(Symbol())).toBe(true)
})

test('null is nil', () => {
  expect(isNil(null)).toBe(true)
  expect(isNotNil(null)).toBe(false)
})

test('undefined is nil', () => {
  expect(isNil(undefined)).toBe(true)
  expect(isNotNil(undefined)).toBe(false)
})

test('false is not nil', () => {
  expect(isNil(false)).toBe(false)
  expect(isNotNil(false)).toBe(true)
})

test('abc is equal abc', () => {
  expect(isEqual('abc', 'abc')).toBe(true)
  expect(isNotEqual('abc', 'abc')).toBe(false)
})

test("10 is equal '10'", () => {
  expect(isEqual(10, '10')).toBe(true)
  expect(isNotEqual(10, '10')).toBe(false)
})

test('abc is not equal gf', () => {
  expect(isNotEqual('abc', 'gf')).toBe(true)
})

test("10 is not equal '5'", () => {
  expect(isNotEqual(10, '5')).toBe(true)
})

test('true is bool', () => {
  expect(isBool('true')).toBe(true)
})

test('1 is bool', () => {
  expect(isBool(1)).toBe(true)
})

test('false is bool', () => {
  expect(isBool('false')).toBe(true)
})

test('0 is bool', () => {
  expect(isBool(0)).toBe(true)
})

test('new Set() is Set', () => {
  expect(isSet(new Set())).toBe(true)
})

test('new WeakSet() is WeakSet', () => {
  expect(isWeakSet(new WeakSet())).toBe(true)
})

test('new Map() is Map', () => {
  expect(isMap(new Map())).toBe(true)
})

test('new WeakMap() is WeakMap', () => {
  expect(isWeakMap(new WeakMap())).toBe(true)
})

test("Symbol('hello') is Symbol", () => {
  expect(isSymbol(Symbol('hello'))).toBe(true)
})

test('new Date() is Date', () => {
  expect(isDate(new Date())).toBe(true)
})

test('new Error() is Error', () => {
  expect(isError(new Error())).toBe(true)
})

test('/./ is RegExp', () => {
  expect(isRegExp(/\./)).toBe(true)
})

test('{} is PlainObject', () => {
  expect(isPlainObject({})).toBe(true)
})

test('null is not PlainObject', () => {
  expect(isPlainObject(null)).toBe(false)
})

test('override constructor is not PlainObject', () => {
  const obj = {
    constructor: undefined
  }
  expect(isPlainObject(obj)).toBe(false)
})

test('override constructor prototype is not PlainObject', () => {
  const Cls = function () {
    // @ts-ignore
  }
  // @ts-ignore
  Cls.prototype = undefined

  const obj = {
    constructor: Cls
  }

  expect(isPlainObject(obj)).toBe(false)
})

test('function is not PlainObject', () => {
  const Person = function () {
    // @ts-ignore
  }
  const person = new (Person as any)()
  expect(isPlainObject(person)).toBe(false)
})

test('[] is not valid array', () => {
  expect(isValidArray([])).toBe(false)
})

test('window.FormData is form data', () => {
  expect(isFormData(new window.FormData())).toBe(true)
})

test('function is not form data', () => {
  expect(
    isFormData(function () {
      //
    })
  ).toBe(false)
})

test('object is not form data', () => {
  expect(isFormData({})).toBe(false)
})

test('1.5 is float', () => {
  expect(isFloat(1.5)).toBe(true)
})

test('5 is not float', () => {
  expect(isFloat(5)).toBe(false)
})

test('5 is int', () => {
  expect(isInt(5)).toBe(true)
})

test('1.5 is not int', () => {
  expect(isInt(1.5)).toBe(false)
})

test('new Promise is promise', () => {
  expect(
    isPromise(
      new Promise((resolve, reject) => {
        // @ts-ignore
        true ? resolve(null) : reject()
      })
    )
  ).toBe(true)
})

test('function is not promise', () => {
  expect(
    isPromise(() => {
      /**/
    })
  ).toBe(false)
})

test('new Blob is blob', () => {
  expect(isBlob(new Blob([]))).toBe(true)
})

test('new File is not blob', () => {
  expect(isBlob(new File([], 'text.txt'))).toBe(false)
})

test('string is base64', () => {
  expect(isBase64('aGVsbG8gd29ybGQ=')).toBe(true)
  expect(isBase64('aGVsbG8gQ=')).toBe(false)
})

test('string is email', () => {
  expect(isEmail('user@a.me')).toBe(true)
  expect(isEmail('a.me')).toBe(false)
  expect(isEmail('user@me')).toBe(false)
  expect(isEmail('user@.me')).toBe(false)
})

test('string is url', () => {
  expect(isURL('a.me')).toBe(true)
  expect(isURL('https://a.me', { require_protocol: true })).toBe(true)
  expect(isURL('a.me', { require_protocol: true })).toBe(false)
})

test('string is uuid', () => {
  expect(isUUID('8cf4fccd-e796-5676-9352-57ff9bed87d1')).toBe(true)
  expect(isUUID('8cf4fcxy-e796-5676-9352-57ff9bed87d1')).toBe(false)
  expect(isUUID('5676-9352-57ff9bed87d1')).toBe(false)
})

test('string is mobile phone', () => {
  expect(isMobilePhone('6463817651')).toBe(true)
  expect(isMobilePhone('+16463817651')).toBe(true)
  expect(isMobilePhone('+8617066145991')).toBe(true)
  expect(isMobilePhone('+16463817651', 'zh-TW')).toBe(false)
})
