import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class Context extends React.Component {

  constructor(props) {
    super(props);
    this.state = props;
  }

  /**
   * Dependent classes can override this virtual `$render` method
   * to create situations where they can do such things as
   * updateChildProps on the fly to gain test coverage for such a scenario.
   * To gain such coverage one can override this method and return
   * the target component passing to it `this.state`. For example:
   * ```
   * $render() { return <MyComponent { ...this.state }/> }
   *
   * ```
   *
   * @returns {XML}
   */
  $render() {
    return(
      <div>
        {this.props.children}
      </div>
    );
  }

  /**
   * This method exposes a entry point for a pattern that enables
   * dependent tests to obtain test coverage for those cases where
   * system components require testing of prop value updates during
   * the course of their lifecycle. To leverage this pattern
   * successfully the developer will need to extend this `Context`
   * class and override the `$render` method such that it returns
   * their target, prop-updating component after passing
   * `this.state` into the target component. For example:
   * `return(<MyComponent {...this.state}/>)`
   *
   * @param value - Object literal of new props
   */
  updateChildProps(value) {
    this.setState(value);
  }

  /**
   * This method exposes an expressive means to perform a rerendering
   * of a this Context.
   */
  rerender() {
    this.forceUpdate();
  }

  destroy() {
    const node = ReactDOM.findDOMNode(this);
    node && ReactDOM.unmountComponentAtNode(node.parentNode);
  }

  componentDidCatch(error, info) {
    console.error(error, info); // eslint-disable-line no-console
    throw error;
  }

  render() { return this.$render(); }
}

Context.propTypes = {
  children: PropTypes.node
};
