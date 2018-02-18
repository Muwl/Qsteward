const kefuUrls = "http://app.zrqgj.cn/steward_api/managerInfos"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navItems:[]
  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    this.onInitDate();
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

  
})