// 防止重复点击
const repeatclick = require('../../utils/repeatclick.js')

// 缓存数据
const cache_list = require('../../utils/package.js');


import { Group } from 'group-model.js';

var app = getApp();
var group = new Group(); //实例化 首页 对象

Page({
  data: {
    loadingHidden: false,
    hidden: 1,
    //普通选择器
    list: [],
    banner: [],
    column: cache_list.columnCache(),
    ava_list:[],
    dis:"none",
  },
  detail:function(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../pages/detail/detail?id=' + id,
    })
  },
  publish:function() {
    wx.navigateTo({
      url: '../../pages/publish/publish',
    })
  },
  // 点击切换
  onTabsChange: function(e) {
    const { index } = e.detail
    // 当前项
    const item = this.data.column[index]
    const platform_id = item.code
    

  
  

  },
  // 显示隐藏
  show(e) {
    var hide = e.currentTarget.dataset.type
    this.setData({
      hidden: !hide
    })
  },
  screen_hower: function(e) {
    this.setData({
      hidden: 1
    })
  },
  onPageScroll: function (res){
    var scrolltop = res.scrollTop
    if (scrolltop>50){
      this.setData({
        "dis":"block"
      })
    }else {
      this.setData({
        "dis": "none"
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
   

    this._loadData();
  },

  _loadData:function(){
    var that = this
    group.getlist(0,(data) => {
      var material = data.data.material
      if (data.code == 201){
        var message = data.data 
        message.forEach(function (item, index) {
        message[index]['occupation'] = cache_list.handleCache(item['occupation'], 0); //职位
        message[index]['age'] = cache_list.handleCache(item['age'], 0); //年龄
        message[index]['speciality'] = cache_list.handleCache(item['speciality'].split(','), 1, '#'); //特长
        if(index<3){
          var ava_list = that.data.ava_list
          ava_list.push(item)
          that.setData({
            loadingHidden: true,
            ava_list: ava_list
          })
        }else{
          var list = that.data.list
          list.push(item)
          that.setData({
            loadingHidden: true,
            list: list
          })
        }
        })

      }

    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})