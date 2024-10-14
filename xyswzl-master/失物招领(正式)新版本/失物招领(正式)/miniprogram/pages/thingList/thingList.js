// pages/thingList/thingList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0
  },

  onLoad() {
    wx.showLoading({
      title: '数据加载中...',
    });
    var that = this;
    this.setData({
      openid: wx.getStorageSync('openId').result.userInfo.openId
    });
    var arr = []; //暂存图片base64编码
    //提取用户发布的物品信息
    const db = wx.cloud.database({ // 链接数据表
      env: "test-5ghp2j4d337534cb"
    });
    db.collection('loseThing').where({ //数据查询
      _openid: this.data.openid //条件
    }).get({
      success: function (res) {
        // res.data 包含该记录的数据
        for (let i = 0; i < res.data.length; i++) {
          arr.push(res.data[i])
        }
        that.setData({
          list: arr
        })
      }
    });

    // 我的寻物数据提取
    var arr1 = []; //暂存图片base64编码
    //提取用户发布的物品信息
    db.collection('seekThing').where({ //数据查询
      _openid: this.data.openid //条件
    }).get({
      success: function (res) {
        // res.data 包含该记录的数据
        for (let i = 0; i < res.data.length; i++) {
          arr1.push(res.data[i])
        }
        that.setData({
          list1: arr1
        })
        wx.hideLoading(); //隐藏正在加载中
      }
    });
  },

  delete(e) {
    var that = this;
    wx.showModal({
      title: "确认删除", // 提示的标题
      content: "是否删除该发布任务？", // 提示的内容
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
          db.collection('loseThing').where({
            _id: that.data.list[e.currentTarget.dataset.index]._id
          }).remove().then(res => {
            wx.hideLoading(); //隐藏正在加载中
            wx.showToast({
              title: "删除成功", // 提示的内容
              icon: "none", // 图标，默认success
              image: "", // 自定义图标的本地路径，image 的优先级高于 icon
              duration: 2000, // 提示的延迟时间，默认1500
              mask: false, // 是否显示透明蒙层，防止触摸穿透
            })
            wx.navigateBack({
              delta: 1
            })
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


  delete1(e) {
    var that = this;
    wx.showModal({
      title: "确认删除", // 提示的标题
      content: "是否删除该发布任务？", // 提示的内容
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
          db.collection('seekThing').where({
            _id: that.data.list1[e.currentTarget.dataset.index]._id
          }).remove().then(res => {
            wx.hideLoading(); //隐藏正在加载中
            wx.showToast({
              title: "删除成功", // 提示的内容
              icon: "none", // 图标，默认success
              image: "", // 自定义图标的本地路径，image 的优先级高于 icon
              duration: 2000, // 提示的延迟时间，默认1500
              mask: false, // 是否显示透明蒙层，防止触摸穿透
            })
            wx.navigateBack({
              delta: 1
            })
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

  update(e) {
    const db = wx.cloud.database({ // 链接数据表
      env: "test-5ghp2j4d337534cb"
    });
    if (this.data.list[e.currentTarget.dataset.index].upshot == "认领中") {
      db.collection('loseThing')
        //先查询
        .where({
          _id: this.data.list[e.currentTarget.dataset.index]._id
        }).
      //在修改
      update({
          //需要修改的对象
          data: {
            // 需要修改对象得key,value值
            upshot: "已认领"
          }
        })
        //成功时执行
        .then(res => {
          wx.showToast({
            title: "纺院社区：修改成功，请您返回后重新加载", // 提示的内容
            icon: "none", // 图标，默认success
            image: "", // 自定义图标的本地路径，image 的优先级高于 icon
            duration: 3000, // 提示的延迟时间，默认1500
            mask: false, // 是否显示透明蒙层，防止触摸穿透
          })
        })
        //错误时执行
        .catch(err => {
          wx.showToast({
            title: "纺院社区：修改失败，请重试或者反馈管理员", // 提示的内容
            icon: "none", // 图标，默认success
            image: "", // 自定义图标的本地路径，image 的优先级高于 icon
            duration: 3000, // 提示的延迟时间，默认1500
            mask: false, // 是否显示透明蒙层，防止触摸穿透
          })
        })
    } else {
      db.collection('loseThing')
        //先查询
        .where({
          _id: this.data.list[e.currentTarget.dataset.index]._id
        }).
      //在修改
      update({
          //需要修改的对象
          data: {
            // 需要修改对象得key,value值
            upshot: "认领中"
          }
        })
        //成功时执行
        .then(res => {
          wx.showToast({
            title: "纺院社区：修改成功，请您返回后重新加载", // 提示的内容
            icon: "none", // 图标，默认success
            image: "", // 自定义图标的本地路径，image 的优先级高于 icon
            duration: 3000, // 提示的延迟时间，默认1500
            mask: false, // 是否显示透明蒙层，防止触摸穿透
          })
        })
        //错误时执行
        .catch(err => {
          wx.showToast({
            title: "纺院社区：修改失败，请重试或者反馈管理员", // 提示的内容
            icon: "none", // 图标，默认success
            image: "", // 自定义图标的本地路径，image 的优先级高于 icon
            duration: 3000, // 提示的延迟时间，默认1500
            mask: false, // 是否显示透明蒙层，防止触摸穿透
          })
        })
    }
  },

  update1(e) { //我的寻物中，修改丢失/寻回状态的按钮点击触发事件
    const db = wx.cloud.database({ // 链接数据表
      env: "test-5ghp2j4d337534cb"
    });
    db.collection('seekThing')
      //先查询
      .where({
        _id: this.data.list1[e.currentTarget.dataset.index]._id
      }).
    //在修改
    update({
        //需要修改的对象
        data: {
          // 需要修改对象得key,value值
          upshot: "寻回"
        }
      })
      //成功时执行
      .then(res => {
        wx.showToast({
          title: "纺院社区：修改成功，请您返回后重新加载", // 提示的内容
          icon: "none", // 图标，默认success
          image: "", // 自定义图标的本地路径，image 的优先级高于 icon
          duration: 3000, // 提示的延迟时间，默认1500
          mask: false, // 是否显示透明蒙层，防止触摸穿透
        })
      })
      //错误时执行
      .catch(err => {
        wx.showToast({
          title: "纺院社区：修改失败，请重试或者反馈管理员", // 提示的内容
          icon: "none", // 图标，默认success
          image: "", // 自定义图标的本地路径，image 的优先级高于 icon
          duration: 3000, // 提示的延迟时间，默认1500
          mask: false, // 是否显示透明蒙层，防止触摸穿透
        })
      })
  },

  index() {
    if (this.data.index == 0) {
      this.setData({
        index: 1
      })
    } else {
      this.setData({
        index: 0
      })
    }
  }

})