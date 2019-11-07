
import { Sign } from 'sign-model.js';

var app = getApp();

var sign = new Sign(); //实例化 首页 对象

var cache_list = require('../../utils/package.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    presentation: '正在加载',
    loadingHidden: false,
    type: 1,
    url: app.globalData.url
  },
  see: function (e) {
    var notice_id = e.currentTarget.dataset.notice_id
    console.log(notice_id)
    wx.navigateTo({
      url: '../../pages/enlist/enlist?notice_id=' + notice_id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this
    var cast_id = options.cast_id

    that.setData({
      cast_id: cast_id
    })

  },

  navhome: function (e) {
    wx.switchTab({
      url: '/pages/home/home'
    })
  },

  publish: function (e) {
    wx.navigateTo({
      url: '../../pages/release/release',
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
    var cast_id = that.data.cast_id
    sign.list(cast_id, (data) => {
      var list = data.data
      console.log(list)
      list.forEach(function (item, index) {
        list[index]['style'] = cache_list.handleCache(wx.getStorageSync('chace_record'), item['style'].split(','), 1, '#');
        list[index]['speciality'] = cache_list.handleCache(wx.getStorageSync('chace_record'), item['speciality'].split(','), 1, '#');
      })
      that.setData({
        list: list,
        loadingHidden: true
      })
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