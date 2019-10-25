import { Base } from '../../utils/base.js';
class MeGroup extends Base {
  constructor() {
    super();
  }

  /*
    列表
 */
  list(cast_id, callback) {
 
    var param = {
      url: 'castingpincast/announce',
      data: { 'cast_id': cast_id },
      type: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

};
export { MeGroup };