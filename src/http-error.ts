import { HttpStatus } from './http-status'

export interface HttpErrorResponse {
  type: string
  message: string
  code?: string
  errors?: any[]
}

export class HttpError extends Error {
  constructor(
    private readonly response: HttpErrorResponse,
    private readonly status: number
  ) {
    super()

    this.name = 'HttpError'
    this.message = response?.message ?? this.constructor.name.match(/[A-Z][a-z]+|[0-9]+/g)?.join(' ')
  }

  public getResponse(): HttpErrorResponse {
    return this.response
  }

  public getStatus(): number {
    return this.status
  }

  static createBody(type: string, message: string, code?: string, errors?: any[]): HttpErrorResponse {
    return {
      type,
      message,
      code,
      errors
    }
  }
}

export class BadGatewayError extends HttpError {
  constructor(message = 'Bad gateway', code?: string, errors?: any[], type = 'bad_gateway_error') {
    super(HttpError.createBody(type, message, code, errors), HttpStatus.BAD_GATEWAY)
  }
}

export class BadRequestError extends HttpError {
  constructor(message = 'Bad request', code?: string, errors?: any[], type = 'bad_request_error') {
    super(HttpError.createBody(type, message, code, errors), HttpStatus.BAD_REQUEST)
  }
}

export class ConflictError extends HttpError {
  constructor(message = 'Conflict', code?: string, errors?: any[], type = 'conflict_error') {
    super(HttpError.createBody(type, message, code, errors), HttpStatus.CONFLICT)
  }
}

export class ForbiddenError extends HttpError {
  constructor(message = 'Forbidden', code?: string, errors?: any[], type = 'forbidden_error') {
    super(HttpError.createBody(type, message, code, errors), HttpStatus.FORBIDDEN)
  }
}

export class GatewayTimeoutError extends HttpError {
  constructor(message = 'Gateway timeout', code?: string, errors?: any[], type = 'gateway_timeout_error') {
    super(HttpError.createBody(type, message, code, errors), HttpStatus.GATEWAY_TIMEOUT)
  }
}

export class GoneError extends HttpError {
  constructor(message = 'Gone', code?: string, errors?: any[], type = 'gone_error') {
    super(HttpError.createBody(type, message, code, errors), HttpStatus.GONE)
  }
}

export class HttpVersionNotSupportedError extends HttpError {
  constructor(
    message = 'HTTP version not supported',
    code?: string,
    errors?: any[],
    type = 'http_version_not_supported_error'
  ) {
    super(HttpError.createBody(type, message, code, errors), HttpStatus.HTTP_VERSION_NOT_SUPPORTED)
  }
}

export class ImATeapotError extends HttpError {
  constructor(message = "I'm a teapot", code?: string, errors?: any[], type = 'i_am_a_teapot_error') {
    super(HttpError.createBody(type, message, code, errors), HttpStatus.I_AM_A_TEAPOT)
  }
}

export class InternalServerErrorError extends HttpError {
  constructor(message = 'Internal server error', code?: string, errors?: any[], type = 'internal_server_error_error') {
    super(HttpError.createBody(type, message, code, errors), HttpStatus.INTERNAL_SERVER_ERROR)
  }
}

export class MethodNotAllowedError extends HttpError {
  constructor(message = 'Method not allowed', code?: string, errors?: any[], type = 'method_not_allowed_error') {
    super(HttpError.createBody(type, message, code, errors), HttpStatus.METHOD_NOT_ALLOWED)
  }
}

export class MisdirectedError extends HttpError {
  constructor(message = 'Misdirected', code?: string, errors?: any[], type = 'misdirected_error') {
    super(HttpError.createBody(type, message, code, errors), HttpStatus.MISDIRECTED)
  }
}

export class NotAcceptableError extends HttpError {
  constructor(message = 'Not acceptable', code?: string, errors?: any[], type = 'not_acceptable_error') {
    super(HttpError.createBody(type, message, code, errors), HttpStatus.NOT_ACCEPTABLE)
  }
}

export class NotFoundError extends HttpError {
  constructor(message = 'Not found', code?: string, errors?: any[], type = 'not_found_error') {
    super(HttpError.createBody(type, message, code, errors), HttpStatus.NOT_FOUND)
  }
}

export class NotImplementedError extends HttpError {
  constructor(message = 'Not implemented', code?: string, errors?: any[], type = 'not_implemented_error') {
    super(HttpError.createBody(type, message, code, errors), HttpStatus.NOT_IMPLEMENTED)
  }
}

export class PayloadTooLargeError extends HttpError {
  constructor(message = 'Payload too large', code?: string, errors?: any[], type = 'payload_too_large_error') {
    super(HttpError.createBody(type, message, code, errors), HttpStatus.PAYLOAD_TOO_LARGE)
  }
}

export class PreconditionFailedError extends HttpError {
  constructor(message = 'Precondition failed', code?: string, errors?: any[], type = 'precondition_failed_error') {
    super(HttpError.createBody(type, message, code, errors), HttpStatus.PRECONDITION_FAILED)
  }
}

export class RequestTimeoutError extends HttpError {
  constructor(message = 'Request timeout', code?: string, errors?: any[], type = 'request_timeout_error') {
    super(HttpError.createBody(type, message, code, errors), HttpStatus.REQUEST_TIMEOUT)
  }
}

export class ServiceUnavailableError extends HttpError {
  constructor(message = 'Service unavailable', code?: string, errors?: any[], type = 'service_unavailable_error') {
    super(HttpError.createBody(type, message, code, errors), HttpStatus.SERVICE_UNAVAILABLE)
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message = 'Unauthorized', code?: string, errors?: any[], type = 'unauthorized_error') {
    super(HttpError.createBody(type, message, code, errors), HttpStatus.UNAUTHORIZED)
  }
}

export class UnprocessableEntityError extends HttpError {
  constructor(message = 'Unprocessable entity', code?: string, errors?: any[], type = 'unprocessable_entity_error') {
    super(HttpError.createBody(type, message, code, errors), HttpStatus.UNPROCESSABLE_ENTITY)
  }
}

export class UnsupportedMediaTypeError extends HttpError {
  constructor(
    message = 'Unsupported media type',
    code?: string,
    errors?: any[],
    type = 'unsupported_media_type_error'
  ) {
    super(HttpError.createBody(type, message, code, errors), HttpStatus.UNSUPPORTED_MEDIA_TYPE)
  }
}
