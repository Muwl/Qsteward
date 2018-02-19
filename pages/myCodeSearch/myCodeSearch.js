Page({
  data: {
    status: [
      { text: '全部', v: 'all' },
      { text: '待审核', v: '2' },
      { text: '未通过', v: '3' },
      { text: '未使用', v: '1' },
      { text: '已使用', v: '0' },
    ],
    stardate: '',
    enddate: '',
    syayeId: 0
  },
  onLoad: function (options) { },
  onReady: function () { },
  onShow: function () { },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { },
  onReachBottom: function () { },
  onShareAppMessage: function () { },
  //状态
  choiceState: function (e) {
    var syayeId = e.currentTarget.id;
    this.setData({
      syayeId: syayeId
    })
  },
  //信息有效期
  dataDateChange: function (e) {
    var that = this;
    switch (e.currentTarget.id) {
      case 'starDate':
        that.setData({
          stardate: e.detail.value
        })
        break;
      case 'endDate':
        that.setData({
          enddate: e.detail.value
        })
        break;
      default:
        break;
    }
  },
  //点击确定按钮
  sure: function (e) {
    var self = this;
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]; //上一个页面
    var statusStr = '';
    for (var i = 0; i < self.data.status.length; i++) {
      if (self.data.status[i].v == "all") {
        statusStr = ''
      }else{
        statusStr = i
      }
    }
    prevPage.setData({
      startTime: self.data.stardate,
      endTime: self.data.enddate,
      sponsorStatus: statusStr
    })
    wx.navigateBack({
      delta: -1,
    })
  },
  //点击重置按钮
  reset:function(){
    this.setData({
      stardate: '',
      enddate: '',
      syayeId:""
    })
  }
})