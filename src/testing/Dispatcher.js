import Notifier from './Notifier';

export default class Dispatcher extends Notifier {

  dispatch(value) {
    this.$notify(value);
    return this;
  }

}
