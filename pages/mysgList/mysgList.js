var searchUrl = "http://101.132.173.126:80/steward_api/steward/joinTrans/findJoinTrans"
Page({
  data: {
    showType:""
  },
  onLoad: function (options) {
    this.setData({
      'showType': options.type3
    }),
    console.log(options.type3)
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {}
})