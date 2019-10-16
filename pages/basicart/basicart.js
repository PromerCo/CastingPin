import { Basicart } from 'basicart-model.js';
var basicart = new Basicart(); //实例化 首页 对象
const app = getApp()
Page({
  data: {
    // 手机号
    phoneNumber: '',
    url: app.globalData.url,
    //日期
    date:'2016-09-01',
    message: [],
    // 城市
    region: ['北京市', '北京市', '东城区'],
    
    // 身高
    multiArray: [
      ['15', '16', '17', '18', '19', '20'],
      ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    ],
    //体重
    multiArray1: [
      ['4','5', '6', '7', '8', '9', '10'],
      ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    ],
    // 年龄
    multiArray2: [
      ['1', '2', '3', '4', '5', '6', '7', '8'],
      ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    ],
    // 职业
    array: ['演员', '模特', '主持人', '歌手'],
    objectArray: [
      {
        id: 1,
        name: '演员'
      },
      {
        id: 2,
        name: '模特'
      },
      {
        id: 3,
        name: '主持人'
      },
      {
        id: 4,
        name: '歌手'
      }
    ],
    index: 1,

    // 特长
    array1: ['运动', '舞蹈', '乐器', '戏曲', '武术', '书画 ', '曲艺', '语言', '声乐 ', '其他'],
    objectArray1: [
      {
        id: 0,
        name: '运动'
      },
      {
        id: 1,
        name: '舞蹈'
      },
      {
        id: 2,
        name: '乐器'
      },
      {
        id: 3,
        name: '戏曲'
      },
      {
        id: 4,
        name: '武术 '
      },
      {
        id: 5,
        name: '书画'
      },
      {
        id: 6,
        name: '曲艺 '
      },
      {
        id: 7,
        name: '语言'
      },
      {
        id: 8,
        name: '声乐 '
      },
      {
        id: 9,
        name: '其他'
      },
    ],
    tag:[
      { 'id': 100001,'title':  '运动' },
      { 'id': 100002, 'title': '舞蹈' },
      { 'id': 100003, 'title': '乐器' },
      { 'id': 100004, 'title': '戏曲' },
      { 'id': 100005, 'title': '武术' },
      { 'id': 100006, 'title': '书画' },
      { 'id': 100007, 'title': '曲艺' },
      { 'id': 100008, 'title': '语言' },
      { 'id': 100009, 'title': '语言' },
      { 'id': 100010, 'title': '其他' },
    ],
    index1: 0,
    // 简介
    isHidePlaceholder: false,
    // 上传图片
    fileList: [
    ],
    options:[
['60','61','62','63','64','65','66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80','81','82','84','85'],
['20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35'
,'36','37','38','39','40','41','42','43','44','45','46','47','48','49','50'],
['80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '100', '101', '102', '103', '104', '105', '106', '107', '108', '109', '110', '111', '112', '113', '114','115','116'],
    ],
    value: ['68', '28','95'],
    // text框的显示隐藏
    isHidePlaceholder: false,
    //三围
    woman_str:'68-28-95',
    //微信
    wx_name:'',
    //邮箱
    emali: '',
    //公司
    corporation:'',
    //职位
    occupation:'',
    //身高
    actor_height:170,
    //体重
    actor_weight:90,
    tag_all: [],
    tag_list:[],
    tid_s: [],

  },
  // 城市
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  // 身高
  showPicker_03: function () {
    this.setData({
      isShow_03: true
    })
  },
  bindMultiPickerChange: function (e) {
    var that = this
    var height =  that.data.multiArray
    var z_index = e.detail.value
    var actor_height = height[0][z_index[0]] + height[1][z_index[1]]
    this.setData({
      multiIndex: e.detail.value,
      actor_height: actor_height,
      position: false
    })
  },

  // 体重
  showPicker_04: function () {
    this.setData({
      isShow_04: true
    })
  },

  //三围
  onValueChange:function(e){
   
    var that = this

    var index = e.detail.index

    var woman = e.detail.displayValue

    that.setData({
 
        value: woman
    })



  },



  bindMultiPickerChange1: function (e) {
    var that = this
    var multiIndex1 = e.detail.value
    var multiArray1 = that.data.multiArray1
    var actor_weight = multiArray1[0][multiIndex1[0]] + multiArray1[1][multiIndex1[1]]
    this.setData({
      multiIndex1: e.detail.value,
      actor_weight: actor_weight,
      position: false
    })
  },
/*
   绑定微信
*/
bingd_wx:function(e){
  var that = this
  var wx_name = e.detail.value 
  that.setData({
    wx_name: wx_name
  })
  
},
/*
   邮箱
*/
  bingd_emali:function(e){
    var that = this
    var emali = e.detail.value
    that.setData({
      emali: emali
    }) 

  },
  /*
  公司
  */
  bingd_corporation:function(e){
    var that = this
    var corporation = e.detail.value
    that.setData({
      corporation:corporation
    })

  },
   


/*
  出生日期
*/
  bindDateChange: function (e) {


    this.setData({
      date: e.detail.value,
    })
  },

  // 职业
  bindPickerChange: function (e) {

    var that = this

    var occupation_list = that.data.occupation_list

    var index = e.detail.value

    var occupation = occupation_list[index]['code']

    //传入数据

    var data = [];

    data.push({ "occupation": occupation})

    that._saveMsg(data)

    this.setData({
      index: index,
    })
  },


/*
  数据保存
*/
  _saveMsg: function (options) {

    var msg = options
   
    basicart.saveData(msg, (data) => {

    

    })





  },




  // 特长
  bindPickerChange1: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index1: e.detail.value
    })
  },
  onChange(e) {
    console.log('onChange', e)
    const { file } = e.detail
    if (file.status === 'uploading') {
      this.setData({
        progress: 0,
      })
      wx.showLoading()
    } else if (file.status === 'done') {
      this.setData({
        imageUrl: file.url,
      })
    }
  },
  onSuccess(e) {
    console.log('onSuccess', e)
    this.setData({
      url: e.detail.file.url
    })
  },
  onFail(e) {
    console.log('onFail', e)
  },
  onComplete(e) {
    console.log('onComplete', e)
    wx.hideLoading()
  },
  onProgress(e) {
    console.log('onProgress', e)
    this.setData({
      progress: e.detail.file.progress,
    })
  },
  onPreview(e) {
    console.log('onPreview', e)
    const { file, fileList } = e.detail
    wx.previewImage({
      current: file.url,
      urls: fileList.map((n) => n.url),
    })
  },
  onRemove(e) {
    const { file, fileList } = e.detail
    wx.showModal({
      content: '确定删除？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            fileList: fileList.filter((n) => n.uid !== file.uid),
          })
        }
      },
    })
  },
  // text框的显示隐藏
  getTextareaInput: function (e) {
    var that = this;
    if (e.detail.cursor > 0) {
      that.setData({
        isHidePlaceholder: true
      })
    } else {
      that.setData({
        isHidePlaceholder: false
      })
    }
  },
  onLoad: function (options) {
    var that = this

    var type = options.type

    var chaceRecord = wx.getStorageSync('chace_record')  //缓存数据

    var occupation = [];//职位

    var speciality = [];//特长

    chaceRecord.forEach(function (item, index) {
      if (item.type == 'occupation'){
           occupation.push(item)
      } else if (item.type == 'speciality'){
           speciality.push(item)
      }
    })
    that.setData({
      occupation_list: occupation,
      speciality_list: speciality
    })


      
    basicart.getList((data) => {

    var message = data.data 

    var woman = message.woman

    var value = woman.split("-");

    var tag = that.data.tag

    var speciality = message.speciality


      var check_tags = speciality.split(","); 

      let tags_list = [];
      
      // for (var i = 0; i <= check_tags.length;i++){
      //   for (var j = 0; j < tag.length;j++){
      //     if (tag[j]['id'] == check_tags[i]){
      //       tag.push({
      //         'check': 'check',
      //       })
      //     }
      //   }
      // }

  

     that.setData({
        type: type,
        message:    message,
        emali:      message.email,
        wx_name:    message.wechat,
        phoneNumber:message.phone,
        corporation:message.corporation,
        actor_height: message.height,
        actor_weight: message.weight,
        occupation: message.occupation,
        tags_list: tags_list,
        value: value
      })
    })

  },



  onChangeHeight:function(e){
    console.log(e.detail.value)
    this.setData({ 
      actor_height: e.detail.value
    })
  },

  onChangeWeight: function (e) {
    console.log(e.detail.value)
    this.setData({
      actor_weight: e.detail.value
    })
  },



  /*
   身高
  */
  afterChangeHeight:function(e){
    var that   = this
    var height = e.detail.value
    console.log(height[0])
    that.setData({
      actor_height: height[0]
    })
  },

  /*
   体重
  */

  afterChangeWeight:function(e){
    var that = this
    var height = e.detail.value
    that.setData({
      actor_weight: height[0]
    })

  },
  /*
  获取手机号
*/
  getPhoneNumber: function (e) {
    var that = this
    //获取用户手机号
    var errMsg = e.detail.errMsg
    var msg = e.detail
  
    msg.code = that.data.code

        if (errMsg == 'getPhoneNumber:ok') {
          basicart.getPhone(msg, (data) => {

            console.log(data)
            if (data.code == 201) {
              var data = JSON.parse(data.msg);
              that.setData({
                phoneNumber: data.phoneNumber
              })
            }
          })
        }
    //   }
    // })
  },




  /*
  文本组件
  */
  updatePosition(keyboardHeight) {
    const toolbarHeight = 100
    const { windowHeight, platform } = wx.getSystemInfoSync()
    let editorHeight = keyboardHeight > 0 ? (windowHeight - keyboardHeight - toolbarHeight) : windowHeight
    this.setData({ editorHeight, keyboardHeight })
  },
  calNavigationBarAndStatusBar() {
    const systemInfo = wx.getSystemInfoSync()
    const { statusBarHeight, platform } = systemInfo
    const isIOS = platform === 'ios'
    const navigationBarHeight = isIOS ? 44 : 48
    return statusBarHeight + navigationBarHeight
  },

  onEditorReady() {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context
      var describe = that.data.message.profile
      that.editorCtx.setContents({
        html: describe,
        success: (res) => {
          console.log(res)
        },
        fail: (res) => {
          console.log(res)
        }
      })

    }).exec()
  },

  bindinput: function (e) {
    var that = this
    var info = e.detail.html
    that.setData({
      details: info
    })
  },

  blur() {
    this.editorCtx.blur()
  },

  format(e) {
    console.log(e)
    let { name, value } = e.target.dataset
    if (!name) return
    this.editorCtx.format(name, value)

  },
  onStatusChange(e) {
    const formats = e.detail
    console.log(formats)
    this.setData({ formats })
  },
  insertDivider() {
    this.editorCtx.insertDivider({
      success: function () {
        console.log('insert divider success')
      }
    })
  },
  clear() {
    this.editorCtx.clear({
      success: function (res) {
        console.log("clear success")
      }
    })
  },
  removeFormat() {
    this.editorCtx.removeFormat()
  },
  insertDate() {
    const date = new Date()
    const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    this.editorCtx.insertText({
      text: formatDate
    })
  },

  insertImage() {
    const that = this
    wx.chooseImage({
      count: 9,
      success: function (res) {
        var image = res.tempFilePaths[0];
        var url = that.data.url

        wx.uploadFile({
          url: url + "/v1/alioss/index",
          filePath: image,
          name: 'file',
          header: {
            "Content-Type": "multipart/form-data",
            'accept': 'application/json'
          },
          success: function (res) {
            console.log(res)

            that.editorCtx.insertImage({
              src: res.data,
              data: {
                id: 'abcd',
                role: 'god'
              },
              width: '100%',
              success: function (e) {
                console.log(e)

              }
            })

          }

        })
      }
    })
  },


  formSubmit:function(e){
            console.log(123)
  },


  /*加载所有数据*/
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this


    wx.login({
      success: function (res) {
       var  code = res.code
        that.setData({
          code: code,
     
        })

      }
    })
       

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function (e) {

    var that = this

    var wx_name = that.data.wx_name   //微信名

    var emali = that.data.emali       //邮箱号

    var corporation = that.data.corporation   //公司

    var region = that.data.region     //城市

    var city = region.join(',');

    var actor_height = that.data.actor_height     //身高

    var actor_weight = that.data.actor_weight     //体重

    var birthday = that.data.date

    var occupation = that.data.occupation

    var phoneNumber = that.data.phoneNumber 

    var woman = that.data.value

    var woman_str = woman.join('-');

    var tid_s = that.data.tid_s

    var speciality = tid_s.join(',');

    console.log(speciality)


    let msg = [];

    msg['speciality'] = speciality
    msg['wechat'] = wx_name
    msg['email'] = emali
    msg['occupation'] = occupation
    msg['corporation'] = corporation
    msg['city'] = city
    msg['height'] = actor_height
    msg['weight'] = actor_weight
    msg['birthday'] = birthday
    msg['woman'] = woman_str
    msg['phone'] = phoneNumber
   
    basicart.saveMsg(msg, (data) => {
      if (data.code == 201){

      }else{
        console.log(data.msg)
      }


    })
  },


  check: function (e) {
    var that = this
    var t_id = e.currentTarget.dataset.id
    var tags = this.data.tag
    var index = e.currentTarget.dataset.index
    var tid_s = that.data.tid_s;
    var chek = tags[index];
    var tag_list = that.data.tag_list;
    var tag_all = that.data.tag_all;



    if (chek['check'] == 'check') {
      chek['check'] = 'none'
      for (var i = 0; i < tid_s.length; i++) {
        if (tid_s[i] == t_id) {

          tid_s.splice(i, 1);
          tag_list.splice(i, 1);
          tag_all.splice(i, 1)
        }
      }
      that.setData({
        tid_s: tid_s,
        tag_list: tag_list,
        tag_all: tag_all
      })
    } else {

      if (tid_s.length >= 3) {
        wx.showToast({
          title: "最多选择三个标签哦",
          icon: 'none',
          duration: 800,
          mask: true
        });
        return false;
      }

      chek['check'] = 'check'
      tag_list.push(chek.title);
      tid_s.push(t_id)
      tag_all.push(chek);

    
      that.setData({
        tid_s: tid_s,
        tag_list: tag_list,
        tag_all: tag_all
      })
    }


    console.log(tags)
    console.log(tid_s)
    that.setData({
      tag: tags,
      tid_s: tid_s,
    })



  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})