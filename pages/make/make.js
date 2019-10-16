Page({
  data: {
    // tab切换  
    currentTab: 0,
    array:[
      { "text":"1竖图4横图",
        "image":"../../image/tupian.jpg"
      },{
        "text": "4竖图4横图",
        "image": "../../image/tupian.jpg"
      },{
        "text": "5竖图2横图",
        "image": "../../image/tupian.jpg"
      },{
        "text": "4竖图2横图",
        "image": "../../image/tupian.jpg"
      }
    ],
     array1: [
      {
        "text": "4竖图4横图",
        "image": "../../image/tupian.jpg"
      }, {
        "text": "5竖图2横图",
        "image": "../../image/tupian.jpg"
      }, {
        "text": "6竖图",
        "image": "../../image/tupian.jpg"
      }, {
        "text": "7竖图3横图",
        "image": "../../image/tupian.jpg"
      }
    ],
    array2: [
      {
        "text": "3竖图4横图",
        "image": "../../image/tupian.jpg"
      }, {
        "text": "1竖图4横图",
        "image": "../../image/tupian.jpg"
      }, {
        "text": "6竖图",
        "image": "../../image/tupian.jpg"
      }, {
        "text": "8竖图",
        "image": "../../image/tupian.jpg"
      }
    ],
  },
  swichNav: function (e) {
    console.log(e.target.dataset.current);
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
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
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
  },
  onReady: function () {
  // 生命周期函数--监听页面初次渲染完成
  },
  onShow: function () {
    // 生命周期函数--监听页面显示
  },
  onHide: function () {
  // 生命周期函数--监听页面隐藏
  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载
  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作
  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数
  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }
})