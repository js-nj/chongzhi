<template>
  <div style="height:100%;padding:17px 20px;background: #D3D3D3;">
    <div style="text-align:center;background: #F8C612;padding: 18px 0 8px 0;">
      <img v-if="userImg" class="jy-mrtx" :src="userImg" />
      <img v-else src="../../assets/logo.png" style="width: 75px;height:75px;border-radius:45px;" />
      <div style="padding: 8px 0 0 0;font-size:14px;font-family:PingFang-SC;font-weight:500;color:rgba(51,51,51,1);">{{driverName}}</div>
    </div>
    <div style="background:#fff;padding: 10px 15px 0 15px;">
      <div class="jy-cashier-ro">
        <div class="jy-cashier-ro-item">
          <span>手机号</span>
          <div>{{driverPhone}}</div>
        </div>
        <div class="jy-cashier-ro-item">
          <span>车牌号</span>
          <div>{{plateNumber}}</div>
        </div>
        <div class="jy-cashier-ro-item">
          <span>加油员</span>
          <div>{{userName}}</div>
        </div>
      </div>
      <div class="jy-cashier-content">
        <!-- <mt-select label="选择油品" v-if="chooseOil" @click="cliclSelect" :options="singleSelectOptions" v-model="singleSelectValue" select-type="select" @selector-click="singleSelectClick" ></mt-select> -->
        <mt-select label="选择油品"  @click="cliclSelect" :options="singleSelectOptions" v-model="singleSelectValue" select-type="select" @selector-click="singleSelectClick" :placeholder="chooseOil"></mt-select>
        <mt-field class="jy-bt-none" label="加油金额" placeholder="￥0.00" v-model="jyMoney" ></mt-field>
        <mt-textarea class="jy-bt-none" label="备注信息" placeholder="请输入备注信息" rows='3' maxlength='100' v-model="extraInfo"></mt-textarea>

      </div>

    </div><div class="jy-cashier_btn" @click="getLocation()">保 存</div>
  </div>
