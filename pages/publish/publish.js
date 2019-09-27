Page({
  data: {
    array: ['不限 ', '院线电影 ', ' 网络电影 ', '数字电影', '电影 ', '电视剧', ' 网络剧', '广告拍摄', 'MV', '综艺节目', '演出活动 ', ' 话剧'],
    array1: ['不限 ', '男演员', ' 女演员 ', ' 儿童演员 ', ' 特约演员', ' 跟组演员', '群众演员 ','特技替身'],
    index:0,
    index1:0,
    value2: [],
    displayValue2: '请选择',
    lang: 'zh_CN',
    isHidePlaceholder: false,
    // 上传图片
    fileList: [
    
    ]
  },
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  bindPickerChange1: function (e) {
    this.setData({
      index1: e.detail.value
    })
  },
  onChange(e) {
    console.log(e)
    const { key, values } = e.detail
    const lang = values[key]

    this.setData({
      lang,
    })
  },
  setValue(values, key, mode) {
    this.setData({
      [`value${key}`]: values.value,
      [`displayValue${key}`]: values.label,
      // [`displayValue${key}`]: values.displayValue.join(' '),
    })
  },
  onConfirm(e) {
    const { index, mode } = e.currentTarget.dataset
    this.setValue(e.detail, index, mode)
    console.log(`onConfirm${index}`, e.detail)
  },
  onVisibleChange(e) {
    this.setData({ visible: e.detail.visible })
  },
  onClick() {
    this.setData({ visible: true })
  },
  // 上传图片
  onChange(e) {
    console.log('onChange', e)
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
    console.log('onSuccess', e)
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
  // 
  getTextareaInput: function (e) {
    var that = this;
    if (e.detail.cursor > 0) {
      that.setData({
        isHidePlaceholder: true
      })
    } else {
      that.setData({
        isHidePlaceholder: false
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})