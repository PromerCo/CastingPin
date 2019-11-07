 import { Basicart } from 'basicart-model.js';

var basicart = new Basicart(); //实例化 首页 对象
const app = getApp()

var cache_list = require('../../utils/package.js');

Page({
  data: {
    value1: [1997, 1, 1, 0, 0],
    displayValue1: '请选择',
    loadingHidden: false,
    // 手机号
    phoneNumber: '',
    url: app.globalData.url,
    //日期
    date:'请选择',
    message: [],
    // 城市
    region: '',
    ur_status:0,
    // 身高
    multiArray: [
      ['15', '16', '17', '18', '19', '20'],
      ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    ],
    //体重
    multiArray1: [
      ['4','5', '6', '7', '8', '9', '10'],
      ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    ],
    //年龄
    multiArray2: [
      ['1', '2', '3', '4', '5', '6', '7', '8'],
      ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    ],
    index: 1,
    c_index:1,
    p_index:1,
    // 学校
    schoolName:'',
    tag:[],
    index1: 0,
    actor_url:null,
    // 简介
    isHidePlaceholder: false,
    options:[
['60','61','62','63','64','65','66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80','81','82','84','85'],
['20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35'
,'36','37','38','39','40','41','42','43','44','45','46','47','48','49','50'],
['80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '100', '101', '102', '103', '104', '105', '106', '107', '108', '109', '110', '111', '112', '113', '114','115','116'],
    ],
    value: ['68', '28','95'],
    // text框的显示隐藏
    isHidePlaceholder: false,
    //三围
    woman_str:'68-28-95',
    //微信
    wx_name:'',
    //邮箱
    emali: '',
    //公司
    corporation:'',
    //职位
    occupation:'',
    //身高
    actor_height:170,
    //体重
    actor_weight:90,
    tag_all: [],
    tag_list:[],
    tid_s: [],
    imageUrl:[],
    fileList: [],
    fileListVideo:[],
    placeholder:'说点什么呢....',
    lang: 'zh_CN',
  },
  // 城市
  bindRegionChange: function (e) {
    var that = this
    var conurbation = e.detail.value
    //数组转字符串

    var data = [];
    data.push({ "city": conurbation[1] })
    that._saveMsg(data)
    this.setData({
      region: conurbation[1]
    })
  },

  /*
 时间
  */
  onConfirm: function (e) {
 
    var that = this
    that.setData({
      displayValue1: e.detail.displayValue[0] + e.detail.displayValue[1] + e.detail.displayValue[2],
      expire_time: e.detail.label
    })
    var data = [];
    data.push({ "birthday": e.detail.label })
    that._saveMsg(data)

  },

  previewImage: function (e) {
    var current = e.target.dataset.src;
    var img_list = [];
    img_list.push(current);
    wx.previewImage({
      current: current, // 当前显示图片的http链接 
      urls: img_list    // 需要预览的图片http链接列表 
    })
  }, 

  //艺人
  bingd_stage:function(e){

    var that = this
    var stage_name = e.detail.value
    var data = [];
    data.push({ "stage_name": stage_name })
    that._saveMsg(data)

    that.setData({
      stage_name: stage_name
    })
   


  },
  //学校
  bingd_university:function(e){
    var school = e.currentTarget.dataset.school
    wx.navigateTo({
      url: '../../pages/school/school?school=' + school,
    })
  },
  // 身高
  showPicker_03: function () {
    this.setData({
      isShow_03: true
    })
  },
 // 绑定手机号

  bingd_phone:function(e){
    var that = this
    var phone = e.detail.value
    console.log(phone)

    var data = [];
    data.push({ "phone": phone })
    that._saveMsg(data)

  },

  bindMultiPickerChange: function (e) {
    var that = this
    var height =  that.data.multiArray
    var z_index = e.detail.value
    var actor_height = height[0][z_index[0]] + height[1][z_index[1]]
    this.setData({
      multiIndex: e.detail.value,
      actor_height: actor_height,
      position: false
    })
  },

  // 体重
  showPicker_04: function () {
    this.setData({
      isShow_04: true
    })
  },

  //三围
  onValueChange:function(e){
   
    var that = this

    var index = e.detail.index

    var woman = e.detail.displayValue

    var woman_str = woman.join('-');

    var bust  = woman[0]   //胸围

    var waist = woman[1]   //腰围
   
    var hip = woman[2]     //臀围

    var woman = woman_str   //三围

    var data = [];

    data['bust'] = bust

    data['waist'] = waist

    data['hip'] = hip

    data['woman'] = woman

    data.push({ "bust": bust,"waist": waist,"hip": hip,"woman": woman })

    that._saveMsg(data);

  },



  bindMultiPickerChange1: function (e) {
    var that = this
    var multiIndex1 = e.detail.value
    var multiArray1 = that.data.multiArray1
    var actor_weight = multiArray1[0][multiIndex1[0]] + multiArray1[1][multiIndex1[1]]
    this.setData({
      multiIndex1: e.detail.value,
      actor_weight: actor_weight,
      position: false
    })
  },
/*
   绑定微信
*/
bingd_wx:function(e){
  var that = this
  var wx_name = e.detail.value 
  var data = [];

  data.push({ "wechat": wx_name })

  that._saveMsg(data)

  that.setData({
    wx_name: wx_name
  })
  
},

  /*
  公司
  */
  bingd_corporation:function(e){
    var that = this
    var corporation = e.detail.value
    var data = [];
    data.push({ "corporation": corporation })
    that._saveMsg(data)
  },
   
/*
  出生日期
*/
  bindDateChange: function (e) {

    var that = this

    var birthday = e.detail.value

    var data = [];
    data.push({ "birthday": birthday })

    that._saveMsg(data)

    this.setData({
      date: birthday,
    })
  },

  // 职业
  bindPickerChange: function (e) {

    var that = this

    var occupation_list = that.data.occupation_list

    var index = e.detail.value

    var occupation = occupation_list[index]['code']

    //传入数据

    var data = [];

    data.push({ "occupation": occupation})

    that._saveMsg(data)

    this.setData({
      index: index,
      occupation: occupation_list[index]['name']
    })
  },

  //行业
  positionChange: function (e) {
    var that = this

    var position_list = that.data.position_list

    var p_index = e.detail.value

    var position = position_list[p_index]['code']

   

    var data = [];

    data.push({ "position": position })

    that._saveMsg(data)

    this.setData({
      p_index: p_index,
    })


  },

  //职位
  industryChange: function (e) {
    var that = this

    var industry_list = that.data.industry_list

    var c_index = e.detail.value

    var industry = industry_list[c_index]['code']

    var data = [];

    data.push({ "industry": industry })

    that._saveMsg(data)

    this.setData({
      c_index: c_index,
    })

  },
/*
  数据保存
*/
  _saveMsg: function (options) {

    var msg = options
   
    basicart.saveData(msg, (data) => {
      
      console.log(data)
    
    })

  },


  // 特长
  bindPickerChange1: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index1: e.detail.value
    })
  },
 
  onSuccess(e) {
    console.log('onSuccess', e.detail.file.url)
    this.setData({
      url: e.detail.file.url
    })
  },
  onFail(e) {
    console.log('onFail', e)
  },
  onComplete(e) {
    console.log('onComplete', e)
    wx.hideLoading()
  },
  onProgress(e) {
    console.log('onProgress', e)
    this.setData({
      progress: e.detail.file.progress,
    })
  },
  onPreview(e) {

    const { file, fileList } = e.detail
    wx.previewImage({
      current: file.url,
      urls: fileList.map((n) => n.url),
    })
  },
  onRemove(e) {
    const { file, fileList } = e.detail
    wx.showModal({
      content: '确定删除？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            fileList: fileList.filter((n) => n.uid !== file.uid),
          })
        }
      },
    })
  },
  // text框的显示隐藏
  getTextareaInput: function (e) {
    var that = this;
    if (e.detail.cursor > 0) {
      that.setData({
        isHidePlaceholder: true
      })
    } else {
      that.setData({
        isHidePlaceholder: false
      })
    }
  },
  onLoad: function (options) {
    var that = this
    var type = options.type

    if (type == 1){
      basicart.getList((data) => {
        var message = data.data 
        that.setData({
          type: type,
          message: message,
          loadingHidden: true,
          region: message.city,
          position_list: cache_list.columnCache(wx.getStorageSync('chace_record'),'position', 0),
          industry_list: cache_list.columnCache(wx.getStorageSync('chace_record'),'industry', 0)
        })
      })
    }else{
      var speciality = cache_list.columnCache(wx.getStorageSync('chace_record'),'speciality')
      basicart.getList((data) => {
          var message = data.data

        console.log(message)
         
          var tid_s = that.data.tid_s  //特长ID
          if (message ==null){
            message = [];
          }else{
          var woman = message.woman   //三围
          var tecahng = message.speciality  //特长
          if (woman != null || woman != undefined){
              var value = woman.split("-");
          }else{
               var value  = ['68', '28', '95']
          }
          if (tecahng != null || tecahng != undefined){
              var speciality = cache_list.columnCache(wx.getStorageSync('chace_record'),'speciality')
              var check_tags = tecahng.split(",");
              let tags_list = [];
              for (var i = 0; i <= check_tags.length; i++) {
                for (var j = 0; j < speciality.length; j++) {
        
                  if (speciality[j]['code'] == check_tags[i]) {    
                    tid_s.push(check_tags[i]);
                    speciality[j]['check'] = 'check'
                  }
                }

              }
  
            }else{
            var speciality = cache_list.columnCache(wx.getStorageSync('chace_record'),'speciality')
            }
          }

          var fileList = that.data.fileList  //图片
          var fileListVideo = that.data.fileListVideo //视频

       

        if (message.cover_img != null ){
            fileList.push({ 'url': message.cover_img })
          } 

        if (message.cover_video != null){
            fileListVideo.push({ 'url': message.cover_video })
          }

          console.log(fileListVideo)

          console.log(fileList)
    
          that.setData({
            type: type,
            occupation_list: cache_list.columnCache(wx.getStorageSync('chace_record'),'occupation'),
            speciality_list: speciality,
            message: message,
            wx_name: message.wechat,
            actor_height: message.height,
            actor_weight: message.weight,
            phoneNumber: message.phone,
            imageUrl: message.cover_img,
            region:message.city,
            schoolName: message.university,
            displayValue1: message.birthday,
            loadingHidden: true,
            tid_s: tid_s,
            value: value,
            fileList: fileList,
            fileListVideo:fileListVideo
      
          })
        })

    }
  },

  //跳转裁剪页面

  cropper:function(e){

    wx.navigateTo({
      url: '../../pages/cutInside/cutInside',
    })

  },

  onChangeHeight:function(e){
    console.log(e.detail.value)
    this.setData({ 
      actor_height: e.detail.value
    })
  },

  onChangeWeight: function (e) {
    console.log(e.detail.value)
    this.setData({
      actor_weight: e.detail.value
    })
  },

  /*
   身高
  */
  afterChangeHeight:function(e){
    var that   = this
    var height = e.detail.value
    var data = [];
    data.push({ "height": height[0] })
    that._saveMsg(data)
    that.setData({
      actor_height: height[0]
    })
  },

  /*
   体重
  */
  afterChangeWeight:function(e){
    var that = this
    var weight = e.detail.value
    var data = [];
    data.push({ "weight": weight[0] })
    that._saveMsg(data)
    that.setData({
      actor_weight: weight[0]
    })

  },
  /*
  获取手机号
*/
  getPhoneNumber: function (e) {
    var that = this
    //获取用户手机号
    var errMsg = e.detail.errMsg
    var msg = e.detail
    msg.code = that.data.code

    if (errMsg == 'getPhoneNumber:ok') {
          basicart.getPhone(msg, (data) => {
            if (data.code == 201) {
              var message = JSON.parse(data.msg);

              var data = [];
              data.push({ "phone": message.phoneNumber })
              that._saveMsg(data)
            
              that.setData({
                phoneNumber: message.phoneNumber
              })
            }
          })
     }

  },

  /*
  文本组件
  */
  updatePosition(keyboardHeight) {

    const toolbarHeight = 100
    const { windowHeight, platform } = wx.getSystemInfoSync()
    let editorHeight = keyboardHeight > 0 ? (windowHeight - keyboardHeight - toolbarHeight) : windowHeight
    this.setData({ editorHeight, keyboardHeight })
  },
  calNavigationBarAndStatusBar() {

    const systemInfo = wx.getSystemInfoSync()
    const { statusBarHeight, platform } = systemInfo
    const isIOS = platform === 'ios'
    const navigationBarHeight = isIOS ? 44 : 48
    return statusBarHeight + navigationBarHeight
  },

  onEditorReady() {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context
      var describe = that.data.message.profile

      that.editorCtx.setContents({
        html: describe,
        success: (res) => {
          console.log(res)
        },
        fail: (res) => {
          console.log(res)
        }
      })

    }).exec()
  },

  bindinput: function (e) {
    var that = this
    var info = e.detail.html

    var data = [];
    data.push({ "profile": info })

    that._saveMsg(data)

    that.setData({
      details: info
    })
  },

  blur() {
    this.editorCtx.blur()
  },

  format(e) {
    console.log(e)
    let { name, value } = e.target.dataset
    if (!name) return
    this.editorCtx.format(name, value)

  },
  onStatusChange(e) {
    const formats = e.detail
    console.log(formats)
    this.setData({ formats })
  },
  insertDivider() {
    this.editorCtx.insertDivider({
      success: function () {
        console.log('insert divider success')
      }
    })
  },
  clear() {
    this.editorCtx.clear({
      success: function (res) {
        console.log("clear success")
      }
    })
  },
  removeFormat() {
    this.editorCtx.removeFormat()
  },
  insertDate() {
    const date = new Date()
    const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    this.editorCtx.insertText({
      text: formatDate
    })
  },

  insertImage() {
    const that = this
    wx.chooseImage({
      count: 1,
      success: function (res) {
        var image = res.tempFilePaths[0];
        var url = that.data.url

        wx.uploadFile({
          url: url + "/v1/alioss/index",
          filePath: image,
          name: 'file',
          header: {
            "Content-Type": "multipart/form-data",
            'accept': 'application/json'
          },
          success: function (res) {
            console.log(res)

            that.editorCtx.insertImage({
              src: res.data,
              data: {
                id: 'abcd',
                role: 'god'
              },
              width: '100%',
              success: function (e) {
                console.log(e)
              }
            })
          }
        })

      }
    })
  },


  formSubmit:function(e){
            console.log(123)
  },


