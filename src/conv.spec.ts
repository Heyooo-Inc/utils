import { toBool, toInteger, toFloat, toJSON, toIntlNumber, toDuration, toURLParams, toURLQuery } from './'
import { expect, test } from 'vitest'

test('bool', () => {
  expect(toBool(null)).toBe(false)
  expect(toBool(null, true)).toBe(true)
  expect(toBool(1)).toBe(true)
  expect(toBool('1')).toBe(true)
  expect(toBool(true)).toBe(true)
  expect(toBool(0)).toBe(false)
  expect(toBool('0')).toBe(false)
  expect(toBool(false)).toBe(false)
})

test('integer', () => {
  expect(toInteger(4)).toBe(4)
  expect(toInteger('10')).toBe(10)
  expect(toInteger('10', 3, 5)).toBe(5)
  expect(toInteger('a', 3)).toBe(3)
})

test('float', () => {
  expect(toFloat('0.1')).toBe(0.1)
  expect(toFloat(3.14)).toBe(3.14)
  expect(toFloat('10.1', 3, 5)).toBe(5)
  expect(toFloat('a', 3)).toBe(3)
})

test('json', () => {
  const obj = {
    x: 'y',
    y: 1
  }

  expect(toJSON(null as any)).toBe(undefined)
  expect(toJSON('x=y', {})).toStrictEqual({})
  expect(toJSON(JSON.stringify(obj))).toStrictEqual(obj)
})

test('intlNumber', () => {
  expect(toIntlNumber(12)).toBe('12')
  expect(toIntlNumber(1200)).toBe('1.2K')
  expect(toIntlNumber(12_000)).toBe('12K')
  expect(toIntlNumber(1_200_000)).toBe('1.2M')
  expect(toIntlNumber(12_000_000)).toBe('12M')
  expect(toIntlNumber(120_000_000)).toBe('120M')
  expect(toIntlNumber(1_200_000_000)).toBe('1.2B')
  expect(toIntlNumber(12_000_000_000)).toBe('12B')
  expect(toIntlNumber(120_000_000_000)).toBe('120B')
})

test('duration', () => {
  expect(toDuration(30)).toBe('30s')
  expect(toDuration(60, { padNumber: true })).toBe('01m 00s')
  expect(toDuration(60, { hideOnZeroValue: true })).toBe('1m')
  expect(toDuration(3760)).toBe('1h 2m 40s')
  expect(toDuration(3760, { hourUnit: 'H', minuteUnit: 'M', secondUnit: 'S' })).toBe('1H 2M 40S')
})

const query = 'category=book&tag%5B0%5D=History%20Fiction&tag%5B1%5D=Classic&page=1&limit=10'
const params = {
  category: 'book',
  tag: ['History Fiction', 'Classic'],
  page: '1',
  limit: '10'
}

test('urlParams', () => {
  expect(toURLParams(query)).toStrictEqual(params)
})

test('urlParams', () => {
  expect(toURLQuery(params)).toBe(query)
  expect(toURLQuery(params, 'https://a.me?v=1')).toBe(`https://a.me?v=1&${query}`)
  expect(toURLQuery(params, 'https://a.me')).toBe(`https://a.me?${query}`)
})
