import { Artdel } from 'artdel-model.js';
var artdel = new Artdel(); //实例化 首页 对象
// 缓存数据
const cache_list = require('../../common/package.js');

const app = getApp()
Page({
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  inputValue: '',
  /**
   * 页面的初始数据
   */
  data: {
    current: {
      poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
      name: '此时此刻',
      author: '许巍',
      src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
      loadingHidden: false,
    },
    audioAction: {
      method: 'pause'
    },
    // 视屏
    src: '',
    indicatorDots: true,
    vertical:false,
    autoplay: false,
    circular: true,
    interval: 1000,
    duration: 500,
    list:[],
    indicatorDots1: true,
    vertical1: false,
    autoplay1: false,
    circular1: true,
    interval1: 1000,
    duration1: 500,
    follow: '关注',
    status: 0,
    follow_number: 0,
    invite: [],

  },
  // 音频
  audioPlayed: function (e) {
    console.log('audio is played')
  },
  audioTimeUpdated: function (e) {
    this.duration = e.detail.duration;
  },

  timeSliderChanged: function (e) {
    if (!this.duration)
    return;
    var time = this.duration * e.detail.value / 100;
    this.setData({
      audioAction: {
        method: 'setCurrentTime',
        data: time
      }
    });
  },
  playbackRateSliderChanged: function (e) {
    this.setData({
      audioAction: {
        method: 'setPlaybackRate',
        data: e.detail.value
      }
    })
  },

  playAudio: function () {
    this.setData({
      audioAction: {
        method: 'play'
      }
    });
  },
  pauseAudio: function () {
    this.setData({
      audioAction: {
        method: 'pause'
      }
    });
  },
  // 视频
  bindPlay: function () {
    this.videoContext.play()
  },
  bindPause: function () {
    this.videoContext.pause()
  },
  videoErrorCallback: function (e) {
    console.log('视频错误信息:')
    console.log(e.detail.errMsg)
  },
  // swiper1
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let cast_id = options.cast_id
    artdel.getDetails(cast_id,(data) => {

      var message = data.data

      console.log(message) 



  

      var techang = message['speciality'];

      if (techang != null || techang!=undefined){
        message['speciality'] = cache_list.handleCache(message['speciality'], 1, '#'); //特长
      }else{
        message['speciality'] = '暂无资料'
      }
    
  
      message['occupation'] = cache_list.handleCache(message['occupation'], 0); //职位

      var invite_number = message['invite_number']

      if (message.invite) {
        var invite = JSON.parse(JSON.parse(message.invite));
      } else {
        var invite = [];
      }

      if (message.status == 0){
        that.setData({
          list: message,
          status: 1,
          follow: '关注',
          invite: invite,
          follow_number: message['follow_number'],
          loadingHidden:true,
          invite_number: invite_number
        })
      }else{
        that.setData({
          list: message,
          status:0,
          follow: '取消关注',
          invite: invite,
          follow_number: message['follow_number'],
          loadingHidden: true,
          invite_number: invite_number
        })
      }
      

    })
  },

  bindFollow:function(e){
    var that = this
    var arranger_id = e.currentTarget.dataset.id    //被关注者ID
    var status = e.currentTarget.dataset.status     //关注状态
    var msg = [];
    msg['arranger_id'] = arranger_id
    msg['status']      = status

    var follow_number = that.data.follow_number
  
    artdel.follow(msg, (data) => {
        console.log(data)

        if(data.code == 201){
          var message = data.data
          
          if (message == 1){
            that.setData({
              status: 0,
              follow: '取消关注',
              follow_number: parseInt(follow_number) + 1

            })
          }else{
            that.setData({
              status: 1,
              follow: '关注',
              follow_number: parseInt(follow_number) - 1
            })
          }
  
        }else{
           console.log(data) 
        }
    })
  },

  /*
   邀请
  */
  invite:function(e){
    var that = this
    var arranger_id = e.currentTarget.dataset.id    //被邀请

    console.log(arranger_id)

    var image_list = that.data.invite

    artdel.invite(arranger_id, (data) => {

      console.log(data)

      if (data.code == 201) {


        var img = { 'avatar_url': data.data };
        image_list.push(img)

        that.setData({
          invite: image_list,
          invite_number: parseInt(that.data.invite_number) + 1,
          replace: '已邀请'
        })
      } else if (data.code == 412) {
  

        wx.showModal({
          title: data.msg,
          content: '确定跳转到身份切换页面吗？',
          showCancel: true,//是否显示取消按钮
          success: function (res) {
            if (res.cancel) {
              console.log('取消')
            } else {
              wx.switchTab({
                url: '/pages/me/me'
              })

            }
          }
        })
      }else{
        wx.showToast({
          title: data.msg,
          icon: 'none',
          duration: 1000,
          mask: true,
        })
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