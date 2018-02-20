const getListUrl ="http://101.132.173.126:80/steward_api/steward/smartLabel/findSmart"
Page({
  data: {
    imgurl:'../../images/close_icon.png',
    currentImgurl:'../../images/close_icon.png',
    stardate: '',
    enddate:'',
    id: '0',
    commodityNames: [
      {
        name: '全部',
        value: ''
      },
      {
        name: '煤炭',
        value: '煤炭'
      },
      {
        name: '油品',
        value: '油品'
      }
    ],
    audit: [
      {
        name: '全部',
        selectImage: true
      },
      {
        name: '已发布',
        selectImage: false
      },
      {
        name: '未发布',
        selectImage: false
      }
    ],
    direction:[
      {name:"全部"},
      { name:"出"},
      { name:'入'}
    ],
    color: '#F4F4F4',
    datavalue:'',
   
    directionId:'',
    money: [
      {
        title: '全部',
        value: ',',
        selectImage: true
      },
      {
        title: '< 3000',
        value: ',3000',
        selectImage: false
      },
      {
        title: '3000 - 3500',
        value: '3000,3500',
        selectImage: false
      },
      {
        title: '3500 - 4000',
        value: '3500,4000',
        selectImage: false
      },
      {
        title: '4000 - 4500',
        value: '4000,4500',
        selectImage: false
      },
      {
        title: '4500 - 5000',
        value: '4500,5000',
        selectImage: false
      },
      {
        title: '5000 - 5500',
        value: '5000,5500',
        selectImage: false
      },
      {
        title: '5500 - 6000',
        value: '5500,6000',
        selectImage: false
      },
      {
        title: '> 6000',
        value: '6000,',
        selectImage: false
      }
    ],
    smartlabel: []
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLabel();
  },


  //审核状态点击
  sauditClick: function (event) {
    for (var i = 0; i < this.data.audit.length; i++) {
      if (event.currentTarget.id == i) {
        this.data.audit[i].selectImage = true
      }
      else {
        this.data.audit[i].selectImage = false
      }
    }
    this.setData(this.data)
  }, 
  //金额点击
  selectClick: function (event) {
    for (var i = 0; i < this.data.money.length; i++) {
      if (event.currentTarget.id == i) {
        this.data.money[i].selectImage = true
      }
      else {
        this.data.money[i].selectImage = false
      }
    }
    this.setData(this.data)
  }, 
  //信息有效期
  dataDateChange: function (e) {
    var that=this;
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
  //商品名称
  choice:function(e){
    var id = e.currentTarget.id;  //获取自定义的ID值  
    this.setData({
      id: id
    })  
  },
  //方向
  direction: function (e) {
    console.log(e);
    var id = e.currentTarget.id;  //获取自定义的ID值  
    this.setData({
      directionId: id
    })
  },
  //智能标签
  choiceSmartlabel: function (event) {
    var that = this;
    var currenid = event.currentTarget.id;
    var currentstyle = that.data.smartlabel[currenid].selectcurrent;
    that.data.smartlabel[currenid].selectcurrent = !currentstyle
    that.setData({
      smartlabel: that.data.smartlabel
    })
  },


//获取只能标签
  getLabel:function(type){
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
        'type': 'SP'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: 'POST',
      success: function (result) {
        wx.hideLoading();
        var rdata = result.data;
        if (rdata.code == 'success') {
          for (var i = 0; i < rdata.list.length;i++){
            rdata.list[i].selectcurrent=false;
          }
            self.setData({
              smartlabel:rdata.list
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

  //点击确定按钮
  formSubmit: function (e) {
    var self=this;
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]; //上一个页面
    var statusStr='';
    for (var i = 0; i < self.data.audit.length;i++){
      if (self.data.audit[i].selectImage==true){
          if(i==0){
            statusStr='';
          }else{
            statusStr = i;
          }
      }
    }
    var dirStr ='';
    if (self.data.directionId==0){
      dirStr ='';
    }else{
      dirStr = self.data.direction[self.data.directionId].name;
    }

    var moneyStr='';
    for (var i = 0; i < self.data.money.length;i++){
      if (self.data.money[i].selectImage==true){
        moneyStr = self.data.money[i].value;
      }
    }

    var minMoneyStr= moneyStr.split(',')[0];
    var maxMoneyStr = moneyStr.split(',')[1];;

    var smartlabelStr = '';
    for (var i = 0; i < self.data.smartlabel.length; i++) {
      if (self.data.smartlabel[i].selectcurrent == true) {
        if (smartlabelStr == null || smartlabelStr == '') {
          smartlabelStr = self.data.smartlabel[i].label;
        } else {
          smartlabelStr = smartlabelStr + "," + self.data.smartlabel[i].label;
        }
      }
    }
    prevPage.setData({
      startTime: self.data.stardate,
      endTime: self.data.enddate,
      status: statusStr,
      direction: dirStr,
      commodityName: self.data.commodityNames[self.data.id].value,
      minthickness: minMoneyStr,
      maxthickness: maxMoneyStr,
      label: smartlabelStr,
    }) 

    wx.navigateBack({
      delta: -1,
    })
  },


  formReset: function () {
    var self=this;
    for (var i = 0; i < self.data.audit.length;i++){
      if(i==0){
        self.data.audit[i].selectImage = true
      }else{
        self.data.audit[i].selectImage = false
      }
      self.setData(self.data)
    }

    for (var i = 0; i < self.data.money.length; i++) {
      if (i == 0) {
        self.data.money[i].selectImage = true
      } else {
        self.data.money[i].selectImage = false
      }
      self.setData(self.data)
    }

    for (var i = 0; i < self.data.smartlabel.length; i++) {
      self.data.smartlabel[i].selectcurrent = false
      self.setData(self.data)
    }
   
    this.setData({
      stardate: '',
      enddate: '',
      directionId:0,
      id:0,

    })
  }


})