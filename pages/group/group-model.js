
import { Base } from '../../utils/base.js';
class Group extends Base {
  constructor() {
    super();
  }
  /*
   首页列表
  */
  getlist(param,callback) {
    var info = param
    var param = {
      url: 'castingpinhome/home',
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