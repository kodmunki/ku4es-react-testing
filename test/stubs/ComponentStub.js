import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class ComponentStub extends Component {

  constructor(props) {
    super(props);
    const { value = '', onClick = () => { }, onKeyDown = () => { }, onSubmit = () => { } } = this.props;
    this.state = { value, onClick, onKeyDown, onSubmit };
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

  componentDidCatch(error, info) {
    console.error(error, info); // eslint-disable-line no-console
    throw error;
  }

  render() {
    const { value, onClick, onKeyDown, onSubmit } = this.state;
    return(
      <div>
        <form onSubmit={onSubmit}>
          <input type="test" className="input" onChange={(e) => { this._onChange(e); }} onKeyDown={onKeyDown} value={value} />
          <button className="button" onClick={onClick}>press</button>
        </form>
      </div>
    );
  }

}
