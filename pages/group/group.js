// pages/group/group.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hidden:1,
    // 普通选择器
    array: ['不限', '短视频', '院线电影', '网络电影',"数字电影","电影","电视剧","网络剧","广告拍摄","MV","综艺节目","演出活动","话剧"],
    array1: ['不限', '一个月内开机', '三个月内开机', '半年内开机',' 半年以上开机'],
    
    array2: ['不限', ' 20岁以下', ' 20-30岁', '30-40岁', '40岁以上'],
    array3: ['不限', ' 北京', ' 横店', '其他'],
    array4: ['不限', ' 北京','上海', ' 横店', '其他'],
    array5: ['不限', ' 男演员', '女演员 ', '儿童演员 ', '特约演员', '跟组演员', '群众演员','特技替身'],
    array6: ['不限', ' 大卡司 ', '大平台 ', '大制作 ', '工作室筹备', '急聘', '角色众多', '名编剧', '启用新人', '热门IP', '有具体薪资', '有名导', '有人物小传', '招主演','中外合拍'],
    index: 0,
    index1:0,
    index2:0,
    index3:0,
    index4:0,
    index5:0,
    index6:0,
   arr:[
      {
        "type":"网络电影",
        "minute":"3分钟前",
        "date":"2019-10-01",
        "actor":"男演员",
        "actress":"女演员",
        "addressfirst":"北京",
        "addresssecond": "上海",
        "addressthird": "横店",
        "icon":"../../image/woman.png"
      },
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
    ]
  },
  detail(){
   wx.navigateTo({
     url: '../../pages/detail/detail',
   })
  },
  publish(){
   wx.navigateTo({
     url: '../../pages/publish/publish',
   })
  },
  // 显示隐藏
  show(e){
    var hide = e.currentTarget.dataset.type
    this.setData({
      hidden: !hide
    })
  },
  screen_hower: function (e) {
    this.setData({
      hidden: 1
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value,

    })
  },
  bindPickerChange1: function (e) {
    this.setData({
      index1: e.detail.value,

    })
  },
  bindPickerChange2: function (e) {
    this.setData({
      index2: e.detail.value,

    })
  },
   bindPickerChange3: function (e) {
    this.setData({
      index3: e.detail.value,
    })
  },
  bindPickerChange4: function (e) {
    this.setData({
      index4: e.detail.value,
    })
  },
  bindPickerChange5: function (e) {
    this.setData({
      index5: e.detail.value,
    })
  },
  bindPickerChange6: function (e) {
    this.setData({
      index6: e.detail.value,
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