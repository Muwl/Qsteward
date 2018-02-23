const getZJListUrl = "https://app.zrqgj.cn/steward_api/steward/auditmoney/money"
const getWHListUrl = "https://app.zrqgj.cn/steward_api/steward/auditforex/forex"
const getCKListUrl = "https://app.zrqgj.cn/steward_api/steward/auditDeposit/deposit"
const getDKZListUrl = "https://app.zrqgj.cn/steward_api/steward/auditissuing/issuing"
const getSPListUrl = "https://app.zrqgj.cn/steward_api/steward/auditCommodity/commodity"
const getYFListUrl = "https://app.zrqgj.cn/steward_api/steward/auditCarr/selectpr"
var page = 1;
var register = require('../../utils/refresh/refreshLoadRegister.js')

Page({
  data: {
      showType:'',
      itemData:[],
      startTime: '',
      endTime: '',
      status: '',
      releaseType: ''
  },
  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    var _this = this;
    register.register(this);
  },
  onShow: function (options) {
    page = 1;
    this.getList(page);
    console.log(this.data)
  },

  //网络请求获取数据
  getList: function (page) {
    var self = this
    wx.showLoading({
      mask: true
    })
    var user = wx.getStorageSync('user');
    var urlStr = self.getUrl();
    wx.request({
      url: urlStr,
      data: {
        userid: user.id,
        token: user.token,
        pages: 15,
        curPageNum: page,
        startTime: self.data.startTime,
        endTime: self.data.endTime,
        status: self.data.status,
        releaseType: self.data.releaseType,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: 'POST',
      success: function (result) {
        wx.hideLoading();
        var rdata = result.data;
        register.loadFinish(self, true);
        if (rdata.code == 'success') {
          if (rdata.pager.lists='' && type=='up'){
            return;
          }
          if (page == 1) {
            self.setData({
              itemDatas: rdata.pager.lists
            })
          } else {
            self.setData({
                itemDatas: self.data.itemDatas.concat(rdata.pager.lists)
            });
          }
        } else {
          wx.showToast({
            title: rdata.message,
            icon: "none"
          })
        }
      },

      fail: function ({ errMsg }) {
        register.loadFinish(self, true);
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
    page = page + 1;
    this.getList(page);
  },

 getUrl:function(){
   var self=this;
   var url = getZJListUrl;
   switch (self.data.showType){
        case 'ZJ':
        url = getZJListUrl;
        break;
        case 'WH':
       url = getWHListUrl;
          break;
        case 'CK':
       url = getCKListUrl;
          break;
        case 'DKZ':
       url = getDKZListUrl;
          break;
        case 'SP':
       url = getSPListUrl;
          break;
        case 'YF':
       url = getYFListUrl;
          break;
          default:
          break;
   }
   return url;
 }
})