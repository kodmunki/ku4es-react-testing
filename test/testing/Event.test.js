import assert from 'assert';
import { describe, it } from 'mocha';
import Event from '../../src/testing/Event';

describe('Event Test', () => {

  it('new', () => {
    const target = { target: 'target' };
    const event = new Event(target);
    assert.deepEqual(event.target, target);
  });

});
