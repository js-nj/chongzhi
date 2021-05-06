<template>
  <div>
    <!-- <jy-header title="会员中心"></jy-header> -->
    <div class="jy-head">
      <div class="jy-person">
        <div class="jy-disblock">
          <div class="jy-disblock">
            <img v-if="userImg" class="jy-mrtx" :src="userImg" />
            <img v-else class="jy-mrtx" src="../../assets/logo.png" />
            </div>
            <div class="jy-disblock jy-per-info" style="">
              <div class="jy-per-infoName" style="">{{userName}}</div>
              <div class="jy-per-infoPhone" style="">账号：{{userPhone}}</div>
            </div>
          </div>
          <!-- <div class="jy-disblock" style="height: 70px;line-height: 70px;float: right;color:#101010;">修改资料</div> -->
        </div>
        <div class="jy-num">
          <div>
            <div class="jy-num-item">
              <div class="jy-num-height" v-html="Number(sumMoney).toFixed(2)"></div>
              <div class="jy-num-des">账户余额/元</div>
            </div>
           <!--  <div class="jy-num-item">
              <div class="jy-num-height">{{orderCount}}</div>
              <div class="jy-num-des">加油记录/笔</div>
            </div> -->
            <!-- <div class="jy-num-item">
              <div>
                <img class="jy-num-edit" @click="jyEditInfo()" src="../../assets/edit.jpg" />
            </div>
                <div class="jy-num-des">编辑资料</div>
              </div> -->
          </div>
        </div>
      </div>
      <div class="jy-menu">
        <!-- <div class="jy-menu-title">我的功能</div> -->
        <div class="jy-menu-content">
          <div class="jy-menu-item">
            <img style="" src="../../assets/jym.jpg" @click="gotoMenuItem({type:'qrdetail'})" />
            <p style="">充值</p>
          </div>
          <div class="jy-menu-item">
            <img style="" src="../../assets/xfjl.jpg" @click="gotoMenuItem({type:'consumelist'})" />
            <p style="">充值记录</p>
          </div>
        </div>
        <!-- <div class="jy-menu-content" v-else-if="userType === '2'">
          <div class="jy-menu-item">
            <img style="" src="../../assets/jym.jpg" @click="scanQrCode()" />
            <p style="">扫一扫</p>
          </div>
          <div class="jy-menu-item">
            <img style="" src="../../assets/xfjl.jpg" @click="gotoMenuItem({type:'consumelist'})" />
            <p style="">加油记录</p>
          </div>
          <div class="jy-menu-item">
            <img style="" src="../../assets/xgmm.jpg" @click="gotoMenuItem({type:'editpw',userType:userType})" />
            <p style="">修改密码</p>
          </div>
          <div class="jy-menu-item">
            <img style="" src="../../assets/kfzx.jpg" @click="gotoMenuItem({type:'supportCenter'})" />
            <p style="">客服中心</p>
          </div>
        </div> -->
        <!-- <div class="jy-menu-content" v-else-if="userType === '3'">
          <div class="jy-menu-item">
            <img style="" src="../../assets/xfjl.jpg" @click="gotoMenuItem({type:'consumelist'})" />
            <p style="">加油记录</p>
          </div>
          <div class="jy-menu-item">
            <img style="" src="../../assets/xgmm.jpg" @click="gotoMenuItem({type:'editpw',userType:userType})" />
            <p style="">修改密码</p>
          </div>
          <div class="jy-menu-item">
            <img style="" src="../../assets/kfzx.jpg" @click="gotoMenuItem({type:'supportCenter'})" />
            <p style="">客服中心</p>
          </div>
        </div> -->
      </div>
      <a class="jy-logout" @click="logout()">退出登录</a>
    </div>
