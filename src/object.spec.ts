import { deepClone, deepMerge, pickObject, excludeObject } from './'
import { expect, test } from 'vitest'

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

test('cannot merge null', () => {
  expect(deepMerge(obj, null as any)).toBe(undefined)
  expect(deepMerge('1', false as any)).toBe(undefined)
})

test('cannot merge array', () => {
  expect(deepMerge(obj, [] as any)).toBe(undefined)
})

test('deep merge', () => {
  const merged = deepMerge(obj, { number: 100, object: { y: 'y2' } } as any)!

  expect(merged !== obj).toBe(true)
  expect(merged.array !== obj.array).toBe(true)
  expect(merged.object !== obj.object).toBe(true)
  expect(merged.number).toBe(100)
  expect(merged.array).toStrictEqual([2, 3])
  expect(merged.object).toStrictEqual({
    x: 'x',
    y: 'y2',
    z: {
      p: true
    }
  })
})

test('cannot clone null', () => {
  expect(deepClone(null as unknown as Object)).toBe(null)
})

test('cannot clone undefined', () => {
  expect(deepClone(undefined as unknown as Object)).toBe(undefined)
})

test('deep clone', () => {
  const cloned = deepClone(obj)
  const target = JSON.parse(JSON.stringify(obj))

  expect(cloned === obj).toBe(false)
  expect(cloned.array === obj.array).toBe(false)
  expect(cloned.object === obj.object).toBe(false)
  expect(cloned).toStrictEqual(target)
})

test('deep clone objects with circular references', function () {
  // @ts-ignore
  globalThis.structuredClone = null

  const obj2: any = {
    foo: { b: { c: { d: {} } } },
    bar: {},
    zoo: undefined
  }

  obj2.foo.b.c.d = obj2
  obj2.bar.b = obj2.foo.b
  obj2.zoo = obj2.foo.b

  const cloned = deepClone(obj2)

  expect(cloned.bar.b === cloned.foo.b).toBe(false)
  expect(cloned.bar.b).toStrictEqual(cloned.foo.b)
  expect(obj2.zoo === obj2.foo.b).toBe(true)
  expect(cloned === cloned.foo.b.c.d).toBe(true)
  expect(cloned !== obj2).toBe(true)
})

test('cannot pick object null', () => {
  expect(pickObject(null as any, ['x'])).toBe(undefined)
})

test('cannot pick object undefined', () => {
  expect(pickObject(undefined as any, ['x'])).toBe(undefined)
})

test('cannot pick object array', () => {
  expect(pickObject([] as any, ['x'])).toBe(undefined)
})

test('pick object', () => {
  const picked = pickObject<any>(obj, ['array', ['object', 'alias'], ['object.z.p', 'boolean'], 'nil'])

  expect(picked === obj).toBe(false)
  expect(picked.number).toBe(undefined)
  expect(picked.array === obj.array).toBe(true)
  expect(picked.alias === obj.object).toBe(true)
  expect(picked.boolean).toBe(true)
  expect(picked.nil).toBe(null)
})

test('dont pick nil value from a object', () => {
  const picked = pickObject<any>(obj, ['nil'], {
    ignoreNil: true
  })

  expect(picked.nil).toBe(undefined)
})

test('pick width deep clone', () => {
  const picked = pickObject<any>(obj, ['array', 'object'], {
    deepClone: true
  })

  expect(picked.array === obj.array).toBe(false)
  expect(picked.object === obj.object).toBe(false)
  expect(picked.array).toStrictEqual(obj.array)
  expect(picked.object).toStrictEqual(obj.object)
})

test('cannot exclude object null', () => {
  expect(excludeObject(null as any, ['x'])).toBe(undefined)
})

test('cannot exclude object undefined', () => {
  expect(excludeObject(undefined as any, ['x'])).toBe(undefined)
})

test('cannot exclude object array', () => {
  expect(excludeObject([] as any, ['x'])).toBe(undefined)
})

test('exclude object', () => {
  const excluded = excludeObject<any>(obj, ['array', 'object'])

  expect(excluded === obj).toBe(false)
  expect(excluded.number).toBe(1)
  expect(excluded.array).toBe(undefined)
  expect(excluded.object).toBe(undefined)
  expect(excluded.nil).toBe(null)
})

test('exclude nil value from a object', () => {
  const excluded = excludeObject<any>(obj, ['array', 'object'], {
    ignoreNil: true
  })

  expect(excluded.nil).toBe(undefined)
})

test('exclude width deep clone', () => {
  const excluded = excludeObject<any>(obj, ['number'], {
    deepClone: true
  })

  expect(excluded.array === obj.array).toBe(false)
  expect(excluded.object === obj.object).toBe(false)
  expect(excluded.array).toStrictEqual(obj.array)
  expect(excluded.object).toStrictEqual(obj.object)
  expect(excluded.number).toBe(undefined)
})
