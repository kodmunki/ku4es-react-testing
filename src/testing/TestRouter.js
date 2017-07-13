import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';

/**
 * This stub should be leveraged to test React Routes, and any routing extensions.
 * It can and should be used in the case that you are using a BrowserRouter in your
 * application. This stub router will bootstrap all necessary API and implementation
 * to test the render of a Route and other Route components, e.g. Link.
 */
export default class TestRouter extends MemoryRouter {

  constructor(props, context) {
    super(props, context);
  }

  setPath(path) {
    this.history.push(path);
    return this;
  }

  destroy() {
    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this).parentNode);
  }

}
