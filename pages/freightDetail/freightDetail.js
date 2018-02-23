const detailUrl = 'https://app.zrqgj.cn/steward_api/steward/joinTrans/findSigle'
const subUrl = 'https://app.zrqgj.cn/steward_api/steward/joinTrans/addJoinTeansMsg'
var id = '';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    sgName: '申购状态',
    sgShow: '',
    data: {},
    sgStatusList: ['申购中', '申购成功', '申购失败']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var data = JSON.parse(options.data);
    id = data.id;
    var user = wx.getStorageSync('user');
    if (data.jumpStatus == null || data.jumpStatus == '') {
      this.setData({
        sgName: '申购方',
        sgShow: user.realName,
        data: data
      })
    } else {
      this.getDetail(data.id);
    }
  },

  getDetail: function (id) {
    var self = this
    wx.showLoading({
      title: '',
      mask: true
    })
    var user = wx.getStorageSync('user');
    wx.request({
      url: detailUrl,
      data: {
        userid: user.id,
        token: user.token,
        transid: id,
        transType: 'YF',
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: 'POST',
      success: function (result) {
        wx.hideLoading();
        var rdata = result.data;
        console.log(JSON.stringify(rdata));
        if (rdata.code == 'success') {//发送成功
          self.setData({
            sgName: '申购状态',
            sgShow: self.data.sgStatusList[rdata.pager.lists[0].joinStatus - 1],
            data: rdata.pager.lists[0]
          })
          wx.showToast({
            title: '您已经申购过了',
            icon: 'none'
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
  },

  changeBtnClick: function (e) {
    var self = this
    wx.showLoading({
      title: '',
      mask: true
    })
    var user = wx.getStorageSync('user');
    wx.request({
      url: subUrl,
      data: {
        userid: user.id,
        token: user.token,
        transid: id,
        transType: 'YF',
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: 'POST',
      success: function (result) {
        wx.hideLoading();
        var rdata = result.data;
        console.log(JSON.stringify(rdata));
        if (rdata.code == 'success') {//发送成功
          wx.showToast({
            title: '发布方会尽快和您取得联系',
            icon: 'none'
          })
          wx.navigateBack({
            delta: 1
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
  },
})