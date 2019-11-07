

import { Base } from '../../utils/base.js';



class Group extends Base {
  constructor() {
    super();
  }
  /*
   首页列表
  */
  getlist(param,callback) {

    var type = param.type
    var start_page = param.start_page
    
    var param = {
      url: 'castingpinhome/home',
      type: 'POST',
      data: {
         'type': type,
         'start_page': start_page
          },
      sCallback: function (data) {
        //  后台  data
        callback && callback(data);
      }
    };
    this.request(param);
  }

  /*
  查看是否填写剧组资料
  */
  getCast(callback) {

    var param = {
      url: 'castingpincast/castms',
      type: 'POST',
      sCallback: function (data) {
        //  后台  data
        callback && callback(data);
      }
    };
    this.request(param);
  }


};
export { Group };