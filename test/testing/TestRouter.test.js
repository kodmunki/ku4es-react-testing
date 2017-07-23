import React from 'react';
import assert from 'assert';
import { describe, it } from 'mocha';
import { loadDom, unloadDom, renderComponent } from '../../src/testing/Test';
import { Route, Switch } from 'react-router-dom';
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
    const one = '/test/path/one';
    const two = '/test/path/two';
    const $ = renderComponent(
      <TestRouter>
        <Switch>
          <Route path={one} render={() => <ViewStub value="one"/>} />
          <Route path={two} render={() => <ViewStub value="two"/>} />
        </Switch>
      </TestRouter>
    );

    $.component.setPath(one);
    assert.equal($('input').val(), 'one')
    $.component.destroy();
  });

  it('should destroy', () => {
    const $ = renderComponent(
      <TestRouter>
        <Switch>
          <Route path="/a" render={() => <ViewStub value="one"/>} />
          <Route path="/b" render={() => <ViewStub value="two"/>} />
        </Switch>
      </TestRouter>
    );

    $.component.setPath('/a');
    $.component.destroy();
  });

});
