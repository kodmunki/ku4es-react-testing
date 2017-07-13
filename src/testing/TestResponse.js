export default class TestResponse {

  constructor(successResponse) {
    this._response = successResponse;
  }

  success() {
    const response = this._response;
    return {
      status: 200,
      response
    }
  }

  unauthorized() {
    return {
      status: 401, response: {

      }
    }
  }

  forbidden() {
    return {
      status: 403, response: {

      }
    }
  }

  fileNotFound() {
    return {
      status: 404, response: {

      }
    }
  }

  internalServerError() {
    return {
      status: 500, response: {

      }
    }
  }

  serviceUnavailable() {
    return {
      status: 503, response: {

      }
    }
  }

  gatewayTimeout() {
    return {
      status: 504, response: {

      }
    }
  }

}
