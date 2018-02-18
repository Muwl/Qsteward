const updateUrl = "http://101.132.173.126:80/steward_api/steward/user/modifUserNike"
const updateIconUrl = "http://101.132.173.126:80/steward_api/steward/user/uploadImage"
Page({
  data: {
    imgUrl:"",
    phoneNumber:"",
    name:'',
    sponsor:""
  },

  //点击头像调用相册或相机
  setPhotoInfo:function(){
    var that=this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        that.updateIcon(res.tempFilePaths[0])
        // var tempFilePaths = res.tempFilePaths
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var user = wx.getStorageSync('user');
    if (user != null && user != '') {
      this.setData({
        name: user.nickName,
        imgUrl: user.imgUrl,
        phoneNumber: user.userphone,
        sponsor: user.sponsorName
      })
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

  /**
   * 昵称输入监听
   */
  nickInput:function(e){
    this.setData({
      name: e.detail.value
    })
  },

  //修改昵称
  updateBtnClick:function(e){
      var self=this;
      var user = wx.getStorageSync('user');
      var nickName=this.data.name;
      if (nickName == null || nickName == '') {
        wx.showToast({
          title: '昵称不能为空',
          icon: "none"
        })
        return
      }
      wx.showLoading({
        title: '修改中',
        mask: true
      })
      wx.request({
        url: updateUrl,
        data: {
          userid: user.id,
          nickName: nickName,
          token: user.token
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        method: 'POST',
        success: function (result) {
          wx.hideLoading();
          var rdata = result.data;
          console.log(JSON.stringify(rdata));
          if (rdata.code == 'success') {//修改成功
            user.nickName = nickName;
            wx.setStorage({
              key: 'user',
              data: user,
            })
            wx.showToast({
              title: "修改成功",
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

   //修改头像
  updateIcon: function (imgPath) {
    var self = this;
    var user = wx.getStorageSync('user');
    wx.showLoading({
      title: '',
      mask: true
    })
    wx.uploadFile({
      url: updateIconUrl,
      filePath: imgPath,
      name: 'files',
      formData: {
        'userid': user.id,
        'token': user.token
      },
      header: {
        'Content-Type': 'multipart/form-data' // 默认值
      },
      success: function (result) {
        wx.hideLoading();
        console.log(JSON.stringify(result));
        var rdata = JSON.parse(result.data);
        console.log(JSON.stringify(rdata));
        if (rdata.code == 'success') {//修改成功
          that.setData({
            self: res.imgPath
          })
          wx.showToast({
            title: "修改成功",
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
  }
})