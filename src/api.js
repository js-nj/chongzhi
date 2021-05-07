/**
 * WEBPACK_CONIFG_HOST的值，在webpack.config.js中更改
 * 开发环境时 = "http://amptest.wisedu.com/xsfwfw/"
 * 发布环境时 = location.origin + location.pathname.substring(0, location.pathname.indexOf("/", 1)) + "/"
 */

export default {
  getSMSPost: WEBPACK_CONFIG_HOST + '/WebService.asmx/SMSPost',
  UserLogin: WEBPACK_CONFIG_HOST + '/WebService.asmx/UserLogin',
  GetWxUser: WEBPACK_CONFIG_HOST + '/WebService.asmx/GetWxUser',
  WXPay:WEBPACK_CONFIG_HOST + '/WebService.asmx/WXPay',
  PayList:WEBPACK_CONFIG_HOST + '/WebService.asmx/PayList',

  // getWechatSign: WEBPACK_CONFIG_HOST + 'app/getWechatSign',
  // login: WEBPACK_CONFIG_HOST + 'app/login', //post
  // updatepassword: WEBPACK_CONFIG_HOST + 'app/updatepassword', //post
  // getServicePhone: WEBPACK_CONFIG_HOST + 'app/getServicePhone',
  // getUserInfo: WEBPACK_CONFIG_HOST + 'app/getUserInfo',
  // driverInfo: WEBPACK_CONFIG_HOST + 'app/oiluser/driverInfo',
  // getQrCode: WEBPACK_CONFIG_HOST + 'app/getQrCode',
  // oilorderList: WEBPACK_CONFIG_HOST + 'app/oilorder/list',
  // oilorderInfo: WEBPACK_CONFIG_HOST + 'app/oilorder/info',
  // oilorderSave: WEBPACK_CONFIG_HOST + 'app/oilorder/save', //post
  // driverRechargeRecordList: WEBPACK_CONFIG_HOST + 'app/oilpaydriver/driverRechargeRecordList',
  // oilstationList: WEBPACK_CONFIG_HOST + 'app/oilstation/list',
  // userOilStationlist: WEBPACK_CONFIG_HOST + 'app/oilstation/userOilStationlist',
  // oilstationproductList: WEBPACK_CONFIG_HOST + 'app/oilstationproduct/list',

}
