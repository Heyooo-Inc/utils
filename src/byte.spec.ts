import { parseByte, stringifyByte } from './'
import { expect, test } from 'vitest'

test('1.5b', () => {
  expect(parseByte('1.5b')).toBe(1.5)
})

test('32kb', () => {
  expect(parseByte('32kb')).toBe(32_768)
})

test('1.5mb', () => {
  expect(parseByte('1.5mb')).toBe(1_572_864)
})

test('5gb', () => {
  expect(parseByte('5gb')).toBe(5_368_709_120)
})

test('5tb', () => {
  expect(parseByte('5tb')).toBe(5_497_558_138_880)
})

test('5pb', () => {
  expect(parseByte('5pb')).toBe(5_629_499_534_213_120)
})

test('blank string', () => {
  expect(parseByte('    ')).toBe(undefined)
})

test('invalid unit', () => {
  expect(parseByte('5y')).toBe(undefined)
})

test('invalid value', () => {
  expect(parseByte('five_days')).toBe(undefined)
})

test('1.5B', () => {
  expect(stringifyByte(1.5)).toBe('1.5B')
})

test('32KB', () => {
  expect(stringifyByte(32_768)).toBe('32KB')
})

test('1.5MB', () => {
  expect(stringifyByte(1_572_864)).toBe('1.5MB')
})

test('5gb', () => {
  expect(stringifyByte(5_368_709_120)).toBe('5GB')
})

test('5tb', () => {
  expect(stringifyByte(5_497_558_138_880)).toBe('5TB')
})

test('5pb', () => {
  expect(stringifyByte(5_629_499_534_213_120)).toBe('5PB')
})
