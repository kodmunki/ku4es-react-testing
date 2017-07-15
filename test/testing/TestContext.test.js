import React from 'react';
import assert from 'assert';
import { describe, it } from 'mocha';
import { loadDom, unloadDom, renderComponent } from '../../src/testing/Test';
import TestContext from '../../src/testing/TestContext';

describe('TestContext Test', () => {

  beforeEach(() => loadDom());
  afterEach(() => unloadDom());

  it('should rerender', () => {
    const $ = renderComponent(<TestContext/>);
    //TODO: This is currently a bs coverage call. Need to implement a stub for a test
    $.component.rerender();
  });

  it('should destroy', () => {
    const $ = renderComponent(<TestContext/>);
    assert.ok(context);
    $.component.destroy();
  });

});
