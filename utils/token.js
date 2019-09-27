// 引用使用es6的module引入和定义
// 全局变量以g_开头
// 私有函数以_开头
import { Config } from 'config.js';
class Token {
    constructor() {
        this.verifyUrl = Config.restUrl + 'token/verify';  //验证 token
        this.tokenUrl = Config.restUrl + 'token/token';   //获取token
    }
    verify() {
        var token = wx.getStorageSync('token');
        console.log(token)
        if (!token) {
            this.getTokenFromServer();
        }
        else {
            this._veirfyFromServer(token);
        } 
    }
    _veirfyFromServer(token) {
        var that = this;
        wx.request({
            url: that.verifyUrl,
            method: 'POST',
            data: {
                token: token
            },
            success: function (res) {
               var valid = res.data.data.valid;
                if(!valid){
                    that.getTokenFromServer();
                }
            }
        })
    }
    



    getTokenFromServer(callBack) {
      var that = this;
      
      wx.login({
        success: function (res) {
          console.log(res.code)
          wx.request({
            url: that.tokenUrl,
            method: 'POST',
            data: {
              code: res.code
            },
            success: function (res) {
              console.log(res.data.data.token)
              wx.setStorageSync('token', res.data.data.token);
              callBack && callBack(res.data.data.token);
            }
          })
        }
      })
     
    }
}

export {Token};