// pages/appoindetails/appoindetails.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "预约详情",
    back: true,
    infolist:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      number:options.number
    })
    this.getinfolist()
  },
  //预约信息详情
  getinfolist() {
    let that = this
    wx.request({
      url: getApp().data.besa_url + 'make_detail',
      method: 'POST',
      data: {
        number: that.data.number,
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.data.number);
        // that.sendSecondRequest(res.data.data.number);
        let shuzu = res.data.data
        if (shuzu.reach_time) {
          shuzu.reach_time = shuzu.reach_time.slice(0, 16)
        }
        that.setData({
          infolist: shuzu
        })
      },
      fail: function (res) {
        console.log('.........fail..........', res);
      }
    })
  },
  //到院路线
  bringMap() {
    wx.openLocation({
      //116.296211,39.967752 
      //116.296324,39.967746
      //116.2897,39.961532
      longitude:116.2897, // 经度
      latitude:39.961532, // 纬度
      name: '北京阿玛施眼科', // 地点名称
      address: '北京阿玛施眼科停车场-出入口', // 地址的详细说明
      scale: 18, // 缩放比例
      success: function (res) {
        console.log('打开地图成功');
      },
      fail: function (err) {
        console.log('打开地图失败', err);
      }
    });
  },
  //取消预约
  cancellation(){
    let that = this
    wx.showModal({
      title: '温馨提示',
      content: '确定要取消预约吗？',
      // showCancel: false,
      complete: (res) => {
        if (res.cancel) {
          console.log('用户点击取消')
        }
        if (res.confirm) {
          // console.log('用户点击确定') 
          wx.request({
            url: getApp().data.besa_url + 'delete_order',
            method: 'POST', //方法分GET和POST，根据需要写
            data: {
              number:that.data.number,
            },
            header: {
              'Content-Type': 'application/json'
            },
            success: function (res) { //这里写调用接口成功之后所运行的函数
              console.log(res)
              wx.showToast({
                icon: "none",
                title: res.data.msg,
              })
              setTimeout(()=>{
                wx.navigateBack({
                  delta: 1
                })
              },1000)
            },
            fail: function (res) { //这里写调用接口失败之后所运行的函数
              console.log('.........fail..........', res);
            }
          })
        }
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