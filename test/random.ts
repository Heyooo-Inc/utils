import { random, randomAlpha, randomHexic, randomNumber, randomNumeric } from '../src/random'

describe('random', () => {
  test('number', () => {
    const num = randomNumber(1, 10)
    expect(num >= 1).toBe(true)
    expect(num <= 10).toBe(true)
  })

  test('string', () => {
    expect(/^[0-4c-f]{4}$/i.test(random(4, '01234cdef'))).toBe(true)
  })

  test('hexic', () => {
    expect(/^[0-9a-f]{6}$/i.test(randomHexic(6))).toBe(true)
  })

  test('alpha', () => {
    expect(/^[a-z]{6}$/i.test(randomAlpha(6))).toBe(true)
  })

  test('numeric', () => {
    expect(/^[0-9]{6}$/i.test(randomNumeric(6))).toBe(true)
  })

  test('math random', () => {
    // Disable crypto
    // @ts-ignore
    globalThis.crypto?.getRandomValues = null

    expect(/^[0-9a-z]{6}$/i.test(random())).toBe(true)
  })
})
