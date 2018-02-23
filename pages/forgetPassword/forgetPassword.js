const postCode = "https://app.zrqgj.cn/steward_api/steward/acquiremsg/findCode"
const updatePwdUrl = "https://app.zrqgj.cn/steward_api/steward/user/forgetPwd"
var md5 = require("../../utils/md5.js");

var sedding = false;
var timeVal = 0;//倒计时

//方法---------------------------------------------------------------------
var timer = function (that) {//验证码倒计时
  timeVal--;
  if (timeVal <= 0) {
    timeVal = 60;
    sedding = false;
    that.setData({
      codeBtnText: '重新获取'
    })
  } else {
    that.setData({
      codeBtnText: '重新获取(' + timeVal + ')'
    })
    setTimeout(function () {
      timer(that)
    }, 1000);
  }
}

Page({
  data: { 
    codeBtnText: '点击接收',
    phone:'',
    code:'',
    password:'',
    showhide: true,
    passwordStatus: "show"
  },

  usernameInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  codeInput: function (e) {
    this.setData({
      code: e.detail.value
    })
  },

  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  //获取验证码请求
  getCodeBtnClick: function (e) {
    var self = this
    if (self.data.phone == null || self.data.phone == '') {
      wx.showToast({
        title: '请输入手机号',
        icon: "none"
      })
      return
    }
    if (self.data.userName.length !== 11) {
      wx.showToast({
        title: '请输入正确的手机号码',
        icon: "none"
      })
      return
    }
    if (sedding) { return; }
    wx.showLoading({
      title: '获取中',
      mask: true
    })

    wx.request({
      url: postCode,
      data: {
        phone: self.data.phone,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: 'POST',
      success: function (result) {
        wx.hideLoading();
        var rdata = result.data;
        console.log(JSON.stringify(rdata));
        if (rdata.code == 'success') {//发送成功
          wx.showToast({
            title: "发送成功",
            icon: "success"
          })
          sedding = true;
          timeVal = 60;
          timer(self);
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



  //忘记密码
  loginBtnClick: function (e) {
    var self = this
    if (self.data.phone == null || self.data.phone == '') {
      wx.showToast({
        title: '请输入手机号',
        icon: "none"
      })
      return
    }


    if (self.data.userName.phone !== 11) {
      wx.showToast({
        title: '请输入正确的手机号码',
        icon: "none"
      })
      return
    }
    if (self.data.code == null || self.data.code == '') {
      wx.showToast({
        title: '请输入验证码',
        icon: "none"
      })
      return
    }
    if (self.data.password == null || self.data.password == '') {
      wx.showToast({
        title: '请输入密码',
        icon: "none"
      })
      return
    }
    wx.showLoading({
      title: '',
      mask: true
    })
    wx.request({
      url: updatePwdUrl,
      data: {
        account: self.data.phone,
        pwd: md5.hex_md5(self.data.userPwd),
        code: self.data.code,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: 'POST',
      success: function (result) {
        wx.hideLoading();
        var rdata = result.data;
        console.log(JSON.stringify(rdata));
        if (rdata.code == 'success') {//发送成功
          wx.showToast({
            title: "修改成功",
            icon: "success"

          }),
          wx.navigateBack({
            delta: 1
          })
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

  //点击显示或隐藏密码
  seePassword: function (e) {
    var that = this;
    var statustex = this.data.passwordStatus;
    if (statustex == "show") {
      this.setData({
        passwordStatus: "hide"
      })
    } else {
      this.setData({
        passwordStatus: "show"
      })
    }
    this.setData({
      showhide: !this.data.showhide
    })
  }
})