</template>
<script>
// import jyHeader from '../../components/header.vue';
import * as utils from '../../utils';
import {
  MessageBox
} from 'bh-mint-ui2';
export default {
  data() {
    return {
      userName: '',
      userPhone: '',
      orderCount: '',
      sumMoney: '',
      userType: '1',
      menuList: [{
        name: '加油码',
        img: '../../src/assets/jym.jpg',
        type: 'qrdetail'
      }, {
        name: '加油记录',
        img: '../../src/assets/xfjl.jpg',
        type: 'consumelist'
      }, {
        name: '充值记录',
        img: '../../src/assets/czjl.jpg',
        type: 'recharge',
      }, {
        name: '油站列表',
        img: '../../src/assets/yzlb.jpg',
        type: 'stationlist'
      }, {
        name: '修改密码',
        img: '../../src/assets/xgmm.jpg',
        type: 'editpw'
      }, {
        name: '客服中心',
        img: '../../src/assets/kfzx.jpg',
        type: 'supportCenter'
      }],
      connectPhone:'',
      userImg:''
    }
  },
  created() {
    document.title = "通达加油宝";
    if (window.logoutFlag) {
      this.$router.push({
        name: 'login'
      });
    }
    window.userInfo = JSON.parse(localStorage.userInfo);
    this.userImg = window.userInfo.userImg;
    this.userType = this.$route.params.userType || window.userInfo.userType || '1';
    // debugger;
    if (this.userType === '2') {
      // if (window.userInfo) {
      this.userName = window.userInfo.userName;
      this.userPhone = window.userInfo.userPhone;
      this.menuList = [{
        name: '扫一扫',
        img: '../../src/assets/jym.jpg'
      }, {
        name: '加油记录',
        img: '../../src/assets/xfjl.jpg',
        type: 'consumelist'
      }, {
        name: '修改密码',
        img: '../../src/assets/xgmm.jpg',
        type: 'editpw'
      }, {
        name: '客服中心',
        img: '../../src/assets/kfzx.jpg',
        type: 'supportCenter'
      }];
      // this.password = JSON.parse(localStorage.getItem('user')).password;
      // }
    } else {
      // debugger
      this.userName = window.userInfo.userName;
      this.userPhone = window.userInfo.userPhone;
      this.orderCount = window.userInfo.orderCount;
      this.sumMoney = window.userInfo.sumMoney;
      // this.getDriverInfo();
    }
    //更新余额与加油消费笔数等数据
    utils.Get('getUserInfo',{id:window.userInfo.id}).then((response) => {
      let data = response.data;
      if (data.code === 0) {
        this.sumMoney = data.result.sumMoney;
        this.orderCount = data.result.orderCount;
        data.result.userType = this.userType;
        localStorage.userInfo = JSON.stringify(data.result);
        // this.connectPhone = data.result.phone;
      } else {
        Toast('更新信息失败！');
      }
    }).catch((error) => {
      Toast('更新信息失败！');
    })
    utils.Get('getServicePhone').then((response) => {
      let data = response.data;
      if (data.code === 0) {
        this.connectPhone = data.result.phone;
      } else {
        Toast('获取联系方式失败！');
      }
    }).catch((error) => {
      Toast('获取联系方式失败！');
    })

  },
  computed: {
    btnText() {
      if (this.isBtnLoading) return '登录中...';
      return '登录';
    }
  },
  methods: {
    scanQrCode() {
      debugger
      var that = this;
      if (wx && wx.scanQRCode && window.location.href.indexOf('localhost') == -1) {
        utils.checkWxCode(function() {
          wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function(res) {
              // Toast('res'+JSON.stringify(res));

              var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
              // Toast('result'+JSON.stringify(result));
              that.gotoMenuItem({ type: 'scanqrcode', params: { id: result } })
            }
          });
        });
      } else {
        that.gotoMenuItem({ type: 'scanqrcode', params: { id: 'd72d9063ba4c4669b2e6c05692e57c20' } });
      }
    },
    // getDriverInfo() {
    //   utils.Post('driverInfo', {
    //     "id": window.userInfo.id
    //   }).then((response) => {
    //     let data = response.data;
    //     if (data.code === 0) {
    //       this.leftMoney = data.result.ye;
    //       this.orderCount = data.result.jybs;
    //     } else {
    //       Toast(data.msg);
    //     }
    //   }).catch((error) => {
    //     Toast('获取司机信息失败！');
    //   })
    // }
    jyEditInfo() {
      // debugger
      this.$router.push({
        name: 'editinfo'
      });
    },
    gotoMenuItem(param) {
      // debugger
      switch (param.type) {
        case 'supportCenter':
          MessageBox.confirm('确认拨打客服中心电话<br>'+this.connectPhone, '提示').then(action => {
            window.location.href = "tel:"+this.connectPhone;
          });
          // MessageBox.confirm('确认拨打客服中心电话<br>025 - 873628592','提示');
          break;
        case 'qrdetail':
          this.$router.push({
            name: 'qrdetail'
          });
          break;
        case 'editpw':
          this.$router.push({
            name: 'editpw'
          });
          break;
        case 'recharge':
          this.$router.push({
            name: 'recharge'
          });
          break;
        case 'stationlist':
          this.$router.push({
            name: 'stationlist'
          });
          break;
        case 'consumelist':
          this.$router.push({
            name: 'consumelist',
            params:{
              today:param.today
            }
          });
          break;
        case 'scanqrcode':
          this.$router.push({
            name: 'cashier',
            params: param.params
          });
          break;
      }
      // if (param.type && param.type === 'supportCenter') {
      //   MessageBox.confirm('确认拨打客服中心电话<br>025 - 873628592','提示');
      //   // MessageBox.confirm({
      //   //   title: '提示',
      //   //   message:'确认拨打客服中心电话<br>025 - 873628592',
      //   //   // cancelButtonClass:'jy-confirm-cancel',
      //   //   // confirmButtonClass:'jy-confirm-confirm'
      //   // });
      // }
    },
    logout() {
      // window.userInfo = {userType:window.userInfo.userType};
      window.logoutFlag = true;
      localStorage.setItem('userInfo','');
      this.$router.push({
        name: 'login'
      });
    }
  },
  components: {
    // jyHeader
    MessageBox
  }
}

