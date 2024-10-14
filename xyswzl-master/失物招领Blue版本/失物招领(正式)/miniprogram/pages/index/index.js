// pages/index/index.js
var searchTextStr="";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: [],
    movies: [{
        url: '../../images/Rotating/3.jpg'
      },
      {
        url: '../../images/Rotating/news.png'
      },
      {
        url: '../../images/Rotating/1.jpg'
      },
      {
        url: '../../images/Rotating/2.jpg'
      }
    ],
  },

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
  },

  navigator() {
    wx.reLaunch({
      url: "../hall/hall"
    })
  },

  search(e){
    wx.navigateTo({ //保留当前页面，跳转到应用内的某个页面（最多打开5个页面，之后按钮就没有响应的）后续可以使用wx.navigateBack 可以返回;
      url: "../hall/seach/seach?id=" + searchTextStr  
    })
  },

  searchText(e){
    console.log(e);
    // this.setData({
    //   searchTextStr:"23"
    // })
    searchTextStr=e.detail.value;
  }
})