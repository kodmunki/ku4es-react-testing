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
  sendResponse
} from '../../src/testing';
import Component from '../stubs/ComponentStub';

describe('index Test', () => {

  it('should render component', () => {
    loadDom();
    const $ = renderComponent(<Component/>);
    assert.ok($.component);
    assert.equal($('input').length, 1);
    assert.equal($('button').length, 1);
    $.component.destroy();
    unloadDom();
  });

  it('should render component in safe dom', () => {
    loadSafeDom();
    const $ = renderComponent(<Component/>);
    assert.ok($.component);
    assert.equal($('input').length, 1);
    assert.equal($('button').length, 1);
    $.component.destroy();
    unloadDom();
  });

  it('should change', () => {
    loadDom();
    let value;
    const $ = renderComponent(<Component onChange={() => { value = 'changed'; }}/>);
    change($('input'));
    assert.equal(value, 'changed');
    $.component.destroy();
    unloadDom();
  });

  it('should click', () => {
    loadDom();
    let value;
    const $ = renderComponent(<Component onClick={() => { value = 'click'; }}/>);
    click($('button'));
    assert.equal(value, 'click');
    $.component.destroy();
    unloadDom();
  });

  it('should keyDown with number', () => {
    loadDom();
    let value;
    const $ = renderComponent(<Component onKeyDown={() => { value = 'keyDown'; }}/>);
    keyDown($('input'), 27);
    assert.equal(value, 'keyDown');
    $.component.destroy();
    unloadDom();
  });

  it('should keyDown with keyCode', () => {
    loadDom();
    let value;
    const $ = renderComponent(<Component onKeyDown={() => { value = 'keyDown'; }}/>);
    keyDown($('input'), { keyCode: 27 });
    assert.equal(value, 'keyDown');
    $.component.destroy();
    unloadDom();
  });

  it('should keyDown with which', () => {
    loadDom();
    let value;
    const $ = renderComponent(<Component onKeyDown={() => { value = 'keyDown'; }}/>);
    keyDown($('input'), { which: 27 });
    assert.equal(value, 'keyDown');
    $.component.destroy();
    unloadDom();
  });

  it('should keyDown with code', () => {
    loadDom();
    let value;
    const $ = renderComponent(<Component onKeyDown={() => { value = 'keyDown'; }}/>);
    keyDown($('input'), { code: 27 });
    assert.equal(value, 'keyDown');
    $.component.destroy();
    unloadDom();
  });

  it('should submit', () => {
    loadDom();
    let value;
    const $ = renderComponent(<Component onSubmit={() => { value = 'submit'; }}/>);
    submit($('form'));
    assert.equal(value, 'submit');
    $.component.destroy();
    unloadDom();
  });

  it('should change component', () => {
    loadDom();
    let value;
    const element = <Component className="viewStub" onChange={() => { value = 'change'; }}/>;
    const $ = renderComponent(element);
    change($('input'));
    assert.equal(value, 'change');
    $.component.destroy();
    unloadDom();
  });

  it('should throw', () => {
    loadDom();
    assert.throws(() => {
      const element = <Component />;
      const $ = renderComponent(element);
      change();
      $.component.destroy();
    });
    unloadDom();
  });

  it('should write', () => {
    loadDom();
    const $ = renderComponent(<Component />);
    const $input = $('input');
    assert.equal($input.val(), '');
    write($input, 'write');
    assert.equal($('input').val(), 'write');
    $.component.destroy();
    unloadDom();
  });

  it('should send response', (done) => {
    startServer();
    axios.get('test.domain.com', { actual: 'data' })
      .then((response) => {
        assert.equal(response.status, 200);
        assert.deepEqual(response.data, { test: 'data' });
        done();
      });
    sendResponse({ status: 200, response: { test: 'data' } })
      .then((response) => {
        assert.deepEqual(response.data, { test: 'data' });
        stopServer();
      });
  });

  it('should send multiple responses', (done) => {
    startServer();

    axios.get('test1.domain.com', { actual: 'call1' })
      .then((response) => {
        assert.equal(response.status, 200);
        assert.deepEqual(response.data, { test: 'call1' });
      });

    axios.get('test2.domain.com', { actual: 'call2' })
      .then((response) => {
        assert.equal(response.status, 200);
        assert.deepEqual(response.data, { test: 'call2' });
        stopServer();
        done();
      });

    sendResponse({ status: 200, response: { test: 'call1' } });
    sendResponse({ status: 200, response: { test: 'call2' } });

  });

});
