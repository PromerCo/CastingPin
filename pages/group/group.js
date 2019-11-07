// 防止重复点击
const repeatclick = require('../../utils/repeatclick.js');
import { Group } from 'group-model.js';
var app = getApp();
var group = new Group(); //实例化 首页 对象
var cache_list = require('../../utils/package.js');
//缓存
Page({
  data: {
    loadingHidden: false,
    hidden: 1,
    //普通选择器
    list: [],
    banner: [],
    column: [],
    start_page: 0,
    dis:"none",
    type: 100600
  },
  detail:function(e) {
    var id = e.currentTarget.dataset.id  //通告Id
    var arranger_id = e.currentTarget.dataset.arranger_id  //统筹ID

    wx.navigateTo({
      url: '../../pages/detail/detail?id=' + id + "&arranger_id=" + arranger_id,
    })
  },
  publish:function() {
    group.getCast( (data) => {
      if(data.code == 201){
        var script = encodeURIComponent(JSON.stringify(data.data))
        wx.navigateTo({
          url: '../../pages/publish/publish?script=' + script,
        })
      }else{
        wx.showModal({
          title: "您尚未填写剧组资料",
          content: '确定跳转到剧组页面么',
          showCancel: true,//是否显示取消按钮
          success: function (res) {
            if (!res.cancel) {
              wx.navigateTo({
                url: '../../pages/cast/cast'
              })
            } 
          }
        })
        }
    })
  },
  // 点击切换
  onTabsChange: function(e) {

    var that = this
    const { index } = e.detail
    // 当前项
    const item = this.data.column[index]
    const type = item.code



    var start_page = that.data.start_page

    that._loadData(0,type,1);


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
        dis:"block"
      })
    }else {
      this.setData({
        dis: "none"
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    var that = this
    var start_page = that.data.start_page
    that._loadData(start_page, 100600,0);

  },

  _loadData: function (start_page = 0, type = 100600,status = 0){
    var that = this
    var msg = []
    msg['type'] = type
    msg['start_page'] = start_page
    group.getlist(msg,(data) => {
      var material = data.data.material
      var cache    = wx.getStorageSync('chace_record');
      if (data.code == 201){
          var message = data.data 
          var list = that.data.list;
          if (status == 0) {
            if (message.length != 0){
              for (var i = 0; i < message.length; i++) {
                list.push(message[i])
              }
            } else{
               return   false
            }
          } else{
              list = message
  
          }

        if (list.length != 0){
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
        }else{
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
  
      }else{
        that.setData({
          loadingHidden: true,
  
        })
      }

    })

  },


  // option: function (type = 100600){

  //   var that = this
  //   var ava_list = []  //最新 
  //   var ata_list = []
  //   var msg = [];
  //   msg['type'] = type
  //   that.setData({
  //     type: type
  //   })
  //   group.getlist(msg, (data) => {
  //     var message = data.data

  //     var material = data.data.material
  //     var cache = wx.getStorageSync('chace_record');

  //     if(message.length == 0){
  //       that.setData({
  //         loadingHidden: true,
  //         column: cache_list.columnCache(cache),
  //         ata_list: [],
  //         ava_list: [],
  //       })
  //     }else{

  //     message.forEach(function (item, index) {
  //       if (isNumber(item['occupation'])) {
  //         message[index]['occupation'] = cache_list.handleCache(cache, item['occupation'], 0); //职位
  //       }
  //       if (isNumber(item['age'])) {
  //         message[index]['age'] = cache_list.handleCache(cache, item['age'], 0); //年龄
  //       }
  //       if (isNumber(item['speciality'].split(',')[0])) {
  //         message[index]['speciality'] = cache_list.handleCache(cache, item['speciality'].split(','), 1, '#');
  //       }
  //       if (index < 3) {
  //         ava_list.push(item)
  //         that.setData({
  //           loadingHidden: true,
  //           column: cache_list.columnCache(cache),
  //           ava_list: ava_list,
          
  //         })
  //       } else {
  //         ata_list.push(item)
  //         that.setData({
  //           loadingHidden: true,
  //           column: cache_list.columnCache(cache),
  //           ata_list: ata_list,
      
  //         })
  //       }
  //   })
  //     }
  //   })

  // },

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
    wx.showNavigationBarLoading() //在标题栏中显示加载
    var that = this
    var start_page = 0
    var type = that.data.type

    this._loadData(start_page,type,1);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var that = this;
    var start_page = that.data.start_page
    var start_page = start_page + 8 
    var type = that.data.type
    console.log(start_page)
    that._loadData(start_page,type,0);

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})

function  isNumber(val) {

      var  regPos = /^\d+(\.\d+)?$/; //非负浮点数

      var  regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数

      if (regPos.test(val) || regNeg.test(val)) {

            return  true;

          }  else  {

            return  false;

          }

    }
