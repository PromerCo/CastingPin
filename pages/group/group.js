// 防止重复点击
const repeatclick = require('../../utils/repeatclick.js');
import { Group } from 'group-model.js';
var app = getApp();
var group = new Group(); //实例化 首页 对象

var cache_list = require('../../utils/package.js');



//缓存
Page({
  data: {
    loadingHidden: false,
    hidden: 1,
    //普通选择器
    list: [],
    banner: [],
    column: [],
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
    
    group.getCast( (data) => {

      console.log(data)

      if(data.code == 201){
               wx.navigateTo({
                 url: '../../pages/publish/publish',
               })
      }else{

        wx.showModal({
          title: "您尚未填写剧组资料",
          content: '确定跳转到剧组页面么',
          showCancel: true,//是否显示取消按钮
          success: function (res) {
            if (res.cancel) {
              console.log('取消') 
            } else {
              wx.navigateTo({
                url: '../../pages/cast/cast'
              })
            }
          }
        })

        }
    })



  },
  // 点击切换
  onTabsChange: function(e) {

    var that = this
    const { index } = e.detail
    // 当前项
    const item = this.data.column[index]
    const type = item.code
    that._loadData(type)
    
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
        dis:"block"
      })
    }else {
      this.setData({
        dis: "none"
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {

    var that = this
    that._loadData();


  },

  _loadData: function (type=100600){
    var that = this
    var msg = []
    msg['type'] = type
    group.getlist(msg,(data) => {

      var material = data.data.material
      var cache = wx.getStorageSync('chace_record');

      if (data.code == 201){
        var message = data.data 
        if (message.length == 0) {
         that.setData({
           loadingHidden: true,
           column: cache_list.columnCache(cache),
           list: [],
           ava_list:[]
         })
       }else{
          var ava_list = []  //最新 
          var list     = []  //普通展示
        message.forEach(function (item, index) {
          message[index]['occupation'] = cache_list.handleCache(cache,item['occupation'], 0); //职位
          message[index]['age'] = cache_list.handleCache(cache,item['age'], 0); //年龄
          message[index]['speciality'] = cache_list.handleCache(cache,item['speciality'].split(','), 1, '#'); //特长
        if(index<3){
          ava_list.push(item)
          that.setData({
            loadingHidden: true,
            column: cache_list.columnCache(cache),
            ava_list: ava_list
          })
        }else{
       
          list.push(item)
          that.setData({
            loadingHidden: true,
            column: cache_list.columnCache(cache),
            list: list
          })
        }

        })
       }
      }else{
        that.setData({
          loadingHidden: true,
  
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

