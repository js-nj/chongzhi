<template>
  <div class="jy-title">
  {{title}}
  </div>
</template>
<script>
export default {
  name:'jyHeader',
  data() {
    return {
      userName: '',
      password: '',

    }
  },
  created() {

  },
  props:{
    title:''
  },
  methods: {

  }
}

</script>
<style>
.jy-title {
  height: 55px;
  line-height: 55px;
  text-align: center;
  background-color: #ddd;

color: rgba(16, 16, 16, 1);
font-size: 25px;
font-family: Microsoft Yahei;
}

</style>
