import React from 'react';
import assert from 'assert';
import { describe, it } from 'mocha';
import { loadDom, unloadDom, renderComponent } from '../../src/testing/Test';
import TestContext from '../../src/testing/TestContext';

describe('TestContext Test', () => {

  beforeEach(() => loadDom());
  afterEach(() => unloadDom());

  it('TestContext Test', () => {
    const context = renderComponent(<TestContext/>);
    assert.ok(context);
  });

});
