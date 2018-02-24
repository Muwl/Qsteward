Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  
  issueClick:function(e){
    var user = wx.getStorageSync('user');
    if (user.auth == 'T') {
      wx.navigateTo({
        url: '../contactUs/contactUs'
      }) 
    } else if (user.auth == 'W') {
      wx.showToast({
        title: '信息正在审核中',
        icon: 'none'
      })
    } else {
      wx.showToast({
        title: '请先完善信息',
        icon: 'none'
      })
    }
  },

  sgClick: function (e) {
    var user = wx.getStorageSync('user');
    if (user.auth == 'T') {
      wx.navigateTo({
        url: '../transSala/transSala'
      })
    } else if (user.auth == 'W') {
      wx.showToast({
        title: '信息正在审核中',
        icon: 'none'
      })
    } else {
      wx.showToast({
        title: '请先完善信息',
        icon: 'none'
      })
    }
  },


  issueedClick: function (e) {
    var user = wx.getStorageSync('user');
    if (user.auth == 'T') {
      wx.navigateTo({
        url: '../issueList/issueList'
      })
    } else if (user.auth == 'W') {
      wx.showToast({
        title: '信息正在审核中',
        icon: 'none'
      })
    } else {
      wx.showToast({
        title: '请先完善信息',
        icon: 'none'
      })
    }
  },

  sgedClick: function (e) {
    var user = wx.getStorageSync('user');
    if (user.auth == 'T') {
      wx.navigateTo({
        url: '../mysgList/mysgList'
      })
    } else if (user.auth == 'W') {
      wx.showToast({
        title: '信息正在审核中',
        icon: 'none'
      })
    } else {
      wx.showToast({
        title: '请先完善信息',
        icon: 'none'
      })
    }
  },
})