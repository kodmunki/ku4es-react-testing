import TestNotifier from './TestNotifier';

export default class TestDispatcher extends TestNotifier {

  dispatch(value) {
    this.$notify(value);
    return this;
  }

}
