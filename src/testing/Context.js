import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class Context extends React.Component {

  constructor(props) {
    super(props);
    this.state = props;
  }

  /**
   * This method exposes a mechanism for dependent tests
   * to obtain test coverage for those cases where coverage
   * is needed for the case where a component's props are
   * updated during its lifecycle.
   *
   * @param value - Object literal of new props
   */
  updateProps(value) {
    this.setState(value);
  }

  /**
   * This method exposes a means to force a rerendering
   * of a this context.
   */
  rerender() {
    this.forceUpdate();
  }

  destroy() {
    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this).parentNode);
  }

  render() {
    return(
      <div>
        {this.props.children}
      </div>
    );
  }
}

Context.propTypes = {
  children: PropTypes.node
};
