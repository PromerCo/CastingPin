import { Base } from '../../utils/base.js';

class Artist extends Base {
  constructor() {
    super();
  }

 /*
 首页列表
 */
  getlist(param,callback) {
    var info = param
    console.log(info.style)
    var param = {
      url: 'castingpinactor/list',
      type: 'POST',
      data: { 
        start_page: info.start_page,
        style: info.style,
        },
      sCallback: function (data) {
        //  后台  data
        callback && callback(data);
      }
    };
    this.request(param);
 }

}
export { Artist };