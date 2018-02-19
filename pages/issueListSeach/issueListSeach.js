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
      { text: '全部', v: '' },
      { text: '待审核', v: '0' },
      { text: '未通过', v: '1' },
      { text: '已发布', v: '2' },
      { text: '确认申购', v: '3' }
    ],
    information: [
      { text: '全部', v: '' },
      { text: '展示', v: '1' },
      { text: '下架', v: '2' }
    ],
    id: -1,
    stardate: '',
    enddate: '',
    syayeId: 0,
    informationId:"0"
  },
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
    var self = this;
    console.log('dianji==========' + self.data.id);

    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]; //上一个页面

    if(self.data.id==null || self.data.id=='' || self.data.id<0){
        wx.showToast({
          title: '请选择交易类型',
          icon:'none'
        })
        return;
    }
    prevPage.setData({
      showType: self.data.transPicker[self.data.id].v,
      startTime: self.data.stardate,
      endTime: self.data.enddate,
      status: self.data.state[self.data.syayeId].v,
      releaseType: self.data.state[self.data.informationId].v,
    })
    wx.navigateBack({
      delta: -1,
    })
  },

   resert: function (e) {
     console.log('dianji111==========');
    var self = this;
    this.setData({
      showType:'',
      stardate: '',
      enddate: '',
      id: -1,
      syayeId: 0,
      informationId: "0"
    })
  }

})