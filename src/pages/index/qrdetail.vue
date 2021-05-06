<template>
  <div class="jy-user-info">
    <div class="jy-user-info-content">
      <!-- <div id="qr-driver"></div> -->
      <!-- <img src="../../assets/jym1.png" style="width: calc(100% + 4px);position: relative;left: -2px;" /> -->
      <div style="padding: 20px 24px;background: rgba(247,247,247,1);">
        <img class="jy-qrd-img" src="../../assets/gouxuan.png" />
        <span class="jy-qrd-jym">加油码</span>
      </div>
      <img :src="qrCode" style="width:180px;height:180px;display:block;margin:16px auto;" />
      <div class="jy-user-info-qr-des">
        向加油站工作人员出示即可加油
      </div>
      <div style="padding-bottom: 16px;">
        <div class="jy-user-info-item">
          <img src="../../assets/ye1.png" />
          <span>余额</span>
          <label v-html="Number(sumMoney).toFixed(2)+'元'"></label>
        </div>
        <div class="jy-user-info-item">
          <img src="../../assets/cp1.png" />
          <span>车牌</span>
          <label>{{plateNumber}}</label>
        </div>
        <div class="jy-user-info-item">
          <img src="../../assets/cxfsx1.png" />
          <span>次消费上限</span>
          <label v-html="Number(oneTimePrice).toFixed(2)+'元'"></label>
        </div>
        <div class="jy-user-info-item">
          <img src="../../assets/rxfsx1.png" />
          <span>日消费上限</span>
          <label v-html="Number(dayPrice).toFixed(2)+'元'"></label>
        </div>
      </div>
      <div class="jy-goindex_btn" @click="gotoIndex()">返回首页</div>
    </div>
  </div>
</template>
<script>
//  import { userLogin } from '../../api/api';
import * as utils from '../../utils';
export default {
  data() {
    return {
      sumMoney: '',
      plateNumber: '',
      oneTimePrice: '',
      dayPrice: '',
      qrCode:'',
      userImg:window.userInfo.userImg
    }
  },
  created() {
    document.title = "加油码";
    window.userInfo = JSON.parse(localStorage.userInfo);
    this.$nextTick(() => {
      // debugger
      // var qrcode = new QRCode(document.getElementById("qr-driver"), {
      //   text: "http://www.runoob.com",
      //   width: 128,
      //   height: 128,
      //   colorDark: "#000000",
      //   colorLight: "#ffffff",
      //   correctLevel: QRCode.CorrectLevel.H
      // });
    })
    this.getQrCode();
  },
  computed: {

  },
  methods: {
    getQrCode() {
      // debugger;
      utils.Get('getQrCode', {
        "id": window.userInfo.id
      }).then((response) => {
        let data = response.data;
        if (data.code === 0) {
          this.sumMoney = data.result.sumMoney;
          this.plateNumber = data.result.plateNumber;
          this.qrCode = data.result.qrCode;
          window.userInfo.plateNumber = data.result.plateNumber;
          localStorage.userInfo = JSON.stringify(window.userInfo);
          this.oneTimePrice = data.result.oneTimePrice;
          this.dayPrice = data.result.dayPrice;
        } else {
          Toast(data.msg || '获取QR信息失败！');
        }

      }).catch((error) => {
        Toast('获取QR信息失败！');

      })
    },
    gotoIndex() {
      // debugger
      this.$router.push({
        name: 'index',
        params: {
          userType: '1'
        }
      });
    }
  }
}

</script>
<style>
.jy-qrd-img{
  width: 20px;
}
.jy-qrd-jym {
  display: inline-block;
    padding-left: 8px;
    color: rgba(248, 198, 18, 1);
}
.jy-user-info {
  /*background-color: #eec127;
  height: 100%;
  padding: 8px 0;*/
}

.jy-user-info-img {
  width: calc(100% - 10px);
  margin: 32px 5px 0 5px;
}

.jy-user-info-content {
  background-color: #fff;
  /*margin: 0 6.5px;*/
  padding-bottom: 26px;
}

.jy-user-info-qr-des {
  text-align: center;
  /*  font-size: 16px;
  font-family: PingFangSC;
  font-weight: 400;*/
  color: rgba(183, 179, 168, 1);
  /*line-height: 22px;*/
  padding-bottom: 24px;
}

#qr-driver img {
  margin: 0 auto;
}

#qr-driver {
  padding: 24px;
}

.jy-user-info-item {
  border-bottom: solid 1.5px #eee;
  margin: 0 25px;
  position: relative;
  padding: 9px 0px;
}

.jy-user-info-item img {
  width: 26px;
  height: 26px;
  display: inline-block;
}

.jy-user-info-item span {
  display: inline-block;
  height: 30px;
  line-height: 30px;
  color: rgba(102, 102, 102, 1);
  padding-left: 12px;
}

.jy-user-info-item label {
  position: absolute;
  right: 22px;
  display: inline-block;
  height: 30px;
  line-height: 30px;
  color: rgba(58, 53, 35, 1);
  /*font-weight: bold;*/
}

.jy-user-info-item:first-child label {
  color: rgba(238, 193, 39, 1);
}

.jy-user-info-item:last-child {
  border-bottom: none;
}

.jy-goindex_btn {
  text-align: center;
  width: 90%;
  height: 48px;
  line-height: 48px;
  margin: 0 auto;
  background: rgba(248, 198, 18, 1);
  border-radius: 4px;
  font-size: 18px;
  color: rgba(51, 51, 51, 1);
}

</style>
