// pages/order/order.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "我的预约订单",
    back: true,
    shows:"0",
    userInfo:"",//用户信息
    infolist_my:[],//我的预约列表
    infolist_he:[],//代人预约
    zhanshi1:false,
    zhanshi2:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this
    that.setData({
      shows:options.shows
    })
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
    that.heorder()
  },
  myorder(){
    let that = this
    wx.request({
      url: getApp().data.besa_url + 'make_list',
      method: 'POST', //方法分GET和POST，根据需要写
      data: {
        patientId:that.data.userInfo.patientID,//登录用户的ID
        is_he:"1",//1本人预约 2代人预约
        // status:"",//1未完成 2已完成 3已取消 不传查全部
        fc:"1",//1手术预约 2复查预约
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) { //这里写调用接口成功之后所运行的函数
        console.log(res)
        let shuzu = res.data.data
        for (let i = 0; i < shuzu.length; i++) {
          if(shuzu[i].reach_time){
            shuzu[i].reach_time =  shuzu[i].reach_time.slice(0,10)
          }
        }
        that.setData({
          infolist_my: shuzu,
        })
        if(shuzu==""){
          that.setData({
            zhanshi1:true
          })
        }
      },
      fail: function (res) { //这里写调用接口失败之后所运行的函数
        console.log('.........fail..........', res);
      }
    })
  },
  heorder(){
    let that = this
    wx.request({
      url: getApp().data.besa_url + 'make_list',
      method: 'POST', //方法分GET和POST，根据需要写
      data: {
        patientId:that.data.userInfo.patientID,//登录用户的ID
        is_he:"2",//1本人预约 2代人预约
        // status:"",//1未完成 2已完成 3已取消 不传查全部
        fc:"1",//1手术预约 2复查预约
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) { //这里写调用接口成功之后所运行的函数
        console.log(res)
        let shuzu = res.data.data
        for (let i = 0; i < shuzu.length; i++) {
          if(shuzu[i].reach_time){
            shuzu[i].reach_time =  shuzu[i].reach_time.slice(0,10)
          }
        }
        that.setData({
          infolist_he: shuzu,
        })
        if(shuzu==""){
          that.setData({
            zhanshi2:true
          })
        }
      },
      fail: function (res) { //这里写调用接口失败之后所运行的函数
        console.log('.........fail..........', res);
      }
    })
  },
  //切换
  qiehuan(e){
    // console.log(e.target.dataset.num)
    let that = this
    that.setData({
      shows:e.target.dataset.num
    })
    // if(e.target.dataset.num==1){
    //   that.heorder()
    // }else{
    //   that.myorder()
    // }
  },
  goReexamine(e){
    let dats = e.currentTarget.dataset.dats
    console.log(dats)
    wx.navigateTo({
      url: '../appoindetails/appoindetails?number='+dats.number
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
    this.myorder()
    this.heorder()
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