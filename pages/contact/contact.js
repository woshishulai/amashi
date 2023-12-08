// pages/contact/contact.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "联系我们",
    back: true,
    phone:'4006188181',
    listinfo:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getinfolist()
    const number = options.number?options.number:4006188181
    this.setData({
      phone:options.number
    })
  },
  getinfolist(){
    let that = this
    wx.request({
      url: getApp().data.besa_url + 'public',
      method: 'POST', //方法分GET和POST，根据需要写
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) { //这里写调用接口成功之后所运行的函数
        console.log(res)
        that.setData({
          infolist: res.data.data
        })
      },
      fail: function (res) { //这里写调用接口失败之后所运行的函数
        console.log('.........fail..........', res);
      }
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