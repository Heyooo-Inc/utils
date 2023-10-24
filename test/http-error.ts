import { BadRequestError, HttpError } from '../src/http-error'

function toJSON(error: HttpError) {
  return JSON.parse(JSON.stringify(error))
}

describe('http-error', () => {
  test('bad request error', () => {
    const badRequestError = toJSON(new BadRequestError())

    expect(badRequestError.status).toBe(400)
    expect(badRequestError.code).toBe('BAD_GATEWAY')
    expect(badRequestError.message).toBe('Bad Gateway')
  })
})
