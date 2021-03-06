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
        name: '确认申购',
        selectImage: false
      }
    ],
    direction:[
      {name:"全部"},
      { name:"供"},
      { name:'需'}
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
        name: '30',
        value: '30'
      },
      {
        name: '90',
        value: '90'
      },
      {
        name: '180',
        value: '180'
      }
    ],
    directionId:'',
    
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
        title: '外资',
        selectcurrent: false
      },
      {
        title: '民营',
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


//获取智能标签
  getLabel:function(){
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
        'type': 'DKZ'
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