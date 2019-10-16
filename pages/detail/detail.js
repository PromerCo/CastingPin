import { Detail } from 'detail-model.js';
var app = getApp();
var detail = new Detail(); //实例化 首页 对象
Page({
  data: {
    arr: [
      {
        "type": "网络电影",
        "minute": "3分钟前",
        "date": "2019-10-01",
        "actor": "男演员",
        "actress": "女演员",
        "addressfirst": "北京",
        "addresssecond": "上海",
        "addressthird": "横店",
        "icon": "../../image/woman.png"
      },
    ],
    focus: false,
    // 上传图片
    fileList: [{
      uid: 0,
      status: 'uploading',
      url: 'http://cdn.skyvow.cn/qrcode.jpg',
    },
    {
      uid: 1,
      status: 'done',
      url: 'http://cdn.skyvow.cn/qrcode.jpg',
    },
    {
      uid: 2,
      status: 'error',
      url: 'http://cdn.skyvow.cn/qrcode.jpg',
    }
    ],
  },
  // 上传图片
  onChange(e) {
    const { file } = e.detail
    if (file.status === 'uploading') {
      this.setData({
        progress: 0,
      })
      wx.showLoading()
    } else if (file.status === 'done') {
      this.setData({
        imageUrl: file.url,
      })
    }
  },
  onSuccess(e) {
    this.setData({
      url: e.detail.file.url
    })
  },
  onFail(e) {
    console.log('onFail', e)
  },
  onComplete(e) {
    console.log('onComplete', e)
    wx.hideLoading()
  },
  onProgress(e) {
    console.log('onProgress', e)
    this.setData({
      progress: e.detail.file.progress,
    })
  },
  onPreview(e) {
    console.log('onPreview', e)
    const { file, fileList } = e.detail
    wx.previewImage({
      current: file.url,
      urls: fileList.map((n) => n.url),
    })
  },
  onRemove(e) {
    const { file, fileList } = e.detail
    wx.showModal({
      content: '确定删除？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            fileList: fileList.filter((n) => n.uid !== file.uid),
          })
        }
      },
    })
  },
  bindTextAreaBlur: function (e) {
    console.log(e.detail.value)
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