import { Assert } from '@kodmunki/ku4es-kernel';
import {
  loadDom as loadTestDom,
  loadSafeDom as loadSafeTestDom,
  unloadDom as unloadTestDom,
  click as domClick,
  keyUp as domKeyUp
} from '@kodmunki/ku4es-ui-testing';
import { Promise } from 'bluebird';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import moxios from 'moxios';
import cheerio from 'cheerio';
import TestEvent from './Event';

function startServer() {
  moxios.install();
}

function stopServer() {
  moxios.uninstall();
}

function loadDom(markup, config) {
  startServer();
  loadTestDom(markup, config);
  require('fbjs/lib/ExecutionEnvironment').canUseDOM = true;
}

function loadSafeDom(markup, config) {
  startServer();
  loadSafeTestDom(markup, config);
  require('fbjs/lib/ExecutionEnvironment').canUseDOM = true;
}

function unloadDom() {
  ReactDOM.unmountComponentAtNode(document.body);
  unloadTestDom();
  stopServer();
}

/**
 * @param component - A React Component to test, e.g. <ExampleComponent />
 * @returns {function(*=)} - Function that returns a jQuery style selection result augmented
 *  with a pointer to the component for component.destroy() call.
 */
function renderComponent(component) {
  const result = (function *(){
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

function sendResponse(response, index = 0) {
  return new Promise((resolve, reject) => {
    moxios.wait(() => {
      const tracker = moxios.requests;
      const request = tracker.at(index);
      tracker.__items.splice(index, 1);
      request.respondWith(response)
        .then(resolve)
        .catch(reject);
    });
  });
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
  startServer,
  stopServer,
  loadDom,
  loadSafeDom,
  unloadDom,
  renderComponent,
  load,
  write,
  click,
  submit,
  keyDown,
  change,
  domClick,
  domKeyUp,
  sendResponse
};
