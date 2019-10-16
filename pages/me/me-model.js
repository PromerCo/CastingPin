import { Base } from '../../utils/base.js';
class Me extends Base {
  constructor() {
    super();
  }

/*
授权
*/
  getUserAhth(param, callback) {
    var object = JSON.parse(param);
    var param = {
      url: 'castingpinuser/authorize',
      data: {
        nick_name: object.nickName,
        avatar_url: object.avatarUrl,
        city: object.city,
        gender: object.gender,
        language: object.language,
        province: object.province,
        country: object.country,
        company: object.company
      },
      type: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }
  
  /*
  角色类型
  */
  roleStatus(callback) {
    var param = {
      url: 'castingpinuser/miexhibit',
      type: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

/*
   切换角色
*/
  cutRole(param,callback){

    var type = param

    console.log(type)
    
    var param = {
      url: 'castingpinuser/cutrole',
      data: { 'type': type },
      type: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

 
};
export { Me };