</template>
<script>
//  import { userLogin } from '../../api/api';
import * as utils from '../../utils';
import {
  Field,
  Select,
  Textarea,
  Button,
} from 'bh-mint-ui2';
export default {
  data() {
    return {
      singleSelectValue: '',
      cashierWorker:JSON.parse(localStorage.userInfo).userName,
      // plateNumber:plateNumber
      singleSelectOptions: [],
      jyMoney: '',
      extraInfo: '',
      driverName:'',
      driverPhone:'',
      plateNumber:'',
      userName:'',
      userId:'',
      chooseOil:'请选择油品',
      userImg:''
      // chooseOil:true
    }
  },
  components:{
    [Field.name]:Field,
    [Select.name]:Select,
    [Textarea.name]:Textarea,
    [Button.name]:Button,
  },
  created() {
    document.title = "收银台";
    window.hassaveFlag = false;
    window.userInfo = JSON.parse(localStorage.userInfo);
    this.userName = window.userInfo.userName;
    // this.userImg = window.userInfo.userImg;
    // debugger
    this.userId = this.$route.params.id;
    this.getDriverInfo();
    this.getOilstationproductList();
  },
  computed: {

  },
  methods: {
    getDriverInfo(){
      utils.Get('driverInfo',{
          "id":this.userId,//目前固定id this.$route.params.id
        }
      ).then((response) => {
        let data = response.data;
        // this.showContent = true;
        if (data.code === 0) {
          this.driverName = data.result.userName;
          this.plateNumber = data.result.plateNumber;
          this.driverPhone = data.result.userPhone;
          //司机的头像而不是当前登录人的头像
          this.userImg = data.result.userImg;
          // this.name = data.result.userName;
        } else {
          Toast(data.msg || '获取司机信息失败！');
        }
      }).catch((error) => {
        Toast('获取司机信息失败！');

      })
    },
    singleSelectClick(val){

    },
    cliclSelect(){
      // alert(1)
    },
    getLocation(){
      var that = this;
      if (window.hassaveFlag) {
        // window.hassaveFlag = false;
        Toast('请勿重复提交~');
        return;
      }else {
        window.hassaveFlag = true;
        that.cashiersave({});
      }
      // debugger;
      // if (wx && wx.getLocation) {
      //   wx.getLocation({
      //     type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      //     success: function (res) {
      //       var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
      //       var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
      //       var speed = res.speed; // 速度，以米/每秒计
      //       var accuracy = res.accuracy; // 位置精度
      //       that.cashiersave(res);
      //     },
      //     fail:function(err){
      //       alert(err)
      //     },
      //     error:function(err){
      //       alert(err)
      //     }
      //   });
      // } else {
        // that.cashiersave({});
        // alert('微信地理位置api无法使用！')
      // }
    },
    cashiersave(location){
      // debugger;
      // if (!this.singleSelectValue) {
      //   Toast('请选择油品');
      //   return ;
      // }
      if (!this.jyMoney) {
        Toast('请填写金额');
        return ;
      }
      utils.Post('oilorderSave',{
          oilerId: window.userInfo.id,//加油工id ,
          driverId: this.userId,//司机id ,this.$route.params.id
          stationId: window.userInfo.stationId,//加油站id ,
          productId: this.singleSelectValue,//油品id ,
          productQuantity: '1',//消费数量 ,
          orderPrice: '1',//成交单价 ,
          orderTotal: this.jyMoney,//订单总价 ,
          orderType: '2',//确认类型(1:POS 2:扫码) ,
          driverLng: location.longitude,//经度 ,
          driverLat: location.latitude,//纬度 ,
          orderRemarks: this.extraInfo,//订单备注
        }
      ).then((response) => {
        let data = response.data;
        if (data.code === 0) {
          Toast('保存订单成功！');
          // debugger;
          this.$router.push({
            name: 'consumedetail',
            params: { info: data.result }
          });

          // this.$router.push({
          //   name: 'index',
          //   params: {
          //     userType: '2'
          //   }
          // });
        } else {
          Toast(data.msg || '保存订单失败！');
        }
      }).catch((error) => {
        Toast('保存订单失败！');

      })
    },
    getOilstationproductList(){
      utils.Get('oilstationproductList',{
          "page":1,
          "limit":1000,
          "stationId":window.userInfo.stationId
        }
      ).then((response) => {
        let data = response.data;
        var that = this;
        // this.showContent = true;
        if (data.code === 0) {
          // debugger
          if (data.page.list && data.page.list.length>0) {
            this.singleSelectOptions = [];
            data.page.list.forEach(function(item){
              var tmpObj = {
                name:item.productName,
                id:item.id
              };
              that.singleSelectOptions.push(tmpObj)
            });
            //默认第一个油品
            this.singleSelectValue = data.page.list[0].id;
            // this.singleSelectOptions = data.page.list;
          }else {
            // debugger;
            this.chooseOil = '无';
          }
        } else {
          Toast(data.msg || '获取加油站产品信息失败！');
        }
      }).catch((error) => {
        Toast('获取加油站产品信息失败！');

      })
    }
  }
}

</script>
<style>
.jy-cashier-content {
  margin-top: 24px;
  font-family: PingFang-SC;
}
.jy-cashier-content span.mint-cell-text.mt-color-grey{
  font-size: 14px;
}

.jy-cashier-content .select-value span.mt-color-grey-lv3{
  font-size: 14px;
}
.jy-cashier-content ::-webkit-input-placeholder { /* WebKit browsers */
    direction: rtl;
    font-size: 14px;
}
.jy-cashier-content input.mint-field-core { /* WebKit browsers */
    text-align: right;
    font-family: PingFang-SC;
}
.jy-cashier-content textarea.mint-textarea-core {
  text-align: right;
  font-family: PingFang-SC;
}
.jy-cashier-content .mint-textarea .mint-cell-wrapper {
  padding-right: 15px !important;
}
.jy-cashier-ro-item {
  padding: 10px 0;
}

.jy-cashier-ro-item>span {
  display: inline-block;
  vertical-align: top;
  width: 100px;
  text-align: left;
  font-size: 14px;
  font-family: PingFang-SC;
  font-weight: 500;
  color: rgba(102, 102, 102, 1);
}

.jy-cashier-ro-item>div {
  display: inline-block;
  vertical-align: top;
  width: calc(100% - 108px);
  text-align: right;
  font-size: 14px;
  font-family: PingFang-SC;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}
.jy-cashier_btn {
    text-align: center;
    /* width: 315px; */
    height: 48px;
    line-height: 48px;
    /* color: #fff; */
    margin: 0px auto 0;
    background: rgba(248, 198, 18, 1);
    border-radius: 4px;
    font-size: 18px;
    /* font-family: PingFangSC; */
    /* font-weight: 400; */
    color: rgba(51, 51, 51, 1);
    /* line-height: 24px; */
}
.jy-cashier-content .mint-textarea-count{
  display: none;
}
.jy-bt-none .mint-cell-wrapper{
  border-top: none;
}
</style>
