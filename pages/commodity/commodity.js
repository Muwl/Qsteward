const getListUrl = "http://101.132.173.126:80/steward_api/steward/auditCommodity/hall"
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
      commodityName:'',
      minthickness: '',
      maxthickness:'',
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

  itemClick: function (e) {
    var id = e.currentTarget.id;
    var itemData = JSON.stringify(this.data.itemDatas[id]);
    wx.navigateTo({
      url: "../commodityDetail/commodityDetail?data=" + itemData
    })
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
        commodityName: self.data.commodityName,
        minthickness: self.data.minthickness,
        maxthickness: self.data.maxthickness,
        label: self.data.label,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: 'POST',
      success: function (result) {
        wx.hideLoading();
        var rdata = result.data;
        self.setDataJumpStatus(rdata)
        if (rdata.code == 'success') {
          if(page==1){
            self.setData({
              itemDatas: rdata.pager.lists
            })  
          }else{
            self.setData({
              itemDatas: self.data.itemDatas.concat(rdata.pager.lists)
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

  setDataJumpStatus: function (rdata) {
    for (var i = 0; i < rdata.pager.lists.length; i++) {
      var sid = rdata.pager.lists[i].id;
      var list = rdata.status[sid];
      if (list != null && list.length > 0) {
        rdata.pager.lists[i].jumpStatus = list[0].status;
      } else {
        rdata.pager.lists[i].jumpStatus = '';
      }
    }
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