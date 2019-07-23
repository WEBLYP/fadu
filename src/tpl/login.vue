<template>
  <div class="login">
    <headup :shuju="citys" :see="true"></headup>
    <div class="content">
      <form action="" v-if="step==1">
        <div class="title overflow">
          <h1>登录</h1>
          <router-link to="register">去注册 <img src="../../static/img/right.png" alt=""></router-link>
        </div>
        <div class="line"><img src="../../static/img/phone.png" alt=""> <input type="tel" v-model="userName" placeholder="输入手机号码"> <tip :warn="msg1"></tip></div>
        <div class="line"><img src="../../static/img/mima.png" alt=""> <input type="password" v-model="password" placeholder="输入密码"> <tip :warn="msg"></tip></div>
        <button type="button" class="loginbtn" @click="login"  v-text="loging">登录</button>
        <p class="forget"  @click="forgetmm">忘记密码</p>
      </form>
      <form action="" v-if="step==2">
        <div class="title overflow">
          <h1>登录</h1>
          <router-link to="register">去注册 <img src="../../static/img/right.png" alt=""></router-link>
        </div>
        <div class="code">
          <img src="../../static/img/code.png" alt="">
        </div>
        <p class="saomiao">扫描下载“多问-律师端”APP，重置密码！</p>
        <p class="back" @click="back">返回登录</p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import headup from '@/components/headup.vue'
import tip from '@/components/tip.vue'
import { Message } from 'element-ui'
export default{
  components: {
    headup,
    tip
  },
  watch: {
    password (e) {
      if (e) {
        this.msg = Object
      } else {
        this.msg = {msg: '请输入密码', status: 'error'}
      }
    },
    userName (e) {
      if (e) {
        this.msg1 = Object
      } else {
        this.msg1 = {msg: '请输入手机号', status: 'error'}
      }
    }
  },
  data () {
    return {
      citys: Object,
      userName: '',
      password: '',
      msg: '',
      msg1: '',
      flag: 1,
      loging: '登录',
      step: 1
    }
  },
  methods: {
    get (letter) {
      this.letter = letter
    },
    getcity () {
      const that = this
      axios.get('https://www.easy-mock.com/mock/5cd8d456f38e844213d39e7c/example/city').then(function (res) {
        res = res.data
        if (res.ret && res.data) {
          const data = res.data
          that.citys = data.cities
        }
      })
    },
    forgetmm () {
      this.step = 2
    },
    back () {
      this.step = 1
    },
    login () {
      if (this.userName.length === 0) {
        this.msg1 = {msg: '请输入手机号', status: 'error'}
        return 0
      } else if (!/^1[34578]\d{9}$/.test(this.userName)) {
        this.msg1 = {msg: '手机号有误', status: 'error'}
        return 0
      }

      if (this.password.length === 0) {
        this.msg = {msg: '请输入密码', status: 'error'}
        return
      }

      axios.get('https://easy-mock.com/mock/5cd8d456f38e844213d39e7c/example/mock').then(response => {
        let res = response.data.data
        let len = res.length
        let userNameArr = []
        let passWordArr = []
        let ses = window.sessionStorage
        // 拿到所有的username
        for (var i = 0; i < len; i++) {
          userNameArr.push(res[i].username)
          passWordArr.push(res[i].password)
        }
        if (userNameArr.indexOf(this.userName) === -1) {
          alert('账号不存在！')
        } else {
          let index = userNameArr.indexOf(this.userName)
          if (passWordArr[index] === this.password) {
            // 把token放在sessionStorage中
            ses.setItem('data', res[index].token)
            ses.setItem('username', res[index].realname)
            ses.setItem('headsrc', res[index].headsrc)
            this.$parent.$data.userTitle = res[index].usertitle
            // 验证成功进入首页
            const options = {
              message: '登录成功'
            }
            Message.success(options)
            // 跳转到首页
            setTimeout(() => { this.$router.push('/') }, 1000)
            this.loging = '登录中...'
          } else {
            this.msg = {msg: '密码错误', status: 'error'}
          }
        }
      }).catch((e) => {
      })
    }
  },
  mounted () {
    this.getcity()
  }
}
</script>

<style>
  input:-internal-autofill-selected{
    background-color: transparent !important;
  }
  .login{
    width: 100%;
    min-width: 1200px;
    background: url("../../static/img/loginbg.png")no-repeat;
    background-size: cover;
    height: 100%;
    min-height: 787px;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
  }
  .login form{
    background: #21273a;
    box-shadow: 0 4px 10px 0 rgba(0,0,0,0.3);
    border-radius: 10px;
    width: 506px;
    margin: 110px auto;
    box-sizing: border-box;
    padding: 40px 70px;
  }
  .login form .code{
    text-align: center;
    margin: 40px 0;
  }
  .login form .code img{
    width: 200px;
  }
  .login form .title h1{
    font-size: 26px;
    display: inline-block;
    color: #fff;
    font-family: PingFang-SC-Bold;
    font-size: 26px;
    color: #FFFFFF;
    letter-spacing: 0;
    text-align: justify;
    font-weight: 500;
  }
  .login form p.back{
    color: #3AA3FF;
    text-align: center;
    padding: 10px 0;
    font-size: 16px;
    cursor: pointer;
  }
  .login form .title a{
    float: right;
    font-family: PingFang-SC-Medium;
    font-size: 16px;
    color: #3AA3FF;
    letter-spacing: 0;
    text-align: justify;
  }
  .login form .line img{
    width: 22px;
    vertical-align: middle;
  }
  .login form .line{
    padding-bottom: 15px;
    border-bottom: 1px solid #fff;
    margin-top: 44px;
  }
  .login form .line input::-webkit-input-placeholder{
    font-weight: 300;
  }
  .login form .line input{
    height: 25px;
    font-size: 16px;
    color: #fff;
    background: transparent;
    border: none;
    display: inline-block;
    vertical-align: middle;
    width: 220px;
    padding-left: 12px;
    font-weight: 300;
  }
  .login form .saomiao{
    text-align: center;
    font-size: 16px;
    color: #fff;
  }
  .login button.loginbtn{
    background-image: linear-gradient(0deg, #3A97FF 0%, #51ECFF 98%);
    border-radius: 29px;
    color: #fff;
    font-size: 20px;
    width: 100%;
    border: none;
    height: 54px;
    margin-top: 50px;
    cursor: pointer;
  }
  .forget{
    text-align: center;
    font-family: PingFang-SC-Medium;
    font-size: 14px;
    color: #3AA3FF;
    letter-spacing: 0;
    margin: 20px 0;
    display: block;
    cursor: pointer;
    margin-bottom: 0;
  }
  .login button:disabled{
    background-color: #eee;
    color: #999;
    background-image: none!important;
    cursor: not-allowed !important;
  }
</style>
