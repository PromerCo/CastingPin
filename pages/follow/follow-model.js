import { Base } from '../../utils/base.js';

class Follow extends Base {
  constructor() {
    super();
  }

  follower(parmes, callback) {
    var param = {
      url: 'castingpinactor/foluser',
      data: { 
        type:   parmes.type,
        status: parmes.status
         },
      type: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  //取消关注
  cancelFoller(parmes, callback) {
    var param = {
      url: 'castingpinactor/follow',
      data: {
        status: parmes.status,
        arranger_id: parmes.arranger_id
      },
      type: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }




}
export { Follow };