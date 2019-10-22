
import { Base } from '../../utils/base.js';

class Cast extends Base {
  constructor() {
    super();
  }

  pushSave(param, callback) {

    let info = param
    var param = {
      url: 'castingpincast/push',
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

export { Cast };