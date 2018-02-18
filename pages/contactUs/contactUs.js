const kefuUrls = "http://app.zrqgj.cn/steward_api/managerInfos"
const issueUrl = "http://app.zrqgj.cn/steward_api/customerInfos"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navItems:[],
    userName:'',
    phone:''
  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    this.onInitDate();
  },

  
  usernameInput:function(e){
    this.setData({
      userName:e.detail.value
    })
  },

 phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  //拨打电话
  calling: function (e) {
    var that = this;
    console.log(e);
    var phone = e.target.id;
    wx.makePhoneCall({
      phoneNumber: phone,
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },

  //请求这个用户关注的模块
  onInitDate: function () {
    var self = this
    wx.showLoading({
      mask: true
    })
    wx.request({
      url: kefuUrls,
      method: 'GET',
      success: function (result) {
        wx.hideLoading();
        var rdata = result.data;
        console.log(JSON.stringify(rdata));
        self.setData({
          navItems: rdata
        })
      },

      fail: function ({ errMsg }) {
        wx.hideLoading();
      }
    })
  },

  //提交请求
  changeBtnClick: function (e) {
    var self = this
    if (self.data.userName == null || self.data.userName == '') {
      wx.showToast({
        title: '请输入您的名字',
        icon: "none"
      })
      return
    }
    if (self.data.phone == null || self.data.phone == '') {
      wx.showToast({
        title: '请输入手机号',
        icon: "none"
      })
      return
    }
    wx.showLoading({
      title: '提交中',
      mask: true
    })
    wx.request({
      url: issueUrl,
      data: {
        name: self.data.userName,
        contact: self.data.phone
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: 'POST',
      success: function (result) {
        wx.hideLoading();
        wx.showToast({
          title: "提交成功",
          icon: "success"
        })
        wx.navigateBack({
          delta: 1
        })
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