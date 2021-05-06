<template>
  <div style="height:100%;background: #f8f8f8;">
    <div class="jy-cl-list" v-if="!showFilter">
      <mt-search class="jy-consumelist-search" v-model="searchValue" cancel-text="取消" placeholder="请选择查询信息">
      </mt-search>
      <div class="jy-consumelist-cover" @click="showFilterVue()"></div>
      <ul class="jy-consumelist" >
        <mt-loadmore :top-method="loadTop" :autoFill="false" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
          <div v-if="list.length>0" style="padding:0 16px;">
            <ul>
              <li v-for="item in list" class="jy-consumelist-item" @click="gotoConsumeDetail(item)">
                <img class="jy-consumelist-item-logo" src="../../assets/logo.png" />
                <div class="jy-consumelist-item-detail" style="">
                  <div class="jy-consumelist-item-name" style="">单号-{{item.orderNum}}</div>
                  <div class="jy-consumelist-item-location" style="">{{item.stationName}}</div>
                  <div style="color:rgba(153,153,153,1);font-size:12px;">
                    {{item.orderTime}}
                  </div>
                </div>
                <div class="jy-consumelist-item-distance">
                  <div style="color:rgba(242,78,78,1);font-size:20px;" v-html="Number(item.orderTotal).toFixed(2)"></div>
                  <label style="color:rgba(170,170,170,1);font-size:12px;">查看详情 ></label>
                </div>
              </li>
            </ul>
          </div>
          <div v-else class="jy-consumelist-nodata" style="">
            <img style="width:100px;" src="../../assets/nodata1.png" />
            <div class="jy-nodata-des">暂无数据</div>
            <!-- <img src="../../assets/nodata.png" /> -->
          </div>
        </mt-loadmore>
      </ul>
    </div>
    <div class="jy-cl-filter" v-else>
      <emapm-form :model="model" v-model="formValue" ref="form" textalign="flex-end"></emapm-form>
      <div class="jy-goindex_btn jy-update-info" @click="confirm()">确 认</div>
    </div>
  </div>
</template>
<script>
import * as utils from '../../utils';
import { Search } from 'bh-mint-ui2';

function getNowDateStr() {
  var tmpDate = new Date();
  return tmpDate.getFullYear() + "-" + (tmpDate.getMonth() + 1) + "-" + tmpDate.getDate()
}
export default {
  data() {
    return {
      list: [],
      page: 1,
      searchValue: '',
      showContent: false,
      limit: 10,
      showFilter: false,
      formValue: {
        KSSJ: '',
        JSSJ: ''
      },
      model: [{
        "name": "KSSJ",
        "caption": "开始时间",
        "xtype": "date-local",
      }, {
        "name": "JSSJ",
        "caption": "结束时间",
        "xtype": "date-local",
      }, {
        "name": "YZMC",
        "caption": "油站名称",
        "xtype": "text",
      }, {
        "name": "DDH",
        "caption": "单号",
        "xtype": "text",
      }],
      todayFlag: '',
      allLoaded: false
    }
  },
  compoments: {
    Search
  },
  created() {
    window.userInfo = JSON.parse(localStorage.userInfo);
    this.todayFlag = this.$route.params.today;
    if (this.todayFlag === true) {
      document.title = "今日加油记录";
    } else if (this.todayFlag === false) {
      document.title = "历史加油记录";
    } else {
      document.title = "加油记录";
    }

    // if (window.userInfo.userType === '2') {
    //   document.title = "加油记录";
    // } else {
    //   document.title = "消费记录";
    // }
    this.getOilorderList();
  },
  watch: {
    // searchValue(val) {
    //   this.getUserOilconsumelist();
    // }
  },
  computed: {

  },
  methods: {
    loadTop() {
      this.page = 1;
      this.getOilorderList({
        page: this.page
      });
      debugger;
      this.$refs.loadmore.onTopLoaded();
    },
    loadBottom() {
      // debugger;
      // this.getOilorderList({
      //   page: this.page
      // });
    },
    confirm() {
      if (this.todayFlag === true) {
        document.title = "今日加油记录";
      } else if (this.todayFlag === false) {
        document.title = "历史加油记录";
      } else {
        document.title = "加油记录";
      }
      this.showFilter = false;
      //根据条件过滤
      var param = {
        id: this.formValue.DDH,
        // driverId: window.userInfo.driverId,
        stationId: this.formValue.YZMC,
        // plateNumber: this.formValue.CPH,
        orderBeginTime: this.formValue.KSSJ + ' 00:00:00',
        orderEndTime: this.formValue.JSSJ + ' 23:59:59'
      };
      this.getOilorderList(param, 'search');
    },
    gotoConsumeDetail(item) {
      this.$router.push({
        name: 'consumedetail',
        params: { info: item }
      });
    },
    getOilorderList(param, type) {
      var that = this;
      var tmpParam = Object.assign({
        "page": this.page,
        "limit": this.limit,
      }, param);
      // if (this.todayFlag === true) {
      //   tmpParam.orderBeginTime = getNowDateStr()+' 00:00:00';
      //   tmpParam.orderEndTime = getNowDateStr()+' 23:59:59';
      // }
      if (window.userInfo.driverId) {
        tmpParam.driverId = window.userInfo.driverId;
      } else if (window.userInfo.stationId) {
        tmpParam.stationId = window.userInfo.stationId;
      } else if (window.userInfo.companyId) {
        tmpParam.companyId = window.userInfo.companyId;
      }
      var tmpType = type;
      // driverId: window.userInfo.driverId,
      utils.Get('oilorderList', tmpParam)
        .then((response) => {
          // debugger;
          let data = response.data;
          that.showContent = true;
          if (data.code === 0) {
            if (tmpType == 'search') {
              that.list = [];
            }
            if (data.page.list.length < 10) {
              that.allLoaded = true;
              // debugger;
              that.$refs.loadmore.onBottomLoaded();
            } else if (data.page.list.length == 10) {
              that.page++
            }
            for (let i = 0; i <= that.limit; i++) {
              if (data.page.list[i]) {
                that.list.push(data.page.list[i]);
              }
            }
          } else {
            Toast(data.msg || '获取加油记录失败！');
          }
        }).catch((error) => {
          Toast('获取加油记录失败！');

        })
    },
    showFilterVue() {
      document.title = "加油记录查询";
      this.showFilter = true;
    }
  }
}

