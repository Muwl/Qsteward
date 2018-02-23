const postCode = "https://app.zrqgj.cn/steward_api/steward/acquiremsg/findCode"
const loginUrl = "https://app.zrqgj.cn/steward_api/steward/user/login"
const regUrl = "https://app.zrqgj.cn/steward_api/steward/user/addUser"
const ImgUrl = "https://app.zrqgj.cn/steward_api/resource/goldccm/user/";
var md5 = require("../../utils/md5.js");
var sedding =false;
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
    userName: '',
    userPwd: '',
    userRePwd:'',
    verificateCode:'',
    recommendCode: '',
    codeBtnText:'点击接收',
    showhide: true,
    passwordStatus: "show",
    showhide1: true,
    passwordStatus1: "show"
  },

  //获取用户输入的用户名
  usernameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },

  //获取用户输入的密码
  passwordInput: function (e) {
    this.setData({
      userPwd: e.detail.value
    })
  },

  //获取用户输入的确认密码
  passwordReInput: function (e) {
    this.setData({
      userRePwd: e.detail.value
    })
  },

  //获取用户输入的验证码
  codeInput: function (e) {
    this.setData({
      verificateCode: e.detail.value
    })
  },
  //获取用户输入的验证码
  recommendInput: function (e) {
    this.setData({
      recommendCode: e.detail.value
    })
  },

  //获取验证码请求
  getCodeBtnClick: function (e) {
    var self = this
    if (self.data.userName == null || self.data.userName == '') {
      wx.showToast({
        title: '请输入手机号',
        icon: "none"
      })
      return
    }
    if (self.data.userName.length!==11){
      wx.showToast({
        title: '请输入正确的手机号码',
        icon: "none"
      })
      return
    }
    if(sedding){return;}
    wx.showLoading({
      title: '获取中',
      mask: true
    })

    wx.request({
      url: postCode,
      data: {
        phone: self.data.userName,
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
          sedding=true;
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



  //注册请求
  regBtnClick: function (e) {
    var self = this
    if (self.data.userName == null || self.data.userName == '') {
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
    if (self.data.verificateCode == null || self.data.verificateCode == '') {
      wx.showToast({
        title: '请输入验证码',
        icon: "none"
      })
      return
    }
    if (self.data.userPwd == null || self.data.userPwd == '') {
      wx.showToast({
        title: '请输入密码',
        icon: "none"
      })
      return
    }

    if (self.data.userRePwd == null || self.data.userPwd !== self.data.userRePwd ) {
      wx.showToast({
        title: '两次输入密码不一致',
        icon: "none"
      })
      return
    }

    if (self.data.recommendCode == null || self.data.recommendCode == '') {
      wx.showToast({
        title: '请输入推荐码',
        icon: "none"
      })
      return
    }
    wx.showLoading({
      title: '注册中',
      mask: true
    })
    wx.request({
      url: regUrl,
      data: {
        phone: self.data.userName,
        pwd: md5.hex_md5(self.data.userPwd),
        code: self.data.verificateCode,
        sponsorCode: self.data.recommendCode,
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
            title: "注册成功",
            icon: "success"
            
          }),
          self.login(self.data.userName, self.data.userPwd);
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


  //登录请求
  login: function (phone,pwd) {
    wx.showLoading({
      title: '登录中',
      mask: true
    })
    wx.request({
      url: loginUrl,
      data: {
        account: phone,
        pwd: md5.hex_md5(pwd)
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
          var users = {};
          users.id = rdata.data.user.id;						//用户唯一id
          users.userphone = rdata.data.user.accountNo;				//用户手机号
          users.realName = rdata.data.user.userName;				//用户真实姓名
          users.nickName = rdata.data.user.nickName;				//用户昵称
          users.auth = rdata.data.user.attestationStatus;						//用户实名认证状态
          users.sponsorName = rdata.data.user.sponsorName;
          users.imgUrl = ImgUrl + rdata.data.user.id + '/headImg.jpg';
          users.accountNo = rdata.data.user.accountNo;
          users.logined = '1';//用户当前登录状态
          users.haslogin = '1';
          users.token = rdata.data.token;
          console.log(JSON.stringify(users));
          wx.setStorage({
            key: 'user',
            data: users,
          })
          wx.showToast({
            title: "登录成功",
            icon: "success"
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
  },
  //点击显示或隐藏密码
  seePassword1: function (e) {
    var that = this;
    var statustex = this.data.passwordStatus1;
    if (statustex == "show") {
      this.setData({
        passwordStatus1: "hide"
      })
    } else {
      this.setData({
        passwordStatus1: "show"
      })
    }
    this.setData({
      showhide1: !this.data.showhide1
    })
  },
  //点击登录跳转到登录页面
  clickLogin:function(){
    wx.redirectTo({
      url: '../login/login',
    });
  }
  
})