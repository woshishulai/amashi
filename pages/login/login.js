// pages/login/login.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navHeight: app.globalData.navHeight, //导航栏高度
    navTop: app.globalData.navTop, //导航栏距顶部距离
    navObj: app.globalData.navObj, //胶囊的高度
    navObjWid: app.globalData.navObjWid, //胶囊宽度+距右距离
    cheshow: true, //登录状态
    telnumber: "", //手机号码
    pid: "", //顾问id
    optionssata: "",
    userInfo: "", //用户信息
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this
    var scene = decodeURIComponent(options.scene) // 34,35
    // var scene = 34
    if (scene && scene != "null" && scene != '' && scene != "undefined") {
      that.setData({
        pid: scene,
        optionssata: scene,
      })
    } else {
      that.setData({
        pid: "0",
        optionssata: "1",
      })
    }
    if (wx.getStorageSync('userInfo') && wx.getStorageSync('userInfo') != '' && wx.getStorageSync('userInfo') != 'null') {
      let userInfo = JSON.parse(wx.getStorageSync('userInfo'))
      that.setData({
        userInfo: userInfo,
      })
      console.log("有用户信息",userInfo,)
      console.log(that.data.pid)
      if (that.data.pid == "0" && that.data.pid != "0") {
        that.setData({
          pid: userInfo.pid,
        })
      }
      that.loginyou()
      wx.switchTab({
        url: "/pages/home/home",
      })
    } else {
      console.log("无用户信息")
      that.setData({
        userInfo: "",
      })
    }
    console.log(that.data.pid)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
  //有用户信息的话直接替换顾问
  loginyou() {
    let that = this;
    let code = '';
    wx.login({
      success: (res) => {
        code=res.code;
        wx.request({
          url: getApp().data.besa_url + 'user_log',
          method: 'POST',
          data: {
            tel: that.data.userInfo.tel,
            pid: that.data.pid,
            code:code,
          },
          header: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
            console.log(res)
            wx.setStorageSync('userInfo', JSON.stringify(res.data.data));
            console.log(wx.getStorageSync('userInfo','查看openId'));
            that.setData({
              userInfo: JSON.parse(wx.getStorageSync('userInfo')),
            })
            that.getinfolist()
          },
          fail: function (res) {
            console.log('.........fail..........', res);
          }
        })
      },
    })
  },
  //登录状态勾选
  selectedList(e) {
    console.log(e.detail.value)
    if (e.detail.value.length != '0') {
      this.setData({
        cheshow: true
      })
    } else {
      this.setData({
        cheshow: false
      })
    }
  },
  onGetPhoneNumber(e) {
    // console.log(e)
    // console.log(e.detail.code) // 动态令牌
    // console.log(e.detail.errMsg) // 回调信息（成功失败都会返回）
    // console.log(e.detail.errno) // 错误码（失败时返回）
    let that = this;
    if (e.detail.code && e.detail.code != '') {
      wx.request({
        url: getApp().data.besa_url + 'user_tel',
        method: 'POST', //方法分GET和POST，根据需要写
        data: {
          code: e.detail.code,
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) { //这里写调用接口成功之后所运行的函数
          console.log(res)
          console.log(res.data.data)
          that.setData({
            telnumber: res.data.data
          })
          console.log(that.data.telnumber)
        },
        fail: function (res) { //这里写调用接口失败之后所运行的函数
          console.log('.........fail..........', res);
        }
      })
    } else {}
  },
  //授权登录
  login() {
    let that = this;
    let code ='';
    // that.setData({
    //   telnumber:"19350260218"
    // })
    if (that.data.telnumber == '') {
      wx.showToast({
        icon: "none",
        title: '请先授权手机号',
      })
      return false
    }
wx.login({
  success: (res) => {
    code=res.code;
    console.log(code,'我是login');
    wx.request({
      url: getApp().data.besa_url + 'user_log',
      method: 'POST',
      data: {
        tel: that.data.telnumber,
        pid: that.data.pid,
        code:code,
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        wx.showToast({
          icon: "success",
          title: res.data.msg,
        })
        wx.setStorageSync('userInfo', JSON.stringify(res.data.data));
        wx.setStorageSync('openid', res.data.data.openid);
        setTimeout(() => {
          wx.switchTab({
            url: "/pages/home/home",
          })
        }, 2000)
      },
      fail: function (res) {
        console.log('.........fail..........', res);
      }
    })
  },
})
console.log(code);

  },
  //获取用户信息
  getinfolist() {
    let that = this
    console.log(that.data.userInfo)
    wx.request({
      url: getApp().data.besa_url + 'select_user',
      method: 'POST', //方法分GET和POST，根据需要写
      data: {
        id: that.data.userInfo.id, //
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) { //这里写调用接口成功之后所运行的函数
        wx.setStorageSync('userInfo', JSON.stringify(res.data.data));
        console.log(res.data.data)
        that.setData({
          userInfo: res.data.data,
        })
      },
      fail: function (res) { //这里写调用接口失败之后所运行的函数
        console.log('.........fail..........', res);
      }
    })
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