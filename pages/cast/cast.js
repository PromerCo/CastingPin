
import { Cast } from 'cast-model.js';
var app = getApp();
var cast = new Cast(); //实例化 首页 对象

var util = require('../../utils/util.js')
Page({
  data: {
    loadingHidden: false,
    index: 0,
    value: [],
    displayValue2: '请选择',
    lang: 'zh_CN',
    isHidePlaceholder: false,
    s_index: 1,
    j_index: 1,
    url: app.globalData.url,

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log(util.formatTime(new Date()))

    var that = this
    var chaceRecord = wx.getStorageSync('chace_record')  //缓存数据

    var notice = [];//剧型

    var theme  = [];//题材

    chaceRecord.forEach(function (item, index) {
      if (item.type == 'theme') {
        theme.push(item)
      }  else if (item.type == 'type') {
        notice.push(item)
      }
    })

    that.setData({
      notice_list: notice,
      theme_list: theme
    })

  },

  //保存数据
  formSubmit: throttle(function (e) {
    var that = this;
    var info = e.detail.value

    console.log(info)

    cast.pushSave(info, (data) => {
      if (data.code == 201) {
        /*
        跳转 ME 页面
       */
        wx.redirectTo({
          url: '../../pages/sign/sign?type=2',
        })

      } else {
        wx.showToast({
          title: '请先完善资料',
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
      details: info
    })
  },
  item_bindinput:function(e){
    var that = this
    var info = e.detail.html
    that.setData({
      item_details: info
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
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
