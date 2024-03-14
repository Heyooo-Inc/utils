import { Store } from './'
import { expect, test } from 'vitest'

const store = Store.localStorage

test('string value', () => {
  store.setItem('key1', 'value1')

  expect(store.getItem('key1')).toBe('value1')
})

test('number value', () => {
  store.setItem('key2', 100)

  expect(store.getItem('key2')).toBe(100)
})

test('boolean value', () => {
  store.setItem('key3', true)

  expect(store.getItem('key3')).toBe(true)
  expect(store.getItem('key10')).toBe(undefined)
})

test('object value', () => {
  store.setItem('key4', { x: 1 })

  expect(store.getItem('key4')).toStrictEqual({ x: 1 })
})

test('array value', () => {
  store.setItem('key5', [1])

  expect(store.getItem('key5')).toStrictEqual([1])
})

test('get keys', () => {
  expect(store.keys()).toStrictEqual(['key1', 'key2', 'key3', 'key4', 'key5'])
})

test('set with undefiend value', () => {
  store.setItem('key6', undefined)

  expect(store.getItem('key6')).toBe(undefined)
})

test('clear keys', () => {
  store.clear()
  expect(store.length).toBe(0)
})

test('session storage', () => {
  Store.sessionStorage.setItem('key1', 'value1')

  expect(Store.sessionStorage.getItem('key1')).toBe('value1')
})
