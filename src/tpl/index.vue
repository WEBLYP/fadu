<template>
  <div class="home">
    <headup :see="false"></headup>
    <div class="main">
      <img class="icon" src="../../static/img/alicon.png" alt="">
      <h1 class="number">已收录{{number}}篇案例</h1>
      <div class="form">
        <input type="search" placeholder="" v-model="val" @focus="changecolor" @blur="cancelcolor" :class="colorflag == true ? 'active':''">
        <button @click="fd(val)">法度一下</button>
        <ul class="result" v-if="nodata">
          <li v-for="(item, index) in list"  :key="index"><a href="javascript:;"  @click="writeinput(item.name)">{{item.name}}</a></li>
        </ul>
      </div>
      <div class="hyh">
        <div class="top">
          <img src="../../static/img/gjicon.png" alt="">
          <p>搜索关键词</p>
          <a href="javascript:;" @click="change">换一批</a>
        </div>
        <ul class="gjc">
          <li v-for="(item, index) in hotson" :key="index"> <router-link :to="'result?id='+item.name">{{item.name}}</router-link> </li>
        </ul>
      </div>
    </div>
    <footer>
      <div class="content">
        <div class="left">
          <img src="../../static/img/about.png" alt="">
          <p class="jieshao">广州法度信息科技有限公司是一家互联网+法律领域的创业公司，多问作为品牌，旗下有两款产品：多问律师端和多问律师。</p>
          <p class="friend">友情链接：<a v-for="(item, index) in friends" :key="index" :href="item.url">{{item.name}}</a></p>
          <p class="friend">广州法度信息科技有限公司© 2016 <a href="http://www.beian.miit.gov.cn">粤ICP备11062850号-28</a></p>
        </div>
        <ul class="right">
          <li>
            <img src="../../static/img/shurencode.jpg" alt="">
            <h1>多问律师</h1>
            <p>又专业、又高效的法律咨询平台</p>
          </li>
          <li>
            <img src="../../static/img/duowencode.jpg" alt="">
            <h1>多问律师端</h1>
            <p>律师一站式办公平台</p>
          </li>
        </ul>
      </div>
    </footer>
  </div>
</template>

