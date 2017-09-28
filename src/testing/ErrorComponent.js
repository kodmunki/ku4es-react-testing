import { Component } from 'react';

export default class ErrorComponent extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (() => { throw new Error('Error Component Error'); })();
  }

}
