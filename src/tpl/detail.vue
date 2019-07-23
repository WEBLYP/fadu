<template>
  <div class="detail" v-if="detail.ygls">
    <headup :shuju="citys" :see="true"></headup>
    <div class="all">
      <div class="left">
         <div class="case">
           <div class="top"><img src="../../static/img/lsxx.png" alt=""> <span>律师信息</span></div>
           <div class="dlls">
             <p class="lsname">原告代理律师</p>
             <img :src="detail.ygls.headsrc" alt="">
             <div class="text">
               <h1>{{detail.ygls.name}}</h1>
               <p>{{detail.ygls.work}}</p>
             </div>
           </div>
           <div class="dlls">
             <p class="lsname">被告代理律师</p>
             <img :src="detail.bgls.headsrc" alt="">
             <div class="text">
               <h1>{{detail.bgls.name}}</h1>
               <p>{{detail.bgls.work}}</p>
             </div>
           </div>
         </div>
      </div>
      <div class="right">
        <h1 class="title">{{detail.jbxx.title}}</h1>
        <div class="line">
          <p>基本信息</p>
        </div>
        <div class="case">
          <p>审理法院：{{detail.jbxx.slfy}}</p>
          <p>案号： {{detail.jbxx.anhao}}</p>
          <p>裁判时间： {{detail.jbxx.cpsj}}</p>
          <p>案件类型： {{detail.jbxx.ajlx}}</p>
          <p>文书性质： {{detail.jbxx.wsxz}}</p>
          <p>审理程序： {{detail.jbxx.slcx}}</p>
        </div>
        <div class="line">
          <p>当事人信息</p>
        </div>
        <div class="case">
          <p>上诉人（原审被告）：{{detail.dsrxx.ssr}}</p>
          <p>委托人：{{detail.dsrxx.wtr}}</p>
          <p>被上诉人： {{detail.dsrxx.bssr}}</p>
          <p>法定代表人： {{detail.dsrxx.fddbr}}</p>
          <p>委托诉讼人： {{detail.dsrxx.wtssr}}</p>
        </div>
        <div class="line">
          <p>审理经过</p>
        </div>
        <div class="case">
          <p>{{detail.sljg}}</p>
        </div>
        <div class="line">
          <p>一判被告辩称</p>
        </div>
        <div class="case">
          <p>{{detail.ypbgbc}}</p>
        </div>
        <div class="line">
          <p>被上诉人辩称</p>
        </div>
        <div class="case">
          <p>{{detail.bssrbc}}</p>
        </div>
        <div class="line">
          <p>本院查明</p>
        </div>
        <div class="case">
          <p>{{detail.bycm}}</p>
        </div>
        <div class="line">
          <p>裁判结果</p>
        </div>
        <div class="case">
          <p>{{detail.cpjg}}</p>
        </div>
        <div class="line">
          <p>法官信息</p>
        </div>
        <div class="case">
          <p>{{detail.fgxx.spz}}</p>
          <p>{{detail.fgxx.dali}}</p>
          <p>{{detail.fgxx.ccrq}}</p>
          <p>{{detail.fgxx.sjy}}</p>
        </div>
      </div>
      <!--浮窗-->
      <floatext></floatext>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import headup from '@/components/headup.vue'
import floatext from '@/components/floatext.vue'
import { Message } from 'element-ui'
export default {
  components: {
    headup,
    floatext
  },
  data () {
    return {
      citys: Object,
      detail: Object,
      show4: false,
      username: '',
      tel: '',
      words: ''
    }
  },
  methods: {
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
    getdetail () {
      const that = this
      axios.get('https://easy-mock.com/mock/5cd8d456f38e844213d39e7c/example/detail').then((res) => {
        that.detail = res.data
      }).catch((res) => {
      })
    },
    showform () {
      this.show4 = true
    },
    closeform () {
      this.show4 = false
    },
    subtn () {
      let options = {
        message: '您的反馈已发送！',
        type: 'success'
      }
      if (this.words.length !== 0 && this.username.length !== 0 && this.tel.length !== 0) {
        if (!/^1[34578]\d{9}$/.test(this.tel)) {
          options = {
            message: '手机号码不正确！',
            type: 'error'
          }
          Message(options)
          return
        }
        Message(options)
        this.show4 = false
        this.words = ''
        this.username = ''
        this.tel = ''
      } else {
        options = {
          message: '请补全信息哦',
          type: 'waring'
        }
        Message(options)
      }
    },
    gotop () {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    }
  },
  mounted () {
    this.getcity()
    this.getdetail()
  }
}
</script>

