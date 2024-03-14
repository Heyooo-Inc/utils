import {
  BadGatewayError,
  BadRequestError,
  ConflictError,
  ForbiddenError,
  GatewayTimeoutError,
  GoneError,
  HttpError,
  HttpVersionNotSupportedError,
  ImATeapotError,
  InternalServerErrorError,
  MethodNotAllowedError,
  MisdirectedError,
  NotAcceptableError,
  NotFoundError,
  NotImplementedError,
  PayloadTooLargeError,
  PreconditionFailedError,
  RequestTimeoutError,
  ServiceUnavailableError,
  UnauthorizedError,
  UnprocessableEntityError,
  UnsupportedMediaTypeError
} from './http-error'
import { expect, test } from 'vitest'

function toJSON(error: HttpError) {
  return JSON.parse(JSON.stringify(error))
}

test('http error', () => {
  // @ts-ignore
  const error = toJSON(new HttpError())

  expect(error.message).toBe('Http Error')
})

test('bad request error', () => {
  const error = new BadRequestError()
  const json = toJSON(error)

  expect(error.name).toBe('HttpError')
  expect(error.getStatus()).toBe(400)
  expect(error.getResponse().type).toBe('bad_request_error')
  expect(json.message).toBe('Bad request')
})

test('bad gateway error with default message', () => {
  const json = toJSON(new BadGatewayError())

  expect(json.status).toBe(502)
  expect(json.response.type).toBe('bad_gateway_error')
  expect(json.message).toBe('Bad gateway')
})

test('bad gateway error with custom message', () => {
  const json = toJSON(new BadGatewayError('Custom message'))

  expect(json.status).toBe(502)
  expect(json.response.type).toBe('bad_gateway_error')
  expect(json.message).toBe('Custom message')
})

test('bad gateway error with custom code', () => {
  const json = toJSON(new BadGatewayError('Custom message', 'custom_code'))

  expect(json.status).toBe(502)
  expect(json.response.type).toBe('bad_gateway_error')
  expect(json.message).toBe('Custom message')
  expect(json.response.code).toBe('custom_code')
})

test('bad gateway error with custom errors', () => {
  const errors = [{ field: 'name', message: 'is required' }]
  const json = toJSON(new BadGatewayError('Custom message', 'custom_code', errors))

  expect(json.status).toBe(502)
  expect(json.response.type).toBe('bad_gateway_error')
  expect(json.message).toBe('Custom message')
  expect(json.response.code).toBe('custom_code')
  expect(json.response.errors).toEqual(errors)
})

test('conflict error', () => {
  const json = toJSON(new ConflictError())

  expect(json.status).toBe(409)
  expect(json.response.type).toBe('conflict_error')
  expect(json.message).toBe('Conflict')
})

test('forbidden error', () => {
  const json = toJSON(new ForbiddenError())

  expect(json.status).toBe(403)
  expect(json.response.type).toBe('forbidden_error')
  expect(json.message).toBe('Forbidden')
})

test('gateway timeout error', () => {
  const json = toJSON(new GatewayTimeoutError())

  expect(json.status).toBe(504)
  expect(json.response.type).toBe('gateway_timeout_error')
  expect(json.message).toBe('Gateway timeout')
})

test('gone error', () => {
  const json = toJSON(new GoneError())

  expect(json.status).toBe(410)
  expect(json.response.type).toBe('gone_error')
  expect(json.message).toBe('Gone')
})

test('http version not supported error', () => {
  const json = toJSON(new HttpVersionNotSupportedError())

  expect(json.status).toBe(505)
  expect(json.response.type).toBe('http_version_not_supported_error')
  expect(json.message).toBe('HTTP version not supported')
})

test('im a teapot error', () => {
  const json = toJSON(new ImATeapotError())

  expect(json.status).toBe(418)
  expect(json.response.type).toBe('i_am_a_teapot_error')
  expect(json.message).toBe("I'm a teapot")
})

test('internal server error', () => {
  const json = toJSON(new InternalServerErrorError())

  expect(json.status).toBe(500)
  expect(json.response.type).toBe('internal_server_error_error')
  expect(json.message).toBe('Internal server error')
})

