import { Base } from '../../utils/base.js';

class School extends Base {
  constructor() {
    super();
  }

  saveData(param, callback) {

    var that = this

    var data = param


    var param = {
      url: 'castingpinactor/savedata',
      data: {
        data: data[0],
      },
      type: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);

  }




}
export { School };