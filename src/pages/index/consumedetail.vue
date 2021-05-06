<template>
  <div class="jy-consumedet">
    <!-- <img class="jy-consumedet-img" src="../../assets/detailTitle.png" /> -->
    <div style="height: 86px;background:linear-gradient(282deg,rgba(255,193,0,1) 0%,rgba(255,215,0,1) 100%);position: relative;">
      <span style="line-height: 86px;position: relative;left: 22px;">交易成功</span>
      <img class="jy-consumedet-img2" src="../../assets/detailbg.png" />
    </div>
    <div class="jy-consumedet-content">
      <div class="jy-consumedet-content-group"  >
        <div class="jy-consumedet-item" >
          <span>公司名</span>
          <label>{{info.companyName}}</label>
        </div>
        <div class="jy-consumedet-item" >
          <span>司机名</span>
          <label>{{info.driverRealName}}</label>
        </div>
        <div class="jy-consumedet-item" >
          <span>手机号</span>
          <label>{{info.userPhone}}</label>
        </div>
        <div class="jy-consumedet-item" >
          <span>车牌号</span>
          <label>{{info.plateNumber}}</label>
        </div>
      </div>
      <div class="jy-consumedet-content-group"  >
        <div class="jy-consumedet-item" >
          <span>加油站</span>
          <label>{{info.stationName}}</label>
        </div>
        <div class="jy-consumedet-item" >
          <span>油品</span>
          <label>{{info.productName}}</label>
        </div>
        <div class="jy-consumedet-item" >
          <span>金额</span>
          <label class="jy-color-red" v-html="'￥'+Number(info.orderTotal).toFixed(2)"></label>
        </div>
        <div class="jy-consumedet-item" >
          <span>收款人</span>
          <label>{{info.oilerRealName}}</label>
        </div>
      </div>
      <div class="jy-consumedet-content-group"  >
        <div class="jy-consumedet-item" >
          <span>单号</span>
          <span class="jy-cdi-right" style="">{{info.orderNum}}</span>
        </div>
        <div class="jy-consumedet-item" >
          <span>时间</span>
          <span class="jy-cdi-right" style="">{{info.orderTime}}</span>
        </div>
      </div>
      <div class="jy-goindex_btn-consumedet" @click="gotoIndex()">返回首页</div>
    </div>
  </div>
</template>
<script>
//  import { userLogin } from '../../api/api';
import * as utils from '../../utils';
export default {
  data() {
    return {
      info:{}
    }
  },
  created() {
    document.title = "加油明细";
    window.userInfo = JSON.parse(localStorage.userInfo);
    // debugger;
    this.info = this.$route.params.info;
  },
  computed: {

  },
  methods: {

    gotoIndex() {
      // debugger
      this.$router.push({
        name: 'index',
        params: {
          userType: window.userInfo.userType
        }
      });
    }
  }
}

</script>
<style>
.jy-consumedet {
  background-color: #f2f2f2;
  height: 100%;
}

.emapm-form input {
  font-family: inherit;
  text-align: right;
  padding-right: 8px;
}
.jy-consumedet-img {
  width: 100%;
}

.jy-consumedet-content {

  margin: 0 15px;
  padding-bottom: 26px;
}

.jy-consumedet-qr-des {
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

.jy-consumedet-item {
  border-bottom: dotted 1px #eee;
  margin: 0 25px;
  position: relative;
  padding: 10px 0px;
}

.jy-consumedet-item img {
  width: 29px;
  height: 29px;
  display: inline-block;
}

.jy-consumedet-item span {
  display: inline-block;
  font-size: 14px;
  color: #999;

}

.jy-consumedet-item label {
  position: absolute;
  right: 22px;
  display: inline-block;
  font-size: 14px;
  color: #444;
  /*font-weight: bold;*/
}

/*.jy-consumedet-item:first-child label {
  color: rgba(238, 193, 39, 1);
}*/

.jy-consumedet-item:last-child {
  border-bottom: none;
}


.jy-consumedet-content-group{
  margin-top: 10px;border-radius: 4px;background-color: #fff;
}
.jy-consumedet-item label.jy-color-red {
  color: #F24E4E;
  font-size: 20px;
}
.jy-consumedet-item span.jy-cdi-right {
color: #555;padding-left: 8px;
    position: absolute;
    right: 20px;
    top: 12px;
}
.jy-goindex_btn-consumedet {
    text-align: center;
    width: 90%;
    height: 48px;
    line-height: 48px;
    margin: 0 auto;
    background: rgba(248, 198, 18, 1);
    border-radius: 4px;
    font-size: 18px;
    color: rgba(51, 51, 51, 1);
    margin-top: 20px;
}
.jy-consumedet-img2 {
  width: 120px;
    height: 50px;
    /* float: right; */
    position: absolute;
    right: 30px;
    top: 24px;
}
</style>
