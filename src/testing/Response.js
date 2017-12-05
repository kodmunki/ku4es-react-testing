export default class Response {

  static success(response) {
    return { status: 200, response };
  }

  static unauthorized(response) {
    return { status: 401, response };
  }

  static forbidden(response) {
    return { status: 403, response };
  }

  static fileNotFound(response) {
    return { status: 404, response };
  }

  static internalServerError(response) {
    return { status: 500, response };
  }

  static serviceUnavailable(response) {
    return { status: 503, response };
  }

  static gatewayTimeout(response) {
    return { status: 504, response };
  }

}
