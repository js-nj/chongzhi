// import axios from 'axios'
import api from './api'

const UA = navigator.userAgent.toLowerCase()

function serialize(data) {
  if (!data) return '';
  var pairs = [],
    value;
  for (var name in data) {
    if (!data.hasOwnProperty(name)) continue;
    if (typeof data[name] === 'function') continue;
    value = data[name].toString();
    name = encodeURI(name);
    value = encodeURI(value);
    pairs.push(name + '=' + value);
  }
  if (pairs.length) {
    return '?' + pairs.join('&');
  } else {
    return ''
  }
}

function getApi(name) {
  return api[name] || name
}

/**
 * @method Post
 * @description post请求
 * @param {String} url - 请求地址，可以是api中定义的名称，或者具体的url地址
 * @param {Object} data - 请求参数
 * @param {*} config - 请求配置，详见axios文档 [https://github.com/mzabriskie/axios]
 */
export const Post = (url, data = {}, config = {}) => {
  return axios({
    method: 'post',
    url: getApi(url),
    data: {request_content: JSON.stringify(data)},
    ...config
    // adapter: config.mockFlag ? () => MOCK_DATA[config.mock] : null
  })
}

/**
 * @method Get
 * @description get请求, 判断运行环境为今日校园时，使用原生壳子提供的get方法（此方法可以解决跨域问题）；若运行环境不是今日校园，则使用axios的get请求方法
 * @param {String} url - 请求地址，可以是api中定义的名称，或者具体的url地址
 * @param {Object} data - 请求参数
 * @param {*} config - 运行环境是今日校园时，此参数为header参数；运行环境不是今日校园时，此参数为请求配置，详见axios文档 [https://github.com/mzabriskie/axios]；
 */
export const Get = (url, data = null, config = {}) => {
  //   使用今日校园壳子的ajax，在特定的版本再开启，如公有云跨域版本
  //   if (/wisedu/.test(UA)) {
  //     // 今日校园 原生壳子 get方法
  //     let requestUrl = getApi(url) + serialize(data)
  //     return new Promise((resolve, reject) => {
  //       SDK.bh.http.sendGetRequest(requestUrl, (response) => {
  //         if (response.code !== 200) {
  //           reject(response)
  //         }
  //         resolve({
  //           data: JSON.parse(response.data)
  //         })
  //       }, config)
  //     })
  //   } else {
  return axios({
    method: 'get',
    url: getApi(url),
    params: {request_content: JSON.stringify(data)},
    ...config
  })
  //   }
}

export const checkWxCode = function(cb) {
  Get('getWechatSign', {
    signUrl: window.location.href.split('#/')[0]
  }).then((response) => {
    let data = response.data;
    if (data.code === 0) {
      var jsApiList = [
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'onMenuShareQZone',
        'startRecord',
        'stopRecord',
        'onVoiceRecordEnd',
        'playVoice',
        'pauseVoice',
        'stopVoice',
        'onVoicePlayEnd',
        'uploadVoice',
        'downloadVoice',
        'chooseImage',
        'previewImage',
        'uploadImage',
        'downloadImage',
        'translateVoice',
        'getNetworkType',
        'openLocation',
        'getLocation',
        'hideOptionMenu',
        'showOptionMenu',
        'hideMenuItems',
        'showMenuItems',
        'hideAllNonBaseMenuItem',
        'showAllNonBaseMenuItem',
        'closeWindow',
        'scanQRCode',
        'chooseWXPay',
        'openProductSpecificView',
        'addCard',
        'chooseCard',
        'openCard',
        'previewFile',
        'updateAppMessageShareData',
        'updateTimelineShareData'
      ];
      if (/iphone/.test(navigator.userAgent.toLowerCase())) {
        jsApiList.push('getLocalImgData');
      };
      var config = {
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: data.result.appid, // 必填，公众号的唯一标识
        timestamp: data.result.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.result.nonceStr, // 必填，生成签名的随机串
        signature: data.result.signature, // 必填，签名
        jsApiList: jsApiList // 必填，需要使用的JS接口列表
      };

      // console.log('远端文件地址https://res.wx.qq.com')
      // let url = 'https://res.wx.qq.com/open/js/jweixin-1.2.0.js'; // 远端文件地址
      // var script = document.createElement("script");
      // script.src = url;
      // document.head.appendChild(script);
      // script.onload = () => {
      // debugger;
      if (wx) {
        wx.config(config);
        wx.ready((res) => {
          console.log('微信jssdk验证成功', res);
          cb && cb();
        });
        wx.error((res1) => {
          console.log('微信jssdk验证错误', res1);
        })
      } else {
        alert('无wx对象!请重试')
      }
      // };
    } else {
      Toast(data.msg || '微信验证权限失败！');
    }
  }).catch((error) => {
    Toast('微信验证权限失败！');
  })
}
