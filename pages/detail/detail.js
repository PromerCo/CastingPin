import { Detail } from 'detail-model.js';
var app = getApp();
var detail = new Detail(); //实例化 首页 对象
var cache_list = require('../../utils/package.js');

Page({
  data: {
    list: [],
    focus: false,
    loadingHidden: false,
    is_collect:0,
    enroll_list:[],
    agree:'报名',
    notice_id:'',
    isIOS: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  var that = this  
  // 缓存数据
  var notice_id = options.id

  var arranger_id = options.arranger_id

  var msg = [];

  msg['notice_id'] = notice_id

  msg['arranger_id'] = arranger_id



  //记录浏览量
  that._loadData(notice_id)
  
  detail.list_details(msg, (data) => {
    if (data.code == 201) {
      var message = data.data

      console.log(message)

      message['occupation'] = cache_list.handleCache(wx.getStorageSync('chace_record'),message['occupation'], 0); //职业
      message['position'] = cache_list.handleCache(wx.getStorageSync('chace_record'),message['position'], 0); //职位
      message['age'] = cache_list.handleCache(wx.getStorageSync('chace_record'),message['age'], 0); //年龄范围
      message['speciality'] = cache_list.handleCache(wx.getStorageSync('chace_record'),message['speciality'].split(","),1,'#'); //特长
      var enroll = JSON.parse(JSON.parse(message['enroll']))
    
      if (enroll == null || enroll==undefined){
           enroll = [];
      }
      
      that.showEditorReady() //炫染数据
      that.setData({
        list: message,
        enroll_list: enroll,
        is_collect: message['is_collect'],
        enroll_number: message['enroll_number'],
        notice_id: notice_id,
        loadingHidden: true
      })

     
    }
  })
  },

  collect: function (e) {
    var that = this
    var msg = [];
    msg.collect = e.currentTarget.dataset.type
    msg.notice_id = that.data.notice_id
    detail.collect(msg, (data) => {
      if (data.code == 201) {
        if (data.data == 0) {
          that.setData({
            is_collect: data.data,
          })
        } else {
          that.setData({
            is_collect: data.data,
          })
        }
      }
    })
  },
  _loadData: function (e) {
    //记录浏览量
    detail.showAgree(e, (data) => {
      console.log(data)
    })
  },

  agree: function (e){
    //ID
    var that = this
    let notice_id = e.currentTarget.dataset.id
    var image_list = that.data.enroll_list
    detail.agree(notice_id, (data) => {
      var list = data
      if (list.code == 200){
        wx.showToast({
          title: list.msg,
          icon: 'none',
          duration: 1000,
          mask: true,
        }) 
      }else if (list.code == 201){
        //报名成功
        var img = { 'avatar_url': list.data }; 
        image_list.push(img)
      
        that.setData({
          is_enroll: 1,
          enroll_list: image_list,
          enroll_number: parseInt(that.data.list.enroll_number) + 1,
          agree: '已报名'
        })
      } else if (list.code == 417) {
        wx.showModal({
          title: list.msg,
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
          console.log(123)
      }
    })
  },


  /*
  编辑器
 */
  updatePosition(keyboardHeight) {
    const toolbarHeight = 100
    const { windowHeight, platform } = wx.getSystemInfoSync()
    let editorHeight = keyboardHeight > 0 ? (windowHeight - keyboardHeight - toolbarHeight) : windowHeight
    this.setData({ editorHeight, keyboardHeight })
  },
  calNavigationBarAndStatusBar() {
    const systemInfo = wx.getSystemInfoSync()
    const { statusBarHeight, platform } = systemInfo
    const isIOS = platform === 'ios'
    const navigationBarHeight = isIOS ? 44 : 48
    return statusBarHeight + navigationBarHeight
  },

//  onEditorReady() {
  showEditorReady() {

    console.log('嘻嘻哈哈')
    const that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context
      var describe = that.data.list['profile']

      console.log(describe)

      that.editorCtx.setContents({
        html: describe,
        success: (res) => {
          console.log(res)
        },
        fail: (res) => {
          console.log(res)
        }
      })

    }).exec()

  },



  bindinput: function (e) {
    var that = this
    var info = e.detail.html
    that.setData({
      details: info
    })

  },

  bindfocus: function (e) {
    var that = this
    var info = e.detail.html
    that.setData({
      details: info
    })
  },

  blur() {
    this.editorCtx.blur()
  },
  format(e) {
    console.log(e)
    let { name, value } = e.target.dataset
    if (!name) return
    this.editorCtx.format(name, value)

  },
  onStatusChange(e) {
    const formats = e.detail
    console.log(formats)

    this.setData({ formats })
  },
  insertDivider() {
    this.editorCtx.insertDivider({
      success: function () {
        console.log('insert divider success')
      }
    })
  },
  clear() {
    this.editorCtx.clear({
      success: function (res) {
        console.log("clear success")
      }
    })
  },
  removeFormat() {
    this.editorCtx.removeFormat()
  },
  insertDate() {
    const date = new Date()
    const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    this.editorCtx.insertText({
      text: formatDate
    })
  },
  insertImage() {
    const that = this
    wx.chooseImage({
      count: 1,
      success: function (res) {

        that.editorCtx.insertImage({
          src: res.tempFilePaths[0],
          data: {
            id: 'abcd',
            role: 'god'
          },
          width: '100%',
          success: function (e) {
            console.log(e)

          }
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