<script>
import axios from 'axios'
import headup from '@/components/headup.vue'
export default{
  components: {
    headup
  },
  data () {
    return {
      number: 58902657,
      val: '',
      timer: null,
      citys: {},
      list: [],
      hotson: [],
      hot: [[{name: '机动车交通事故责任纠纷', id: 1}, {name: '合同法', id: 2}], [{name: '责任纠纷', id: 1}, {name: '责任纠纷合同法', id: 2}], [{name: '活动时间黄寺大街', id: 1}, {name: '十多宝宝个开始', id: 2}, {name: '十多宝宝个开始', id: 2}],
        [{name: '荻花圣殿', id: 1}, {name: '啊啊撒', id: 2}, {name: '十多宝宝个开始', id: 2}], [{name: '喂喂喂', id: 1}, {name: '十多打发点宝宝个开始', id: 2}, {name: '的方法', id: 2}]],
      friends: [{url: 'http://www.court.gov.cn', name: '最高人民法院'}, {url: 'http://wenshu.court.gov.cn', name: '中国裁判文书网'}, {url: 'https://www.chinacourt.org/index.shtml', name: '中国法院网'}],
      colorflag: false
    }
  },
  methods: {
    fd (e) {
      this.list = []
      this.$router.push({name: 'result', query: {id: this.val}})
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
    change () {
      const that = this
      let i = parseInt(Math.random() * (that.hot.length))
      that.hotson = that.hot[i]
    },
    user () {
      if (window.sessionStorage.username) {
      }
    },
    changecolor () {
      this.colorflag = true
    },
    cancelcolor () {
      this.colorflag = false
    },
    writeinput (e) {
      this.val = e
      this.list = []
    }
  },
  mounted () {
    this.getcity()
    this.hotson = this.hot[0]
    this.user()
  },
  watch: {
    val () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        const res = []
        for (let i in this.citys) {
          this.citys[i].forEach((vals) => {
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
  }
}
</script>

<style>
  footer{
    padding: 52px 0;
    background: url("../../static/img/footerbg.png")no-repeat;
  }
  footer .content{
    overflow: hidden;
    padding: 0;
  }
  footer .left{
    float: left;
    width: 412px;
    color: #fff;
    font-weight: 300;
  }
  footer .left p{
    font-size: 14px;
    color: #fff;
    line-height: 24px;
  }
  footer .right{
    overflow: hidden;
  }
  footer .right li{
    float: right;
    text-align: right;
    color: #fff;
    font-size: 12px;
    margin-left: 110px;
    font-weight: 300;
  }
  footer .right li h1{
    font-size: 14px;
    margin: 10px 0 4px 0;
    font-weight: 600;
  }
  footer .right li img{
    width: 120px;
  }
  footer p.jieshao{
    margin: 16px 0 20px 0;
  }
  footer p.friend,footer p.friend a{
    font-size: 12px;
    color: #999999;
    margin-right: 10px;
  }
  .home{
    width: 100%;
    min-width: 1200px;
    background: url("../../static/img/home.png")no-repeat;
    background-size: cover;
    height: 100%;
    min-height: 787px;
    left: 0;
    top: 0;
    right: 0;
  }
  .content{
    width: 1200px;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 20px 0;
  }
  .home .main{
    width: 915px;
    margin: 80px auto;
    padding: 40px 0;
    padding-bottom: 80px;
    box-sizing: border-box;
    background-color: #fff;
  }
  .home .main p.icon{
    text-align: center;
  }
  .home .main .icon{
    width: 30px;
    margin: 0 auto;
    display: block;
  }
  .home .main .number{
    font-size: 24px;
    text-align: center;
    margin: 10px 0;
    color: #333;
    font-weight: bold;
  }
  .home .main .form{
    text-align: center;
    width: 730px;
    height: 60px;
    margin: 40px auto;
    position: relative;
  }
  .home .main .form input{
    width: 600px;
    box-sizing: border-box;
    height: 100%;
    line-height: 60px;
    float: left;
    padding: 10px;
    font-size: 18px;
    border: 1px solid #999999;
    border-right: none;
    -webkit-appearance: none;
    display: inline-block;
  }
  .home .main .form input.active{
    border-color: #3aa3ff;
  }
  .home .main .form button{
    width: 130px;
    box-sizing: border-box;
    height: 60px;
    float: right;
    background: #3AA3FF;
    outline: none;
    color: #fff;
    border: 1px solid #3AA3FF;
    font-size: 20px;
    cursor: pointer;
  }
  .home .main .form .result{
    width: 600px;
    height: 300px;
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 60px;
    background-color: #fff;
    overflow-y: auto;
    background: #FFFFFF;
    box-shadow: 0 4px 10px 0 rgba(0,0,0,0.52);
  }
  .home .main .form .result a{
    width: 100%;
    color: #333;
    font-size: 16px;
    padding: 10px;
    display: block;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
  }
  .home .main .form .result a:hover{
    background: #EEEEEE;
  }
  .home .main .hyh{
    padding: 0 90px;
  }
  .home .main .hyh .top img{
    width: 20px;
    display: inline-block;
    vertical-align: middle;
  }
  .home .main .hyh .top p{
    font-size: 18px;
    color: #333;
    display: inline-block;
    vertical-align: middle;
    margin: 0 10px 0 0;
  }
  .home .main .hyh .top a{
    font-size: 14px;
    color: #3AA3FF;
    display: inline-block;
    vertical-align: middle;
  }
  .home .main .hyh .gjc li{
    display: inline-block;
  }
  .home .main .hyh .gjc{
    margin-top: 20px;
  }
  .home .main .hyh .gjc a{
    padding: 8px 12px;
    font-size: 16px;
    display: inline-block;
    background: rgba(157,175,192,0.18);
    margin: 5px;
    color: #999999;
    font-weight: 300;
  }
  .home .main .hyh .gjc a:hover{
    background: rgba(157,175,192,0.40);
  }
</style>
