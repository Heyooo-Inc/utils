import { toSeconds, formatSeconds, toMilliseconds, timestamp } from '../src/date'

describe('date', () => {
  test('parse seconds', () => {
    expect(toSeconds(null as any)).toBe(undefined)
    expect(toSeconds('5s')).toBe(5)
    expect(toSeconds('5sec')).toBe(5)
    expect(toSeconds('5secs')).toBe(5)
    expect(toSeconds('5second')).toBe(5)
    expect(toSeconds('5seconds')).toBe(5)

    expect(toSeconds('5m')).toBe(5 * 60)
    expect(toSeconds('5min')).toBe(5 * 60)
    expect(toSeconds('5mins')).toBe(5 * 60)
    expect(toSeconds('5minute')).toBe(5 * 60)
    expect(toSeconds('5minutes')).toBe(5 * 60)

    expect(toSeconds('5h')).toBe(5 * 60 * 60)
    expect(toSeconds('5hr')).toBe(5 * 60 * 60)
    expect(toSeconds('5hrs')).toBe(5 * 60 * 60)
    expect(toSeconds('5hour')).toBe(5 * 60 * 60)
    expect(toSeconds('5hours')).toBe(5 * 60 * 60)

    expect(toSeconds('1d')).toBe(86_400)
    expect(toSeconds('1day')).toBe(86_400)
    expect(toSeconds('1days')).toBe(86_400)

    expect(toSeconds('5w')).toBe(5 * 7 * 86_400)
    expect(toSeconds('5week')).toBe(5 * 7 * 86_400)
    expect(toSeconds('5weeks')).toBe(5 * 7 * 86_400)

    expect(toSeconds('5y')).toBe(5 * 365 * 86_400)
    expect(toSeconds('5yr')).toBe(5 * 365 * 86_400)
    expect(toSeconds('5yrs')).toBe(5 * 365 * 86_400)
    expect(toSeconds('5year')).toBe(5 * 365 * 86_400)
    expect(toSeconds('5years')).toBe(5 * 365 * 86_400)

    expect(toSeconds('y5')).toBe(undefined)
    expect(toSeconds('5-d')).toBe(undefined)
    expect(toSeconds('5dy')).toBe(undefined)
    expect(toSeconds('m5d')).toBe(undefined)
    expect(toSeconds('5_000s')).toBe(undefined)
  })

  test('format seconds', () => {
    expect(formatSeconds(null as any)).toBe(undefined)
    expect(formatSeconds(5)).toBe('5 seconds')
    expect(formatSeconds(5 * 60)).toBe('5 minutes')
    expect(formatSeconds(5 * 60 * 60)).toBe('5 hours')
    expect(formatSeconds(86_400)).toBe('1 day')
    expect(formatSeconds(3 * 86_400)).toBe('3 days')
  })

  test('milliseconds', () => {
    expect(toMilliseconds('5s')).toBe(5_000)
  })

  test('timestamp', () => {
    const now = Math.floor(Date.now() / 1e3)
    expect(Math.abs(now - timestamp()) < 1).toBe(true)
  })
})
