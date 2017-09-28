import React from 'react';
import assert from 'assert';
import { describe, it } from 'mocha';
import { loadDom, unloadDom, renderComponent } from '../../src/testing/index';
import Context from '../../src/testing/Context';
import ErrorComponent from '../../src/testing/ErrorComponent';

describe('Context Test', () => {

  beforeEach(() => loadDom());
  afterEach(() => unloadDom());
  it('throws', () => {
    assert.throws(() => {
      renderComponent(
        <Context>
          <ErrorComponent />
        </Context>
      );
    });
  });
  it('should update props', () => {
    const $ = renderComponent(<Context/>);
    $.component.state = null;
    $.component.updateChildProps({'new': 'props'});
    assert.deepEqual($.component.state, {'new': 'props'});
    $.component.destroy();
  });

  it('should rerender', () => {
    const $ = renderComponent(<Context/>);
    //TODO: This is currently a bs coverage call. Need to implement a stub for a test
    $.component.rerender();
  });

  it('should destroy', () => {
    const $ = renderComponent(<Context/>);
    assert.ok(context);
    $.component.destroy();
  });

});
