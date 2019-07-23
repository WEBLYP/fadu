<template>
  <div class="login">
    <headup :shuju="citys" :see="true"></headup>
    <div class="content">
      <form action="" v-if="step==1" class="animated" ref="step1">
        <div class="title overflow">
          <h1>注册</h1>
          <router-link to="login">去登录 <img src="../../static/img/right.png" alt=""></router-link>
        </div>
        <div class="line idtify" @click="showsf" @click.stop>
          <img src="../../static/img/lvshi.png" alt="">
          <!--<select name="" id="">-->
            <!--<option v-for ="(item, index) in zhiye" :key="index" value="">{{item}}</option>-->
          <!--</select>-->
          <input type="text" v-model="nameid" placeholder="请选择律师身份" disabled>
          <tip :warn="msgshenfen"></tip>
          <img style="padding: 10px;width: 13px;float: right;cursor: pointer;position: absolute;right: 0;top: 40%;transform: translateY(-50%);" width="13" class="downicon" src="../../static/img/down.png" alt="" >
          <ul v-if="shenfen">
            <li v-for ="(item, index) in zhiye" :key="index" value="" @click="selectval(item)" @click.stop>{{item}}</li>
          </ul>
        </div>
        <div class="line"><img src="../../static/img/name.png" alt=""> <input type="text" v-model="name" placeholder="输入姓名"> <tip :warn="msgname"></tip></div>
        <div class="line"><img src="../../static/img/lvsuo.png" alt=""> <input type="text" v-model="lvsuo" placeholder="输入律所"> <tip :warn="msglvsuo"></tip></div>
        <div class="line"><img src="../../static/img/zhenghao.png" alt=""> <input type="text" v-model="zhenghao" :placeholder="types === 1?'输入执业证号':'输入实习证号'"> <tip :warn="msgzhenghao"></tip></div>
        <button type="button" class="loginbtn" @click="next">下一步</button>
      </form>
      <form action="" v-if="step==2" class="animated" ref="step2">
        <div class="title overflow">
          <h1>注册</h1>
          <router-link to="login">去登录 <img src="../../static/img/right.png" alt=""></router-link>
        </div>
        <div class="line"><img src="../../static/img/phone.png" alt=""> <input type="tel" v-model="tel" placeholder="输入手机号码"> <tip :warn="msgtel"></tip></div>
        <div class="line yzm"><img src="../../static/img/yzm.png" alt=""> <input type="tel" v-model="yzm" placeholder="输入验证码"> <tip :warn="msgyzm"></tip> <button class="count" type="button" v-show="show" @click="getCode">获取验证码</button>
          <button type="button" v-show="!show" class="count">{{count}} s</button></div>
        <div class="line"><img src="../../static/img/mima.png" alt=""> <input type="password" v-model="password" placeholder="设置至少6位密码"> <tip :warn="msgmm"></tip></div>
        <button type="button" class="loginbtn" @click="register" v-text="registertext">注册</button>
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
    tip,
    Message
  },
  watch: {
    nameid (e) {
      if (e) {
        this.msgshenfen = Object
      } else {
        this.msgshenfen = {msg: '请选择律师身份', status: 'error'}
      }
    },
    password (e) {
      if (e) {
        this.msgmm = Object
      } else {
        this.msgmm = {msg: '请输入密码', status: 'error'}
      }
    },
    yzm (e) {
      if (e) {
        this.msgyzm = Object
      } else {
        this.msgyzm = {msg: '验证错误', status: 'error'}
      }
    },
    tel (e) {
      if (e) {
        this.msgtel = Object
      } else {
        this.msgtel = {msg: '请输入手机号', status: 'error'}
      }
    },
    name (e) {
      if (e) {
        this.msgname = Object
      } else {
        this.msgname = {msg: '请输入姓名', status: 'error'}
      }
    },
    lvsuo (e) {
      if (e) {
        this.msglvsuo = Object
      } else {
        this.msglvsuo = {msg: '请输入律所', status: 'error'}
      }
    },
    zhenghao (e) {
      if (e) {
        this.msgzhenghao = Object
      } else {
        this.msgzhenghao = {msg: '证号仅为数字', status: 'error'}
      }
    }
  },
  data () {
    return {
      citys: Object,
      tel: '',
      password: '',
      msg: '',
      msgtel: '',
      msgname: '',
      msglvsuo: '',
      msgzhenghao: '',
      msgyzm: '',
      msgmm: '',
      msgshenfen: '',
      flag: 1,
      step: 1,
      zhiye: ['执业律师', '实习律师', '合伙人律师', '主任律师'],
      name: '',
      lvsuo: '',
      zhenghao: '',
      show: true,
      timer: null,
      count: '',
      yzm: '',
      registertext: '注册',
      nameid: '',
      shenfen: false,
      types: 1
    }
  },
  methods: {
    get (letter) {
      this.letter = letter
    },
    next () {
      if (this.nameid.length === 0) {
        this.msgshenfen = {msg: '请选择律师身份', status: 'error'}
        return
      }
      if (this.name.length === 0) {
        this.msgname = {msg: '请输入姓名', status: 'error'}
        return
      }
      if (this.lvsuo.length === 0) {
        this.msglvsuo = {msg: '请输入律所', status: 'error'}
        return
      }
      if (isNaN(this.zhenghao)) {
        this.msgzhenghao = {msg: '证号仅为数字', status: 'error'}
        this.zhenghao = ''
        return 0
      } else if (this.zhenghao.length === 0) {
        this.msgzhenghao = {msg: '请输入执业/实习证号', status: 'error'}
        this.zhenghao = ''
        return 0
      }
      this.step = 2
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
    register () {
      if (this.tel.length === 0) {
        this.msgtel = {msg: '请输入手机号', status: 'error'}
        return 0
      } else if (!/^1[34578]\d{9}$/.test(this.tel)) {
        this.msgtel = {msg: '手机号有误', status: 'error'}
        return 0
      }
      if (this.yzm.length === 0) {
        this.msgyzm = {msg: '验证错误', status: 'error'}
        return 0
      }

      if (this.password.length === 0) {
        this.msgmm = {msg: '请输入密码', status: 'error'}
        return 0
      } else if (this.password.length < 6) {
        this.msgmm = {msg: '密码应6位以上', status: 'error'}
        return 0
      }
      this.registertext = '注册中...'
      const options = {
        message: '注册中...'
      }
      Message.success(options)
    },
    getCode () {
      if (!/^1[34578]\d{9}$/.test(this.tel)) {
        this.msgtel = {msg: '手机号有误', status: 'error'}
        return 0
      }
      const TIME_COUNT = 60
      let options = {
        message: '短信已发送,请查收！'
      }
      if (!this.timer) {
        this.count = TIME_COUNT
        this.show = false
        Message.success(options)
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
          } else {
            this.show = true
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    },
    selectval (e) {
      this.nameid = e
      this.shenfen = false
      if (e === '实习律师') {
        this.types = 0
      } else {
        this.types = 1
      }
    },
    showsf () {
      this.shenfen = true
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
  .yzm input{
    width: 130px !important;
  }
  button.count{
    background: transparent;
    padding: 8px 20px;
    color: #3AA3FF;
    font-size: 16px;
    border: 1px solid #3AA3FF;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
    float: right;
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
    position: relative;
  }
  .login form .line.idtify ul{
    position: absolute;
    background-color: #fff;
    right: 0;
    z-index: 9;
  }
  .login form .line.idtify ul li{
    padding: 10px;
  }
  .login form .line.idtify ul li:hover{
    background-color: #3AA3FF;
    color: #fff;
    cursor: pointer;
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
    margin-bottom: 0;
  }
  .line select{
    background: transparent;
    display: inline-block;
    vertical-align: middle;
    border: none;
    color: #fff;
    width: 338px;
  }
  .line select option{
    color: #000;
  }
</style>
