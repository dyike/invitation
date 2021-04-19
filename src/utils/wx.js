import axios from "axios"
import wx from 'weixin-js-sdk'

const jsApiList = [
  'checkJsApi',
  'onMenuShareAppMessage',
  'updateAppMessageShareData',
  'onMenuShareTimeline',
  'updateTimelineShareData'
]

// 要用到微信API
function getUrl() {
  if (window.entryUrl === '') {
    window.entryUrl = location.href.split('#')[0]
  }
  let u = navigator.userAgent
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 // g
  return isAndroid ? location.href.split('#')[0] : window.entryUrl
}

function getJSSDK(weiXin, invitation) {
  let url = getUrl()
  axios.post(
    'api-wechat/share/get-info', {
      invitation: invitation,
      url: url
    }
  ).then(function (res) {
    wx.config({
      debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: res.data.appId, // 必填，公众号的唯一标识
      timestamp: res.data.timeStamp, // 必填，生成签名的时间戳
      nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
      signature: res.data.signature, // 必填，签名
      jsApiList: jsApiList // 必填，需要使用的JS接口列表
    })
    wx.ready(function() {
      wx.checkJsApi({
        jsApiList: [
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'showAllNonBaseMenuItem'
        ], // 需要检测的JS接口列表，所有JS接口列表见附录2,
        success: function(res) {
          console.log('检测', res)
        }
      })
      wx.onMenuShareAppMessage({
        title: weiXin.title,
        desc: weiXin.desc,
        link: weiXin.linkurl,
        imgUrl: weiXin.img,
        trigger: function trigger() {},
        success: function success() {
          console.log('已分享')
        },
        cancel: function cancel() {
          console.log('已取消')
        },
        fail: function fail(res) {
          alert(JSON.stringify(res))
        }
      })
      wx.showAllNonBaseMenuItem() //显示所有非基础组件
      // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
      wx.onMenuShareTimeline({
        title: weiXin.title,
        link: weiXin.linkurl,
        imgUrl: weiXin.img,
        trigger: function trigger() {
          // alert('用户点击分享到朋友圈');
        },
        success: function success() {
          //alert('已分享');
        },
        cancel: function cancel() {
          //alert('已取消');
        },
        fail: function fail(res) {
          alert(JSON.stringify(res))
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