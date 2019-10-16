const app = getApp();

import { school } from '../../utils/school.js';  //学校

import { School } from 'school-model.js';

var xuexiao = new School(); //实例化 首页 对象


Page({
  data: {
    inputValue: "",
    bindSource: [],
    showInputStatus: !1,
    list:school,
  },

  onLoad: function (options) {

    var that = this
    var school = options.school

    that.setData({
      inputValue: school
    })
  

  },
  inputBind: function (e) {
    var that = this
    var school = e.detail.value;

    var school_list = this.data.list

    var deposit = [];

    school_list.forEach(function (index) {
      -1 != index.indexOf(school) && deposit.push(index);
    }),

      this.setData({
      bindSource: deposit,
        inputValue: school,
        showInputStatus: !0
      });
  },
  
  itemtap: function (t) {
    var that = this
    wx.navigateBack({
      delta: 1
    });
    that.setData({
      inputValue: t.target.id,
      bindSource: []
    })

  },
  onUnload: function () {
    var that = this
    var schoolName = that.data.inputValue
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];


    var msg = [];

    msg.push({ "university": schoolName })
    
    xuexiao.saveData(msg, (data) => {

      console.log(data)

      prevPage.setData({
        schoolName: schoolName,
      })

    })

    



  },
});