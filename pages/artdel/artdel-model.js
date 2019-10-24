import { Base } from '../../utils/base.js';

class Artdel extends Base {
  constructor() {
    super();
  }

 /*
  网红列表
 */
  getDetails(cast_id,callback) {
    var cast_id = cast_id
    var param = {
      url: 'castingpinactor/details',
      type: 'POST',
      data: { 'cast_id': cast_id},
      sCallback: function (data) {
        //  后台  data
        callback && callback(data);
      }
    };
    this.request(param);
  }

  /*
   用户关注
  */
  follow(params, callback) {
    console.log(params.arranger_id)
    
    var param = {
      url: 'castingpinactor/follow',
      type: 'POST',
      data: {
        'arranger_id': params.arranger_id,
        'status': params.status 
      },
      sCallback: function (data) {
        //  后台  data
        callback && callback(data);
      }
    };
    this.request(param);
  }
  /*
   邀请
  */
  invite(arranger_id, callback) {

    console.log(arranger_id)

    var param = {
      url: 'castingpinactor/invite',
      type: 'POST',
      data: {
        'arranger_id': arranger_id
      },
      sCallback: function (data) {
        //  后台  data
        callback && callback(data);
      }
    };
    this.request(param);
  }

}
export { Artdel };