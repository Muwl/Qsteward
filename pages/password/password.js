var md5 = require("../../utils/md5.js");
const updatePwdUrl = "http://101.132.173.126:80/steward_api/steward/user/modifPwd"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oldPwd:'',
    newPwd: '',
    newRePwd: '',
  },

  oldPwdInput:function(e){
    this.setData({
      oldPwd:e.detail.value
    })
  },

  newPwdInput: function (e) {
    this.setData({
      newPwd: e.detail.value
    })
  },

  newRePwdInput: function (e) {
    this.setData({
      newRePwd: e.detail.value
    })
  },

  //修改密码
  updatePwdBtnClick: function (e) {
    var self = this
    var user = wx.getStorageSync('user');
    if (self.data.oldPwd == null || self.data.oldPwd == '') {
      wx.showToast({
        title: '请输入原密码',
        icon: "none"
      })
      return
    }
    if (self.data.newPwd == null || self.data.newPwd == '') {
      wx.showToast({
        title: '请输入新密码',
        icon: "none"
      })
      return
    }
    if (self.data.newPwd != self.data.newRePwd ) {
      wx.showToast({
        title: '两次输入密码不一致',
        icon: "none"
      })
      return
    }
    wx.showLoading({
      mask: true
    })
    wx.request({
      url: updatePwdUrl,
      data: {
        userid: user.id,
        account: user.accountNo,
        formerPwd: md5.hex_md5(self.data.oldPwd),
        Pwd: md5.hex_md5(self.data.newPwd),
        token: user.token,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: 'POST',
      success: function (result) {
        wx.hideLoading();
        var rdata = result.data;
        console.log(JSON.stringify(rdata));
        if (rdata.code == 'success') {//登录成功
          wx.showToast({
            title: "修改成功",
            icon: "success"
          })
          wx.clearStorage()
          wx.redirectTo({ url: "../login/login" })
        } else {
          wx.showToast({
            title: rdata.message,
            icon: "none"
          })
        }
      },

      fail: function ({ errMsg }) {
        wx.hideLoading();
        self.setData({
          loading: false
        })
      }
    })
  },
})