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
    },
    audioAction: {
      method: 'pause'
    },
    // 视屏
    src: '',
    // swiper
    background: [
      {
        "image": 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=584453011,1889633233&fm=26&gp=0.jpg',
      },{
        "image": 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=186171598,1892413795&fm=26&gp=0.jpg',
      },{
        "image": 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1077137436,1609348946&fm=26&gp=0.jpg',
      }
    ],
    indicatorDots: true,
    vertical:false,
    autoplay: false,
    circular: true,
    interval: 1000,
    duration: 500,
    background1: [
      {
        "image1": 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=584453011,1889633233&fm=26&gp=0.jpg',
      }, {
        "image1": 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=186171598,1892413795&fm=26&gp=0.jpg',
      }, {
        "image1": 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1077137436,1609348946&fm=26&gp=0.jpg',
      }
    ],
    indicatorDots1: true,
    vertical1: false,
    autoplay1: false,
    circular1: true,
    interval1: 1000,
    duration1: 500,
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