const app = getApp();
const repeatclick = require('../../utils/repeatclick.js');
import { Home } from 'home-model.js';
var home = new Home(); //实例化 首页 对象
var cache_list = require('../../utils/package.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    xindex: 0,
    start_page: 0,
    list:[],
    loadingHidden: false,
    type: 100600
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    var start_page = that.data.start_page
    that._loadData(start_page, 100600, 0);
  },

  _loadData: function (start_page = 0, type = 100600, status = 0) {
    var that = this
    var msg = []
    msg['type'] = type
    msg['start_page'] = start_page
    home.getlist(msg, (data) => {
      var material = data.data.material
      var cache = wx.getStorageSync('chace_record');
      if (data.code == 201) {
        var message = data.data
        console.log(message)

        var list = that.data.list;
        if (status == 0) {
          if (message.length != 0) {
            for (var i = 0; i < message.length; i++) {
              list.push(message[i])
            }
          } else {
            return false
          }
        } else {
          list = message
        }

        if (list.length != 0) {
        list.forEach(function (item, index) {
        list[index]['type'] = cache_list.handleCache(cache, item['type'], 0); 
        list[index]['theme'] = cache_list.handleCache(cache, item['theme'], 0); 
        that.setData({
          loadingHidden: true,
          start_page: start_page,
          column: cache_list.columnCache(cache),
          type: type,
          list: list
            })
          })
        } else {
          that.setData({
            loadingHidden: true,
            start_page: start_page,
            column: cache_list.columnCache(cache),
            type: type,
            list: []
          })
        }
        setTimeout(function () {
          wx.hideNavigationBarLoading();
          wx.stopPullDownRefresh();
        }, 1500);
      } else {
        that.setData({
          loadingHidden: true,
        })
      }
    })
  },

  detail: function (e) {
    var id = e.currentTarget.dataset.cast_id  //剧组Id

    var arranger_id = e.currentTarget.dataset.arranger_id  //统筹Id
    
    wx.navigateTo({
      url: '../../pages/castdetail/castdetail?cast_id=' + id + '&arranger_id='
      + arranger_id,
    })
  },

  publish: function () {
    home.getCast((data) => {
      if (data.code == 201) {
        var script = encodeURIComponent(JSON.stringify(data.data))
        wx.navigateTo({
          url: '../../pages/publish/publish?script=' + script,
        })
      } else {
        wx.showModal({
          title: "您尚未填写剧组资料",
          content: '确定跳转到剧组页面么',
          showCancel: true,//是否显示取消按钮
          success: function (res) {
            if (!res.cancel) {
              wx.navigateTo({
                url: '../../pages/cast/cast'
              })
            }
          }
        })
      }
    })
  },
  onChange: function (e) {
    this.setData({
      xindex: e.detail.current
    });
  },



  /*
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

