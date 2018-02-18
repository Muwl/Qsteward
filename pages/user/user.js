var app = getApp();
Page({
  data: {
    username:'',
    usericon:''
  },
  onLoad: function (options) {
    var user = wx.getStorageSync('user');
    if (user == null || user=='') {
      wx.redirectTo({ url: "../login/login" })
    } else {
      console.log(JSON.stringify(user))
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var user = wx.getStorageSync('user');
    if (user != null && user!='') {
      this.setData({
        username:user.nickName,
        usericon:user.imgUrl
      })
    } 
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  loginOutClick:function(e){
    wx.showModal({
      content: "确定退出吗？",
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
      if (res.confirm) {
        wx.clearStorage()
        wx.redirectTo({ url: "../login/login" })
      } else if (res.cancel) {
      }
      }
    })
  },

  addUserDetail:function(e){
    var user = wx.getStorageSync('user');
    if (user.auth=='T'){
      wx.showToast({
        title: '您已经完善过信息了',
        icon:'none'
      })
    } else if (user.auth == 'W'){
      wx.showToast({
        title: '信息正在审核中',
        icon: 'none'
      })
    }else{
      wx.showActionSheet({
        itemList: ['企业用户', '机构用户'],
        success: function (e) {
          console.log(e.tapIndex)
          if (e.tapIndex==0){
            wx.navigateTo({
              url: '../enterprise/enterprise'
            })
          }else{
            wx.navigateTo({
              url: '../userinfo/userinfo'
            })
          }
        }
      })

    }
  }
})