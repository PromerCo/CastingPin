import { Me } from 'me-model.js';
var me = new Me();
var app = getApp(); 

var cache_list = require('../../utils/package.js');


Page({
  data: {
    type:2,
    loadingHidden: false,
    authHidding:false
  },
  change:function(e){


    var bol = e.currentTarget.dataset.type;
    var that= this

    me.cutRole(bol, (data) => {
      if (data.code == 201){

        var type = data.data.type
        var message = data.data
        var material = data.data.material

        if (type == 1){
          message['industry'] = cache_list.handleCache(wx.getStorageSync('chace_record'),message.industry, 0); //行业
          message['position'] = cache_list.handleCache(wx.getStorageSync('chace_record'),message.position, 0); //职位

          that.setData({
            message: message,
            type: type,
            authHidding: false,
            loadingHidden: true,
            material: material   //是否填写资料
          })
        }else{
          if (material ==0){
              message =[];
          } 
          else{
            var speciality = data.data.speciality   //特长
            var occupation = data.data.occupation   //职位
            
            if (speciality != undefined || speciality != null) {
              var check_tags = speciality.split(",");
              message['tags_list'] = cache_list.handleCache(wx.getStorageSync('chace_record'),check_tags, 1, '#');   //特长
            } else {
              message['tags_list'] = '暂无资料';
            }
            if (occupation != undefined || speciality != null) {
              message['occupation'] = cache_list.handleCache(wx.getStorageSync('chace_record'),occupation, 0); //行业
            } else {
              message['occupation'] = '暂无资料';
            }
          }
          that.setData({
            message: message,
            type: type,
            authHidding: false,
            loadingHidden: true,
            material: material   //是否填写资料
          })
        }
      }
    })

  },
  // 演员
  follow:function(e){

    let status = e.currentTarget.dataset.status
    wx.navigateTo({
      url: '../../pages/follow/follow?status=' + status,
    })
  },
  list:function(e) {
   wx.navigateTo({
      url: '../../pages/list/list',
    })
  },
  basicart:function(e){

   var type = e.currentTarget.dataset.type
   wx.navigateTo({
     url: '../../pages/basicart/basicart?type=' + type,
   })
  },

  sendPull:function(){
    wx.navigateTo({
      url: '../../pages/unit/unit',
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
 

  bindGetUserInfo: function (e) {
    var that = this
    var userInfo = e.detail.rawData

    me.getUserAhth(userInfo, (data) => {
    
      if (data.code == 201) {

        that._loadData();

        that.setData({
          authHidding: false,
          loadingHidden: true,
          status: 0
        })
      } else {
        that.setData({
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
  _loadData: function () {

    var that = this;
 
    me.roleStatus((data) => {  

    if (data.code == 201){


        var message    = data.data 
        var material   = message.material  //查看是否填写资料
        var type       = message.type   //类型


        if (type == 2){
          if (message.material ==0){
             message = [];
          }else{

            var speciality = message.speciality   //特长
            var occupation = message.occupation   //职位

            if (speciality != undefined || speciality != null ){
var check_tags = speciality.split(",");
message['tags_list'] = cache_list.handleCache(wx.getStorageSync('chace_record'),check_tags, 1, '#'); 
            }else{
                message['tags_list'] = '暂无资料';
            }
            if (occupation != undefined || speciality != null){
              message['occupation'] = cache_list.handleCache(wx.getStorageSync('chace_record'),occupation, 0); //行业
            } else{
                message['occupation'] = '暂无资料';
            }

            if (message.university == ''){
              message['university'] = '暂无资料';
            }
  
          }

          that.setData({
            message: message,
            type: type,
            authHidding: false,
            loadingHidden:true,
            material: material   //是否填写资料
          })

        }else{

          var speciality = message.speciality   //特长
          var occupation = message.occupation   //职位
    
          message['industry'] = cache_list.handleCache(wx.getStorageSync('chace_record'),message.industry, 0); //行业
          message['position'] = cache_list.handleCache(wx.getStorageSync('chace_record'),message.position, 0);   //职位
       
          that.setData({
            message: message,
            authHidding: false,
            loadingHidden: true,
            type:type,
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
    var that = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          that.setData({
            authHidding: true,
            loadingHidden: true
          })
        } else {
  
          console.log('授权成功')
          that._loadData();
        }
      }
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