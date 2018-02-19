const findJoinUrl = "http://101.132.173.126:80/steward_api/steward/auditCarr/findjoin"

Page({
  data: { 
    itemDatas: [
    ],

    navItems:[
    ]
  },
  onLoad: function (options) {

    
  },
  onReady: function () {
    
  },
  onShow: function () {
    var user = wx.getStorageSync('user');
    if (user == null || user == '') {
      wx.redirectTo({ url: "../login/login" })
    } else {
      console.log(JSON.stringify(user))
      this.onInitDate(user)
    }
  },
  onHide: function () {
    
  },
  onUnload: function () {
    
  },
  onPullDownRefresh: function () {
    
  },
  onReachBottom: function () {
    
  },
  onShareAppMessage: function () {
    
  },

  //请求这个用户关注的模块
  onInitDate : function (user){
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
        console.log(JSON.stringify(rdata));
        if (rdata.code == 'success') {
          self.setData({
            'itemDatas': rdata.findjoin
          }),
          self.showUI(rdata.findjoin)
        }else if (rdata.message == 'tokenFail') {
          wx.redirectTo({ url: "../login/login" })
        }else {
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

  //加载数据
  showUI : function (data){
    var navLists=new Array(); 
    for(var i=0;i<data.length;i++){
      var item={
        title:'',
        key: '',
        titleEn: '',
        img:'',
        index:0
      };
      switch (data[i].joinType) {
        case 'ZJ':
          item.title ='资金';
          item.key ='capital';
          item.titleEn = 'Capital';
          item.img = '../../images/capital_icon.png';
          break;
        case 'WH':
          item.title = '外汇';
          item.key = 'foreign';
          item.titleEn = 'Foreign Exchangel';
          item.img = '../../images/foreign_icon.png';
          break;
        case 'CK':
          item.title = '存款';
          item.key = 'deposit';
          item.titleEn = 'Deposit';
          item.img = '../../images/deposit_icon.png';
          break;
        case 'DKZ':
          item.title = '代开证';
          item.key = 'certificate';
          item.titleEn = 'Certificate of opening';
          item.img = '../../images/certificate_icon.png';
          break;
        case 'SP':
          item.title = '商品';
          item.key = 'commodity';
          item.titleEn = 'Commodity';
          item.img = '../../images/commodity_icon.png';
          break;
        case 'YF':
          item.title = '运费';
          item.key = 'freight';
          item.titleEn = 'Freight';
          item.img = '../../images/freight_icon.png';
          break;
        default:
          break;
      }
      item.index=i;
      navLists[i]=item;
    }
    this.setData({
      'navItems': navLists
    })
    console.log(this.data.navItems)
  },

  //按钮点击

  itemBtnClick : function(e){
    var self = this
    var id = e.target.id;
    console.log(id + "======" + JSON.stringify(self.data.itemDatas));
    var itemData = self.data.itemDatas[id];
    if (itemData.status == 'T') {
      wx.navigateTo({
        url: '../' + self.data.navItems[id].key + '/' + self.data.navItems[id].key
      })  
    }
    else if (itemData.status == 'W') {
      wx.showToast({
        title: '信息正在审核中',
        icon:'none'
      })
    }
    else {
      wx.showToast({
        title: '请先完善信息',
        icon: 'none'
      })
    }	
  },

  //点击查看更多
  seemore:function(event){
    wx.navigateTo({
      url: '../more/more',
    })
  }
})