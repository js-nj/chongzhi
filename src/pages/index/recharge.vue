<template>
  <div class="">
    <ul class="jy-recharge">
      <li v-if="list.length>0" v-for="item in list" class="jy-recharge-item">
        <span>{{item.payTime}}</span>
        <label v-html="'+'+Number(item.payAmount).toFixed(2)"></label>
      </li>
    </ul>
    <div v-if="list.length==0" class="jy-consumelist-nodata" style="">
          <img src="../../assets/nodata.png" />
      </div>
  </div>
</template>
<script>
//  import { userLogin } from '../../api/api';
import * as utils from '../../utils';
export default {
  data() {
    return {
      loadMore: true,
      list: [],
      page: 1
    }
  },
  created() {
    document.title = "充值记录";
    window.userInfo = JSON.parse(localStorage.userInfo);
    this.getRechargeList();
  },
  computed: {

  },
  methods: {
    // loadMore() {
    //   this.loading = true;
    // },

    getRechargeList() {
      utils.Get('driverRechargeRecordList', {
        "page": this.page,
        "limit": 1000,
        "driverId": window.userInfo.driverId,
      }).then((response) => {
        let data = response.data;
        // this.page++
        if (data.code === 0) {
          // let last = this.list[this.list.length - 1];
          for (let i = 0; i <= 1000; i++) {
            if (data.page.list[i]) {
              this.list.push(data.page.list[i]);
            }

          }
          // this.loading = false;
        } else {
          Toast(data.msg || '获取充值记录失败！');
        }
      }).catch((error) => {
        Toast('获取充值记录失败！');

      })
    }
  }
}

</script>
<style>
.jy-recharge {
  padding: 0 16px;
}
.jy-recharge-item {
      border-bottom: solid 1px #eee;
  padding: 24px 0;
  font-size:12px;
/*font-family:PingFang-SC;*/
font-weight:500;
color:rgba(153,153,153,1);
}
.jy-recharge-item label {
  font-size: 20px;
  color:rgba(242,78,78,1);
  float: right;
  position: relative;
    top: -6px;
}
</style>
