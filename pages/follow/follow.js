
import { Follow } from 'follow-model.js';
var app = getApp();
var follow = new Follow(); //实例化 首页 对象


Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    right: [
      {
        text: '取消关注',
        style: 'background-color: #F4333C; color: white',
      }],
    loadingHidden: false,
  },
  swichNav: function (e) {

    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;

    } else {
      let type = e.target.dataset.current
      that._loadData(type)
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },

  swiperChange: function (e) {
    console.log(e);
    this.setData({
      currentTab: e.detail.current,
    })
  },

   nvadatil:function(e){
    var pro_id = e.currentTarget.dataset.id
   

  },
  // 滑动
  onclick(e) {
    var that = this
    var follow_id = e.currentTarget.dataset.id; //取消关注


    var param = [];

    param['status'] = 0

    param['arranger_id'] = follow_id

    console.log(param)


    follow.cancelFoller(param, (data) => {

      console.log(data)

      if (data.code == 201) {
          that._loadData();
      }

    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    this._loadData();
  },

  _loadData: function (type = 0) {
    var that = this

    follow.follower(type, (data) => {
  
      var message = data.data
      var cache_list = require('../../common/package.js');
      message.forEach(function (item, index) {
        message[index]['occupation'] = cache_list.handleCache(item['occupation']); //职业
        message[index]['position'] = cache_list.handleCache(item['position']); //职位
      })


      console.log(message)

      that.setData({
        list: message,
        loadingHidden:true
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