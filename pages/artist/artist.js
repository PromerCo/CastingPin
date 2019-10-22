import { Artist } from 'artist-model.js';
var artist = new Artist(); //实例化 首页 对象

// 缓存数据
const cache_list = require('../../utils/package.js');


const app = getApp()
let timeout

function debounce(func, wait) {
  return function() {
    clearTimeout(timeout)
    timeout = setTimeout(func, wait)
  }
}
let timeout2 = null

function throttle(func, wait) {
  return function() {
    if (!timeout2) {
      timeout2 = setTimeout(function() {
        clearTimeout(timeout2)
        timeout2 = null
        func()
      }, wait)
    }
  }
}

Page({
  data: {
    width: wx.getSystemInfoSync().windowWidth,
    height: wx.getSystemInfoSync().windowHeight,
    videoLoading: false,
    videoList: [],
    location: [],
    isLock: false, // 当前栗子无用，如果有些弹窗控制不住背后的视频列表滚动的话，isLock的作用就发挥出来了。
    localIndex: 0,
    noPageScroll: false,
    // 显示隐藏
    hidden: 1,
    texf:'none',
    banner: [],
    video_list:[],
    column: cache_list.columnCache('style'),
   
  },
  info: {
    videoPlayDetail: {} // 存放所有视频的播放位置
  },
  // 显示隐藏
  show(e) {
    var hide = e.currentTarget.dataset.type
    this.setData({
      hidden: !hide
    })
  },
  screen_hower: function(e) {
    this.setData({
      hidden: 1
    })
  },
  // 点击切换
  onTabsChange: function(e) {
    const {
      index
    } = e.detail
    // 当前项
    const item = this.data.column[index]
    const platform_id = item.id
    var msg = [];
    msg.platform_id = platform_id
    console.log(msg.platform_id)

    if (msg.platform_id == 100000) {
      msg.type = 0
    } else {
      msg.type = 1
    }
    this.setData({
      loadingHidden: false
    })

  },
  // video
  video:function(e) {
    let cast_id =  e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../pages/artdel/artdel?cast_id=' + cast_id,
    })
  },
  onLoad(options) {

    this._loadData();

  },



  /*
  页面初始化 
  */
  _loadData: function () {
    var that = this;
    artist.getlist((data) => {
      if (data.code == 200){
        var video_list = data.data
        video_list.forEach(function (item, index) {
           video_list[index]['width']  = 480
           video_list[index]['height'] = 272
           video_list[index]['isPlay'] = false
        })
        that.setData({
          banner: video_list,
          video_list: video_list,
          status: video_list.status
        })
        that.getVideoList(1)
      }
  
    })
    
  },
  /**
   * 分页获取视频
   */
  getVideoList(initPage) {
    let that = this
    const {
      videoLoading,
      videoList
    } = this.data
    if (videoLoading) {
      return
    }
    this.setData({
      videoLoading: true
    })

    var data = that.data.video_list

    data = data.concat(data)
  

    // 模拟请求
    setTimeout(() => {
      this.setData({
         videoList: videoList.concat(this.formatVideoList(data)),
        videoLoading: false
      })
      // 给数据足够的渲染时间，之后进行视频位置的测量
      setTimeout(() => {
        this.getLocationInfo()
        if (initPage) { // 如果是首次进入，就自动播放第一个视频
          this.showVideoList(0)
        }
      }, 300)
    }, 300)
  },
  


  /**
   * 格式化视频列表
   * @param {Array} videoList 需要格式化的视频列表
   */
  formatVideoList(videoList) {
    const {
      width,
      height
    } = this.data
    return videoList.map(value => {
      let styleHight = width * value.height / value.width
      styleHight = styleHight > 0.7 * height ? 0.7 * height : styleHight
      return {
        ...value,
        styleHight: Math.floor(styleHight)+450,
        currentTime: 0,
        isPlay: false
      }
    })
  },
  // 点击播放
  eventPlay:function(event) {
    const {
      index
    } = event.currentTarget.dataset
    this.showVideoList(index)
  },
  // 视频更新的时候不断的去记录播放的位置
  eventPlayupdate: function (event) {
    const {
      detail: {
        currentTime
      },
      currentTarget: {
        dataset: {
          index
        }
      }
    } = event
    this.info.videoPlayDetail[index] = currentTime
  },
  // 到底加载更多
  onReachBottom() {
    this.getVideoList()
  },
  // 设置播放的视频
  showVideoList(index) {
    console.log(index)
    let {
      videoList
    } = this.data
  
    videoList = videoList.map(value => {
      value.isPlay = false
      return value
    })
    if (index >= 0 && videoList[index]) {
      videoList[index].isPlay = true
    }
    this.setData({
      videoList
    })
  },
  // 全屏播放，设置当前页面滚动无效，全屏的时候，会触发滚动事件。
  eventFullScreen(event) {
    console.log(event)
    const {
      fullScreen
    } = event.detail
    this.setData({
      noPageScroll: fullScreen
    })
  },
  onPageScroll:function(e){
    let scrollTop = e.scrollTop
    if(scrollTop>50){
      this.setData({
        texf:'block'
      })
    }else{
      this.setData({
        texf: 'none'
      })
    }
    if (this.data.noPageScroll) {
      return
    }

    // 节流，每200毫秒触发一次
    throttle(() => {
      console.log('throttle')
      let {
        location,
        localIndex,
        videoList
      } = this.data
      let index = 0
      for (let i = 0; i < location.length; i++) {
        if (location[i].start <= scrollTop && location[i].end >= scrollTop) {
          index = i
          break
        }
      }
      if (localIndex !== index) {
        videoList[localIndex].currentTime = this.info.videoPlayDetail[localIndex]
        this.setData({
          videoList
        })
        this.showVideoList()
      }
    }, 200)()

    // 防抖，只触发一次
    debounce(() => {
      let {
        location,
        isLock
      } = this.data
      if (!isLock) {
        let index = 0
        for (let i = 0; i < location.length; i++) {
          if (location[i].start <= scrollTop && location[i].end >= scrollTop) {
            index = i
            break
          }
        }
        this.showVideoList(index)
        this.setData({
          localIndex: index
        })
      }
    }, 200)()
  },
  // 测量当前的所有视频的高度，计算出视频播放与否的位置
  getLocationInfo() {
    const {
      videoList
    } = this.data
    var query = wx.createSelectorQuery()
    for (let i = 0; i < videoList.length; i++) {
      query.select(`#video${i}`).boundingClientRect()
    }
    const length = videoList.length
    const location = []
    query.exec(res => {
      console.log(res)
      let start = 0
      let end = 0
      let lei = 0
      for (let i = 0; i < length; i++) {
        if (i === 0) {
          start = 0
          end = videoList[i]['styleHight'] / 2
        } else {
          start = end
          end = lei + videoList[i]['styleHight'] / 2
        }
        location.push({
          start: start,
          end: end
        })
        lei = lei + res[i].height + 10
      }
      this.setData({
        location
      })
    })
  },
})