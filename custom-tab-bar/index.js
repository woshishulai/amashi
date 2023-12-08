// custom-tab-bar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    homeImg:'/images/tabicon1.png',
    homeSelectImg:'/images/tabicon1_cur.png',
    sdicImg:'/images/tabicon2.png',
    sdicSelectImg:'/images/tabicon2_cur.png',
    _tabbat:0,
    urls:[
      "/pages/home/home",
      "/pages/my/my",
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchTap: function (e) {
      var self = this
      var index = e.currentTarget.dataset.index;
      var urls = self.data.urls
      wx.switchTab({
      url: urls[index],
      success: function(e) { //跳转成功后刷新页面
        var page = getCurrentPages().pop();
        if (page == undefined || page == null) return;
        page.onLoad();
      }
      })
      // _tabbat
      self.setData({
        _tabbat : index
      })
    }
  }
})
