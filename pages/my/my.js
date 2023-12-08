// pages/my/my.js
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
    imgurl:app.data.besa_url,
    userInfo:"",//用户信息
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
    // console.log(that.data.userInfo)
  },
  //个人资料修改
  goInfofrom(){
    let that =this
    if(that.data.userInfo.id){
      wx.navigateTo({
        url: '../infofrom/infofrom',
      })
    }else{
      wx.navigateTo({
        url: "/pages/login/login",
      })
    }
  },
  //预约订单
  goOrder(){
    let that =this
    if(that.data.userInfo.id){
      wx.navigateTo({
        url: '../order/order?shows=0',
      })
    }else{
      wx.navigateTo({
        url: "/pages/login/login",
      })
    }
  },
  //复查记录
  goReviewRecords(){
    let that =this
    if(that.data.userInfo.id){
      wx.navigateTo({
        url: '../reviewRecords/reviewRecords',
      })
    }else{
      wx.navigateTo({
        url: "/pages/login/login",
      })
    }
  },
  //联系我们
  goContact(){
    console.log(this.data.userInfo);
    const number=this.data.userInfo.p_data[0].sort
    console.log(number);
    wx.navigateTo({
      url: `../contact/contact?number=${number}`
    })
  },
  //联系客服
  //退出登录
  exitclose(){
    let that = this
    wx.removeStorageSync("userInfo")
    if (wx.getStorageSync('userInfo') && wx.getStorageSync('userInfo') != '') {
      that.setData({
        userInfo: JSON.parse(wx.getStorageSync('userInfo')),
      })
    } else {
      that.setData({
        userInfo: "",
      })
    }
    console.log(that.data.userInfo)
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
      _tabbat: 1
    })
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
    console.log(that.data.userInfo)
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