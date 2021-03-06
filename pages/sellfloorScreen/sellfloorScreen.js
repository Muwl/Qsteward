const getListUrl ="https://app.zrqgj.cn/steward_api/steward/smartLabel/findSmart"
Page({
  data: {
    imgurl:'../../images/close_icon.png',
    currentImgurl:'../../images/close_icon.png',
    stardate: '',
    enddate:'',
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
      {name:"融入"},
      {name:'融出'}
    ],
    color: '#F4F4F4',
    datavalue:'',
    id:'0',
    timeLimtList:[
      {
        name: '全部',
        value: ''
      },
      {
        name: '隔夜',
        value: '隔夜'
      },
      {
        name: '7D',
        value: '7D'
      },
      {
        name: '14D',
        value: '14D'
      },
       {
         name: '21D',
         value: '21D'
      }, {
         name: '1M',
         value: '1M'
      }, {
         name: '2M',
         value: '2M'
      }, {
         name: '3M',
         value: '3M'
      }, {
         name: '6M',
         value: '6M'
      }, {
         name: '9M',
          value: '9M'
      },
      {
        name: '1Y',
         value: '1Y'
      },
    ],
    directionId:'',
    money: [
      {
        title: '全部',
        value: ',',
        selectImage: true
      },
      {
        title: '< 5000万',
        value: ',0.5',
        selectImage: false
      },
      {
        title: '5000万 - 1亿',
        value: '0.5,1',
        selectImage: false
      },
      {
        title: '1亿 - 5亿',
        value: '1,5',
        selectImage: false
      },
      {
        title: '> 5亿',
        value: '5,',
        selectImage: false
      }
    ],
    transaction: [
      {
        title: '全部',
        value:'',
        selectImage: true
      },
      {
        title: '质押式回购',
        value: '质押式回购',
        selectImage: false
      },
      {
        title: '买断式回购',
        value: '买断式回购',
        selectImage: false
      },
      {
        title: '同业拆借',
        value: '同业拆借',
        selectImage: false
      }
    ],
    opponent:[
      {
        title: '国有',
        selectcurrent: false
      },
      {
        title: '股份',
        selectcurrent: false
      },
      {
        title: '城商',
        selectcurrent: false
      },
      {
        title: '农商',
        selectcurrent: false
      },
      {
        title: '农合',
        selectcurrent: false
      },
      {
        title: '外资',
        selectcurrent: false
      },
      {
        title: '村镇',
        selectcurrent: false
      },
      {
        title: '券商',
        selectcurrent: false
      },
      {
        title: '基金',
        selectcurrent: false
      },
      {
        title: '保险',
        selectcurrent: false
      },
      {
        title: '其他',
        selectcurrent: false
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
  //期限
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
  //交易类型
  transactionClick: function (event) {
    for (var i = 0; i < this.data.transaction.length; i++) {
      if (event.currentTarget.id == i) {
        this.data.transaction[i].selectImage = true
      }
      else {
        this.data.transaction[i].selectImage = false
      }
    }
    this.setData(this.data)
  }, 
  //对手范围
  choicePpponent:function(event){
    var that=this;
    var currenid = event.currentTarget.id;
    var currentstyle = that.data.opponent[currenid].selectcurrent;
    that.data.opponent[currenid].selectcurrent = !currentstyle
    that.setData({
      opponent: that.data.opponent
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
        'type': 'ZJ'
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

    var transTypeStr = '';
    for (var i = 0; i < self.data.transaction.length; i++) {
      if (self.data.transaction[i].selectImage == true) {
        transTypeStr = self.data.transaction[i].value;
      }
    }

    var opponentStr = '';
    for (var i = 0; i < self.data.opponent.length; i++) {
      if (self.data.opponent[i].selectcurrent == true) {
        if (opponentStr == null || opponentStr==''){
          opponentStr = self.data.opponent[i].title;
        }else{
          opponentStr = opponentStr + "," + self.data.opponent[i].title;
        }
      }
    }

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
      timeLimit: self.data.timeLimtList[self.data.id].value,
      minMoney: minMoneyStr,
      maxMoney: maxMoneyStr,
      transType: transTypeStr,
      opponentRange: opponentStr,
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

    for (var i = 0; i < self.data.transaction.length; i++) {
      if (i == 0) {
        self.data.transaction[i].selectImage = true
      } else {
        self.data.transaction[i].selectImage = false
      }
      self.setData(self.data)
    }
    
    for (var i = 0; i < self.data.opponent.length; i++) {
      self.data.opponent[i].selectcurrent = false
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