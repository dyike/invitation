import axios from "axios"
import wx from 'weixin-js-sdk'

function getJSSDK(weiXin) {
  axios.get(
    '/wechat/getsign?url=http://wedding.mupaiwan.com/index.html'
  ).then(function (res) {
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: res.data.appid, // 必填，公众号的唯一标识
      timestamp: res.data.timeStamp, // 必填，生成签名的时间戳
      nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
      signature: res.data.signature, // 必填，签名
      jsApiList: [
        'updateAppMessageShareData',
        'updateTimelineShareData'
      ] // 必填，需要使用的JS接口列表
    })
    wx.ready(function() {
      wx.updateAppMessageShareData({
        title: weiXin.title,
        desc: weiXin.desc,
        link: weiXin.linkurl,
        imgUrl: weiXin.img,
        success: function success() {
          console.log('朋友已分享')
        }
      })
      // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
      wx.updateTimelineShareData({
        title: weiXin.title,
        link: weiXin.linkurl,
        imgUrl: weiXin.img,
        success: function success() {
          alert('朋友圈已分享');
        }
      })
    })
    wx.error(function(res) {
      console.log(JSON.stringify(res) + '微信验证失败')
    })
  }).catch(function () {
    console.log("Errored")
  })
}

export default {
  // 获取JSSDK
  getJSSDK: getJSSDK
}