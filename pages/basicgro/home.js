const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: ["https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=4114673236,1871263362&fm=58&s=932064A454D3DBF7A0242893030090CA", 
    "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3527165871,1016449403&fm=58&s=787B20C402B38BC456651C8D0300E088", 
    "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=10509635,2348785668&fm=58&s=BD21A019475243D4C6A5A6C6030070BF", 
    "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3327436489,1013447152&fm=58&s=79030D9C4CD095E9123C64870300F0E0"
    ],
    xindex: 0,
    start_page: 0,
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
    group.getlist(msg, (data) => {
      var material = data.data.material
      var cache = wx.getStorageSync('chace_record');
      if (data.code == 201) {
        var message = data.data
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
            if (isNumber(item['occupation'])) {
              list[index]['occupation'] = cache_list.handleCache(cache, item['occupation'], 0); //职位
            }
            if (isNumber(item['age'])) {
              list[index]['age'] = cache_list.handleCache(cache, item['age'], 0); //年龄
            }
            if (isNumber(item['speciality'].split(',')[0])) {
              list[index]['speciality'] = cache_list.handleCache(cache, item['speciality'].split(','), 1, '#');
            }
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