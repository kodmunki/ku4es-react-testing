import assert from 'assert';
import { describe, it } from 'mocha';
import Dispatcher from '../../src/testing/Dispatcher';

describe('Dispatcher Test', () => {

  it('should register and unregister', () => {
    let value = false;
    const observer = () => { value = !value; };
    const dispatcher = new Dispatcher();
    assert.ok(!value);
    dispatcher.dispatch();
    assert.ok(!value);
    dispatcher.register(observer);
    dispatcher.dispatch();
    assert.ok(value);
  });

});
