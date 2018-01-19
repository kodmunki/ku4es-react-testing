import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class Context extends React.Component {

  /**
   * @constructor Context
   * @param props
   */
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
   * @memberOf Context
   * @protected
   * @instance
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
   * @memberOf Context
   * @public
   * @instance
   * @param value - Object literal of new props
   */
  updateChildProps(value) {
    this.setState(value);
  }

  /**
   * Exposes an expressive means to perform a rerendering
   * of a this Context.
   * @memberOf Context
   * @public
   * @instance
   */
  rerender() {
    this.forceUpdate();
  }

  /**
   * Clean up this component and cover `unmount`
   * @memberOf Context
   * @public
   * @instance
   */
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
