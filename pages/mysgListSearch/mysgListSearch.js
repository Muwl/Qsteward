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
      { text: '全部', v:'' },
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
  sure: function (e) {
    var self = this;
    console.log('dianji==========' + self.data.id);

    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]; //上一个页面

    if (self.data.id == null || self.data.id == '' || self.data.id < 0) {
      wx.showToast({
        title: '请选择交易类型',
        icon: 'none'
      })
      return;
    }
    prevPage.setData({
      showType: self.data.transPicker[self.data.id].value,
      startTime: self.data.stardate,
      endTime: self.data.enddate,
      applypr: self.data.state[self.data.syayeId].v,
    })
    wx.navigateBack({
      delta: -1,
    })
  },
  
  resert: function (e) {
    var self = this;
    this.setData({
      showType: '',
      stardate: '',
      enddate: '',
      syayeId: 0,
    })
  }
})