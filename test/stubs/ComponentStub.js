import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class ViewStub extends Component {

  constructor(props) {
    super(props);
    const { value = '', onKeyDown = () => { } } = this.props;
    this.state = { value, onKeyDown }
  }

  _onChange(e) {
    const { onChange = () => { } } = this.props;
    const { value } = e.target;
    this.setState({ value });
    onChange();
  }

  destroy() {
    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this).parentNode);
  }

  render() {
    const { value, onKeyDown } = this.state;
    return(
      <input name="component" className="component" type="test"  onChange={(e) => { this._onChange(e) }} onKeyDown={onKeyDown} value={value} />
    );
  }

}
