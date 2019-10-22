import { Base } from '../../utils/base.js';

class Unit extends Base {
  constructor() {
    super();
  }
  getlist(callback) {
    var param = {
      url: 'castingpincast/cast',
      type: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }
}
export { Unit };