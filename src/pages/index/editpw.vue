<template>
  <div class="jy-editInfo">
    <div style="background: #fff;">
      <div class="jy-edit-info" style="padding: 6px 20px 0px;">
        <mt-field id="oldpw" v-if="notFirstLog" label="" placeholder="请输入旧密码" v-model="oldpw"></mt-field>
        <mt-field id="newpw" label="" placeholder="请输入新密码" v-model="newpw"></mt-field>
        <mt-field id="newpwmore" label="" placeholder="请再次输入新密码" v-model="newpwmore"></mt-field>
      </div>
    </div>
    <div class="jy-goindex_btn jy-update-info" @click="updatePw()">保 存</div>
  </div>
</template>
<script>
//  import { userLogin } from '../../api/api';
function changePassword(that,id,origin) {
  var str = ""; //str变量用于存储密码
  //获取input元素
  var input = document.getElementById(id).getElementsByTagName('input')[0];
  //获取span元素
  // var span = document.getElementById("span")[0];
  input.oninput = function(evt) {
    var val = this.value; //取到输入框的值
    if (val.length > str.length) {
      //输入值
      str += val.charAt(val.length - 1);
    } else {
      //回删值
      str = str.substr(0, val.length);
    }
    //将输入框除最后一位的字符替换成*
    this.value =
      val.substr(0, val.length - 1).replace(/./g, "*") +
      val.charAt(val.length - 1);
    /* 取当前输入框长度，用于判断是否正在输入
    停止输入时，一秒后将最后一个字符变成*号 */
    var len = this.value.length;
    setTimeout(() => {
      /*这时的this指向在延迟器触发时输入框的状态，
    而不是延迟器创建时的状态*/
      if (this.value.length == len) {
        //一秒后输入框的值长度不变，将所有字符替换为*
        this.value = this.value.replace(/./g, "*");
      }
    }, 1000);
    that[origin] = str;
    // span.innerHTML = str;
  };
}
import {
  Field
} from 'bh-mint-ui2';
import * as utils from '../../utils';
export default {
  data() {
    return {
      oldpw: '',
      newpw: '',
      newpwmore: '',
      oldpw2: '',
      newpw2: '',
      newpwmore2: '',
      notFirstLog: true
    }
  },
  created() {
    document.title = '修改密码';
    window.userInfo = JSON.parse(localStorage.userInfo);
    if (this.$route.params && this.$route.params.hasOwnProperty('notFirstLog')) {
      this.notFirstLog = this.$route.params.notFirstLog;
    }
    this.$nextTick(() => {
      // debugger
      if (this.notFirstLog) {
        changePassword(this,'oldpw','oldpw2');
      }
      changePassword(this,'newpw','newpw2');
      changePassword(this,'newpwmore','newpwmore2');
    })

    // this.username = window.userInfo.userName;
    // this.userid = window.userInfo.id;
    // this.userarea = window.userInfo.companyName;
    // this.usercarnum = window.userInfo.plateNumber;
  },
  computed: {

  },
  watch:{
    oldpw:function(val){

    }
  },
  components:{
    [Field.name]:Field
  },
  methods: {
    updatePw() {
      if (this.newpw2!=this.newpwmore2) {
        Toast('两次输入的密码不一致！');
        return;
      }
      var that = this;
      var param = {
        "id": window.userInfo.id,
        "oldPwd": this.oldpw2,
        "newPwd1": this.newpw2,
        "newPwd2": this.newpwmore2,
        "userType": window.userInfo.userType
      };
      if (!this.notFirstLog) {
        param.firstLogin = 1;
      }
      utils.Post('updatepassword', param).then((response) => {
        var data = response.data;
        // debugger;
        if (data.code === 0) {
          Toast('修改密码成功！');
          that.$router.push({
            name: 'index',
            userType: window.userInfo.userType || 1
          });
        } else {
          Toast(data.msg || '修改密码失败~');
        }
      }).catch((error) => {
        Toast('修改密码失败！');
      })
    }

  }
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
