<template>
  <div style="height:100%;">
    <mt-search v-model="searchValue" cancel-text="取消" placeholder="请输入地区、加油站">
    </mt-search>
    <ul class="jy-stationlist">
      <div v-if="initflag" class="jy-nodata-des">
        加载中~~~
      </div>
      <div v-else>
        <div v-if="list.length>0" style="padding:0 16px;">
          <li v-for="item in list" class="jy-stationlist-item" style="">
            <!-- <img v-if="item.stationSmallUrl" class="jy-stationlist-item-logo" :src="item.stationSmallUrl" /> -->
            <!-- <img v-else class="jy-stationlist-item-logo" src="../../assets/logo.png" /> -->
            <div class="jy-stationlist-item-detail" style="">
              <div class="jy-stationlist-item-name" style="">{{item.stationName}}</div>
              <div class="jy-stationlist-item-location" style="">{{item.stationAddress}}</div>
              <div>
                <span class="jy-stationlist-tag" v-for="oil in item.oilStationProductList">{{oil.productName}}&nbsp;&nbsp;{{oil.productPrice}}元</span>
              </div>
            </div>
            <div class="jy-stationlist-item-distance">
              <!-- <img style="" src="../../assets/dh.png" /> -->
              <label>{{item.distance}}</label>
            </div>
          </li>
        </div>
        <div v-else class="jy-stationlist-nodata" style="">
          <img style="width:100px;" src="../../assets/nodata1.png" />
          <div class="jy-nodata-des">暂无数据</div>
        </div>
      </div>
    </ul>
  </div>
</template>
<script>
//  import { userLogin } from '../../api/api';
import * as utils from '../../utils';
import { Search } from 'bh-mint-ui2';
export default {
  data() {
    return {
      initflag:true,
      searchValue: '',
      // loadMore: true,
      list: [],
      //{name: '中国石化太',location: '南京市东山街道',production: '92#汽油',distance: '3.2公里'}
      page: 1,
      limit: 1000
    }
  },
  compoments: {
    [Search.name]:Search
  },
  created() {
    document.title = "油站列表";
    window.userInfo = JSON.parse(localStorage.userInfo);
    var that = this;
    if ( /micromessenger/.test(navigator.userAgent.toLowerCase()) && wx && wx.getLocation) {
      utils.checkWxCode(function() {
        wx.getLocation({
          type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          success: function (res) {
            var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
            var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
            var speed = res.speed; // 速度，以米/每秒计
            var accuracy = res.accuracy; // 位置精度
            that.getUserOilStationlist(res);
          }
        });
      });
    } else {
      that.getUserOilStationlist({
        'latitude':32,
        'longitude':118.5
      });
      alert('微信地理位置api无法使用！')
    }
  },
  watch: {
    searchValue(val) {
      this.getUserOilStationlist();
    }
  },
  computed: {

  },
  methods: {
    // loadMore() {
    //   this.loading = true;
    // },

    getUserOilStationlist(param) {
      utils.Post('userOilStationlist', {
        "page": this.page,
        "limit": this.limit,
        "userLng": param.longitude,
        "userLat": param.latitude,
        "search": this.searchValue
      }).then((response) => {
        let data = response.data;
        // this.page++
        if (data.code === 0) {
          // let last = this.list[this.list.length - 1];
          for (let i = 0; i <= this.limit; i++) {
            if (data.page.list[i]) {
              this.list.push(data.page.list[i]);
            }

          }
          // this.loading = false;
        } else {
          Toast(data.msg || '获取油站列表失败！');
        }
        this.initflag = false;
      }).catch((error) => {
        Toast('获取油站列表失败！');

      })
    }
  }
}

</script>
<style>
.jy-recharge {
  padding: 0 16px;
}
.jy-nodata-des {
  text-align: center;
    font-size: 16px;
    font-weight: 500;
    color: rgba(170,170,170,1);
    line-height: 22px;
    margin-top: 20px;
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

.jy-stationlist {
  /*padding: 0px 16px;*/
  height: calc(100% - 44px);

}

.jy-stationlist-item {
    padding: 16px 16px 16px 0;
  /*padding: 16px;*/
  border-bottom: solid 1px #eee;
}

.jy-stationlist-item img.jy-stationlist-item-logo {
  width: 66px;
  height: 66px;
}

.jy-stationlist-item-logo {}

.jy-stationlist-tag {
  display: inline-block;
  height: 20px;
  background: rgba(248, 198, 18, 0.5);
  border-radius: 2px;
  color: rgb(113, 101, 55);
  line-height: 20px;
  font-size: 12px;
  padding: 0 4px;
  margin-right: 4px;
}

.jy-stationlist-item-distance {
  padding-top: 12px;
  display: inline-block;
  vertical-align: top;
  float: right;
  text-align: center;
}

.jy-stationlist-item-distance label {
  padding-top: 4px;
  display: block;
  font-size: 12px;
  font-weight: 500;
  color: rgba(68, 68, 68, 1);
}

.jy-stationlist-item-distance img {
  width: 24px;
  height: 24px;
}

.jy-stationlist-item-location {
  font-size: 12px;
  font-weight: 500;
  color: rgba(68, 68, 68, 1);
  padding: 4px 0;
}

.jy-stationlist-item-name {
  font-size: 16px;
  font-weight: 600;
  color: rgba(68, 68, 68, 1);
  /*width: 145px;*/
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.jy-stationlist-item-detail {
  display: inline-block;
  vertical-align: top;
  /*padding-left: 16px;*/
}

.jy-stationlist-nodata {
  height: 100%;
  background: #f8f8f8;
  padding-top: 100px;
}

.jy-stationlist-nodata img {
  width: 200px;
  display: block;
  margin: 0 auto;
}

</style>
