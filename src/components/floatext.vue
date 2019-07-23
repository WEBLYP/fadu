<template>
  <div class="float">
    <ul class="fixtext">
      <li @click="showform">
        <div class="text">
          意见反馈
        </div>
        <img src="../../static/img/fk1.png" alt="">
      </li>
      <li>
        <img src="../../static/img/code1.png" alt="">
        <div class="code">
          <img src="../../static/img/duowencode.jpg" alt="">
          <p>扫码下载多问-律师端APP</p>
          <img src="../../static/img/shurencode.jpg" alt="">
          <p>扫码下载多问律师APP</p>
        </div>
      </li>
      <li @click="gotop">
        <div class="text">
          返回顶部
        </div>
        <img src="../../static/img/top.png" alt="">
      </li>
    </ul>
    <div class="form fankui" v-if="show4">
      <b class="closeicon" @click="closeform">×</b>
      <h1>多问不是完美的，我们渴望您的建议！</h1>
      <p>请在下方留言区写下您宝贵的建议或意见，如需联系客服帮助，请留下您的姓名以及手机号码，客服会在第一时间与您联系。</p>
      <textarea name="" id="" cols="30" rows="10" placeholder="请留言..." v-model="words"></textarea>
      <div class="line">
        <label for="name"><span>姓名：</span> <input type="text" v-model="username"></label>
        <label for="tel"><span>手机号码：</span> <input type="tel" v-model="tel"></label>
      </div>
      <button @click="subtn">提交反馈</button>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui'
export default {
  components: {},
  data () {
    return {
      show4: false,
      username: '',
      tel: '',
      words: ''
    }
  },
  methods: {
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
          type: 'warning'
        }
        Message(options)
      }
    },
    showform () {
      this.show4 = true
    },
    closeform () {
      this.show4 = false
    },
    gotop () {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    }
  }
}
</script>

<style scoped>
  .fixtext .code{
    display: none;
    position: absolute;
    right: 100%;
    width: 120px;
    box-sizing: border-box;
    padding: 14px 20px;
    padding-bottom: 16px;
    top: 0;
    background: #F0F0F0;
  }
  .fixtext .code img{
    width: 84px;
  }
  .fixtext .code p{
    font-family: PingFang-SC-Medium;
    font-size: 12px;
    color: #666666;
    letter-spacing: 0;
    text-align: justify;
    line-height: 20px;
    margin-bottom: 21px;
  }
  .fixtext .code p:last-child{
    margin-bottom: 0;
  }
  .fixtext{
    position: fixed;
    right: 0;
    top: 60%;
    width: 38px;
    box-sizing: border-box;
    background: #FFFFFF;
    border: 1px solid #EEEEEE;
    transform: translateY(-50%);
  }
  .fixtext li{
    text-align: center;
    padding: 5px;
    cursor: pointer;
    border-bottom: 1px solid #eee;
  }
  .fixtext li:nth-child(2):hover .code{
    display: block;
  }
  .fixtext li img{
    width: 19px;
  }
  .fixtext li .text{
    font-size: 11px;
    width: 100%;
    color: #3aa3ff;
    display: none;
    letter-spacing: 1px;
    line-height: 13px;
  }
  .fixtext li:hover .text{
    display: block;
  }
  .fixtext li:hover>img{
    display: none;
  }
  .fixtext li:nth-child(2):hover  img{
    display: inline-block;
  }
</style>
