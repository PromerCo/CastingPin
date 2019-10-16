import { Me } from 'me-model.js';
var me = new Me();
var app = getApp(); 

Page({
  data: {
    type:2,
    loadingHidden: false,
    authHidding:false
  },
  change:function(e){

    var bol = e.currentTarget.dataset.type;
    console.log(bol)
    this.setData({
      type: bol
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

  make: function () {
    wx.navigateTo({
      url: '../../pages/make/make',
    })
  },
  news: function () {
    var type = this.data.type

    wx.navigateTo({
      url: '../../pages/basicgro/basicgro?type=' + type,
    })
  },
  // 通告
  onLoad: function (options) {
    
    var that = this;
    // wx.getSetting({
    //   success(res) {
    //     if (!res.authSetting['scope.userInfo']) {
      
    //       that.setData({
    //         authHidding: true,
    //         loadingHidden: true
    //       })
    //     } else {
    //       that._loadData();
    //     }
    //   }
    // })
  },

  bindGetUserInfo: function (e) {
    var that = this
    var userInfo = e.detail.rawData
    that.setData({
      loadingHidden: false
    })
    wx.setStorageSync('userInfo', e.detail.userInfo)
    me.getUserAhth(userInfo, (data) => {
    
      console.log(data)
      if (data.code == 201) {
        that._loadData();
        that.setData({
          userInfo: JSON.parse(userInfo),
          authHidding: false,
          loadingHidden: true,
          status: 0
        })
      } else {
        that.setData({
          userInfo: JSON.parse(userInfo),
          authHidding: false,
          loadingHidden: true,
          status: 0
        })
        wx.showToast({
          title: '授权失败',//提示文字
          duration: 500,//显示时长
          mask: true,//是否显示透明蒙层，防止触摸穿透，默认：false  
          icon: 'none', //图标，支持"success"、"loading"  
        })
      }

    });
  },

  /*加载所有数据*/
  _loadData: function (callback) {
    var that = this;
    var userInfo = wx.getStorageSync('userInfo'); 
    me.roleStatus((data) => {   
      console.log(data)

      if (data.code == 200){
        var material = data.data.material  //查看是否填写资料
        var type = data.data.type   //类型
        if (type == 2){
        //艺人 
          that.setData({
            authHidding: false,
            loadingHidden:false,
            material: material   //是否填写资料
          })

        }else{
        //统筹
          that.setData({
            authHidding: false,
            loadingHidden: false,
            material: material  //是否填写资料
          })


        }
        
      }
      
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