// pages/information/information.js

import { Castdetail } from 'castdetail-model.js';
var app = getApp();
var castdetail = new Castdetail(); //实例化 首页 对象
var cache_list = require('../../utils/package.js');


Page({
  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    isIOS: false,
    loadingHidden: false,
    focus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var cache = wx.getStorageSync('chace_record');
    var that = this
    var cast_id = options.cast_id
    var arranger_id = options.arranger_id
    var msg = [];
    msg['cast_id'] = cast_id
    msg['arranger_id'] = arranger_id

    castdetail.list_details(msg, (data) => {
      console.log(data)
      if (data.code == 201){
         var list = data.data
         var notice_list = list.notice
         notice_list.forEach(function (item, index) {
         notice_list[index]['occupation'] = cache_list.handleCache(cache, item['occupation'], 0);
         })
         wx.pageScrollTo({
          scrollTop: 0
         })
        that.showEditorReady() //炫染数据
         that.setData({
           list: list,
           follow_status: list.follow_status,
           follow_counts: list.follow_counts,
           loadingHidden:true
         })
    
  
      }
    })
  },

  //跳转首页
  nva_home:function(){
    wx.switchTab({
      url: '/pages/home/home',   //注意switchTab只能跳转到带有tab的页面，不能跳转到不带tab的页面
    })
  },
  //图片点击事件
  imgYu: function (event) {
    var src = event.currentTarget.dataset.src;//获取data-src
    var url = []
    url.push(src)
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: url // 需要预览的图片http链接列表

    })
  },

  follow: function (e) {
    var that = this
    var follow_status = e.currentTarget.dataset.status //状态
    var arranger_id   = e.currentTarget.dataset.arranger_id  //统筹ID
    var msg = []
    var that = this
    msg['follow_status'] = follow_status
    msg['arranger_id']   = arranger_id

    castdetail.follow(msg, (data) => {
       var follow_status = data.data
       var follow_counts = that.data.follow_counts 
        if(data.code == 201){
          if (follow_status == 1){
            follow_counts = parseInt(follow_counts)+1
          }else{
            follow_counts = parseInt(follow_counts)-1
          }
          that.setData({
            follow_status: follow_status,
            follow_counts: follow_counts
          })
        }

    })

  },

  cast_list:function(e){
    var that = this
    var arranger_id = e.currentTarget.dataset.arranger_id
    var cast_id = e.currentTarget.dataset.cast_id
    var msg = [];
    msg['arranger_id'] = arranger_id
    msg['cast_id'] = cast_id
    that.onLoad(msg);
  },
  //招募
  zhaomu:function(e){
    let notice_id = e.currentTarget.dataset.notice_id  //通告Id

    wx.navigateTo({
      url: '../../pages/enlist/enlist?notice_id=' + notice_id
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

    wx.createSelectorQuery().select('#tema_editor').context(function (res) {
      that.editorCtx = res.context
      var describe = that.data.list['team']
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