// app.js
App({
  data: {
    // besa_url:'https://guotouapi.sc798.com/'
    besa_url: 'https://ams.sc798.com/'
  },
  onLaunch() {
    this.autoUpdate()
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    wx.getSystemInfo({
      success: res => {
        this.globalData.statusBarHeight = res.statusBarHeight;
        // this.globalData.headHeight = res.statusBarHeight
        // console.log(res)
        // console.log(menuButtonObject)
        //导航高度
        let statusBarHeight = res.statusBarHeight,
          navTop = menuButtonObject.top,
          navObjWid = res.windowWidth - menuButtonObject.right + menuButtonObject.width, // 胶囊按钮与右侧的距离 = windowWidth - right+胶囊宽度
          navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2;
        this.globalData.navHeight = navHeight; //导航栏总体高度
        this.globalData.navTop = navTop; //胶囊距离顶部距离
        this.globalData.navObj = menuButtonObject.height; //胶囊高度
        this.globalData.navObjWid = navObjWid; //胶囊宽度(包括右边距离)
        this.globalData.windowWidth = res.windowWidth
        this.globalData.statusBarHeight = res.statusBarHeight
        this.globalData.navBarHeight = 44 + res.statusBarHeight
        // console.log(this.globalData)
      },
      fail(err) {
        console.log(err);
      }
    })
    this.globalData.capsule = wx.getMenuButtonBoundingClientRect() //获取胶囊宽高及位置
  },
  autoUpdate: function () {
    var self = this // 获取小程序更新机制兼容 
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager() //1. 检查小程序是否有新版本发布                     
      updateManager.onCheckForUpdate(function (res) { // 请求完新版本信息的回调 
        if (res.hasUpdate) { //2. 小程序有新版本，则静默下载新版本，做好更新准备                                                 
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                if (res.confirm) {
                  //3. 新的版本已经下载好，调用applyUpdate应用新版本并重启  
                  updateManager.applyUpdate()
                } else if (res.cancel) {
                  //不应用 
                }
              }
            })
          })

          updateManager.onUpdateFailed(function () {
            // 新的版本下载失败
            wx.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
            })
          })
        }
      })
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示     
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  globalData: {
    userInfo: null,
  }
})