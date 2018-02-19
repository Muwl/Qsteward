Page({
  data: {
    transPicker: [
      { v: 'ZJ', text: '资金' },
      { v: 'WH', text: '外汇' },
      { va: 'CK', text: '存款' },
      { v: 'DKZ', text: '代开证' },
      { v: 'SP', text: '商品' },
      { v: 'YF', text: '运费' }
    ],
    state: [
      { text: '全部', v: 'all' },
      { text: '待审核', v: '0' },
      { text: '未通过', v: '1' },
      { text: '已发布', v: '2' },
      { text: '确认申购', v: '3' }
    ],
    information: [
      { text: '全部', v: 'all' },
      { text: '展示', v: '1' },
      { text: '下架', v: '2' }
    ],
    id: -1,
    stardate: '',
    enddate: '',
    syayeId: 0,
    informationId:"0"
  },
  onLoad: function (options) { },
  onReady: function () { },
  onShow: function () { },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { },
  onReachBottom: function () { },
  onShareAppMessage: function () { },
  //交易类型
  choice: function (e) {
    var id = e.currentTarget.id;  //获取自定义的ID值  
    this.setData({
      id: id
    })
  }, 
  //审核状态
  choiceState: function (e) {
    var syayeId = e.currentTarget.id;
    this.setData({
      syayeId: syayeId
    })
  },
  //信息状态
  choiceInformatione: function (e) {
    var informationId= e.currentTarget.id;
    this.setData({
      informationId: informationId
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
  //点击确定
  sure: function (e) {
    var that = this;
    var user = wx.getStorageSync('user');
    if (that.data.id == "-1") {
      wx.showToast({
        title: '请选择一个交易类型',
        icon: "none"
      })
      return
    }
    var starDate = that.data.stardate; //开始时间
    var endDate = that.data.enddate;  //结束时间
    var type1 = that.data.state[that.data.syayeId].v //审核状态
    var type2 = that.data.state[that.data.informationId].v //信息状态
    var type3 = that.data.transPicker[that.data.id].v //交易类型
    var type3name = that.data.transPicker[that.data.id].text; //交易类型
    wx.navigateTo({
      url: '../mysgList/mysgList?starDate=' + starDate + '&endDate=' + endDate + '&type1=' + type1 + '&type2=' + type2 + '&type3=' + type3,
    })
  }
})