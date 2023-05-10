import { objectType } from '../src/type'

describe('type', () => {
  test('10 is number', () => {
    expect(objectType(10)).toBe('number')
  })

  test('new Number(10) is number', () => {
    // tslint:disable-next-line: no-construct
    expect(objectType(new Number(10))).toBe('Number')
  })

  test('str is string', () => {
    expect(objectType('str')).toBe('string')
  })

  test('true is boolean', () => {
    expect(objectType(true)).toBe('boolean')
  })

  test('[] is array', () => {
    expect(objectType([])).toBe('array')
  })

  test('{} is object', () => {
    expect(objectType({})).toBe('object')
  })

  test('new Set() is set', () => {
    expect(objectType(new Set())).toBe('set')
  })

  test('new Map() is map', () => {
    expect(objectType(new Map())).toBe('map')
  })

  test("Symbol('symbol') is symbol", () => {
    expect(objectType(Symbol('symbol'))).toBe('symbol')
  })

  test('() => {} is function', () => {
    expect(
      objectType(() => {
        // @ts-ignore
      })
    ).toBe('function')
  })

  test('new Function() is function', () => {
    expect(objectType(new Function())).toBe('function')
  })

  test('new Date() is date', () => {
    expect(objectType(new Date())).toBe('date')
  })

  test('/\\./ is regexp', () => {
    expect(objectType(/\./)).toBe('regexp')
  })

  test('new Error() is error', () => {
    expect(objectType(new Error())).toBe('error')
  })

  test('null', () => {
    expect(objectType(null)).toBe('null')
  })

  test('undefined', () => {
    expect(objectType(undefined)).toBe('undefined')
  })
})
