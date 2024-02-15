import { toFloat } from './conv'
import { isEmpty, isNumber } from './validate'

const SECOND = 1
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24
const WEEK = DAY * 7
const YEAR = DAY * 365
const REGX = /^(-?(?:\d+)?\.?\d+)(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)$/i

export function timestamp(): number {
  return Math.floor(Date.now() / 1_000)
}

export function toSeconds(timeString: string): number | undefined {
  if (isEmpty(timeString)) {
    return
  }

  const matches = timeString.match(REGX)

  if (!matches) {
    return
  }

  const n = toFloat(matches[1])!
  const type = matches[2].toLowerCase()
  let s

  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      s = n * YEAR
      break

    case 'weeks':
    case 'week':
    case 'w':
      s = n * WEEK
      break

    case 'days':
    case 'day':
    case 'd':
      s = n * DAY
      break

    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      s = n * HOUR
      break

    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      s = n * MINUTE
      break

    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      s = n * SECOND
      break
  }

  if (s) {
    return Math.floor(s)
  }
}

function plural(seconds: number, abs: number, n: number, unit: string): string {
  const isPlural = abs >= n * 1.5
  return `${Math.round(seconds / n)} ${unit}${isPlural ? 's' : ''}`
}

export function formatSeconds(seconds: number): string | undefined {
  if (!isNumber(seconds)) {
    return
  }

  const abs = Math.abs(seconds)

  if (abs >= DAY) {
    return plural(seconds, abs, DAY, 'day')
  }

  if (abs >= HOUR) {
    return plural(seconds, abs, HOUR, 'hour')
  }

  if (abs >= MINUTE) {
    return plural(seconds, abs, MINUTE, 'minute')
  }

  return plural(seconds, abs, SECOND, 'second')
}

export function toMilliseconds(timeString: string): number | undefined {
  const s = toSeconds(timeString)

  if (s) {
    return s * 1_000
  }
}
