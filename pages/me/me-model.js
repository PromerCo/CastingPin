import { Base } from '../../utils/base.js';
class Me extends Base {
  constructor() {
    super();
  }
  getlist(callback) {
    var param = {
      url: 'home/index',
      type: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }
};
export { Me };