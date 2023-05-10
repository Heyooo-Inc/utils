import { toBool, toInteger, toFloat, toJSON } from '../src/conv'

describe('convert', () => {
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
})
