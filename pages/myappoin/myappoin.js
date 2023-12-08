// pages/myappoin/myappoin.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "我要预约",
    back: false,
    arrayType: [{
        id: "01",
        name: '居民身份证'
      },
      {
        id: "02",
        name: '中国护照'
      },
      {
        id: "14",
        name: '港澳护照或通行证'
      },
      {
        id: "15",
        name: '台湾居民来往大陆通行证'
      },
      {
        id: "16",
        name: '外籍护照'
      },
      {
        id: "99",
        name: '其他有效身份证件'
      },
    ],
    indexType: "0",
    arrayDay: ['当日手术', '择期手术'],
    indexDay: "0",
    consultant: "", //顾问
    phone: "", //手机号
    userInfo: "", //用户信息
    point_type: "01", //证件类型传给后台
    name: "", //就诊人
    point: "", //就诊人证件
    memo: "当日手术", //备注
    tel: "", //手机号 账号绑定手机号
    reach_time: "", //到院日期
    reach_time_two: "", //到院时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this
    if (wx.getStorageSync('userInfo') && wx.getStorageSync('userInfo') != '') {
      console.log(JSON.parse(wx.getStorageSync('userInfo')))
      let indexType = JSON.parse(wx.getStorageSync('userInfo')).point_type
      let arrayType = that.data.arrayType
      for (let i = 0; i < arrayType.length; i++) {
        arrayType[i].index = i
        if (arrayType[i].id == indexType) {
          that.setData({
            indexType: i,
          })
        }
      }
      //point_type

      that.setData({
        userInfo: JSON.parse(wx.getStorageSync('userInfo')),
        consultant: JSON.parse(wx.getStorageSync('userInfo')).p_data[0].employeeName,
        tel: JSON.parse(wx.getStorageSync('userInfo')).tel,
        phone: JSON.parse(wx.getStorageSync('userInfo')).tel,
        name: JSON.parse(wx.getStorageSync('userInfo')).name,
        point: JSON.parse(wx.getStorageSync('userInfo')).point,
        point_type: JSON.parse(wx.getStorageSync('userInfo')).point_type
      })
      console.log(that.data.point_type)
    } else {
      that.setData({
        userInfo: "",
      })
    }
  },
  //返回
  fanhui() {
    wx.navigateBack({
      delta: 1
    })
  },
  //选择就诊人证件
  bindPickerChangeId: function (e) {
    this.setData({ //给变量赋值
      indexType: e.detail.value,
      point_type: this.data.arrayType[e.detail.value].id
    })
  },
  //姓名
  bindKeyname: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  //证件号
  bindKeycid: function (e) {
    this.setData({
      point: e.detail.value
    })
  },
  //手机号
  bindKeyphone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  //备注
  bindKeymemo: function (e) {
    this.setData({
      memo: e.detail.value
    })
  },
  //选择就诊人证件
  bindPickerChange2: function (e) {
    this.setData({ //给变量赋值
      indexDay: e.detail.value,
      memo: this.data.arrayDay[e.detail.value]
    })
  },
  //预约
  getReser() {
    let that = this
    if (that.data.name == "") {
      wx.showToast({
        icon: "none",
        title: "请输入就诊人姓名",
      })
      return false
    }
  

    // if (that.data.point == "") {
    //   wx.showToast({
    //     icon: "none",
    //     title: "请输入就诊人证件号码",
    //   })
    //   return false
    // }
    if (that.data.phone == "") {
      wx.showToast({
        icon: "none",
        title: "请输入就诊人手机号",
      })
      return false
    }
    if (that.data.reach_time == '' || that.data.reach_time_two == "") {
      wx.showToast({
        icon: "none",
        title: "请选择到院日期",
      })
      return false
    }

    wx.requestSubscribeMessage({
      tmplIds: ['M6E-ttdTGJ-ritdYVh1RNCmkY-tJwo1njLahxw21FtU'],
      success(subscribeRes) {
        console.log(subscribeRes, '同意消息订阅');
        if (subscribeRes['M6E-ttdTGJ-ritdYVh1RNCmkY-tJwo1njLahxw21FtU'] === 'accept') {
          // 用户同意订阅消息，执行你的逻辑
          wx.request({
            url: getApp().data.besa_url + 'me_make',
            method: 'POST', //方法分GET和POST，根据需要写
            data: {
              tel: that.data.tel, //手机号
              name: that.data.name, //姓名
              // point_type: that.data.point_type, //证件类型
              // point: that.data.point, //证件号码
              phone: that.data.phone, //手机号
              memo: that.data.memo, //备注
              is_he: "1", //1本人预约 2代人预约
              fc: "1", //1手术预约 2复查预约
              yy_data: that.data.reach_time, //到院日期
              yy_time: that.data.reach_time_two, //到院时间
            },
            header: {
              'Content-Type': 'application/json'
            },
            success: function (res) { //这里写调用接口成功之后所运行的函数
              if (res.data.code == "1") {
                console.log(res)
                that.sendSecondRequest(res.data.data);
                wx.showToast({
                  icon: "none",
                  title: res.data.msg,
                })
                let dats = res.data.data
                setTimeout(() => {
                  wx.navigateTo({
                    url: '../appoindetails/appoindetails?number=' + dats,
                  })
                }, 1000)
              }else{
                console.log(res);
                wx.showToast({
                  icon:"error",
                  title: res.data.msg,
                })
              }
              
            },
            fail: function (res) { //这里写调用接口失败之后所运行的函数
              console.log('.........fail..........', res);
            }
          })
          console.log('掉用了网络请求');
        }else{
          wx.request({
            url: getApp().data.besa_url + 'me_make',
            method: 'POST', //方法分GET和POST，根据需要写
            data: {
              tel: that.data.tel, //手机号
              name: that.data.name, //姓名
              // point_type: that.data.point_type, //证件类型
              // point: that.data.point, //证件号码
              phone: that.data.phone, //手机号
              memo: that.data.memo, //备注
              is_he: "1", //1本人预约 2代人预约
              fc: "1", //1手术预约 2复查预约
              yy_data: that.data.reach_time, //到院日期
              yy_time: that.data.reach_time_two, //到院时间
            },
            header: {
              'Content-Type': 'application/json'
            },
            success: function (res) { //这里写调用接口成功之后所运行的函数
              if (res.data.code == "1") {
                console.log(res)
                wx.showToast({
                  icon: "none",
                  title: res.data.msg,
                })
                let dats = res.data.data
                setTimeout(() => {
                  wx.navigateTo({
                    url: '../appoindetails/appoindetails?number=' + dats,
                  })
                }, 1000)
              }else{
                console.log(res);
                wx.showToast({
                  icon:"error",
                  title: res.data.msg,
                })
              }
            },
            fail: function (res) { //这里写调用接口失败之后所运行的函数
              console.log('.........fail..........', res);
            }
          }) 
        }
      },
      fail(res) {
        console.log(res);
      }
    })
  },
  sendSecondRequest(orderNumber) {
    console.log('发起挂号请求',orderNumber);
    wx.request({
      url: getApp().data.besa_url + 'wx_fh',
      method: 'POST',
      data: {
        number: orderNumber
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // 处理第二个请求成功的逻辑
        console.log('Second request success:', res);
      },
      fail: function (res) {
        // 处理第二个请求失败的逻辑
        console.log('Second request fail:', res);
      }
    })
  },
  onMyEvent(e) {
    console.log("组件传来的值", e.detail)
    this.setData({
      reach_time: e.detail.reach_time,
      reach_time_two: e.detail.reach_time_two,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})