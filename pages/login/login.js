const loginUrl = "http://101.132.173.126:80/steward_api/steward/user/login"
const ImgUrl ="http://101.132.173.126:80/steward_api/resource/goldccm/user/";
var md5 = require("../../utils/md5.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:'',
    userPwd: '',
    showhide:true,
    passwordStatus:"show"
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
  //登录请求
  loginBtnClick: function(e) {
    var self = this
    if (self.data.userName == null || self.data.userName==''){
      wx.showToast({
        title: '请输入手机号',
        icon:"none"
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
    wx.showLoading({
      title: '登录中',
      mask:true
    })
    wx.request({
      url: loginUrl,
      data: {
        account: self.data.userName,
        pwd: md5.hex_md5(self.data.userPwd)
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method:'POST',
      success: function (result) {
        wx.hideLoading();
        var rdata=result.data;
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
          wx.reLaunch({
            url: '../index/index'
          })
        }else{
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
  seePassword:function(e){
    var that=this;
    var statustex = this.data.passwordStatus;
    if (statustex =="show"){
      this.setData({
        passwordStatus:"hide"
      })
    }else{
      this.setData({
        passwordStatus: "show"
      })
    }
    this.setData({
      showhide: !this.data.showhide
    })
  }
})