</script>
<style>
.jy-cl-filter ::-webkit-input-placeholder {
  /* WebKit browsers */
  direction: rtl;
  font-size: 14px;
}

.jy-consumelist-search ::-webkit-input-placeholder {
  text-align: center;
}

.jy-recharge {
  padding: 0 16px;
}

.emapm-form span.mt-color-grey-lv3 {
  font-size: 14px;
  color: #aaa;
}

/*.jy-recharge-item {
  border-bottom: solid 1px #eee;
  padding: 16px 0px;
  border-bottom: solid 1px #eee;
  font-size: 12px;
  font-family:PingFang-SC;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
}

.jy-recharge-item label {
  font-size: 20px;
  color: rgba(242, 78, 78, 1);
  float: right;
}*/

.jy-consumelist {
  /*padding: 0px 16px;*/
  height: calc(100% - 44px);

}

.jy-consumelist-item {
  padding: 16px 0;
  border-bottom: solid 1px #eee;
}

.jy-consumelist-item img.jy-consumelist-item-logo {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-top: 10px;
}

.jy-consumelist-item-logo {}

.jy-consumelist-tag {
  display: inline-block;
  height: 20px;
  background: rgba(248, 198, 18, 0.5);
  border-radius: 2px;
  color: rgb(113, 101, 55);
  line-height: 20px;
  font-size: 12px;
  padding: 0 4px;
}

.jy-consumelist-item-distance {
  padding-top: 8px;
  display: inline-block;
  vertical-align: top;
  float: right;
  text-align: center;
}

.jy-consumelist-item-distance label {
  padding-top: 12px;
  display: block;
  font-size: 12px;
  font-weight: 500;
  color: rgba(68, 68, 68, 1);
}

.jy-consumelist-item-distance img {
  width: 24px;
  height: 24px;
}

.jy-consumelist-item-location {
  font-size: 12px;
  font-weight: 500;
  color: rgba(68, 68, 68, 1);
  padding: 8px 0;
}

.jy-consumelist-item-name {
  font-size: 12px;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}

.jy-consumelist-item-detail {
  display: inline-block;
  vertical-align: top;
  padding-left: 15px;
  width: calc(100% - 120px);
}

.jy-consumelist-nodata {
  height: 100%;
  /*background: #f8f8f8;*/
  padding-top: 64px;
}

.jy-consumelist-nodata img {
  width: 200px;
  display: block;
  margin: 0 auto;
}

.jy-consumelist-cover {
  height: 44px;
  position: absolute;
  width: 100%;
  top: 0;
  z-index: 1;
}

.emapm-form span {
  font-family: inherit
}

</style>
