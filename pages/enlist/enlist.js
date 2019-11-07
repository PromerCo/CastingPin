
import { Enlist } from 'enlist-model.js';
var app = getApp();
var enlist = new Enlist(); //实例化 首页 对象
var cache_list = require('../../utils/package.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    enroll_list:[],
    is_collect:0,
    isIOS: false,
    loadingHidden: false,
    agree:'报名参加'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var notice_id = options.notice_id
    var msg = []
    msg['notice_id'] = notice_id
    var cache = wx.getStorageSync('chace_record');
    enlist.list_details(msg, (data) => {
      console.log(data)
        if(data.code == 200){
          var list = data.data
          list['age'] = cache_list.handleCache(cache, list['age'], 0);
          var enroll = JSON.parse(JSON.parse(list['enroll']))
          if (enroll == null || enroll == undefined) {
            enroll = [];
          }
          if (list.is_enroll == 1){
            var agree = '报名成功'
          }else{
            var agree = '报名参加'
          }
          that.showEditorReady() //炫染数据
          that.setData({
            list: list,
            is_enroll: list.is_enroll, //是否入伍
            is_collect: list.is_collect, //是否收藏
            enroll_count: list.enroll_count,
            enroll_number: list.enroll_number,
            enroll_list: enroll,
            agree:agree,
            loadingHidden: true
          })

        }

    })
  },



  /*
编辑器
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
  showEditorReady() {

    const that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context
      var describe = that.data.list['profile']
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

  /*
  收藏
  */
  onCollect:function(e){
    var that = this
    var collect = e.currentTarget.dataset.collect
    var notice_id = e.currentTarget.dataset.id
    var msg = [];
    msg['collect'] =   collect    // 收藏
    msg['notice_id'] = notice_id  // 通告ID
    enlist.collect(msg, (data) => {
      if (data.code == 201){
        var enroll_count = that.data.enroll_count
        var is_collect = data.data
        if (is_collect == 1){
          enroll_count = Number(enroll_count) + 1
        }else{
          enroll_count = Number(enroll_count) - 1
        }

        that.setData({
          is_collect: is_collect,
          enroll_count: enroll_count
        })
      }
    })
  },

  /*
  报名
  */
  agree: function (e) {
    var that = this
    let notice_id = e.currentTarget.dataset.id
    var enroll_list = that.data.enroll_list

 
      wx.createSelectorQuery().select('#j_page').boundingClientRect(function (rect) {
        // 使页面滚动到底部
        wx.pageScrollTo({
          scrollTop: rect.bottom
        })
      }).exec()
 

    enlist.agree(notice_id, (data) => {
     
         if (data.code == 201){
           var img = { 'avatar_url': data.data };
           enroll_list.push(img)
           that.setData({
             is_enroll: 1,
             enroll_list: enroll_list,
             enroll_number: parseInt(that.data.list.enroll_number) + 1,
             agree: '报名成功'
           })
         } else if (data.code == 417){
           wx.showToast({
             title: "您不是艺人身份",
             icon: 'none',
             duration: 1000,
             mask: true
           });
         } else if (data.code == 416){
           wx.showToast({
             title: "资料未填写",
             icon: 'none',
             duration: 1000,
             mask: true
           });
  
         } else if (data.code == 200){

           wx.showToast({
             title: "您已经报名",
             icon: 'none',
             duration: 1000,
             mask: true
           });
  
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