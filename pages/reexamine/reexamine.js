// pages/reexamine/reexamine.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        title: "术后复查",
        back: false,
        id: "",
        name: "", //就诊人王小耳
        phone: "", //手机号18339289370
        time: '', //就诊日期
        userInfo: "",
        reach_time: "", //到院日期
        reach_time_two: "", //到院时间
        up_time: "", //手术日期
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let that = this
        // that.setData({
        //   name:options.name,
        //   phone:options.phone,
        //   id:options.id,
        //   up_time:options.up_time,
        // })
        if (wx.getStorageSync('userInfo') && wx.getStorageSync('userInfo') != '') {
            that.setData({
                userInfo: JSON.parse(wx.getStorageSync('userInfo')),
                name: JSON.parse(wx.getStorageSync('userInfo')).name,
                phone: JSON.parse(wx.getStorageSync('userInfo')).tel,
                id: JSON.parse(wx.getStorageSync('userInfo')).patientID,
                // up_time:JSON.parse(wx.getStorageSync('userInfo')).up_time,
            })
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
    //首先 用户点击 判断同意还是不同意
    ceshi() {
        let that = this;
        if (that.data.reach_time == '' || that.data.reach_time_two == '') {
            wx.showToast({
                icon: "none",
                title: "请选择日期",
            });
            return false;
        }
        wx.requestSubscribeMessage({
            tmplIds: ['M6E-ttdTGJ-ritdYVh1RNCmkY-tJwo1njLahxw21FtU'],
            success(subscribeRes) {
                if (subscribeRes['M6E-ttdTGJ-ritdYVh1RNCmkY-tJwo1njLahxw21FtU'] === 'accept') {
                    console.log(subscribeRes, '同意消息订阅');
                    wx.request({
                        url: getApp().data.besa_url + 'review',
                        method: 'POST',
                        data: {
                            id: that.data.id,
                            reach_time: that.data.reach_time, //到院日期
                            reach_time_two: that.data.reach_time_two, //到院事件
                            n_name: that.data.name,
                        },
                        header: {
                            'Content-Type': 'application/json'
                        },
                        success: function (res) {
                            if (res.data.code == "1") {
                              console.log(res.data.data.number,'我是流水号');
                              console.log(that.data.id,'我是用户id');
                              that.sendSecondRequest(res.data.data.number)
                              wx.showToast({
                                  icon: "none",
                                  title: res.data.msg,
                              });
                                let dats = res.data.data;
                                // 延迟一秒后跳转到另一个页面
                                setTimeout(() => {
                                    wx.navigateTo({
                                        url: '../appoindetails/appoindetails?number=' + dats.number,
                                    });
                                }, 1000);
                            }else{
                              wx.showToast({
                                icon:"none",
                                title: res.data.msg,
                              })
                            }
                        },
                        fail: function (res) {
                            console.log('.........fail..........', res);
                        }
                    });
                    console.log('掉用了网络请求');
                } else {
                  wx.request({
                    url: getApp().data.besa_url + 'review',
                    method: 'POST',
                    data: {
                        id: that.data.id,
                        reach_time: that.data.reach_time, //到院日期
                        reach_time_two: that.data.reach_time_two, //到院事件
                        n_name: that.data.name,
                    },
                    header: {
                        'Content-Type': 'application/json'
                    },
                    success: function (res) {
                        if (res.data.code == "1") {
                          console.log(res.data.data.number);
                          wx.showToast({
                              icon: "none",
                              title: res.data.msg,
                          });
                            let dats = res.data.data;
                            // 延迟一秒后跳转到另一个页面
                            setTimeout(() => {
                                wx.navigateTo({
                                    url: '../appoindetails/appoindetails?number=' + dats.number,
                                });
                            }, 1000);
                        }else{
                          wx.showToast({
                            icon:"error",
                            title: res.data.msg,
                          })
                        }
                    },
                    fail: function (res) {
                        console.log('.........fail..........', res);
                    }
                });
                    // 用户不同意订阅消息，直接发起请求，不调用sendSecondRequest
                }
            },
            fail(res) {
                console.log(res, '不同意');
            }
        });
    },

    //请求的方法
    submitRequest() {
        wx.request({
            url: getApp().data.besa_url + 'review',
            method: 'POST',
            data: {
                id: that.data.id,
                reach_time: that.data.reach_time, //到院日期
                reach_time_two: that.data.reach_time_two, //到院事件
                n_name: this.data.name,
            },
            header: {
                'Content-Type': 'application/json'
            },
            success: function (res) {
                wx.showToast({
                    icon: "none",
                    title: res.data.msg,
                });
                console.log(res.data.data.number);
                if (res.data.code == "1") {
                    let dats = res.data.data;
                    // 延迟一秒后跳转到另一个页面
                    setTimeout(() => {
                        wx.navigateTo({
                            url: '../appoindetails/appoindetails?number=' + dats.number,
                        });
                    }, 2000);
                }
            },
            fail: function (res) {
                console.log('.........fail..........', res);
            }
        });
    },
    //发送消息通知
    sendSecondRequest(orderNumber) {
        console.log('发起挂号请求', orderNumber);
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
                wx.showToast({
                  icon: "none",
                  title: res.data.msg,
              });
            },
            fail:function(err){
              wx.showToast({
                icon: "none",
                title: err.data.msg,
            });
            }
        })
    },
    onInput(e) {
        this.setData({
            name: e.detail.value
        });
    },
    onMyEvent(e) {
        console.log("组件传来的值", e.detail)
        this.setData({
            reach_time: e.detail.reach_time,
            reach_time_two: e.detail.reach_time_two,
        })
    },
    //打开预约时间弹窗

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