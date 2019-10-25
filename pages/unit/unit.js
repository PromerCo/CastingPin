import { Unit } from 'unit-model.js';
var app = getApp();
var unit = new Unit(); //实例化 首页 对象
var cache_list = require('../../utils/package.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._loadData();
  },
  // 加载所有数据
  _loadData: function (callback) {
    var that = this;
    var chaceRecord = wx.getStorageSync('chace_record')  //缓存数据
  
    unit.getlist((data) => {
      var list = data.data
      console.log(list)
      list.forEach(function (item, index) {
        
        list[index]['type'] = cache_list.handleCache(wx.getStorageSync('chace_record'),item.type,0); //剧型
        list[index]['theme'] = cache_list.handleCache(wx.getStorageSync('chace_record'),item.theme,0) //题材
        list[index]['city'] = item.city.split(',')[0]

      })
      that.setData({
        list: list
      })
  
    })
  },
  //剧组对应的通告
  my_group:function(e){
 
    var cast_id = e.currentTarget.dataset.id
    
    wx.navigateTo({
      url: '../../pages/sign/sign?cast_id=' + cast_id,
    })

  },


  publish() {
    wx.navigateTo({
      url: '../../pages/cast/cast',
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