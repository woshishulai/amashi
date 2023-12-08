// navigationBar/navigationBar.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: ''
    },
    back: {
      type: Boolean,
      value: true
    },
    backHome: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusBarHeight: app.globalData.statusBarHeight + 'px',
    navHeight: (app.globalData.navHeight + 44) + 'px',
    navHeight: app.globalData.navHeight, //导航栏高度
    navTop: app.globalData.navTop, //导航栏距顶部距离
    navObj: app.globalData.navObj, //胶囊的高度
    navObjWid: app.globalData.navObjWid, //胶囊宽度+距右距离
  },
  /**
   * 组件的方法列表
   */
  methods: {
    back: function () {
      wx.navigateBack({
        delta: 1
      })
    },
    
  },
})
