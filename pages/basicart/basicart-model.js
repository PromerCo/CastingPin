import { Base } from '../../utils/base.js';

class Basicart extends Base {
  constructor() {
    super();
  }



  getList(callback) {
    var that = this
    var param = {
      url: 'castingpinactor/smeans',
      type: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

/*
*/
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

  saveMsg(param, callback) {
    var that = this

    var param = {
      url: 'castingpinactor/savedata',
      data: {
        email: param['email'],
        wechat: param['wechat'],
        occupation: param['occupation'],
        city: param['city'],
        height: param['height'],
        weight: param['weight'],
        woman:  param['woman'],
        corporation: param['corporation'],
        occupation: param['occupation'],
        birthday: param['birthday'],
        phone: param['phone'],
        speciality: param['speciality']

      },
      type: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  saveData(param, callback) {

    var that = this

    var data = param

    console.log(data)

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
export { Basicart };