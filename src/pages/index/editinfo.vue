<template>
  <div class="jy-editInfo">
    <div style="background: #fff;">
      <div class="jy-edit-info" style="padding: 6px 20px 0px;">
        <mt-field label="姓名" placeholder="请输入姓名" v-model="username"></mt-field>
        <mt-field label="身份证" placeholder="请输入身份证" v-model="userid"></mt-field>
        <mt-field label="地区" placeholder="请输入地区" v-model="userarea"></mt-field>
        <mt-field label="车牌号" placeholder="请输入车牌号" v-model="usercarnum"></mt-field>
      </div>
    </div>
    <div class="jy-goindex_btn jy-update-info" @click="updateInfo()">保 存</div>
  </div>
</template>
<script>
//  import { userLogin } from '../../api/api';
import * as utils from '../../utils';
import {
  Field
} from 'bh-mint-ui2';
export default {
  data() {
    return {
      username: '',
      userid: '',
      userarea: '',
      usercarnum: ''
    }
  },
  created() {
    // debugger
    // document.title = "加油记录查询";
    window.userInfo = JSON.parse(localStorage.userInfo);
    this.username = window.userInfo.userName;
    this.userid = window.userInfo.id;
    this.userarea = window.userInfo.companyName;
    this.usercarnum = window.userInfo.plateNumber;
  },
  computed: {

  },
  methods: {
    updateInfo() {

    }

  },
  components:{
    [Field.name]:Field
  },
}

</script>
<style>
.jy-edit-info .mint-cell:first-child .mint-cell-wrapper {
  border-top: none;
}

.jy-edit-info .mint-cell:last-child .mint-cell-wrapper {
  border-bottom: none;
}

.jy-update-info {
  margin-top: 32px;
}

.jy-editInfo {
  height: 100%;
  background-color: #f8f8f8;
}

</style>
