import { BadRequestError, HttpError } from './'
import { expect, test } from 'vitest'

function toJSON(error: HttpError) {
  return JSON.parse(JSON.stringify(error))
}

test('bad request error', () => {
  const badRequestError = toJSON(new BadRequestError())

  expect(badRequestError.status).toBe(400)
  expect(badRequestError.response.code).toBe('BAD_REQUEST')
  expect(badRequestError.message).toBe('Bad request')
})
