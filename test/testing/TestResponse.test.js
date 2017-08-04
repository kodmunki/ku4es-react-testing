import assert from 'assert';
import { describe, it } from 'mocha';
import TestResponse from '../../src/testing/TestResponse';

describe('TestResponse Test', () => {

  it('should be success', () => {
    const payload = { value: 'value' };
    const response = TestResponse.success(payload);

    assert.equal(response.status, 200);
    assert.deepEqual(response.payload, payload);
  });

  it('should be unauthorized', () => {
    const payload = { value: 'value' };
    const response = TestResponse.unauthorized(payload);

    assert.equal(response.status, 401);
    assert.deepEqual(response.payload, payload);
  });

  it('should be forbidden', () => {
    const payload = { value: 'value' };
    const response = TestResponse.forbidden(payload);

    assert.equal(response.status, 403);
    assert.deepEqual(response.payload, payload);
  });

  it('should be fileNotFound', () => {
    const payload = { value: 'value' };
    const response = TestResponse.fileNotFound(payload);

    assert.equal(response.status, 404);
    assert.deepEqual(response.payload, payload);
  });

  it('should be internalServerError', () => {
    const payload = { value: 'value' };
    const response = TestResponse.internalServerError(payload);

    assert.equal(response.status, 500);
    assert.deepEqual(response.payload, payload);
  });

  it('should be serviceUnavailable', () => {
    const payload = { value: 'value' };
    const response = TestResponse.serviceUnavailable(payload);

    assert.equal(response.status, 503);
    assert.deepEqual(response.payload, payload);
  });

  it('should be gatewayTimeout', () => {
    const payload = { value: 'value' };
    const response = TestResponse.gatewayTimeout(payload);

    assert.equal(response.status, 504);
    assert.deepEqual(response.payload, payload);
  });

});
