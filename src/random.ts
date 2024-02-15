import { isFunction } from './validate'

const NUMERIC = '0123456789'
const HEXIC = '0123456789abcdef'
const ALPHA = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const ALPHA_NUMERIC = ALPHA + NUMERIC

function _rand() {
  if (globalThis.crypto && isFunction(globalThis.crypto.getRandomValues)) {
    const buffer = new Uint32Array(1)
    globalThis.crypto.getRandomValues(buffer)

    return buffer[0] / (0xffffffff + 1)
  }

  return Math.random()
}

export function random(len = 6, alphabet = ALPHA_NUMERIC): string {
  let str = ''
  const alphabetLength = alphabet.length

  for (let i = 0; i < len; i++) {
    str += alphabet.charAt(Math.floor(_rand() * alphabetLength))
  }

  return str
}

export function randomHexic(len: number): string {
  return random(len, HEXIC)
}

export function randomAlpha(len: number): string {
  return random(len, ALPHA)
}

export function randomNumeric(len: number): string {
  return random(len, NUMERIC)
}

export function randomNumber(min: number, max: number): number {
  return Math.ceil(_rand() * (max - min) + min)
}