// 上传图片
  onChange(e) {
  
 
  },

  // 上传视频
  onChangeVideo(e) {
    var that = this
    const { file } = e.detail
    if (file.status === 'uploading') {
      this.setData({
        progress: 0,
      })
      wx.showLoading()
    } else if (file.status === 'done') {
      var url = that.data.url
      wx.uploadFile({
        url: url + "/v1/alioss/index",
        filePath: file.url,
        name: 'file',
        data:{'type':1},
        header: {
          "Content-Type": "multipart/form-data",
          'accept': 'application/json'
        },
        success: function (res) {
          console.log(res.data)
  
        }
      })
    }
  },

  onFail(e) {
    console.log('onFail', e)
  },
  onComplete(e) {
    console.log('onComplete', e.detail.data)
    var that = this
    var data = [];
    data.push({ "cover_img": e.detail.data })
    that._saveMsg(data)

    wx.hideLoading()
  },

  onCompleteVideo(e) {
    console.log('onComplete', e.detail.data)

    var that = this

    var data = [];
    data.push({ "cover_video": e.detail.data })
    that._saveMsg(data)


    wx.hideLoading()
  },

  onProgress(e) {
    console.log('onProgress', e)
    this.setData({
      progress: e.detail.file.progress,
    })
  },
  onPreview(e) {
    console.log('onPreview', e)
    const { file, fileList } = e.detail
    wx.previewImage({
      current: file.url,
      urls: fileList.map((n) => n.url),
    })
  },
  onRemove(e) {
    const { file, fileList } = e.detail

    wx.showModal({
      content: '确定删除？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            fileList: fileList.filter((n) => n.uid !== file.uid),
          })
        }
      },
    })
  },

  /*加载所有数据*/
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
  
    var that = this


    var ur_status = that.data.ur_status

    if (ur_status == 1){
      var actor_url = that.data.actor_url
      var data = [];
      data.push({ "cover_img": actor_url })
      that._saveMsg(data)
    }

    wx.login({
      success: function (res) {
       var  code = res.code
        that.setData({
          code: code,
     
        })

      }
    })
       

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function (e) {
    var that = this
    let pages = getCurrentPages(); //页面栈
    let currPage = pages[pages.length - 2]; //当前页面
    currPage.setData({
      loadingHidden: false,
    })

  },


  check: function (e) {
    var that = this

    var t_id = e.currentTarget.dataset.id 
    // cache_list.columnCache('speciality')

    var speciality_list = this.data.speciality_list

    var tid_s = that.data.tid_s;

    var index = e.currentTarget.dataset.index
    var chek = speciality_list[index];



    var tag_list = that.data.tag_list;

    var tag_all = that.data.tag_all;



    if (chek['check'] == 'check') {
      chek['check'] = 'none'
      for (var i = 0; i < tid_s.length; i++) {
        if (tid_s[i] == t_id) {
          tid_s.splice(i, 1);
          tag_list.splice(i, 1);
          tag_all.splice(i, 1)
        }
      }
      that.setData({
        tid_s: tid_s,
        tag_list: tag_list,
        tag_all: tag_all
      })
    } else {

      console.log(tid_s)

      if (tid_s.length >= 3) {
        wx.showToast({
          title: "最多选择三个标签哦",
          icon: 'none',
          duration: 800,
          mask: true
        });
        return false;
      }

      chek['check'] = 'check'
      tag_list.push(chek.title);
      tid_s.push(t_id)
      tag_all.push(chek);

      console.log(tag_all)
      console.log(tid_s)

      that.setData({
        tid_s: tid_s,
        tag_list: tag_list,
        tag_all: tag_all
      })
    }
 
    var speciality =    tid_s.join(',');
    var data = [];
    data.push({ "speciality": speciality })
    that._saveMsg(data)

    that.setData({
      speciality_list: speciality_list,
      tid_s: tid_s,
    })

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