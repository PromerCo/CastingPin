import { Base } from '../../utils/base.js';

class Basicgro extends Base {
  constructor() {
    super();
  }
  getPhone(param, callback) {
    var that = this
    var object = param
    var iv = object.iv
    var encryptedData = object.encryptedData
    var code = object.code
    var param = {
      url: 'castingpinuser/phone',
      data: {
        iv: encodeURI(iv),
        encryptedData: encodeURIComponent(encryptedData),
        code: code
      },
      type: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

}
export { Basicgro };