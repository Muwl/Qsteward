const getListUrl = "http://101.132.173.126:80/steward_api/steward/auditforex/sponsorForex"
var page=1;
var register=require('../../utils/refresh/refreshLoadRegister.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
      itemDatas:[],
      startTime:'',
      endTime:'',
      status:'',
      direction:'',
      timeLimit:'',
      maxMoney:'',
      minMoney: '',
      transType:'',
      opponentRange:'',
      label:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    register.register(this);   
  
  },

  onShow: function (options){
    page=1;
    this.getList(page);
    console.log(this.data)
  },
  
  //网络请求获取数据
  getList:function(page){
    var self = this
    wx.showLoading({
      mask: true
    })
    var user = wx.getStorageSync('user');
    wx.request({
      url: getListUrl,
      data: {
        userid: user.id,
        token: user.token,
        pages:15,
        curPageNum: page,
        startTime: self.data.startTime,
        endTime: self.data.endTime,
        status: self.data.status,
        direction: self.data.direction,
        timeLimit: self.data.timeLimit,
        maxMoney: self.data.maxMoney,
        minMoney: self.data.minMoney,
        transType: self.data.transType,
        label: self.data.label,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: 'POST',
      success: function (result) {
        wx.hideLoading();
        var rdata = result.data;
    
        if (rdata.code == 'success') {
          if(page==1){
            self.setData({
              itemDatas: rdata.pager.lists
            })  
          }else{
            this.setData({
              'itemDatas': this.data.list.concat(rdata.pager.lists)
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

  //模拟刷新数据
  refresh: function () {
    page = 1;
    this.getList(page);
  },
  //模拟加载更多数据
  loadMore: function () {
    page = page+1;
    this.getList(page);
  }

})