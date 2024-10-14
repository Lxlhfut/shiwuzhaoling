// pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:"",
    commentList:[],
    headImg:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() {
    var that = this;
    const db = wx.cloud.database({ // 链接数据表
      env: "test-5ghp2j4d337534cb"
    });
    db.collection('announcement').where({}).get({
      success: function (res) {
        let all = []
        // res.data 包含该记录的数据
        for (let i = 0; i < 3; i++) {
          all.push(res.data[i])
        }
        that.setData({
          arr: all,
        })
      }
    })

    db.collection('comment').where({}).get({
      success: function (res) {
        that.setData({
          commentList: res.data,
        })
        // console.log(res.data)
      }
    })

      db.collection('user').where({ //数据查询
        _openid: that.data.openid //条件
      }).get({
        success: function (res) {
          that.setData({
            headImg: res.data[0].headImg,
          })

        }
      })
  },

  contentText(value){
    this.setData({
      content:value.detail.value
    })
  },

  delComment(index){
    console.log(index)
    var that = this;
    wx.showModal({
      title: "确认删除", // 提示的标题
      content: "", // 提示的内容
      showCancel: true, // 是否显示取消按钮，默认true
      cancelColor: "#000000", // 取消按钮的文字颜色，必须是16进制格式的颜色字符串
      confirmText: "删除", // 确认按钮的文字，最多4个字符
      confirmColor: "#576B95", // 确认按钮的文字颜色，必须是 16 进制格式的颜色字符串
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '数据加载中...',
          });
          const db = wx.cloud.database({ // 链接数据表
            env: "test-5ghp2j4d337534cb"
          });
          db.collection('comment').where({
            _id: that.data.commentList[index.currentTarget.dataset.index]._id
          }).remove().then(res => {
            wx.hideLoading(); //隐藏正在加载中
            wx.showToast({
              title: "删除成功", // 提示的内容
              icon: "none", // 图标，默认success
              image: "", // 自定义图标的本地路径，image 的优先级高于 icon
              duration: 2000, // 提示的延迟时间，默认1500
              mask: false, // 是否显示透明蒙层，防止触摸穿透
            })
            that.onLoad()
          }).catch(err => {
            wx.hideLoading(); //隐藏正在加载中
            wx.showToast({
              title: "纺院社区：删除失败，请联系管理员", // 提示的内容
              icon: "none", // 图标，默认success
              image: "", // 自定义图标的本地路径，image 的优先级高于 icon
              duration: 2000, // 提示的延迟时间，默认1500
              mask: false, // 是否显示透明蒙层，防止触摸穿透
            })
          })


        }
      }
    })
  },

  // 获取当前日期与时间
  nowTime(){
    var date = new Date();	//Fri Oct 29 2021 16:37:56 GMT+0800 (CST)
    var timestamp = new Date().getTime();	//1635496676223		(毫秒级)
    // var y= date.getFullYear(); //获取完整的年份(4位)
    // var m= date.getMonth(); //获取当前月份(0-11,0代表1月)
    // var d= date.getDate(); //获取当前日(1-31)
    // var w= date.getDay(); //获取当前星期X(0-6,0代表星期天)
    // var h= date.getHours(); //获取当前小时数(0-23)
    // var i= date.getMinutes(); //获取当前分钟数(0-59)
    // var s= date.getSeconds(); //获取当前秒数(0-59)
    this.setData({
      time:date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()
    })
  },


  sumbit(){
    this.nowTime()
    var that = this;
    wx.showLoading({
      title: '数据加载中...',
    });
    // 数据提交开始
    const db = wx.cloud.database({
      env: "test-5ghp2j4d337534cb"
    });
    db.collection('comment').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        // _openid: wx.getStorageSync('openId').result.openid,会自动添加，不需要自己输入
        headImg: wx.getStorageSync('userinfo').avatarUrl,
        userName: wx.getStorageSync('userinfo').nickName,
        content:that.data.content,
        time:that.data.time
      },
      success: function (res) {
        wx.hideLoading(); //隐藏正在加载中
        wx.showModal({
          title: "提交成功", // 提示的标题
          content: "", // 提示的内容
          showCancel: true, // 是否显示取消按钮，默认true
          cancelColor: "#000000", // 取消按钮的文字颜色，必须是16进制格式的颜色字符串
          confirmText: "确定", // 确认按钮的文字，最多4个字符
          confirmColor: "#576B95", // 确认按钮的文字颜色，必须是 16 进制格式的颜色字符串
          complete: function () {
            wx.reLaunch({
              url: "../index/index"
            })
          }
        })
      }
    })
    // 数据提交结束
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})