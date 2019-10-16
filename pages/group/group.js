// 防止重复点击
const repeatclick = require('../../utils/repeatclick.js')
import { Group } from 'group-model.js';
var app = getApp();
var group = new Group(); //实例化 首页 对象

Page({
  data: {
    loadingHidden: false,
    hidden: 1,
    // 普通选择器
    arr: [{
        "name": "小时代",
        "type": "数字电影",
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
        "name": "亲爱的热爱的",
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
        "name": "哪吒",
        "type": "电影",
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
    ],
    banner: [{
      "image": "../../image/woman.png",
      "name": "小时代",
      "type": "数字电影",
      "date": "2019-10-01",
      "addressfirst": "北京",
      "addresssecond": "上海",
      "addressthird": "横店",
    }, {
      "image": "../../image/woman.png",
      "name": "亲爱的",
      "type": "数字电影",
      "date": "2019-10-01",
      "addressfirst": "北京",
      "addresssecond": "上海",
      "addressthird": "横店",
    }, {
      "image": "../../image/woman.png",
      "name": "热爱的",
      "type": "数字电影",
      "date": "2019-10-01",
      "addressfirst": "北京",
      "addresssecond": "上海",
      "addressthird": "横店",
    }, {
      "image": "../../image/woman.png",
      "name": "十月十三",
      "type": "数字电影",
      "date": "2019-10-01",
      "addressfirst": "北京",
      "addresssecond": "上海",
      "addressthird": "横店",
    }, {
      "image": "../../image/woman.png",
      "name": "最好的我们",
      "type": "数字电影",
      "date": "2019-10-01",
      "addressfirst": "北京",
      "addresssecond": "上海",
      "addressthird": "横店",
    }, {
      "image": "../../image/woman.png",
      "name": "一次就好",
      "type": "数字电影",
      "date": "2019-10-01",
      "addressfirst": "北京",
      "addresssecond": "上海",
      "addressthird": "横店",
    }, {
      "image": "../../image/woman.png",
      "name": "薛平贵",
      "type": "数字电影",
      "date": "2019-10-01",
      "addressfirst": "北京",
      "addresssecond": "上海",
      "addressthird": "横店",
    }, {
      "image": "../../image/woman.png",
      "name": "流星雨",
      "type": "数字电影",
      "date": "2019-10-01",
      "addressfirst": "北京",
      "addresssecond": "上海",
      "addressthird": "横店",
    }, {
      "image": "../../image/woman.png",
      "name": "我们",
      "type": "数字电影",
      "date": "2019-10-01",
      "addressfirst": "北京",
      "addresssecond": "上海",
      "addressthird": "横店",
    }
    ],
    column: [{
      "id": "100000",
      "title": "全部"
    }, {
      "id": "100001",
      "title": "不限"
    }, {
      "id": "100002",
      "title": "电影"
    }, {
      "id": "100003",
      "title": "电视剧"
    }, {
      "id": "100004",
      "title": "网剧"
    }, {
      "id": "100005",
      "title": "网大"
    }, {
      "id": "100006",
      "title": "微电影"
    }, {
      "id": "100007",
      "title": "竖屏剧"
    }, {
      "id": "100008",
      "title": "短视频"
    }, {
      "id": "100009",
      "title": "创意广告"
    }, {
      "id": "100010",
      "title": "音乐MV "
    }, {
      "id": "100011",
      "title": "动画"
    }, ],
    "dis":"none",
  },
  detail() {
    wx.navigateTo({
      url: '../../pages/detail/detail',
    })
  },
  publish() {
    wx.navigateTo({
      url: '../../pages/publish/publish',
    })
  },
  // 点击切换
  onTabsChange: function(e) {
    const {
      index
    } = e.detail
    // 当前项
    const item = this.data.column[index]
    const platform_id = item.id
    var msg = [];
    msg.platform_id = platform_id
    console.log(msg.platform_id)

    if (msg.platform_id == 100000) {
      msg.type = 0
    } else {
      msg.type = 1
    }
    this.setData({
      loadingHidden: false
    })

  },
  // 显示隐藏
  show(e) {
    var hide = e.currentTarget.dataset.type
    this.setData({
      hidden: !hide
    })
  },
  screen_hower: function(e) {
    this.setData({
      hidden: 1
    })
  },

  onPageScroll: function (res){
    var scrolltop = res.scrollTop
    if (scrolltop>50){
      this.setData({
        "dis":"block"
      })
    }else {
      this.setData({
        "dis": "none"
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that=this
    that.setData({
      loadingHidden:true
    })
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