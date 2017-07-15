import assert from 'assert';
import { describe, it } from 'mocha';
import TestDispatcher from '../../src/testing/TestDispatcher';

describe('TestDispatcher Test', () => {

  it('should register and unregister', () => {
    let value = false;
    const observer = () => { value = !value; }
    const dispatcher = new TestDispatcher();
    assert.ok(!value);
    dispatcher.dispatch();
    assert.ok(!value);
    dispatcher.register(observer);
    dispatcher.dispatch();
    assert.ok(value);
  });

});
