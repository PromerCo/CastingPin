
import { Base } from '../../utils/base.js';


class Make extends Base {
  constructor() {
    super();
  }
   
  getImage(msg, callback) {

   var  image =   msg['image'] 
    var type  =   msg['type']  

    var param = {
      url: 'card/compose',
      data: { 
        'image': image,
        'type' : 1
         },
      type: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }



};

export { Make };