import assert from 'assert';
import { describe, it } from 'mocha';
import Response from '../../src/testing/Response';

describe('Response Test', () => {

  it('should be success', () => {
    const payload = { value: 'value' };
    const response = Response.success(payload);

    assert.equal(response.status, 200);
    assert.deepEqual(response.payload, payload);
  });

  it('should be unauthorized', () => {
    const payload = { value: 'value' };
    const response = Response.unauthorized(payload);

    assert.equal(response.status, 401);
    assert.deepEqual(response.payload, payload);
  });

  it('should be forbidden', () => {
    const payload = { value: 'value' };
    const response = Response.forbidden(payload);

    assert.equal(response.status, 403);
    assert.deepEqual(response.payload, payload);
  });

  it('should be fileNotFound', () => {
    const payload = { value: 'value' };
    const response = Response.fileNotFound(payload);

    assert.equal(response.status, 404);
    assert.deepEqual(response.payload, payload);
  });

  it('should be internalServerError', () => {
    const payload = { value: 'value' };
    const response = Response.internalServerError(payload);

    assert.equal(response.status, 500);
    assert.deepEqual(response.payload, payload);
  });

  it('should be serviceUnavailable', () => {
    const payload = { value: 'value' };
    const response = Response.serviceUnavailable(payload);

    assert.equal(response.status, 503);
    assert.deepEqual(response.payload, payload);
  });

  it('should be gatewayTimeout', () => {
    const payload = { value: 'value' };
    const response = Response.gatewayTimeout(payload);

    assert.equal(response.status, 504);
    assert.deepEqual(response.payload, payload);
  });

});
