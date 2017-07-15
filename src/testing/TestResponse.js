export default class TestResponse {

  static success(payload) {
    return { status: 200, payload }
  }

  static unauthorized(payload) {
    return { status: 401, payload }
  }

  static forbidden(payload) {
    return { status: 403, payload }
  }

  static fileNotFound(payload) {
    return { status: 404, payload }
  }

  static internalServerError(payload) {
    return { status: 500, payload }
  }

  static serviceUnavailable(payload) {
    return { status: 503, payload }
  }

  static gatewayTimeout(payload) {
    return { status: 504, payload }
  }

}
