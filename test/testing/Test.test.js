import React from 'react';
import axios from 'axios';
import assert from 'assert';
import { describe, it } from 'mocha';
import {
  startServer,
  stopServer,
  loadDom,
  loadSafeDom,
  unloadDom,
  click,
  change,
  keyDown,
  submit,
  write,
  renderComponent,
  assertWithResponse
} from '../../src/testing/Test';
import ComponentStub from '../stubs/ComponentStub'
import ViewStub from '../stubs/ViewStub'

describe('Test Test', () => {

  it('should render component', () => {
    loadDom();
    const $ = renderComponent(<ViewStub/>);
    assert.ok($.component);
    assert.equal($('input').length, 1);
    assert.equal($('button').length, 1);
    $.component.destroy();
    unloadDom();
  });

  it('should render component in safe dom', () => {
    loadSafeDom();
    const $ = renderComponent(<ViewStub/>);
    assert.ok($.component);
    assert.equal($('input').length, 1);
    assert.equal($('button').length, 1);
    $.component.destroy();
    unloadDom();
  });

  it('should change', () => {
    loadDom();
    let value;
    const $ = renderComponent(<ViewStub onChange={() => { value = 'changed' }}/>);
    change($('input'));
    assert.equal(value, 'changed');
    $.component.destroy();
    unloadDom();
  });

  it('should click', () => {
    loadDom();
    let value;
    const $ = renderComponent(<ViewStub onClick={() => { value = 'click' }}/>);
    click($('button'));
    assert.equal(value, 'click');
    $.component.destroy();
    unloadDom();
  });

  it('should keyDown with number', () => {
    loadDom();
    let value;
    const $ = renderComponent(<ViewStub onKeyDown={() => { value = 'keyDown' }}/>);
    keyDown($('input'), 27);
    assert.equal(value, 'keyDown');
    $.component.destroy();
    unloadDom();
  });

  it('should keyDown with keyCode', () => {
    loadDom();
    let value;
    const $ = renderComponent(<ViewStub onKeyDown={() => { value = 'keyDown' }}/>);
    keyDown($('input'), { keyCode: 27 });
    assert.equal(value, 'keyDown');
    $.component.destroy();
    unloadDom();
  });

  it('should keyDown with which', () => {
    loadDom();
    let value;
    const $ = renderComponent(<ViewStub onKeyDown={() => { value = 'keyDown' }}/>);
    keyDown($('input'), { which: 27 });
    assert.equal(value, 'keyDown');
    $.component.destroy();
    unloadDom();
  });

  it('should keyDown with code', () => {
    loadDom();
    let value;
    const $ = renderComponent(<ViewStub onKeyDown={() => { value = 'keyDown' }}/>);
    keyDown($('input'), { code: 27 });
    assert.equal(value, 'keyDown');
    $.component.destroy();
    unloadDom();
  });

  it('should submit', () => {
    loadDom();
    let value;
    const $ = renderComponent(<ViewStub onSubmit={() => { value = 'submit' }}/>);
    submit($('form'));
    assert.equal(value, 'submit');
    $.component.destroy();
    unloadDom();
  });

  it('should change component', () => {
    loadDom();
    let value;
    const element = <ViewStub className="viewStub" onChange={() => { value = 'change' }}/>;
    const $ = renderComponent(element);
    change($('input'));
    assert.equal(value, 'change');
    $.component.destroy();
    unloadDom();
  });

  it('should throw', () => {
    loadDom();
    assert.throws(() => {
      const element = <ViewStub />;
      const $ = renderComponent(element);
      change();
      $.component.destroy();
    })
    unloadDom();
  });

  it('should write', () => {
    loadDom();
    const $ = renderComponent(<ComponentStub />);
    const $input = $('input');
    assert.equal($input.val(), '');
    write($input, 'write');
    assert.equal($('input').val(), 'write');
    $.component.destroy();
    unloadDom();
  });

  it('should assert with response', (done) => {
    startServer();
    axios.get('test.domain.com', { actual: 'data' })
    assertWithResponse({ status: 200, response: { test: 'data' } }, ({ data }) => {
      assert.equal(data.test, 'data');
      done();
    });
    stopServer();
  });

  it('should catch failed with response', () => {
    startServer();
    axios.get('test.domain.com', { actual: 'data' })
    assertWithResponse({ status: 200, response: { test: 'data' } }, ({ data }) => {
      assert.equal(data.test, '');
    });
    stopServer();
  });

  it('should catch failed with response custom', (done) => {
    startServer();
    axios.get('test.domain.com', { actual: 'data' })
    assertWithResponse({ status: 200, response: { test: 'data' } },
      ({ data }) => { assert.equal(data.test, ''); },
      (e) => {
        assert.ok(e);
        done();
      });
    stopServer();
  });
});
