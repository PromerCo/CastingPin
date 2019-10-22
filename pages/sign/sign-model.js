/**
 * Created by jimmy on 17/2/26.
 */

import { Base } from '../../utils/base.js';

class Sign extends Base {
  constructor() {
    super();
  }

  getlist(callback) {
    var param = {
      url: 'castingpinnotice/lame',
      type: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }


};

export { Sign };