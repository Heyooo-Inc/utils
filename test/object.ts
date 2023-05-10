import { cloneDeep, pickObject } from '../src/object'
import { hasOwnProp } from '../src/validate'

const obj = {
  number: 1,
  array: [2, 3],
  object: {
    x: 'x',
    y: 'y',
    z: {
      p: true
    }
  },
  nil: null
}

describe('clone object', () => {
  test('null does not have own prop', () => {
    expect(hasOwnProp(null, 'x')).toBe(false)
  })

  test('cannot clone null', () => {
    expect(cloneDeep(null as unknown as Object)).toBe(null)
  })

  test('cannot clone undefined', () => {
    expect(cloneDeep(undefined as unknown as Object)).toBe(undefined)
  })

  test('deep clone', () => {
    const cloned = cloneDeep(obj)
    const target = JSON.parse(JSON.stringify(obj))

    expect(cloned === obj).toBe(false)
    expect(cloned.array === obj.array).toBe(false)
    expect(cloned.object === obj.object).toBe(false)
    expect(cloned).toStrictEqual(target)
  })
})

describe('pickObject object', () => {
  test('cannot pickObject null', () => {
    expect(pickObject(null as any, ['x'])).toBe(undefined)
  })

  test('cannot pickObject undefined', () => {
    expect(pickObject(undefined as any, ['x'])).toBe(undefined)
  })

  test('cannot pickObject array', () => {
    expect(pickObject([] as any, ['x'])).toBe(undefined)
  })

  test('pickObject object', () => {
    const picked = pickObject<any>(obj, ['array', ['object', 'alias'], 'nil'])

    expect(picked === obj).toBe(false)
    expect(picked.number).toBe(undefined)
    expect(picked.array === obj.array).toBe(true)
    expect(picked.alias === obj.object).toBe(true)
    expect(picked.nil).toBe(null)
  })

  test('dont pickObject nil value', () => {
    const picked = pickObject<any>(obj, ['nil'], {
      ignoreNil: true
    })

    expect(picked.nil).toBe(undefined)
  })

  test('pickObject width deep clone', () => {
    const picked = pickObject<any>(obj, ['array', 'object'], {
      cloneDeep: true
    })

    expect(picked.array === obj.array).toBe(false)
    expect(picked.object === obj.object).toBe(false)
    expect(picked.array).toStrictEqual(obj.array)
    expect(picked.object).toStrictEqual(obj.object)
  })
})
