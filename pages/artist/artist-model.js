import { Base } from '../../utils/base.js';

class Artist extends Base {
  constructor() {
    super();
  }

 /*
 首页列表
 */
  getlist(style,callback) {
   
    var param = {
      url: 'castingpinactor/list',
      type: 'POST',
      data: { 'style': style},
      sCallback: function (data) {
        //  后台  data
        callback && callback(data);
      }
    };
    this.request(param);
 }

}
export { Artist };