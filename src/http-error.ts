import { HttpStatus } from './http-status'
import { isObject, isString } from './validate'

export class HttpError extends Error {
  constructor(private readonly response: string | Record<string, any>, private readonly status: number) {
    super()
    this.init()
  }

  private init() {
    this.name = 'HttpError'

    if (isString(this.response)) {
      this.message = this.response as string
    } else if (isObject(this.response) && isString((this.response as Record<string, any>).message)) {
      this.message = (this.response as Record<string, any>).message
    } else if (this.constructor) {
      this.message = this.constructor.name.match(/[A-Z][a-z]+|[0-9]+/g)?.join(' ') ?? 'Error'
    }
  }

  public getResponse(): string | Record<string, any> {
    return this.response
  }

  public getStatus(): number {
    return this.status
  }

  static createBody(code: string, message: string, errors?: any[]) {
    return {
      code,
      message,
      errors
    }
  }
}

export class BadGatewayError extends HttpError {
  constructor(message = 'Bad gateway', errors?: any[], code = 'BAD_GATEWAY') {
    super(HttpError.createBody(code, message, errors), HttpStatus.BAD_GATEWAY)
  }
}

export class BadRequestError extends HttpError {
  constructor(message = 'Bad request', errors?: any[], code = 'BAD_REQUEST') {
    super(HttpError.createBody(code, message, errors), HttpStatus.BAD_REQUEST)
  }
}

export class ConflictError extends HttpError {
  constructor(message = 'Conflict', errors?: any[], code = 'CONFLICT') {
    super(HttpError.createBody(code, message, errors), HttpStatus.CONFLICT)
  }
}

export class ForbiddenError extends HttpError {
  constructor(message = 'Forbidden', errors?: any[], code = 'FORBIDDEN') {
    super(HttpError.createBody(code, message, errors), HttpStatus.FORBIDDEN)
  }
}

export class GatewayTimeoutError extends HttpError {
  constructor(message = 'Gateway timeout', errors?: any[], code = 'GATEWAY_TIMEOUT') {
    super(HttpError.createBody(code, message, errors), HttpStatus.GATEWAY_TIMEOUT)
  }
}

export class GoneError extends HttpError {
  constructor(message = 'Gone', errors?: any[], code = 'GONE') {
    super(HttpError.createBody(code, message, errors), HttpStatus.GONE)
  }
}

export class HttpVersionNotSupportedError extends HttpError {
  constructor(message = 'HTTP version not supported', errors?: any[], code = 'HTTP_VERSION_NOT_SUPPORTED') {
    super(HttpError.createBody(code, message, errors), HttpStatus.HTTP_VERSION_NOT_SUPPORTED)
  }
}

export class ImATeapotError extends HttpError {
  constructor(message = "I'm a teapot", errors?: any[], code = 'I_AM_A_TEAPOT') {
    super(HttpError.createBody(code, message, errors), HttpStatus.I_AM_A_TEAPOT)
  }
}

export class InternalServerErrorError extends HttpError {
  constructor(message = 'Internal server error', errors?: any[], code = 'INTERNAL_SERVER_ERROR') {
    super(HttpError.createBody(code, message, errors), HttpStatus.INTERNAL_SERVER_ERROR)
  }
}

export class MethodNotAllowedError extends HttpError {
  constructor(message = 'Method not allowed', errors?: any[], code = 'METHOD_NOT_ALLOWED') {
    super(HttpError.createBody(code, message, errors), HttpStatus.METHOD_NOT_ALLOWED)
  }
}

export class MisdirectedError extends HttpError {
  constructor(message = 'Misdirected', errors?: any[], code = 'MISDIRECTED') {
    super(HttpError.createBody(code, message, errors), HttpStatus.MISDIRECTED)
  }
}

export class NotAcceptableError extends HttpError {
  constructor(message = 'Not acceptable', errors?: any[], code = 'NOT_ACCEPTABLE') {
    super(HttpError.createBody(code, message, errors), HttpStatus.NOT_ACCEPTABLE)
  }
}

export class NotFoundError extends HttpError {
  constructor(message = 'Not found', errors?: any[], code = 'NOT_FOUND') {
    super(HttpError.createBody(code, message, errors), HttpStatus.NOT_FOUND)
  }
}

export class NotImplementedError extends HttpError {
  constructor(message = 'Not implemented', errors?: any[], code = 'NOT_IMPLEMENTED') {
    super(HttpError.createBody(code, message, errors), HttpStatus.NOT_IMPLEMENTED)
  }
}

export class PayloadTooLargeError extends HttpError {
  constructor(message = 'Payload too large', errors?: any[], code = 'PAYLOAD_TOO_LARGE') {
    super(HttpError.createBody(code, message, errors), HttpStatus.PAYLOAD_TOO_LARGE)
  }
}

export class PreconditionFailedError extends HttpError {
  constructor(message = 'Precondition failed', errors?: any[], code = 'PRECONDITION_FAILED') {
    super(HttpError.createBody(code, message, errors), HttpStatus.PRECONDITION_FAILED)
  }
}

export class RequestTimeoutError extends HttpError {
  constructor(message = 'Request timeout', errors?: any[], code = 'REQUEST_TIMEOUT') {
    super(HttpError.createBody(code, message, errors), HttpStatus.REQUEST_TIMEOUT)
  }
}

export class ServiceUnavailableError extends HttpError {
  constructor(message = 'Service unavailable', errors?: any[], code = 'SERVICE_UNAVAILABLE') {
    super(HttpError.createBody(code, message, errors), HttpStatus.SERVICE_UNAVAILABLE)
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message = 'Unauthorized', errors?: any[], code = 'UNAUTHORIZED') {
    super(HttpError.createBody(code, message, errors), HttpStatus.UNAUTHORIZED)
  }
}

export class UnprocessableEntityError extends HttpError {
  constructor(message = 'Unprocessable entity', errors?: any[], code = 'UNPROCESSABLE_ENTITY') {
    super(HttpError.createBody(code, message, errors), HttpStatus.UNPROCESSABLE_ENTITY)
  }
}

export class UnsupportedMediaTypeError extends HttpError {
  constructor(message = 'Unsupported media type', errors?: any[], code = 'UNSUPPORTED_MEDIA_TYPE') {
    super(HttpError.createBody(code, message, errors), HttpStatus.UNSUPPORTED_MEDIA_TYPE)
  }
}
