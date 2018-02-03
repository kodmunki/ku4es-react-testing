import React from 'react';
import assert from 'assert';
import { describe, it } from 'mocha';
import {
  loadDom,
  loadSafeDom,
  unloadDom,
  renderComponent,
  load,
  click,
  change,
  keyDown,
  submit,
  write
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

  it('should load', (done) => {
    loadDom();
    const onLoad = () => {
      assert.ok(true);
      done();
    };
    const $ = renderComponent(<Component onLoad={onLoad}/>);
    load($('iframe'));
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

});