</script>
<style>
.jy-head {
  background: linear-gradient(137deg, rgba(243, 206, 24, 1) 0%, rgba(254, 190, 13, 1) 100%);
}

.jy-per-infoName {
  padding: 4px 0 8px 0;
  font-size: 18px;
}

.jy-per-info {
  padding: 0px 0 0 10px;
}

.jy-mrtx {
  width: 57px;
  height: 57px;
  border-radius: 30px;
}

.jy-person {
  padding: 30px 24px 16px 24px;
  /*border-bottom: solid 1px  #ddd;*/
}

.jy-per-infoPhone {
  font-size: 12px;
  color: #727070;
}

.jy-menu {
  border-top: solid 1px #ddd;
  background-color: #fff;
  position: relative;
  border-radius: 20px 20px 0 0;
  top: -12px;
  padding: 19px 26px;
}

.jy-menu-item {
  width: 23.5%;
  padding: 10px 0;
  display: inline-block;
  vertical-align: top;
  text-align: center;
  /*border-bottom: solid 1px  #ddd;*/
  /*border-right: solid 1px  #ddd;*/

}

.jy-menu-item img {
  width: 50px;
  height: 50px;
}

.jy-menu-item p {
  padding-top: 10px;
  font-size: 14px;
}

.jy-menu-title {
  /*height:28px;*/
  font-size: 20px;
  /*padding: 16px 0 0 24px;*/
  font-weight: 500;
  color: rgba(63, 52, 14, 1);
  line-height: 28px;
}

.jy-menu-content {
  padding-top: 16px;
}

.jy-menu-item img {
  margin: 0 auto;
}

.jy-num {
  padding: 16px 16px 24px 16px;
}

.jy-num-item {
  text-align: center;
  display: inline-block;
  vertical-align: top;
  width: calc(50% - 4px);
}

.jy-num-edit {
  width: 32px;
  height: 30px;
  margin: 2px 0;
}

.jy-num-height {
  height: 34px;
  line-height: 34px;
  font-size: 20px;
}

.jy-num-des {
  font-size: 12px;
  padding: 4px 0;
}

.jy-logout {
  position: relative;
  top: 32px;
  /*bottom: 0;*/
  margin: 0 auto;
  width: 279px;
  height: 48px;
  line-height: 48px;
  background: rgba(241, 240, 239, 1);
  border-radius: 8px;
  display: block;
  font-size: 16px;
  text-align: center;
}

.jy-num-edit {
  cursor: pointer;
}

.jy-confirm-confirm {
  color: #000;
  background-color: #fff;
  box-shadow: none;
}

.jy-confirm-cancel {
  box-shadow: none;
  color: #666;
}

</style>
