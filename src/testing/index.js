import { Assert } from 'ku4es-kernel';
import { startServer, stopServer } from 'ku4es-testing';
import {
  loadDom as loadTestDom,
  loadSafeDom as loadSafeTestDom,
  unloadDom as unloadTestDom
} from 'ku4es-ui-testing';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import cheerio from 'cheerio';
import TestEvent from './Event';

/**
 * Loads a fully functional, unsecure, in-memory headless DOM.
 * Note that you should only load this DOM if you know what
 * you are loading into it, and what your test will be executing.
 * This DOM can load external images and will run script. This
 * does expose the ability for malicious code to potentially
 * access your OS through Node.
 * @function loadDom
 * @global
 * @param {string} [markup] - Optional initialization markup.
 * @param {Object} [config] - JSDom configuration options.
 */
function loadDom(markup, config) {
  startServer();
  loadTestDom(markup, config);
  require('fbjs/lib/ExecutionEnvironment').canUseDOM = true;
}

/**
 * Load a secure in-memory headless DOM. Note that there are no
 * security guarantees with this DOM, though it does not allow for
 * image loading or running scripts, negating these avenues as
 * potential attack vectors for malicious code.
 * @function loadSafeDom
 * @global
 * @param {string} [markup] - Optional initialization markup.
 * @param {Object} [config] - JSDom configuration options.
 */
function loadSafeDom(markup, config) {
  startServer();
  loadSafeTestDom(markup, config);
  require('fbjs/lib/ExecutionEnvironment').canUseDOM = true;
}

/**
 * Unloads a DOM loaded with `loadDom` or `loadSafeDom`
 * @function unloadDom
 * @global
 */
function unloadDom() {
  ReactDOM.unmountComponentAtNode(document.body);
  unloadTestDom();
  stopServer();
}

/**
 * Renders a component into a DOM loaded with `loadDom` or `loadSafeDom`
 * @function renderComponent
 * @global
 * @param {Component} component - A React Component to test, e.g. <ExampleComponent />
 * @returns {function(*=)} - Function that returns a jQuery style selection result augmented
 *  with a local member `component` that returns a pointer to the rendered Component.
 */
function renderComponent(component) {
  const result = (function* (){
    let _component;
    const root = document.createElement('div');
    const data = document.createAttribute('data-root');
    data.value = 'ku4es-react-testing';
    root.setAttributeNode(data);
    document.body.appendChild(root);
    yield ReactDOM.render(component, root, function(){ _component = this; });
    const query = (selector) => {
      const $ = cheerio.load(document.documentElement.outerHTML);
      const result = $(selector);
      result.component = _component;
      return result;
    };
    query.dom = ReactDOM.findDOMNode(_component);
    query.component = _component;
    return query;
  })();
  result.next();
  return result.next().value;
}

function load(selectorResult, event) {
  TestUtils.Simulate.load(findDom(selectorResult), event);
}

function change(selectorResult, event) {
  TestUtils.Simulate.change(findDom(selectorResult), event);
}

function click(selectorResult, event) {
  TestUtils.Simulate.click(findDom(selectorResult), event);
}

function keyDown(selectorResult, event) {
  const { keyCode, which, code } = event;
  const _event = (Assert.isNumber(event)) ? { keyCode: event, which: event }
    : (Assert.exists(keyCode)) ? { keyCode, which: keyCode }
      : (Assert.exists(which)) ? { keyCode: which, which }
        : { keyCode: code, which: code };

  TestUtils.Simulate.keyDown(findDom(selectorResult), _event);
}

function submit(selectorResult, event) {
  TestUtils.Simulate.submit(findDom(selectorResult), event);
}

function write(selectorResult, value) {
  change(selectorResult, new TestEvent({
    name: selectorResult.attr('name'),
    value: value
  }));
}

function findDom(selectorResult) {
  try {
    const className = selectorResult.attr('class');
    return Assert.exists(className)
      ? ReactDOM.findDOMNode(TestUtils.findRenderedDOMComponentWithClass(selectorResult.component, className))
      : ReactDOM.findDOMNode(TestUtils.findRenderedDOMComponentWithTag(selectorResult.component, selectorResult[0].tagName));
  }
  catch(e) {
    throw new Error('Cannot find node for selector. Must use valid class or tag name.');
  }
}

export {
  loadDom,
  loadSafeDom,
  unloadDom,
  renderComponent,
  load,
  write,
  click,
  submit,
  keyDown,
  change
};
