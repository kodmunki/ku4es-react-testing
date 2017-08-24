import React from 'react';
import assert from 'assert';
import { describe, it } from 'mocha';
import { loadDom, unloadDom, renderComponent } from '../../src/testing/index';
import { Route, Switch } from 'react-router-dom';
import Router from '../../src/testing/Router';
import ViewStub from '../stubs/ComponentStub';

describe('Router Test', () => {

  beforeEach(() => loadDom());
  afterEach(() => unloadDom());

  it('new', () => {
    const $ = renderComponent(
      <Router history="">
        <ViewStub />
      </Router>
    );
    assert.ok($.component);
  });

  it('should setPath', () => {
    const one = '/test/path/one';
    const two = '/test/path/two';
    const $ = renderComponent(
      <Router history="">
        <Switch>
          <Route path={one} render={() => <ViewStub value="one"/>} />
          <Route path={two} render={() => <ViewStub value="two"/>} />
        </Switch>
      </Router>
    );

    $.component.setPath(one);
    assert.equal($('input').val(), 'one');
    $.component.destroy();
  });

  it('should destroy', () => {
    const $ = renderComponent(
      <Router history="">
        <Switch>
          <Route path="/a" render={() => <ViewStub value="one"/>} />
          <Route path="/b" render={() => <ViewStub value="two"/>} />
        </Switch>
      </Router>
    );

    $.component.setPath('/a');
    $.component.destroy();
  });

});
