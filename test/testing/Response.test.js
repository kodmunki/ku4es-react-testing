import assert from 'assert';
import { describe, it } from 'mocha';
import Response from '../../src/testing/Response';

describe('Response Test', () => {

  it('should be success', () => {
    const response = { value: 'value' };
    const value = Response.success(response);

    assert.equal(value.status, 200);
    assert.deepEqual(value.response, response);
  });

  it('should be unauthorized', () => {
    const response = { value: 'value' };
    const value = Response.unauthorized(response);

    assert.equal(value.status, 401);
    assert.deepEqual(value.response, response);
  });

  it('should be forbidden', () => {
    const response = { value: 'value' };
    const value = Response.forbidden(response);

    assert.equal(value.status, 403);
    assert.deepEqual(value.response, response);
  });

  it('should be fileNotFound', () => {
    const response = { value: 'value' };
    const value = Response.fileNotFound(response);

    assert.equal(value.status, 404);
    assert.deepEqual(value.response, response);
  });

  it('should be internalServerError', () => {
    const response = { value: 'value' };
    const value = Response.internalServerError(response);

    assert.equal(value.status, 500);
    assert.deepEqual(value.response, response);
  });

  it('should be serviceUnavailable', () => {
    const response = { value: 'value' };
    const value = Response.serviceUnavailable(response);

    assert.equal(value.status, 503);
    assert.deepEqual(value.response, response);
  });

  it('should be gatewayTimeout', () => {
    const response = { value: 'value' };
    const value = Response.gatewayTimeout(response);

    assert.equal(value.status, 504);
    assert.deepEqual(value.response, response);
  });

});