<style scoped="true">
  .all .form {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 30px 40px;
    width: 520px;
    box-sizing: border-box;
    box-shadow: 0px 7px 16px 6px rgba(0,0,0,0.30);
  }
  .all .form b{
    width: 16px;
    height: 16px;
    font-size: 25px;
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
  }
  .all .form h1{
    font-family: PingFang-SC-Bold;
    font-size: 18px;
    color: #333333;
    letter-spacing: 0;
    text-align: justify;
    margin-bottom: 20px;
  }
  .all .form p{
    font-family: PingFang-SC-Medium;
    font-size: 14px;
    color: #999999;
    letter-spacing: 0;
    text-align: justify;
    line-height: 24px;
  }
  .all .form textarea{
    background: #F8F8F8;
    border: 1px solid #999999;
    font-family: PingFang-SC-Medium;
    font-size: 12px;
    color: #999999;
    letter-spacing: 0;
    text-align: justify;
    line-height: 20px;
    width: 100%;
    height: 160px;
    resize: none;
    padding: 10px;
    box-sizing: border-box;
  }
  .all .form .line span{
    display: inline-block;
    vertical-align: middle;
    font-size: 14px;
  }
  .all .form .line label{
    margin: 30px 0;
  }

  .all .form .line input{
    width: 140px;
    font-size: 14px;
    display: inline-block;
    vertical-align: middle;
    box-sizing: border-box;
    border: none;
    outline: none;
    border-bottom: 1px solid #eee;
  }
  .all .form .line label{
    width: 50%;
    float: left;
    box-sizing: border-box;
    padding: 0 10px;
    font-family: PingFang-SC-Medium;
    font-size: 14px;
    color: #1A1A1A;
    letter-spacing: 0;
    text-align: justify;
    display: inline-block;
    vertical-align: middle;
    padding: 0;
  }
  .all .form button{
    background: #3AA3FF;
    border-radius: 4px;
    width: 100%;
    height: 44px;
    border: none;
    outline: none;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
  }

  .detail .right .line p{
    padding: 7px 14px;
    color: #fff;
    font-family: PingFang-SC-Bold;
    font-size: 18px;
    color: #FFFFFF;
    position: relative;
    background-color: #7CBEFB;
    display: inline-block;
  }
  .detail .right .line{
    position: relative;
  }
  .detail .right .line p:after{
    display: block;
    width: 0;
    height: 0;
    border-width: 16px 0 16px 16px;
    border-style: solid;
    border-color: transparent transparent transparent #7CBEFB;
    position: absolute;
    top: 0px;
    /* left: 0px; */
    content: '';
    color: #fff;
    right: -15px;
    /* background-color: #ff0000; */
  }
  .detail .right .line p:before{
    content: '';
    position: absolute;
    height: 10px;
    width: 10px;
    right: -25px;
    background-color: #fff;
    top: 50%;
    transform: translateY(-50%);
  }
  .detail .right .line{
    margin: 50px 0 20px 0;
  }
  .detail .right .case p{
    font-family: PingFang-SC-Medium;
    font-size: 14px;
    color: #666666;
    letter-spacing: 0;
    text-align: justify;
    line-height: 34px;
  }
  .detail .right .line:before{
    position: absolute;
    content: '';
    border: 1px dashed #7CBEFB;
    width: 100%;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  .detail {
    background-color: #FDFDFD;
    width: 100%;
  }
  .detail .all{
    width: 1200px;
    margin: 0 auto;
    margin-top: 40px;
    overflow: hidden;
  }
  .detail .left {
    float: left;
    width: 336px;
  }
  .detail .right {
    float: right;
    width: 824px;
    background: #FFFFFF;
    border: 1px solid #ECECEC;
    box-shadow: 0 4px 10px 0 rgba(0,0,0,0.05);
    box-sizing: border-box;
    padding: 50px 60px;
    margin-right: 10px;
  }
  .detail .right h1.title{
    font-family: PingFang-SC-Bold;
    font-size: 23px;
    color: #333333;
    letter-spacing: 0;
    text-align: justify;
    line-height: 40px;
  }
  .detail .left .case {
    background: #FFFFFF;
    -webkit-box-shadow: 0 4px 10px 0 rgba(0,0,0,0.05);
    box-shadow: 0 4px 10px 0 rgba(0,0,0,0.05);
  }
  .detail .left .case .top span {
    display: inline-block;
    vertical-align: middle;
    font-family: PingFang-SC-Bold;
    font-size: 20px;
    color: #333333;
    text-indent: 0;
  }
  .detail .left .case .top{
    border-bottom: 1px solid #eee;
    padding: 20px 0;
  }
  .detail .left .case .top img {
    width: 24px;
    display: inline-block;
    vertical-align: middle;
  }
  .detail .left .case {
    background-color: #fff;
    text-indent: 2em;
  }
  .detail .left .case .dlls img{
    width: 68px;
    height: 68px;
    display: inline-block;
    vertical-align: middle;
    border-radius: 50%;
    overflow: hidden;
  }
  .detail .left .case .dlls p{
    text-indent: 0%;
  }
  .detail .left .case .dlls .lsname{
    padding-bottom: 16px;
  }
  .detail .left .case .dlls{
    padding: 30px 20px;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .detail .left .case .dlls .text{
    display: inline-block;
    vertical-align: middle;
    text-indent: 0;
    line-height: 30px;
    padding-left: 5px;
  }
  .detail .left .case .dlls .text p{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-family: PingFang-SC-Medium;
    font-size: 16px;
    color: #999999;
  }
  .detail .left .case .dlls .text h1{
    font-family: PingFang-SC-Bold;
    font-size: 20px;
    color: #333333;
  }
  html,body{
    font-family: PingFang-SC-Medium,'微软雅黑';
  }

</style>
