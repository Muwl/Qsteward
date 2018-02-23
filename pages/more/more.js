const findJoinUrl = "https://app.zrqgj.cn/steward_api/steward/auditCarr/findjoin";
const moreUrl ="https://app.zrqgj.cn/steward_api/steward/auditCarr/join"
Page({
  data: {
    itemDatas: [
    ], 
    init:[
      { py:"ZJ",name: '资金',checked:false},
      { py:"WH",name: '外汇', checked: false },
      { py:"CK",name: '存款', checked: false },
      { py:"DKZ",name: '代开证',checked: false },
      { py:"SP",name: '商品', checked: false },
      { py:"YF",name: '运费', checked: false },
    ],
    uio:[]
  },
  onLoad: function (options) {
    var user = wx.getStorageSync('user');
    this.onInitDate(user)
  },

  onReady: function () { },

  onShow: function () {},

  onHide: function () {},

  onUnload: function () {},

  onPullDownRefresh: function () {},

  onReachBottom: function () {},

  onShareAppMessage: function () {},

  //请求这个用户关注的模块
  onInitDate: function (user) {
    var self = this
    wx.showLoading({
      mask: true
    })
    wx.request({
      url: findJoinUrl,
      data: {
        userid: user.id,
        token: user.token
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: 'POST',
      success: function (result) {
        wx.hideLoading();
        var rdata = result.data;
        if (rdata.code == 'success') {
          self.setData({
            'itemDatas': rdata.findjoin
          }),
          self.showOninit(rdata.findjoin)
        } else if (rdata.message == 'tokenFail') {
          wx.redirectTo({ url: "../login/login" })
        } else {
          wx.showToast({
            title: rdata.message,
            icon: "none"
          })
        }
      },
      fail: function ({ errMsg }) {
        wx.hideLoading();
      }
    })
  }, 
  //显示用户关注的模块
  showOninit:function(value){
    var aa=[]
    var that=this;
    var dataleng = that.data.init.length;
    var itemDataslength =value.length;
    for (var i = 0; i < dataleng; i++) {
      for (var t = 0; t < itemDataslength; t++) {
        if (that.data.init[i].py == value[t].joinType){
          var chooseItem = that.data.init[i];    
          chooseItem.checked="true"
        }
      }
    }
    this.setData({
      init: that.data.init
    })
  },
  //用户手动改变关注的模块
  switchChange:function(e){
    var that=this;
    var user = wx.getStorageSync('user');
    var indexnum = e.target.id;
    var transType = that.data.init[indexnum].py;
    var flag = e.detail.value ? 'T' : 'F';
    wx.showLoading({
      mask: true
    })
    wx.request({
      url: moreUrl,
      data: {
        'userid': user.id,//手机号
        'token': user.token,//令牌
        'joinType': transType,//类型
        'status': flag//状态
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: 'POST',
      success: function (result) {
        wx.hideLoading();
        var rdata = result.data;
        if (rdata.code == 'success') {//发送成功
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