import { Base } from '../../utils/base.js';

class Castdetail extends Base {
  constructor() {
    super();
  }

  /*
    详情内容
  */
  list_details(msg, callback) {
    var param = {
      url: 'castingpincast/details',
      type: 'POST',
      data: {
        'cast_id': msg.cast_id,
        'arranger_id': msg.arranger_id
      },
      sCallback: function (data) {
        callback && callback(data);
      }

    }
    this.request(param);
  };

  //关注
  follow(msg, callback) {

    var param = {
      url: 'castingpincast/follow',
      type: 'POST',
      data: {
        'arranger_id': msg.arranger_id,
        'follow_status': msg.follow_status,
      },
      sCallback: function (data) {
        callback && callback(data);
      }
    }
    this.request(param);
  };

}
export { Castdetail };