import { Basicgro } from 'basicgro-model.js';
var basicgro = new Basicgro(); //实例化 首页 对象
const app = getApp()
Page({
  data: {
    // 手机号
    phoneNumber: '',
    message: [],
    // 城市
    region: ['北京市', '北京市', '东城区'],
    // 身高
    multiArray: [
      ['14', '15', '16', '17', '18', '19', '20'],
      ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    ],
    //体重
    multiArray1: [
      ['3', '4', '5', '6', '7', '8', '9', '10'],
      ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    ],
    // 年龄
    multiArray2: [
      ['1', '2', '3', '4', '5', '6', '7', '8'],
      ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    ],
    // 职业
    array: ['演员', '模特', '主持人', '歌手'],
    objectArray: [
      {
        id: 0,
        name: '演员'
      },
      {
        id: 1,
        name: '模特'
      },
      {
        id: 2,
        name: '主持人'
      },
      {
        id: 3,
        name: '歌手'
      }
    ],
    index: 0,
    // 特长
    array1: ['运动', '舞蹈', '乐器', '戏曲', '武术', '书画 ', '曲艺', '语言', '声乐 ', '其他'],
    objectArray1: [
      {
        id: 0,
        name: '运动'
      },
      {
        id: 1,
        name: '舞蹈'
      },
      {
        id: 2,
        name: '乐器'
      },
      {
        id: 3,
        name: '戏曲'
      },
      {
        id: 4,
        name: '武术 '
      },
      {
        id: 5,
        name: '书画'
      },
      {
        id: 6,
        name: '曲艺 '
      },
      {
        id: 7,
        name: '语言'
      },
      {
        id: 8,
        name: '声乐 '
      },
      {
        id: 9,
        name: '其他'
      },
    ],
    index1: 0,
    // 简介
    isHidePlaceholder: false,
    // 上传图片
    fileList: [

    ],
    // text框的显示隐藏
    isHidePlaceholder: false,
  },
  // 城市
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  // 身高
  showPicker_03: function () {
    this.setData({
      isShow_03: true
    })
  },
  bindMultiPickerChange: function (e) {
    this.setData({
      multiIndex: e.detail.value,
      position: false
    })
  },
  bindMultiPickerColumnChange: function (e) {
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    console.log(data)
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            break;
          case 1:
            data.multiArray[1] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            break;
          case 2:
            data.multiArray[1] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            break;
          case 3:
            data.multiArray[1] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            break;
          case 4:
            data.multiArray[1] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            break;
          case 5:
            data.multiArray[1] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            break;
          case 6:
            data.multiArray[1] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            break;
        }
    }
    this.setData(data);
  },
  // 体重
  showPicker_04: function () {
    this.setData({
      isShow_04: true
    })
  },
  bindMultiPickerChange1: function (e) {
    this.setData({
      multiIndex1: e.detail.value,
      position: false
    })
  },
  bindMultiPickerColumnChange1: function (e) {
    var data = {
      multiArray1: this.data.multiArray,
      multiIndex1: this.data.multiIndex
    };
    console.log(data)
    data.multiIndex1[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex1[0]) {
          case 0:
            data.multiArray1[1] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            break;
          case 1:
            data.multiArray1[1] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            break;
          case 2:
            data.multiArray1[1] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            break;
          case 3:
            data.multiArray1[1] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            break;
          case 4:
            data.multiArray1[1] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            break;
          case 5:
            data.multiArray1[1] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            break;
          case 6:
            data.multiArray1[1] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            break;
        }
    }
    this.setData(data);
  },
  // 年龄
  showPicker_05: function () {
    this.setData({
      isShow_05: true
    })
  },
  bindMultiPickerChange2: function (e) {
    this.setData({
      multiIndex2: e.detail.value,
      position: false
    })
  },
  bindMultiPickerColumnChange2: function (e) {
    var data = {
      multiArray2: this.data.multiArray,
      multiIndex2: this.data.multiIndex
    };
    console.log(data)
    data.multiIndex2[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex2[0]) {
          case 0:
            data.multiArray2[1] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            break;
          case 1:
            data.multiArray2[1] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            break;
          case 2:
            data.multiArray2[1] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            break;
          case 3:
            data.multiArray2[1] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            break;
          case 4:
            data.multiArray2[1] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            break;
          case 5:
            data.multiArray2[1] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            break;
          case 6:
            data.multiArray2[1] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            break;
        }
    }
    this.setData(data);
  },
  // 职业
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  // 特长
  bindPickerChange1: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index1: e.detail.value
    })
  },
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
  // text框的显示隐藏
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

  onLoad: function (options) {
    var that = this
    var type = options.type

    that.setData({
      type:type
    })

  },

  /*
  获取手机号
*/
  getPhoneNumber: function (e) {
    var that = this
    //获取用户手机号
    var errMsg = e.detail.errMsg
    var msg = e.detail

    wx.login({
      success: function (res) {
        msg.code = res.code
        if (errMsg == 'getPhoneNumber:ok') {
          basicgro.getPhone(msg, (data) => {
            var data = JSON.parse(data);

            console.log(data)
            if (data.code == 201) {
              var data = JSON.parse(data.msg);
              that.setData({
                phoneNumber: data.phoneNumber
              })
            }
          })
        }
      }
    })
  },

  /*加载所有数据*/
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