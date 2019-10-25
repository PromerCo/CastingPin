// pages/my_group/my_group.js

import { MeGroup } from 'mygroup-model.js';
var megroup = new MeGroup();
var app = getApp(); 

var cache_list = require('../../utils/package.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var cast_id = options.cast_id
  

    megroup.list(cast_id, (data) => {
      var   list = data.data
      list.forEach(function (item, index) {
        list[index]['style'] = cache_list.handleCache(wx.getStorageSync('chace_record'),item['style'].split(','), 1, '#'); 
        list[index]['speciality'] = cache_list.handleCache(wx.getStorageSync('chace_record'),item['speciality'].split(','), 1, '#');
      })

      console.log(list)
      that.setData({
        list: list
      })
  
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