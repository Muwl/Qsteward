Page({
  data: {
    transPicker: [
      {value: 'ZJ',text: '资金'},
      {value: 'WH',text: '外汇'},
      {value: 'CK',text: '存款'},
      {value: 'DKZ',text: '代开证'},
      {value: 'SP',text: '商品'},
      {value: 'YF',text: '运费'}
    ],
    state: [
      { text: '全部', v:'all' },
      { text: '申购中', v:'1' },
      { text: '申购成功', v:'2' },
      { text: '申购失败', v:'3' }
    ],
    id:-1,
    stardate: '',
    enddate: '',
    syayeId:0
  },
  onLoad: function (options) {},
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
  //交易类型
  choice: function (e) {
    var id = e.currentTarget.id;  //获取自定义的ID值  
    this.setData({
      id: id
    })
  },
  //审核状态
  choiceState:function(e){
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
  //点击确定
  sure:function(e){
    var that=this;
    var user = wx.getStorageSync('user');
    if (that.data.id =="-1") {
      wx.showToast({
        title: '请选择一个交易类型',
        icon: "none"
      })
      return
    }
    var starDate = that.data.stardate; //开始时间
    var endDate = that.data.enddate;  //结束时间
    var type1 = that.data.state[that.data.syayeId].v //审核状态
    var type3 = that.data.transPicker[that.data.id].value //交易类型
    var type3name = that.data.transPicker[that.data.id].text; //交易类型
    wx.navigateTo({
      url: '../mysgList/mysgList?starDate=' + starDate + '&endDate=' + endDate + '&type1=' + type1 + '&type3=' + type3,
    })
  }
})