import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class TestContext extends React.Component {

  constructor(props) {
    super(props);
    this.state = props;
  }

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

TestContext.propTypes = {
  children: PropTypes.node
};
