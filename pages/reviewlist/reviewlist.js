// pages/reviewlist/reviewlist.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "术后复查",
    back: false,
    infolist: "",
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
    that.myorder()
  },
  //返回
  fanhui() {
    wx.navigateBack({
      delta: 1
    })
  },
  myorder() {
    let that = this
    wx.request({
      url: getApp().data.besa_url + 'make_list',
      method: 'POST', //方法分GET和POST，根据需要写
      data: {
        patientId: that.data.userInfo.patientID, //登录用户的ID
        is_he:"1",//1本人预约 2代人预约
        // status:"",//1未完成 2已完成 3已取消 不传查全部
        fc: "1", //1手术预约 2复查预约
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) { //这里写调用接口成功之后所运行的函数
        console.log(res)
        let shuzu = res.data.data
        for (let i = 0; i < shuzu.length; i++) {
          shuzu[i].add_time = shuzu[i].add_time.slice(0, 10)
        }
        that.setData({
          infolist: shuzu,
        })
      },
      fail: function (res) { //这里写调用接口失败之后所运行的函数
        console.log('.........fail..........', res);
      }
    })
  },
  goReexamineDetails(e){
    let dats = e.currentTarget.dataset.dats
    console.log(dats)
    wx.navigateTo({
      url: '../appoindetails/appoindetails?number='+dats.number
    })
  },
  goReexamine(e) {
    // console.log(e.currentTarget.dataset.dats)
    // console.log(e.currentTarget.dataset.id)
    // let dats = e.currentTarget.dataset.dats
    // return false
    // wx.navigateTo({
    //   url: '../reexamine/reexamine?name=' + dats.name + "&phone=" + dats.phone + "&id=" + dats.id + "&up_time=" + dats.up_time,
    // })
    wx.navigateTo({
      url: '../reexamine/reexamine',
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