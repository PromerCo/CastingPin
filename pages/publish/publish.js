import { Publish } from 'publish-model.js';
// 缓存数据
var cache_list = require('../../utils/package.js');

var   publish = new Publish(); //实例化 首页 对象

var app = getApp();


Page({
  data: {
    loadingHidden: false,
    index:0,
    value: [],
    lang: 'zh_CN',
    isHidePlaceholder: false,
    // 上传图片
    options: [
      ['60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '84', '85'],
      ['20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35'
        , '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50'],
      ['80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '100', '101', '102', '103', '104', '105', '106', '107', '108', '109', '110', '111', '112', '113', '114', '115', '116'],
    ],   
    value: ['68', '28', '95'],   
    bust: 68,
    waist: 28,
    hip: 95,
    tid_s: [],
    ter_s:[],
    s_index:1,
    e_index:1,
    n_index:1,
    j_index:1,
    age_list: [], //年龄范围
    occupation_list: [], //职业
    speciality_list: [], //特长
    style_list: [], //特长
    sex_list: [{ 'id': '1', 'name': '男' }, { 'id': '2', 'name': '女' }],
    number_list: [
      { 'code': '1', 'name': '0-20' }, 
      { 'code': '2', 'name': '20-50'},
      { 'code': '3', 'name': '50-100'},
      { 'code': '4', 'name': '100-200'},
      { 'code': '5', 'name': '200-500'},
      { 'code': '6', 'name': '500-1000' }
      ],
    placeholder: '活动介绍...',
    url: app.globalData.url,
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    console.log(cache_list.columnCache(wx.getStorageSync('chace_record'), 'age'))
   that.setData({
     age_list: cache_list.columnCache(wx.getStorageSync('chace_record'),'age'),
     occupation_list: cache_list.columnCache(wx.getStorageSync('chace_record'),'occupation'),
     speciality_list: cache_list.columnCache(wx.getStorageSync('chace_record'),'speciality'),
     style_list: cache_list.columnCache(wx.getStorageSync('chace_record'),'style')
  })

  },

  //保存数据
  formSubmit:throttle(function(e){
    var that = this;
    var info = e.detail.value

    publish.pushSave(info, (data) => {

       if(data.code == 201){
         wx.redirectTo({
           url: '../../pages/sign/sign?cast_id=' + data.data.cast_id,
         })
       }else{
         if (data.msg instanceof Array){
           var  msg_error = data.msg[0][0]
         }else{
           var msg_error = data.msg;
         }
         wx.showToast({
           title: msg_error,
           icon: 'none',
           duration: 1000,
           mask: true,
         })
       }
    })
  }, 1000),
  //三围
  onValueChange: function (e) {

    var that = this

    var index = e.detail.index

    var woman = e.detail.displayValue

    var woman_str = woman.join('-');

    var woman = woman_str   //三围

    var data = [];

    var bust = woman[0]

    var waist = woman[1]

    var hip = woman[2]

    var woman = woman

 
    that.setData({
      value: woman,
      bust: bust,
      waist: waist,
      hip: hip,
    })
  },

  bindinput: function (e) {

    var that = this
    var info = e.detail.html

    that.setData({
      details: info
    })
  },

  bindPickerChange:function(e){
    var that = this

    var occupation_list = that.data.occupation_list

    var index = e.detail.value

    var occupation = occupation_list[index]['code']

    this.setData({
      index: index,
    })

  },

  //剧类型
  bindNoticeChange:function(e){
    var that = this
    var notice_list = that.data.notice_list

    var index = e.detail.value

    var occupation = notice_list[index]['code']

    this.setData({
      j_index: index,
    })


  },
  //年龄

  bindAgeChange:function(e){
    var that = this

    var age_list = that.data.age_list

    var s_index = e.detail.value

    var age_code = age_list[s_index]['id']

    console.log(s_index)

    this.setData({
      s_index: s_index,
    })

  },

  //召集 人数
  bindNumberChange:function(e){
    var that = this

    var number_list = that.data.number_list

    var n_index = e.detail.value

    var number_code = number_list[n_index]['id']

    this.setData({
      n_index: n_index,
    })

  },



  bindSexChange: function (e){
    var that = this

    var sex_list = that.data.sex_list

    var e_index = e.detail.value

    var sex_code = sex_list[e_index]['id']

    this.setData({
      e_index: e_index,
    })

  },


  check: function (e) {
    var that = this
    var t_id = e.currentTarget.dataset.id
    var speciality_list = this.data.speciality_list
    var index = e.currentTarget.dataset.index
    var tid_s = that.data.tid_s;
    var chek = speciality_list[index];



    if (chek['check'] == 'check') {
      chek['check'] = 'none'
      for (var i = 0; i < tid_s.length; i++) {
        if (tid_s[i] == t_id) {
            tid_s.splice(i, 1);
        }
      }
      that.setData({
        tid_s: tid_s
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
      tid_s.push(t_id)
      that.setData({
        tid_s: tid_s
      })
    }

    that.setData({
      speciality_list: speciality_list,
      tid_s: tid_s
    })

  },

  fg_check:function(e){
    var that = this
    var t_id = e.currentTarget.dataset.id
    var style_list = this.data.style_list
    var index = e.currentTarget.dataset.index
    var ter_s = that.data.ter_s;
    var chek = style_list[index];


    if (chek['check'] == 'check') {
      chek['check'] = 'none'
      for (var i = 0; i < ter_s.length; i++) {
        if (ter_s[i] == t_id) {
          ter_s.splice(i, 1);
        }
      }
      that.setData({
        ter_s: ter_s
      })
    } else {
      if (ter_s.length >= 3) {
        wx.showToast({
          title: "最多选择三个标签哦",
          icon: 'none',
          duration: 800,
          mask: true
        });
        return false;
      }

      chek['check'] = 'check'
      ter_s.push(t_id)
      that.setData({
        ter_s: ter_s
      })
    }
    that.setData({
      style_list: style_list,
      ter_s: ter_s
    })

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

    }).exec()
  },

  bindinput: function (e) {

    var that = this
    var info = e.detail.html
    console.log(info)

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
            console.log(res.data)

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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})

function throttle(fn, gapTime) {
  if (gapTime == null || gapTime == undefined) {
    gapTime = 1500
  }

  let _lastTime = null
  // 返回新的函数
  return function () {
    let _nowTime = + new Date()
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn.apply(this, arguments)   //将this和参数传给原函数
      _lastTime = _nowTime
    }
  }
}
