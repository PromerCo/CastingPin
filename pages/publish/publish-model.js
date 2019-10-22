
import { Base } from '../../utils/base.js';

class Publish extends Base {
  constructor() {
    super();
  }

  pushSave(param, callback) {

    let info = param
    var param = {
      url: 'castingpinnotice/push',
      type: 'POST',
      data: {
        'data': info,
      },
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

};

export { Publish };