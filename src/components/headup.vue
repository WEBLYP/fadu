<template>
  <div class="header">
    <div class="content">
      <router-link class="logo" to="/">
        <img src="../../static/img/logo.png" alt="">
      </router-link>
      <div class="form" v-if="see">
        <input type="search"  v-model="val" @focus="changecolor" @blur="cancelcolor" :class="colorflag == true ? 'active':''">
        <button @click="fd(val)">法度一下</button>
        <ul class="result" v-if="nodata">
          <li v-for="(item, index) in list"  :key="index" @click="writein(item.name)"><a href="javascript:;">{{item.name}}</a></li>
        </ul>
      </div>
      <router-link to="/login" class="loginbtn" v-if="!islogin">登录</router-link>
      <div class="usermation" v-else @click="showout" @mouseleave="hideout">
        <img :src="userinfo.headsrc" alt="">
        <span>{{userinfo.username}}律师</span>
        <button v-if="outshow" @click="loginout">退出</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Message, MessageBox } from 'element-ui'
export default {
  name: 'headup',
  props: {
    shuju: {},
    see: '',
    ival: ''
  },
  data () {
    return {
      val: '',
      list: [],
      timer: null,
      show: false,
      islogin: false,
      userinfo: Object,
      outshow: false,
      colorflag: false
    }
  },
  watch: {
    val () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        const res = []
        for (let i in this.shuju) {
          this.shuju[i].forEach((vals) => {
            if (vals.spell.indexOf(this.val) > -1 || vals.name.indexOf(this.val) > -1) {
              res.push(vals)
            }
            if (this.val === '') {
              res.length = 0
            }
          })
        }
        this.list = res
      }, 100)
    }
  },
  computed: {
    nodata () {
      return this.list.length
    }
  },
  methods: {
    fd (e) {
      this.list = []
      this.$router.push({name: 'result', query: {id: this.val}})
      this.$emit('send', e)
    },
    def () {
      if (this.ival) {
        this.val = this.ival
      }
    },
    load () {
      if (window.sessionStorage.username) {
        this.islogin = true
        this.userinfo = {
          username: window.sessionStorage.username,
          headsrc: window.sessionStorage.headsrc
        }
      }
    },
    showout () {
      this.outshow = true
    },
    hideout () {
      this.outshow = false
    },
    loginout (e) {
      const parmas = {
        title: '确认登出？'
      }
      MessageBox(parmas, res => {
        if (res === 'confirm') {
          window.sessionStorage.removeItem('data')
          window.sessionStorage.removeItem('username')
          window.sessionStorage.removeItem('headsrc')
          const options = {
            message: '登出成功'
          }
          Message.success(options)
          this.$router.push('login')
        }
      })
    },
    writein (e) {
      this.val = e
      clearTimeout(this.timer)
      this.list = []
    },
    changecolor () {
      this.colorflag = true
    },
    cancelcolor () {
      this.colorflag = false
    }
  },
  mounted () {
    this.def()
    this.load()
  }
}
</script>

<style>
  html,body{
    font-family: '微软雅黑';
    color: #333333;
  }
  .header{
    width: 100%;
    min-width: 1200px;
    margin: 0 auto;
    background: #1E273A;
    box-shadow: 0 2px 10px 0 rgba(0,0,0,0.07);
    z-index: 9;
  }
  .header .logo{
    display: inline-block;
    vertical-align: middle;
  }
  .header .logo img{
    height: 40px;
  }
  .header .content{
    width: 1200px;
  }
  .content{
    margin: 0 auto;
    box-sizing: border-box;
    padding: 12px 0;
  }
  .usermation{
    float: right;
    color: #fff;
    font-family: PingFang-SC-Bold;
    font-size: 18px;
    color: #FFFFFF;
    line-height: 50px;
    position: relative;
    cursor: pointer;
    padding: 0 10px;
    background: url("../../static/img/sanjiaoxing.png")no-repeat;
    background-position: bottom right;
  }
  .usermation span{
    display: inline-block;
    vertical-align: middle;
  }
  .usermation button{
    position: absolute;
    outline: none;
    border: none;
    width: 100px;
    cursor: pointer;
    text-align: center;
    color: #46b0ff;
    font-size: 16px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    background-color: #fff;
    box-shadow: 0 0px 4px 0 rgba(0,0,0,0.52);
    right: 0;
    top: 100%;
  }
  .usermation img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    display: inline-block;
    vertical-align: middle;
  }
  .header .form{
    height: 45px;
    display: inline-block;
    vertical-align: middle;
    width: 520px;
    margin-left: 170px;
    position: relative;
  }
  .header .form .result{
    width: 408px;
    height: 300px;
    background-color: #fff;
    position: absolute;
    left: 0;
    top: 50px;
    overflow-y: auto;
    z-index: 9;
    box-shadow: 0 4px 10px 0 rgba(0,0,0,0.52);
  }
  .header .form .result a{
    width: 100%;
    color: #333;
    font-size: 16px;
    padding: 10px;
    display: block;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .header .form .result a:hover{
    background-color: #eee;
  }
  .header .form input{
    width: 408px;
    height: 100%;
    line-height: 45px;
    border: none;
    float: left;
    outline: none;
    background-color: #fff;
    font-size: 16px;
    padding: 12px;
    box-sizing: border-box;
    -webkit-appearance: none;
    display: inline-block;
  }
  .header .form input.active{
    border-color: #3aa3ff;
  }
  .header .form button{
    width: 112px;
    height: 45px;
    float: right;
    color: #fff;
    font-size: 16px;
    outline: none;
    cursor: pointer;
    border: none;
    background: #3AA3FF;
  }
  .header .form button:hover{
    background-color: #3391e4;
  }
  .header a.loginbtn{
    border: 1px solid #fff;
    border-radius: 4px;
    height: 45px;
    box-sizing: border-box;
    width: 106px;
    cursor: pointer;
    font-family: PingFang-SC-Medium;
    font-size: 16px;
    color: #fff;
    letter-spacing: 0;
    background-color: transparent;
    vertical-align: middle;
    display: inline-block;
    text-align: center;
    line-height: 45px;
    float: right;
  }
  .header a.loginbtn:hover{
    color: #3AA3FF;
    border: 1px solid #3AA3FF;
  }
  /*html,body{*/
    /*font-family: 'PingFang-SC-Medium','Microsoft Yahei','"微软雅黑"';*/
  /*}*/
</style>