test('method not allowed error', () => {
  const json = toJSON(new MethodNotAllowedError())

  expect(json.status).toBe(405)
  expect(json.response.type).toBe('method_not_allowed_error')
  expect(json.message).toBe('Method not allowed')
})

test('unauthorized error', () => {
  const json = toJSON(new UnauthorizedError())

  expect(json.status).toBe(401)
  expect(json.response.type).toBe('unauthorized_error')
  expect(json.message).toBe('Unauthorized')
})

test('misdirected error', () => {
  const json = toJSON(new MisdirectedError())

  expect(json.status).toBe(421)
  expect(json.response.type).toBe('misdirected_error')
  expect(json.message).toBe('Misdirected')
})

test('not acceptable error', () => {
  const json = toJSON(new NotAcceptableError())

  expect(json.status).toBe(406)
  expect(json.response.type).toBe('not_acceptable_error')
  expect(json.message).toBe('Not acceptable')
})

test('not found error', () => {
  const json = toJSON(new NotFoundError())

  expect(json.status).toBe(404)
  expect(json.response.type).toBe('not_found_error')
  expect(json.message).toBe('Not found')
})

test('not implemented error', () => {
  const json = toJSON(new NotImplementedError())

  expect(json.status).toBe(501)
  expect(json.response.type).toBe('not_implemented_error')
  expect(json.message).toBe('Not implemented')
})

test('payload too large error', () => {
  const json = toJSON(new PayloadTooLargeError())

  expect(json.status).toBe(413)
  expect(json.response.type).toBe('payload_too_large_error')
  expect(json.message).toBe('Payload too large')
})

test('precondition failed error', () => {
  const json = toJSON(new PreconditionFailedError())

  expect(json.status).toBe(412)
  expect(json.response.type).toBe('precondition_failed_error')
  expect(json.message).toBe('Precondition failed')
})

test('request timeout error', () => {
  const json = toJSON(new RequestTimeoutError())

  expect(json.status).toBe(408)
  expect(json.response.type).toBe('request_timeout_error')
  expect(json.message).toBe('Request timeout')
})

test('service unavailable error', () => {
  const json = toJSON(new ServiceUnavailableError())

  expect(json.status).toBe(503)
  expect(json.response.type).toBe('service_unavailable_error')
  expect(json.message).toBe('Service unavailable')
})

test('unauthorized error', () => {
  const json = toJSON(new UnauthorizedError())

  expect(json.status).toBe(401)
  expect(json.response.type).toBe('unauthorized_error')
  expect(json.message).toBe('Unauthorized')
})

test('unprocessable entity error', () => {
  const json = toJSON(new UnprocessableEntityError())

  expect(json.status).toBe(422)
  expect(json.response.type).toBe('unprocessable_entity_error')
  expect(json.message).toBe('Unprocessable entity')
})

test('unsupported media type error', () => {
  const json = toJSON(new UnsupportedMediaTypeError())

  expect(json.status).toBe(415)
  expect(json.response.type).toBe('unsupported_media_type_error')
  expect(json.message).toBe('Unsupported media type')
})

test('misdirected error with default message', () => {
  const json = toJSON(new MisdirectedError())

  expect(json.status).toBe(421)
  expect(json.response.type).toBe('misdirected_error')
  expect(json.message).toBe('Misdirected')
})

test('misdirected error with custom message', () => {
  const json = toJSON(new MisdirectedError('Custom message'))

  expect(json.status).toBe(421)
  expect(json.response.type).toBe('misdirected_error')
  expect(json.message).toBe('Custom message')
})

test('misdirected error with custom code', () => {
  const json = toJSON(new MisdirectedError('Custom message', 'custom_code'))

  expect(json.status).toBe(421)
  expect(json.response.type).toBe('misdirected_error')
  expect(json.message).toBe('Custom message')
  expect(json.response.code).toBe('custom_code')
})

test('misdirected error with custom errors', () => {
  const errors = [{ field: 'name', message: 'is required' }]
  const json = toJSON(new MisdirectedError('Custom message', 'custom_code', errors))

  expect(json.status).toBe(421)
  expect(json.response.type).toBe('misdirected_error')
  expect(json.message).toBe('Custom message')
  expect(json.response.code).toBe('custom_code')
  expect(json.response.errors).toEqual(errors)
})