// pages/infofrom/infofrom.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "我要预约",
    back: false,
    nikename: "", //昵称
    name: "", //姓名
    arraySex: [{
        id: 1,
        name: "男",
      },
      {
        id: 2,
        name: "女",
      },
      // {
      //   id: 3,
      //   name: "保密",
      // }
    ],
    indexSex: "1",
    // arrayType: ['身份证', '护照(PASSPORT)', '港澳台居民来往内地通行证', ],
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
    //证件号码 01-居民身份证 02-中国护照 14-港澳护照或通行证 15-台湾居民来往大陆通行证 16-外籍护照 99-其他有效身份证件
    indexType: "0",
    idcard: "", //身份证号
    imgurl: app.data.besa_url,
    userInfo: "", //用户信息
    gender: "1", //性别传后台
    point_type: "01", //证件类型传后台
    avatarUrl: "", //用户头像临时路径
    avatarUrlbase: "", //用户头像临时路径base64
    nick_name: "",
    inputValue: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this
    if (wx.getStorageSync('userInfo') && wx.getStorageSync('userInfo') != '') {
      that.setData({
        userInfo: JSON.parse(wx.getStorageSync('userInfo')),
      })
    } else {
      that.setData({
        userInfo: "",
      })
    }
    that.getinfolist()
  },
 //返回
 fanhui() {
  wx.navigateBack({
    delta: 1
  })
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
        let gender = res.data.data.gender
        let arraySex = that.data.arraySex
        for (let i = 0; i < arraySex.length; i++) {
          arraySex[i].index = i
          if (arraySex[i].id == gender) {
            that.setData({
              indexSex: i
            })
          }
        }
        let indexType = res.data.data.point_type
        let arrayType = that.data.arrayType
        for (let i = 0; i < arrayType.length; i++) {
          arrayType[i].index = i
          if (arrayType[i].id == indexType) {
            that.setData({
              indexType: i
            })
          }
        }
        that.setData({
          userInfo: res.data.data,
          avatarUrl: res.data.data.avator,
          avatarUrlbase: res.data.data.avator,
          nick_name: res.data.data.nick_name,
          name:res.data.data.name,
          point:res.data.data.point,
        })
        // console.log
      },
      fail: function (res) { //这里写调用接口失败之后所运行的函数
        console.log('.........fail..........', res);
      }
    })
  },
  //获取头像临时路径
  onChooseAvatar(e) {
    const {
      avatarUrl
    } = e.detail
    this.setData({
      avatarUrl,
    })
    console.log(this.data.avatarUrl)
    let that = this
    wx.uploadFile({
      url: getApp().data.besa_url + 'amsadmin/public_upload',
      filePath: avatarUrl,
      // formData: null,
      formData: {
        path: "user"
      },
      name: 'image_file',
      header: {
        'X-Requested-With': 'XMLHttpRequest',
        // 'Authorization': wx.getStorageSync('token'),//根据后台需要参数
        // 'Appid': wx.getStorageSync('appid')//根据后台需要参数
      },
      success: (res => {
        console.log(JSON.parse(res.data))
        let shuzu = JSON.parse(res.data)
          that.setData({
            avatarUrlbase:shuzu.ym+shuzu.path
          })
      })
    })
  },
  // 图片转64
  base64(url, type) {
    return new Promise((resolve, reject) => {
      wx.getFileSystemManager().readFile({
        filePath: url, //选择图片返回的相对路径
        encoding: 'base64', //编码格式
        success: res => {
          // resolve('data:image/' + type.toLocaleLowerCase() + ';base64,' + res.data)
          resolve(res.data)
        },
        fail: res => reject(res.errMsg)
      })
    })
  },
  bindKeyInput: function (e) {
    console.log(e.detail.value)
    this.setData({
      inputValue: e.detail.value
    })
  },
  //昵称更改
  nicknameChange: function (e) {
    console.log(e.detail.value)
    let that = this
    that.setData({
      nick_name: e.detail.value
    })
    console.log(that.data.nick_name)
  },
  //更改姓名
  bindKeyname(e){
    console.log(e.detail.value)
    let that = this
    that.setData({
      name: e.detail.value
    })
    console.log(that.data.name)
  },
  //更改证件号
  bindKeypoint(e){
    console.log(e.detail.value)
    let that = this
    that.setData({
      point: e.detail.value
    })
    console.log(that.data.point)
  },

  //选择性别
  bindPickerChangeSex: function (e) {
    this.setData({ //给变量赋值
      indexSex: e.detail.value, //每次选择了下拉列表的内容同时修改下标然后修改显示的内容，显示的内容和选择的内容一致
      gender: this.data.arraySex[e.detail.value].id
    })
  },
  //选择就诊人证件
  bindPickerChangeId: function (e) {
    this.setData({ //给变量赋值
      indexType: e.detail.value, //每次选择了下拉列表的内容同时修改下标然后修改显示的内容，显示的内容和选择的内容一致
      point_type: this.data.arrayType[e.detail.value].id
    })
  },
  //保存
  getSSave() {
    let that = this
    if (that.data.nick_name == "" || that.data.name == "" || that.data.avatarUrlbase == "") {
      wx.showToast({
        icon: "none",
        title: "请完成填写信息",
      })
      return false
    } else {
      wx.request({
        url: getApp().data.besa_url + 'personal',
        method: 'POST', //方法分GET和POST，根据需要写
        data: {
          nick_name: that.data.nick_name, //昵称
          name: that.data.name, //姓名
          gender: that.data.gender, //性别
          // point_type: that.data.point_type, //证件类型
          // point: that.data.point, //证件号码
          tel: that.data.userInfo.tel, //电话号码
          pid: that.data.userInfo.pid, //顾问id
          avator: that.data.avatarUrlbase, //头像图片路径
          // avator:"https://ams.sc798.com/upload_file/news_file/ceshi.jpg",
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) { //这里写调用接口成功之后所运行的函数
          console.log(res,'我是看返回的数据');
          that.getinfolist()
          wx.showToast({
            icon: "none",
            title: res.data.msg+'正在为您回到首页',
          })
          setTimeout(() => {
            wx.switchTab({
              url: '../home/home',
            })
          }, 2000);
        },
        fail: function (res) { //这里写调用接口失败之后所运行的函数
          console.log('.........fail..........', res);
        }
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