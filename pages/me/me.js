import {Me } from "me-model.js"
var me = new Me;
Page({
  data: {
    boolean:false,
  },
  change:function(){
    var bol=this.data.boolean;
    this.setData({
      boolean:!bol
    })
  },
  // 演员
  follow(){
    wx:wx.navigateTo({
      url: '../../pages/follow/follow',
    })
  },
  list() {
   wx.navigateTo({
      url: '../../pages/list/list',
    })
  },
  basicart(){
   wx.navigateTo({
     url: '../../pages/basicart/basicart',
   })
  },
  basicgro() {
    wx.navigateTo({
      url: '../../pages/basicgro/basicgro',
    })
  },
  guanzhu:function(){
    wx.navigateTo({
      url: '../../pages/publish/publish',
    })
  },
  // 通告
  onLoad: function (options) {
    this._loadData();
  },
  /*加载所有数据*/
  _loadData: function (callback) {
    var that = this;
    me.getlist((data) => {
      this.setData({
        list: data.data
      })
      console.log(data.data)
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