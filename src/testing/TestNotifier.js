export default class TestNotifier {
  constructor() {
    this._subscribers = [];
  }

  register(callback) {
    this._subscribers.push(callback);
    return this;
  }

  $notify(...args) {
    this._subscribers.forEach((callback) => { callback(...args); });
  }
}
