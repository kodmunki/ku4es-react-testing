import assert from 'assert';
import { describe, it } from 'mocha';
import TestEvent from '../../src/testing/TestEvent';

describe('TestEvent Test', () => {

  it('new', () => {
    const target = { target: 'target' };
    const event = new TestEvent(target);
    assert.deepEqual(event.target, target);
  });

});
