const perfectUrl = "https://app.zrqgj.cn/steward_api/steward/user/perfectInformation"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyName:'',
    name:'',
    cardId:'',
    job:'',
    phone:'',
    address:'',
    isAgent:''
  },

  companyNameInput:function(e){
    this.setData({
      companyName:e.detail.value
    })
  },

   nameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },

   cardIdInput: function (e) {
     this.setData({
       cardId: e.detail.value
     })
   },

   jobInput: function (e) {
     this.setData({
       cardId: e.detail.value
     })
   },

   phoneInput: function (e) {
     this.setData({
       cardId: e.detail.value
     })
   },

  addressInput: function (e) {
     this.setData({
       cardId: e.detail.value
     })
   },

  switchChange:function(e){
    this.setData({
      isAgent:e.detail.value
    })
  },

  changeBtnClick:function(e){
    var self = this
    if (self.data.companyName == null || self.data.companyName == '') {
      wx.showToast({
        title: '请输入机构名称',
        icon: "none"
      })
      return
    }
    if (self.data.name == null || self.data.name == '') {
      wx.showToast({
        title: '请输入姓名',
        icon: "none"
      })
      return
    }
    if (self.data.job == null || self.data.job == '') {
      wx.showToast({
        title: '请输入职务',
        icon: "none"
      })
      return
    }
    if (self.data.phone == null || self.data.phone == '') {
      wx.showToast({
        title: '请输入电话',
        icon: "none"
      })
      return
    }
    if (self.data.address == null || self.data.address == '') {
      wx.showToast({
        title: '请输入地址',
        icon: "none"
      })
      return
    }
    wx.showLoading({
      title: '提交中',
      mask: true
    })
    var user=wx.getStorageInfoSync('user')
    wx.request({
      url: perfectUrl,
      data: {
        userid:user.id,
        token:user.token,
        userType:'企业用户',
        orgName: self.data.companyName,
        userNumber: self.data.cardId,
        userName: self.data.name,
        isintermediary: self.data.isAgent,
        duty: self.data.job,
        userPhone: self.data.phone,
        userAddr: self.data.address,
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
          user.auth='W';
          wx.setStorage({
            key: 'user',
            data: user,
          })
          wx.showToast({
            title: "提交成功",
            icon: "success"
          })
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
  }
})