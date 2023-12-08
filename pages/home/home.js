// pages/home/home.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "阿玛施眼科",
    back: true,
    navHeight: app.globalData.navHeight, //导航栏高度
    navTop: app.globalData.navTop, //导航栏距顶部距离
    navObj: app.globalData.navObj, //胶囊的高度
    navObjWid: app.globalData.navObjWid, //胶囊宽度+距右距离
    userInfo: "", //用户信息
    pname: "", //顾问姓名
    pid: "", //顾问id
    optionssata: "",
    telnumber: "", //手机号
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this
    if (wx.getStorageSync('userInfo') && wx.getStorageSync('userInfo') != '' && wx.getStorageSync('userInfo') != 'null') {
      const userInfos = JSON.parse(wx.getStorageSync('userInfo'))
      if(userInfos.patientID && userInfos.patientID != 'undefined' &&userInfos.patientID != 'null' && userInfos.patientID!=''){
        that.setData({
          userInfo: JSON.parse(wx.getStorageSync('userInfo')),
        })
        that.getinfolist()
      }else{
        console.log('您还未填写个人资料，请先完善个人信息,onload');
        wx.showToast({
          icon:'none',
          title: '请先完善您的个人信息',
        })
        setTimeout(() => {
          wx.navigateTo({
            url: '../infofrom/infofrom',
          })
        }, 2000);
      }
    } else {
      that.setData({
        userInfo: "",
      })
    }
    // console.log(that.data.userInfo)
    // var scene = decodeURIComponent(options.scene)// 34,35
    // // var scene = 34
    // if (scene && scene != "null" && scene != '' && scene != "undefined") {
    //   that.setData({
    //     pid: scene,
    //     optionssata: scene,
    //   })
    //   console.log(that.data.userInfo)
    //   let userInfo = that.data.userInfo
    //   // if (userInfo == '') {
    //   //   // wx.removeStorageSync("userInfo")
    //   // }
    //   console.log(userInfo.pid)
    //   if (userInfo != '' && userInfo.pid != "0" && userInfo.pid != that.data.pid) {
    //     console.log(1)
    //     that.setData({
    //       pname: userInfo.p_data[0].employeeName
    //     })
    //     that.huanguwen()
    //   } 
    //   if (userInfo.pid == that.data.pid) {
    //     console.log(2)
    //     that.getinfolist()
    //   } 
    //   if(userInfo.pid=="0") {
    //     console.log(3)
    //     wx.removeStorageSync("userInfo")
    //     that.setData({
    //       userInfo: "",
    //     })
    //     that.getinfolist()
    //   }
    //   // wx.removeStorageSync("userInfo")
    // } else {
    //   that.setData({
    //     pid: "0",
    //     optionssata: "1",
    //   })
    // }
    // console.log(that.data.pid)
    // this.huanguwen()
  },
  //我要预约
  gonext1() {
    let that = this
    console.log(that.data.userInfo )
    if (that.data.userInfo == "" || that.data.userInfo == "null" || that.data.userInfo == "undefined") {
      wx.navigateTo({
        url: "/pages/login/login",
      })
    }if(that.data.userInfo.patientID == "" || that.data.userInfo.patientID == "null" || that.data.userInfo.patientID == "undefined"){
      console.log('您还未填写个人资料，请先完善个人信息,yuyue1');
      wx.showToast({
        icon:'none',
        title: '请先完善您的个人信息',
      })
      setTimeout(() => {
        wx.navigateTo({
          url: '../infofrom/infofrom',
        })
      }, 2000);
    } else if (that.data.userInfo != ""&&that.data.userInfo.pid == "0") {
      wx.showModal({
        title: '温馨提示',
        content: '当前未绑定顾问，请先联系顾问，获取邀请码',
        showCancel: false,
        complete: (res) => {
          if (res.cancel) {
            // console.log('用户点击取消')
          }
          if (res.confirm) {
            // console.log('用户点击确定') 
          }
        }
      })
    } else {
      wx.navigateTo({
        url: '../myappoin/myappoin',
      })
    }
  },
  huanguwen() {
    let that = this
    console.log(that.data.pname)
    let content = "您已绑定摘镜顾问[北京阿玛施眼科：" + that.data.pname + "]\r\n是否更换?"
    wx.showModal({
      title: '温馨提示',
      content: content,
      // showCancel: false,
      complete: (res) => {
        if (res.cancel) {
          // console.log('用户点击取消')
        }
        if (res.confirm) {
          // console.log('用户点击确定') 
          that.login()
        }
      }
    })
  },
  //授权登录
  login() {
    let that = this;
    let code ='';
    wx.login({
      success: (res) => {
        code:res.code;
        console.log(res.code);
        wx.request({
          url: getApp().data.besa_url + 'user_log',
          method: 'POST',
          data: {
            tel: login.data.userInfo.tel,
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
              title: "更换成功",
            })
            wx.setStorageSync('userInfo', JSON.stringify(res.data.data));
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
    //术后复查
  gonext2() {
    let that = this
    if (that.data.userInfo == "" || that.data.userInfo == "null" || that.data.userInfo == "undefined") {
      wx.navigateTo({
        url: "/pages/login/login",
      })
    }if(that.data.userInfo.patientID == "" || that.data.userInfo.patientID == "null" || that.data.userInfo.patientID == "undefined"){
      console.log('您还未填写个人资料，请先完善个人信息,yuyue2');
      wx.showToast({
        icon:'none',
        title: '请先完善您的个人信息',
      })
      setTimeout(() => {
        wx.navigateTo({
          url: '../infofrom/infofrom',
        })
      }, 2000);
    }
     else if (that.data.userInfo.pid == 0) {
      wx.showModal({
        title: '温馨提示',
        content: '当前未绑定顾问，请先联系顾问，获取邀请码',
        showCancel: false,
        complete: (res) => {
          if (res.cancel) {
            // console.log('用户点击取消')
          }
          if (res.confirm) {
            // console.log('用户点击确定') 
          }
        }
      })
    } else {
      wx.navigateTo({
        url: '../reviewlist/reviewlist',
      })
    }
  },
    //代人预约
  gonext3() {
    let that = this
    if (that.data.userInfo == "" || that.data.userInfo == "null" || that.data.userInfo == "undefined") {
      wx.navigateTo({
        url: "/pages/login/login",
      })
    }if(that.data.userInfo.patientID == "" || that.data.userInfo.patientID == "null" || that.data.userInfo.patientID == "undefined"){
      console.log('您还未填写个人资料，请先完善个人信息yuyue3');
      wx.showToast({
        icon:'none',
        title: '请先完善您的个人信息',
      })
      setTimeout(() => {
        wx.navigateTo({
          url: '../infofrom/infofrom',
        })
      }, 2000);
    } else if (that.data.userInfo.pid == 0) {
      wx.showModal({
        title: '温馨提示',
        content: '当前未绑定顾问，请先联系顾问，获取邀请码',
        showCancel: false,
        complete: (res) => {
          if (res.cancel) {
            // console.log('用户点击取消')
          }
          if (res.confirm) {
            // console.log('用户点击确定') 
          }
        }
      })
    } else {
      wx.navigateTo({
        url: '../heappoin/heappoin',
      })
    }
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
    this.getTabBar().setData({
      _tabbat: 0
    })
    let that = this
    if (wx.getStorageSync('userInfo') && wx.getStorageSync('userInfo') != '' && wx.getStorageSync('userInfo') != 'null') {
      console.log('有用户信息');
      that.setData({
        userInfo: JSON.parse(wx.getStorageSync('userInfo')),
      })
      that.getinfolist()
    } else {
      that.setData({
        userInfo: "",
      })
    }
  },
  //获取用户信息
  getinfolist() {
    let that = this
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