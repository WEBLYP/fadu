<template>
  <p class="tips" :class="warn.status"><i></i> <span>{{warn.msg}}</span></p>
</template>

<script>
export default{
  name: 'tip',
  props: {
    warn: ''
  },
  data () {
    return {
      status: 1
    }
  }
}
</script>

<style>
  .tips{
    display: inline-block;
    color: #fff;
    font-size: 12px;
  }
  .tips i{
    width: 14px;
    height: 14px;
    display: inline-block;
    vertical-align: middle;
  }
  .tips.error i{
    background: url("../../static/img/danger.png")no-repeat;
    background-size: cover;
  }
  .tips.error span{
    color: #F64D4F;
  }
  .tips span{
    font-size: 12px;
    display: inline-block;
    vertical-align: middle;
  }
</style>
