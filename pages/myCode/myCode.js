const myCodeUrl = "http://101.132.173.126:80/steward_api/steward/sponsor/findSponsorCode";
const ApplyUrl ="http://101.132.173.126:80/steward_api/steward/sponsor/examine"
var page = 1;
var register = require('../../utils/refresh/refreshLoadRegister.js')
Page({
  data: {
    itemDatas: [],
    statusTxt:[
      {text:"未使用",value:1},
      { text:"已使用",value:0},
      { text: "待审核", value: 2 },
      { text: "未通过", value: 3 }
    ],
    startTime: '',
    endTime: '',
    status: '',
    hiddenmodalput: true,  //点击申请弹框显示和隐藏
    sponsorInformation:''  //申请弹框中输入的内容
  },
  onLoad: function (options) {
    var _this = this;
    register.register(this);  
  },
  onReady: function () {},
  onShow: function () {
    page = 1;
    this.getList(page);
  },
  //网络请求获取数据
  getList: function (page) {
    var self = this
    wx.showLoading({
      mask: true
    })
    var user = wx.getStorageSync('user');
    wx.request({
      url: myCodeUrl,
      data: {
        userid: user.id,
        token: user.token,		
        startTime: "",
        endTime:"",
        sponsorStatus: ""
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: 'POST',
      success: function (result) {
        wx.hideLoading();
        var rdata = result.data;
        if (rdata.code == 'success') {
           //设置页面申请状态
          if (rdata.sponsor != null && rdata.sponsor!=''){
            for (var i = 0; i < rdata.sponsor.length;i++){
              for (var j = 0; j < self.data.statusTxt.length;j++){
                if (rdata.sponsor[i].sponsorStatus == self.data.statusTxt[j].value){
                  rdata.sponsor[i].sponsorStatusText = self.data.statusTxt[j].text;
                }
              }
            }
          }
          if (page == 1) {
            self.setData({
              itemDatas: rdata.sponsor
            })
          } else {
            this.setData({
              'itemDatas': this.data.ponsor.concat(rdata.ponsor)
            });
          }
          register.loadFinish(self, true);
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
  //点击复制按钮
  clickCopy:function(e){
    var dataText = this.data.itemDatas[e.currentTarget.id].sponsorCode
    wx.setClipboardData({
      data:dataText,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功',
            })
          }
        })
      }
    })
  },
  //模拟刷新数据
  refresh: function () {
    page = 1;
    this.getList(page);
  },
  //模拟加载更多数据
  loadMore: function () {
    page = page + 1;
    this.getList(page);
  },
  //点击申请按钮弹出弹框
  modalinput: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  //获取元素申请框中输入的内容
  writeText: function (e) {
    this.setData({
      sponsorInformation: e.detail.value
    })
  },
  //取消按钮  
    cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认  
  confirm: function () {
    var that=this;
    this.setData({
      hiddenmodalput: true
    });
    wx.showLoading({
      mask: true
    })
    var user = wx.getStorageSync('user');
    wx.request({
      url: ApplyUrl,
      data: {
        userid: user.id,
        token: user.token,
        sponsorInformation: that.data.sponsorInformation,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: 'POST',
      success: function (result) {
        wx.hideLoading();
        var rdata = result.data;
        if (rdata.code == 'success') {
          wx.showToast({
            title: '申请成功',
            icon:"none"
          })
          this.getList(page);
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
 
})