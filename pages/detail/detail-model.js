import { Base } from '../../utils/base.js';

class Detail extends Base {
  constructor() {
    super();
  }

  /*
    详情内容
  */
  list_details(notice_id, callback) {
    var param = {
      url: 'castingpinhome/details',
      type: 'POST',
      data: {
        'notice_id': notice_id,
      },
      sCallback: function (data) {
        callback && callback(data);
      }

    }
    this.request(param);
  };

  //邀请
  agree(param, callback) {
    var notice_id = param
    var param = {
      url: 'castingpinnotice/enroll',
      type: 'POST',
      data: {
        'notice_id': notice_id,
      },
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param); 
  }
 //记录浏览量
  showAgree(param, callback) {
    var notice_id = param
    var param = {
      url: 'castingpinnotice/pageviews',
      type: 'POST',
      data: { 'notice_id': notice_id },
      sCallback: function (data) {
        callback && callback(data);
      }

    }
    this.request(param);
  };
  /*
  收藏
*/
  collect(param, callback) {
    console.log(param)
    var param = {
      url: 'castingpinnotice/collect',
      type: 'POST',
      data: {
        'collect': param.collect,
        'notice_id': param.notice_id,
      },
      sCallback: function (data) {
        callback && callback(data);
      }
    }
    this.request(param);
  };

}
export { Detail };