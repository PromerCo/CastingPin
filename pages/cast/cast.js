
import { Cast } from 'cast-model.js';
var app = getApp();
var cast = new Cast(); //实例化 首页 对象

var cache_list = require('../../utils/package.js');

var util = require('../../utils/util.js')
Page({
  data: {
    loadingHidden: false,
    index: 0,
    value: [],
    displayValue2: '请选择',
    lang: 'zh_CN',
    isHidePlaceholder: false,
    s_index: 0,
    placeholder:'输入团队简介',
    placeholder_xm: '输入项目简介',
    j_index: 0,
    url: app.globalData.url,
    type:0,
    region: ['北京市', '北京市', '东城区'],
    cover_img:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

 

  },

  // 城市
  bindRegionChange: function (e) {
    var that = this
    var conurbation = e.detail.value
    //数组转字符串
    var city = conurbation.join(",")
    var data = [];
    
    console.log(city)

    that.setData({
      region: e.detail.value
    })
  },

  onSuccess(e) {

    var that = this;
    var cover_img = that.data.cover_img
    var url_img = e.detail.file.url
    var url = that.data.url
    wx.uploadFile({
      url: url + "/v1/alioss/index",
      filePath: url_img,
      name: 'file',
      data: { 'type': 1 },
      header: {
        "Content-Type": "multipart/form-data",
        'accept': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        cover_img.push(res.data);
        that.setData({
          cover_img: cover_img
        })
      }
    })


  
  },

  onChange:function(){
     console.log(55) 
  },
  onRemove(e) {
    var that = this
    var cover_img = that.data.cover_img
    var index = e.detail.index
    cover_img.splice(index,1)
  },

  //保存数据
  formSubmit: throttle(function (e) {
    var that = this;
    var info = e.detail.value

    cast.pushSave(info, (data) => {

      if (data.code == 201) {
        /*
        跳转 ME 页面
       */
        wx.redirectTo({
          url: '../../pages/unit/unit',
        })

      } else {
        if (data.msg instanceof Array) {
          var msg_error = data.msg[0][0]
        } else {
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

  bindinput: function (e) {
    var that = this
    var info = e.detail.html
  
    that.setData({
      details: info,
      type:0
    })
  },
  item_bindinput:function(e){

    var that = this
    var info = e.detail.html
    that.setData({
      item_details: info,
      type: 1
    })
  },

  onEditorFocus:function(e){
    var that=  this
    let type = e.target.dataset.type
    console.log(type)
    that.setData({
      type: type
    })

  },

  onPreview(e) {
    const { file, fileList } = e.detail
    wx.previewImage({
      current: file.url,
      urls: fileList.map((n) => n.url),
    })
  },

  //剧类型
  bindNoticeChange: function (e) {
    var that = this
    var theme_list = that.data.theme_list
    var index = e.detail.value


    var occupation = theme_list[index]['code']
    this.setData({
      j_index: index,
    })
  },
  //题材
  bindThemeChange: function (e) {

    var that = this
    var theme_list = that.data.theme_list
    var index = e.detail.value
    var occupation = theme_list[index]['code']

    this.setData({
      s_index: index,
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

  onEditorReady_xm() {


    const that = this
    wx.createSelectorQuery().select('#editor_xm').context(function (res) {
      that.editorCtx_xm = res.context

    }).exec()
  },
 

  onStatusChange(e) {
    const formats = e.detail

    this.setData({ formats })
  },

  insertDate() {
    const date = new Date()
    const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    this.editorCtx.insertText({
      text: formatDate
    })
  },

  insertImage(e) {
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

  insertImage_xm:function(){
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
        
            that.editorCtx_xm.insertImage({
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
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {


    var that = this
    var notice_list = cache_list.columnCache(wx.getStorageSync('chace_record'), 'type')
    notice_list.splice(0, 1);

    var theme_list = cache_list.columnCache(wx.getStorageSync('chace_record'), 'theme')
    theme_list.splice(0,1);


    that.setData({
      notice_list: notice_list,
      theme_list: theme_list
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
  onUnload: function () {

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
