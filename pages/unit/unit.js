import { Unit } from 'unit-model.js';
var app = getApp();
var unit = new Unit(); //实例化 首页 对象
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
      list.forEach(function (item, index) {
        chaceRecord.forEach(function (cache_item, cache_index) {
          var type = item.type//剧型
          var theme = item.theme//题材
          if (cache_item.code == type) {
            list[index]['type'] = cache_item['name']
          } else if (cache_item.code == theme){
            list[index]['theme'] = cache_item['name']
          }
        })
      })
      that.setData({
        list: list
      })
  
    })
  },
  //剧组对应的通告
  my_group:function(e){
 
    var cast_id = e.currentTarget.dataset.id
    console.log(cast_id)
    
    wx.navigateTo({
      url: '../../pages/my_group/my_group?cast_id=' + cast_id,
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