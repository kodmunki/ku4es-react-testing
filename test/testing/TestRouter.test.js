import React from 'react';
import assert from 'assert';
import { describe, it } from 'mocha';
import { loadDom, unloadDom, renderComponent } from '../../src/testing/Test';
import TestRouter from '../../src/testing/TestRouter';
import ViewStub from '../stubs/ViewStub'

describe('TestRouter Test', () => {

  beforeEach(() => loadDom());
  afterEach(() => unloadDom());

  it('new', () => {
    const $ = renderComponent(
      <TestRouter>
        <ViewStub />
      </TestRouter>
    );
    assert.ok($.component);
  });

  it('should setPath', () => {
    const $ = renderComponent(
      <TestRouter>
        <ViewStub />
      </TestRouter>
    );
    $.component.setPath('http://test.domain.com/test/newpath')
    assert.equal(window.location.href, '');
  });

  it('should destroy', () => {
    const $ = renderComponent(
      <TestRouter>
        <ViewStub />
      </TestRouter>
    );
    assert.ok($);
    $.component.destroy();
    assert.ok(!$);
  });

});
