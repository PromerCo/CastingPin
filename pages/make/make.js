
import { Make } from 'make-model.js';
var make = new Make();
var app = getApp();


Page({
  data: {
    // tab切换  
    currentTab: 0,
    url: app.globalData.url,
    img_list:[],
    loadingHidden: 0,
    fileList: [
    ],
    file_img:''
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
  // 上传图片
 
  onChange(e) {

  
    // wx.uploadFile({
    //   url: url + "/v1/alioss/index",
    //   filePath: file.url,
    //   name: 'file',
    //   header: {
    //     "Content-Type": "multipart/form-data",
    //     'accept': 'application/json'
    //   },
    //   success: function (res) {
    //     console.log('image：' + res.data)
    //   }
    // })

  },
  onSuccess:function(e){
   
      var that  =this
      var file = e.detail.file
      var url = that.data.url
      var img_list = that.data.img_list


      wx.uploadFile({
      url: url + "/v1/alioss/index",
      filePath: file.url,
      name: 'file',
      header: {
        "Content-Type": "multipart/form-data",
        'accept': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        img_list.push(res.data) 
      }
    })
  },

  uploadImg:function(e){
    var that = this
    var img_list = that.data.img_list

    var img_str =  img_list.join(',')

    var msg = [];
    msg['image'] = img_str
    msg['type']  = 0

    make.getImage(msg, (data) => {

      console.log(data.data)
      that.setData({
        file_img: data.data,
        loadingHidden:1
      })


    })
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