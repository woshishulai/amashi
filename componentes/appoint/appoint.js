// componentes/appoint/appoint.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    integ: {
      type: String,
      value: "",
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    time: '', //就诊日期
    data_time: "", //日期选择
    // arrayDateime: ["2023年9月", "2023年10月", "2023年11月"],
    // indexDateime: 0, //时间段里第几个默认第一个
    arrayDateime: [{
        id: "2023-09",
        name: "2023年9月",
      },
      {
        id: "2023-10",
        name: "2023年10月",
      }
    ],
    indexDateime: "0",
    shoupop: false, //时间弹窗展示与否
    reach_time: "", //到院日期
    reach_time_two: "", //到院时间
    timelist: [], //时间列表
    data_yue: "", //选中的月份
    everydaylist: [], //月份里的日期列表
    tiqiindex: "0", //默认第一个
    datelists: [], //今天的日期和六十天后的日期
    mayqiweilist: [], //每个月的起始和结束时间
    timstiindex: '', //时间段列表
    nowTime: '', //现在的时间
      yue:'',
      ri:''
  },
  // onLoad(){
  //   let that = this
  //     let now = new Date()
  //     let shijian = that.getThreeDays(now)
  //     // console.log(shijian) //当前时间和60天之后时间
  //     var yuefen = that.getMonthBetween(shijian.now, shijian.last)
  //     // console.log(yuefen) //时间之间的月份
  //     let arrayDateime = []
  //     for (const i in yuefen) {
  //       let name = yuefen[i].replace("-", "年") + "日"
  //       arrayDateime.push({
  //         id: yuefen[i],
  //         name: name
  //       })
  //     }
  //     that.setData({
  //       datelists: shijian,
  //       arrayDateime: arrayDateime, //月份选择列表
  //       data_yue: arrayDateime[0].id
  //     })
  //     that.getyuelist() //获取月份里天数列表
  //     that.setData({
  //       everydaylist: that.setHouseRatesColumn(that.data.mayqiweilist[0].first, that.data.mayqiweilist[0].last),
  //       reach_time: that.setHouseRatesColumn(that.data.mayqiweilist[0].first, that.data.mayqiweilist[0].last)[0].time, //默认今天
  //     })
  //     that.gettimelist() //获取时间列表
  // },
  /**
   * 组件的方法列表
   */
  methods: {
    //获取两个日期之间的月份
    getMonthBetween(start, end) {
      var result = [];
      var s = start.split("-");
      var e = end.split("-");
      var min = new Date();
      var max = new Date();
      min.setFullYear(s[0], s[1]);
      max.setFullYear(e[0], e[1]);
      var curr = min;
      while (curr <= max) {
        var month = curr.getMonth();
        var str = (month == 0 ? curr.getFullYear() - 1 : curr.getFullYear()) + "-" + (month == 0 ? 12 : (month < 10) ? '0' + month : month);
        var s = curr.getFullYear() + "-12";
        if (str == s) {
          str = curr.getFullYear() + "-12";
        }
        result.push(str);
        curr.setMonth(month + 1);
      }
      return result;
    },
    //获取多少天之后的日期
    GetDateTime(dayNum) {
      var dateDay = new Date();
      dateDay.setDate(dateDay.getDate() + dayNum) //获取dayNum天后的日期
      var y = dateDay.getFullYear();
      var m = (dateDay.getMonth() + 1) < 10 ? "0" + (dateDay.getMonth() + 1) : (dateDay.getMonth() + 1); //获取当前月份的日期，不足10补0
      var d = dateDay.getDate() < 10 ? "0" + dateDay.getDate() : dateDay.getDate(); //获取当前几号，不足10补0
      return y + "-" + m + "-" + d;
    },
    //获取近三个月时间
    getThreeDays(now) { //now=new Date();
      var year = now.getFullYear();
      var month = now.getMonth() + 1; //0-11表示1-12月
      var day = now.getDate();
      var dateObj = {};
      if (parseInt(month) < 10) {
        month = "0" + month;
      }
      if (parseInt(day) < 10) {
        day = "0" + day;
      }
      dateObj.now = year + '-' + month + '-' + day;
      //选择日期
      dateObj.last = this.GetDateTime(90)
      return dateObj
    },
    //获取日期
    geidatatimes() {
      const now = new Date()
      const length = 60
      const days = Array.from({
        length
      }, (_, days) => {
        let day = new Date(now) // clone "now"
        day.setDate(now.getDate() - days) // change the date
        return day
      })
      console.log(days)
    },
    //点击展开弹窗
    getTime() {
      let that = this
      let now = new Date()
      let month = now.getMonth() + 1; // getMonth() 返回的是 0 到 11，所以需要加 1
      let day = now.getDate();
      this.setData({
        yue: month.toString(),
        ri: day.toString()
      })
      console.log('当前月是'+this.data.yue,'当前日是'+this.data.ri );
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      // 检查当前时间是否大于下午6点
      if (currentHour > 18 || (currentHour === 18 && currentMinute >= 0)) {
        // 如果是，将日期切换到明天
        now.setDate(now.getDate() + 1);
      }
      that.setData({
        shoupop: true
      })
      let shijian = that.getThreeDays(now)
      // console.log(shijian) //当前时间和60天之后时间
      var yuefen = that.getMonthBetween(shijian.now, shijian.last)
      // console.log(yuefen) //时间之间的月份
      let arrayDateime = []
      for (const i in yuefen) {
        let name = yuefen[i].replace("-", "年") + "月"
        arrayDateime.push({
          id: yuefen[i],
          name: name
        })
      }
      that.setData({
        datelists: shijian,
        arrayDateime: arrayDateime, //月份选择列表
        data_yue: arrayDateime[0].id
      })
      that.getyuelist() //获取月份里天数列表
      that.setData({
        everydaylist: that.setHouseRatesColumn(that.data.mayqiweilist[0].first,
        that.data.mayqiweilist[0].last),
        reach_time: that.setHouseRatesColumn(that.data.mayqiweilist[0].first, that.data.mayqiweilist[0].last)[0].time, //默认今天
      })
      that.gettimelist() //获取时间列表
      // console.log(that.data.timelist[that.data.timstiindex])
      // if(that.data.timelist[that.data.timstiindex]){
      // }
    },
    //获取月份里天数列表
    getyuelist() {
      let that = this
      // console.log(that.data.data_yue) //当前选择的
      // console.log(that.data.arrayDateime) //月份
      // console.log(that.data.datelists) //now last
      let arrayDateime = that.data.arrayDateime
      let datelists = that.data.datelists

      let shuzu = []
      let shuzu2 = [] //判断首位日期和1号的关系
      for (const i in arrayDateime) {
        shuzu.push(arrayDateime[i].id + '-01')
      }
      let lenmun = shuzu.length - 1
      for (const i in shuzu) {
        if (i == 0) {
          shuzu2[0] = {
            first: datelists.now,
            last: that.getLastDay(datelists.now)
          }
        } else if (i == lenmun) {
          shuzu2[lenmun] = {
            first: shuzu[lenmun],
            last: datelists.last
          }
        } else {
          shuzu2[i] = {
            first: shuzu[i],
            last: that.getLastDay(shuzu[i])
          }
        }
      }
      // console.log("每月起始结束时间", shuzu2)
      that.setData({
        mayqiweilist: shuzu2
      })
      console.log(that.data.mayqiweilist)
    },
    //获取该月最后一天的日期
    getLastDay(time) {
      var year = new Date(time).getFullYear(); //获取年份
      var month = new Date(time).getMonth() + 1; //获取月份
      var lastDate = new Date(year, month, 0).getDate(); //获取当月最后一日
      month = month < 10 ? '0' + month : month; //月份补 0
      return [year, month, lastDate].join("-")
    },
    //比较日期大小
    dateCompare(startdata, enddata) {
      startdata = startdata.replace('"', '')
      enddata = enddata.replace('"', '')
      var arr = startdata.split("-");
      var starttime = new Date(arr[0], arr[1], arr[2]);
      var starttimes = starttime.getTime();
      var arrs = enddata.split("-");
      var lktime = new Date(arrs[0], arrs[1], arrs[2]);
      var lktimes = lktime.getTime();
      if (starttimes > lktimes) {
        return false;
      } else
        return true;
    },
    //获取该时间段内的日期和星期
    setHouseRatesColumn(startTime, endTime, week) {
      let weeklist = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
      // 获取时间段内的所有日期/指定星期几的日期
      week = week == 7 ? 0 : week;
      let dateList = [];
      startTime = new Date(startTime);
      endTime = new Date(endTime);
      while ((endTime.getTime() - startTime.getTime()) >= 0) {
        let year = startTime.getFullYear();
        let month = startTime.getMonth() + 1 < 10 ? '0' + (startTime.getMonth() + 1) : startTime.getMonth() + 1;
        let day = startTime.getDate().toString().length == 1 ? '0' + startTime.getDate() : startTime.getDate();
        if (isNaN(week) || startTime.getDay() == week) {
          // dateList.push(`${year}-${month}-${day}`);
          let time = `${year}-${month}-${day}`
          // console.log(time)
          let week = new Date(time).getDay();
          // console.log(week)
          dateList.push({
            week: weeklist[week],
            month: month,
            day: day,
            time: `${year}-${month}-${day}`
          });
        }
        startTime.setDate(startTime.getDate() + 1);
      }
      return dateList;
    },
    //切换日期
    switchDate(e) {
      let that = this
      // console.log(e.currentTarget.dataset.dats)
      // console.log(e.currentTarget.dataset.index)
      let index = e.currentTarget.dataset.index
      let dats = e.currentTarget.dataset.dats
    console.log(index,dats.month,dats.day,'查看时间日期');
    this.setData({
      yue: dats.month,
      ri: dats.day
    })
    console.log('更新的月是'+this.data.yue,'更新日是'+this.data.ri );
      that.setData({
        tiqiindex: index,
        reach_time: dats.time
      })
      that.gettimelist()
      //tiqiindex
    },
    //关闭弹窗
    close() {
      this.setData({
        shoupop: false
      })
    },
    //点击下一步
    next() {
      let that = this
      console.log(that.data.reach_time)
      console.log(that.data.reach_time_two)
      // if(that.data.yue==2&&that.data.ri>=10&&that.data.ri<=17){
      //   wx.showToast({
      //     icon: "none",
      //     title: "节假日期间，请您选择其它日期",
      //   })
      //   return false
      // }
      if(that.data.reach_time_two=='08:00'){
        wx.showToast({
          icon: "none",
          title: "预约已满，请选择其他时间段",
        })
        return false
      }
      if (!that.data.reach_time_two || that.data.reach_time_two == '') {
        wx.showToast({
          icon: "none",
          title: "请选择您要预约的时间段",
        })
        return false
      }
      that.close()
      console.log(that.data.reach_time)
      console.log(that.data.reach_time_two)
      // console.log(that.data.timstiindex)
      // return false
      // return false
      var time = {
        reach_time: that.data.reach_time,
        reach_time_two: that.data.reach_time_two
      }
      that.setData({
        time: that.data.reach_time + "  " + that.data.reach_time_two
      })
      // "这里传值"
      that.triggerEvent("myevent", time)
      // that.triggerEvent("myevent",that.data.reach_time_two)
    },
    //选择日期
    bindPickerChange(e) {
      // console.log('picker发送选择改变，携带值为', e.detail.value)
      let index = e.detail.value
      let that = this
      that.setData({ //给变量赋值
        indexDateime: index, //每次选择了下拉列表的内容同时修改下标然后修改显示的内容，显示的内容和选择的内容一致
        data_yue: that.data.arrayDateime[index].id
      })
      // console.log(that.data.arrayDateime[index])
      console.log("选中的月份", that.data.data_yue)
      var shuzu = that.setHouseRatesColumn(that.data.mayqiweilist[index].first, that.data.mayqiweilist[index].last)
      var nums = 0
      that.setData({
        everydaylist: shuzu,
        tiqiindex: nums
      })
    },
    //标准时间转---
    formatDate(tt) {
      let date = new Date(tt);
      let y = date.getFullYear();
      let M = date.getMonth() + 1;
      let d = date.getDate();
      let theDay = `${y.toString()}-${M.toString()}-${d.toString()}`;
      return theDay;
    },
    //获取时间列表
    gettimelist() {
      let that = this
      let reach_time = that.data.reach_time
      // let reach_time = "2023-10-18"
      //setHouseRatesColumn
      // console.log(reach_time)
      // console.log(that.formatDate(new Date))
      // console.log(that.dateCompare(reach_time, that.formatDate(new Date)))
      // if(that.dateCompare(reach_time,that.formatDate(new Date))){//相等或大于

      // }
      wx.request({
        url: getApp().data.besa_url + 'data_list',
        method: 'POST', //方法分GET和POST，根据需要写
        data: {
          data_time: that.data.reach_time,
          type: that.data.integ,
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) { //这里写调用接口成功之后所运行的函数
          // console.log(res.data.data)
          let timelist = res.data.data
          let dangqitime = new Date()
          let shuzu = timelist
          for (const i in timelist) {
            let aatime = reach_time + " " + timelist[i].time + ":00"
            // console.log(aatime.replace('-','/'))
            let nwxaatime1 = new Date(aatime.replace(/-/g, '/'))
            nwxaatime1.setMinutes(nwxaatime1.getMinutes() + 30);
            var nwxaatime2 = nwxaatime1.getHours() + ":" + (nwxaatime1.getMinutes() <= 9 ? ('0' + nwxaatime1.getMinutes()) : nwxaatime1.getMinutes());
            let geit = reach_time + " " + nwxaatime2 + ":00"
            let nwxaatime = new Date(geit.replace(/-/g, '/'))
            //现在的 选中的
            if (that.bijiao(dangqitime, nwxaatime)) {
              shuzu[i].iszhan = false
            } else {
              shuzu[i].iszhan = true
            }
          }
          console.log(shuzu)
          that.setData({
            timelist: shuzu
          })
          let ceshiactivelist = that.data.timelist
          for (const i in ceshiactivelist) {
            if (ceshiactivelist[i].iszhan == true) {
              that.setData({
                timstiindex: i,
                reach_time_two: ceshiactivelist[i].time
              })
              return false
            } else {
              that.setData({
                timstiindex: ""
              })
              // that.setData({
              //   indexDateime:0,
              //   tiqiindex:1,
              //   reach_time: that.data.everydaylist[1].time,
              //   reach_time_two:ceshiactivelist[0].time
              // })
              // that.gettimelist()
            }
            //reach_time_two
          }
          // console.log(that.data.timstiindex)
          //timstiindex
        },
        fail: function (res) { //这里写调用接口失败之后所运行的函数
          console.log('.........fail..........', res);
        }
      })
    },
    //标准时间比较
    bijiao(date1, date2) {
      if (date1.valueOf() < date2.valueOf()) {
        // console.log("date1 小于 date2");
        return false
      } else if (date1.valueOf() > date2.valueOf()) {
        // console.log("date1 大于 date2");
        return true
      } else {
        // console.log("date1 等于 date2");
        return true
      }
    },
    //选择到院时间
    Timing(e) {
      console.log(e.currentTarget.dataset.dats)
      let that = this
      let dats = e.currentTarget.dataset.dats
      let index = e.currentTarget.dataset.index
      // let tims = dats.time
      //显判断时间段
      if (dats.iszhan == false) {
        wx.showToast({
          icon: "none",
          title: "时间段已过，请选择其他时间段",
        })
        return
      }
      if (dats.yuhao == 0) {
        wx.showToast({
          icon: "none",
          title: "预约已满，请选择其他时间段",
        })
        return
      }
      //console.log(that.data.reach_time)
      // console.log(that.data.reach_time_two)
      that.setData({
        timstiindex: index,
        reach_time_two: dats.time
      })
    },
  }
})