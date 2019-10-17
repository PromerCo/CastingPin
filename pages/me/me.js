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
    var that= this

    me.cutRole(bol, (data) => {

      if (data.code == 201){
        var type = data.data.type
        var message = data.data
        var material = data.data.material
        if (type == 1){
          var chaceRecord = wx.getStorageSync('chace_record')
          var industry = message.industry   //行业
          var position = message.position   //职位
          for (var i = 0; i <= chaceRecord.length - 1; i++) {
            if (chaceRecord[i]['code'] == industry) {
              var industry = chaceRecord[i]['name']
            } else if (chaceRecord[i]['code'] == position) {
              var position = chaceRecord[i]['name']
            }
          }

          message['industry'] = industry //行业
          message['position'] = position //职位
          that.setData({
            message: message,
            type: type,
            authHidding: false,
            loadingHidden: true,
            material: material   //是否填写资料
          })

        }else{
          //艺人 
          var speciality = data.data.speciality   //特长
          var occupation = data.data.occupation   //职位
          //数组转字符串
          var cache_speciality = wx.getStorageSync('chace_record')
          var check_tags = speciality.split(",");
          // 特长
          let tags_list = [];
          for (var i = 0; i <= check_tags.length; i++) {
            for (var j = 0; j < cache_speciality.length; j++) {
              if (cache_speciality[j]['code'] == check_tags[i]) {

                tags_list.push(cache_speciality[j]['name'])

              }
            }
            var speciality = tags_list.join('#');
          }

          for (var i = 0; i <= cache_speciality.length - 1; i++) {
            if (cache_speciality[i]['code'] == occupation) {
              var occupation = cache_speciality[i]['name']
            }

          }

          message['tags_list'] = speciality //特长
          message['occupation'] = occupation //职位

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
  basicart:function(e){


    var type = e.currentTarget.dataset.type

   wx.navigateTo({
     url: '../../pages/basicart/basicart?type=' + type,
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
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
           that.setData({
            authHidding: true,
            loadingHidden: true
          })

        } else {
          that._loadData();
        }
      }
    })
  },

  bindGetUserInfo: function (e) {
    var that = this
    var userInfo = e.detail.rawData


    me.getUserAhth(userInfo, (data) => {
    
      console.log(data)
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
  
    var chaceRecord = wx.getStorageSync('chace_record')  //缓存数据

    if (data.code == 201){
        var material = data.data.material  //查看是否填写资料
        var type = data.data.type   //类型
        var message = data.data 
        if (type == 2){
          //艺人 
          var speciality = data.data.speciality   //特长
          var occupation = data.data.occupation   //职位
          //数组转字符串
          var cache_speciality = wx.getStorageSync('chace_record')
          var check_tags = speciality.split(",");
          // 特长
          let tags_list = [];
          for (var i = 0; i <= check_tags.length; i++) {
            for (var j = 0; j < cache_speciality.length; j++) {
              if (cache_speciality[j]['code'] == check_tags[i]) {

                tags_list.push(cache_speciality[j]['name'])

              }
            }
            var speciality = tags_list.join('#');
          }

          for (var i = 0; i <= cache_speciality.length - 1; i++) {
            if (cache_speciality[i]['code'] == occupation) {
              var occupation = cache_speciality[i]['name']
            }
          }

          message['tags_list'] = speciality //特长
          message['occupation'] = occupation //职位
          
          that.setData({
            message: message,
            type: type,
            authHidding: false,
            loadingHidden:true,
            material: material   //是否填写资料
          })

        }else{
          console.log(123)
         //统筹
          var industry = message.industry   //行业
          var position = message.position   //职位
          for (var i = 0; i <= chaceRecord.length - 1; i++) {
            if (chaceRecord[i]['code'] == industry) {
              var industry = chaceRecord[i]['name']
            } else if (chaceRecord[i]['code'] == position){
              var position = chaceRecord[i]['name']
            }
          }

          message['industry'] = industry //行业
          message['position'] = position //职位

          console.log(message)


          that.setData({
            message: data.data,
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