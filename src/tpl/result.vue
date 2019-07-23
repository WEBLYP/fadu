<template>
  <div class="result">
    <headup :shuju="citys" :see="true" :ival="val" @send="getson"></headup>
    <div class="all">
      <div class="songet">
        搜索条件： <span class="list" v-for="(item, index) in result" :key="index">{{item}} <b @click="close(index)">×</b></span>
        <div class="form"><input v-model="searchzhong" v-if="more" type="text" @focus="changecolor" @blur="cancelcolor" :class="colorflag == true ? 'active':''"><img  @click="add" src="../../static/img/resbtn.png" alt=""></div> <span @click="closesearch" class="close" v-if="more">关闭搜索</span>
      </div>
      <div class="alldata">
        <div class="left">
           <div class="case" style="padding-bottom: 0">
             <div class="top"><img src="../../static/img/gjc.png" alt=""> <span>关键词</span></div>
             <h2  v-for="(item, index) in limitgjc" :key="index" :id="item.id" to="result?id=item.id"> {{index + 1}}、 {{item.title}} ({{item.num}})</h2>
             <p class="more" @click="moregjc" v-if="limitgjc.length<=6">MORE<img src="../../static/img/right2.png" alt=""></p>
             <p class="more" @click="lessgjc" v-else><img src="../../static/img/sh.png" alt=""></p>
           </div>

          <div class="case">
            <div class="top"><img src="../../static/img/cpjg.png" alt=""> <span>裁判结果</span></div>
            <h2  v-for="(item, index) in cpjg" :key="index" :id="item.id" to="result?id=item.id">{{item.title}} ({{item.num}})</h2>
          </div>

          <div class="case anyou">
            <div class="top"><img src="../../static/img/ay.png" alt=""> <span>案由</span></div>
            <ul>
              <li v-for="(item, index) in anyou" :class="flag===index?'active':''" :key="index" @click="zk(index)">
                <p><i class="icon"></i> {{item.title}} ({{item.num}})</p>
                <h2 class="son" v-for="(item, index) in item.son" :key="index" @click.stop>{{item.title}} ({{item.num}})</h2>
              </li>
            </ul>
          </div>

          <div class="case cpfy">
            <div class="top"><img src="../../static/img/cpfy.png" alt=""> <span>裁判法院</span> <div class="search" :class="colorflag1 == true ? 'active':''"><input
              type="search" placeholder="输入法院名称" v-model="fyname" @focus="changecolorfy" @blur="cancelcolorfy"> <button></button>
              <ul v-if="nodata">
                <li v-for="(item, index) in fylist" :key="index" @click="writefy(item.name, item.id)">{{item.name}}</li>
              </ul></div>
            </div>
            <h2  v-for="(item, index) in fymoni" :key="index" :id="item.id" to="'result?id=' + item.id">{{item.title}} ({{item.num}})</h2>
          </div>

          <div class="case cpsj">
            <div class="top"><img src="../../static/img/cpsj.png" alt=""> <span>裁判时间</span></div>
            <h2  v-for="(item, index) in cpsjlimit" :key="index" :id="item.id" :to="'result?id=' + item.id">{{item.year}} ({{item.num}})</h2>
            <p class="more" @click="morecpsj" v-if="cpsjlimit.length==4">MORE>></p>
          </div>

          <div class="case">
            <div class="top"><img src="../../static/img/wslx.png" alt=""> <span>文书类型</span></div>
            <h2  v-for="(item, index) in wslx" :key="index" :id="item.id" :to="'result?id=' + item.id">{{item.title}} ({{item.num}})</h2>
          </div>

        </div>
        <div class="right" v-if="anlist.length > 0">
          <p class="top">共搜到{{anlist.length}}篇案例</p>
          <ul class="anlist">
              <li v-for="(item, index) in anlist" :key="index">
                <router-link  :to="'detail?id='+ item.id">
                <div class="top">
                  <h1 class="title">{{item.title}}</h1>
                  <p class="status wqzc"  v-if="item.rating >= 8">
                    完全支持
                  </p>
                  <p class="status bfzc"  v-if="item.rating > 5 && item.rating < 8">
                    部分支持
                  </p>
                  <p class="status bzc"  v-if="item.rating <= 5">
                    不支持
                  </p>
                </div>
                <p class="titletext">争议观点：</p>
                <p class="dispute">{{item.deraction}}</p>
                </router-link>
                <div class="bottom">
                  <p>法院：{{item.fy}}</p>
                  <p>案号：{{item.anhao}}</p>
                  <p>裁判时间：{{item.time}}</p>
                  <div class="cz">
                    <img src="../../static/img/wsc.png" alt="" v-if="item.collect===0" @click="collect(item.id, index)">
                    <img src="../../static/img/sc.png" alt="" v-else @click="uncollect(item.id, index)">
                    <img src="../../static/img/download.png" alt="">
                  </div>
                </div>
              </li>
          </ul>
          <button class="seemore" @click="seemore">查看更多</button>
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
import { Loading, Message } from 'element-ui'
export default {
  components: {
    headup,
    floatext
  },
  data () {
    return {
      citys: Object,
      fys: Object,
      val: '',
      fyname: '',
      fylist: [],
      result: [],
      more: false,
      searchzhong: null,
      begindata: [],
      casegjc: [{title: '交通事故肇事者逃逸', id: 1, num: 2367}, {title: '交通事故致人死亡肇事逃逸', id: 2, num: 1566}, {title: '交通事故肇事者逃逸', id: 1, num: 2367}, {title: '交通事故鉴定', id: 3, num: 967}, {title: '交通事故肇事者逃逸', id: 1, num: 2367}, {title: '匪警请拨110', id: 2, num: 1566}, {title: '火警请拨119', id: 3, num: 967}, {title: '急救中心请拨120', id: 2, num: 1566}],
      pagegjc: 0,
      limitgjc: [],
      cpjg: [{title: '完全支持', num: 25663}, {title: '部分支持', num: 36963}, {title: '不支持', num: 2633}, {title: '其他', num: 123}],
      wslx: [{title: '判决书', num: 25663}, {title: '判定书', num: 36963}, {title: '调解书', num: 2633}, {title: '决定书', num: 123}],
      fymoni: [{title: '最高人民法院', num: 25663}, {title: '高级人民法院', num: 36963}, {title: '中级人民法院', num: 2633}, {title: '基层人民法院', num: 123}],
      cpsj: [{year: '2019', num: 25663}, {year: '2018', num: 36963}, {year: '2017', num: 2633}, {year: '2016', num: 123}, {year: '2015', num: 123}, {year: '2014', num: 123}, {year: '2013', num: 123}, {year: '2012', num: 25663}, {year: '2011', num: 36963}, {year: '2010', num: 2633}, {year: '2009', num: 123}, {year: '2008', num: 123}, {year: '2007', num: 123}, {year: '2006', num: 25663}, {year: '2005', num: 36963}, {year: '2004', num: 2633}, {year: '2003', num: 123}, {year: '2002', num: 123}, {year: '2001', num: 123}, {year: '2000', num: 25663}],
      cpsjlimit: [],
      anyou: [{title: '民事', num: 2562, son: [{title: '交通事故致人死亡肇事者逃逸', num: 562}, {title: '交通事故鉴定', num: 2000}]}, {title: '刑事', num: 200, son: [{title: '交通事故致人死亡肇事者逃逸1', num: 562}, {title: '交通事故鉴定1', num: 2000}]}, {title: '行政', num: 300, son: [{title: '交通事故致人死亡肇事者逃逸2', num: 562}, {title: '交通事故鉴定2', num: 2000}]}],
      flag: 0,
      page: 1,
      start: 0,
      detail: [],
      anlist: [],
      words: '',
      colorflag: false,
      colorflag1: false
    }
  },
  watch: {
    citys () {
    },
    fyname () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        const res = []
        for (let i in this.citys) {
          this.citys[i].forEach((fys) => {
            if (fys.spell.indexOf(this.fyname) > -1 || fys.name.indexOf(this.fyname) > -1) {
              res.push(fys)
            }
            if (this.fyname === '') {
              res.length = 0
            }
          })
        }
        this.fylist = res
      }, 100)
    }
  },
  methods: {
    writefy (name, id) {
      this.fyname = name
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
    getfy () {
      const that = this
      axios.get('https://www.easy-mock.com/mock/5cd8d456f38e844213d39e7c/example/city').then(function (res) {
        res = res.data
        if (res.ret && res.data) {
          const data = res.data
          that.citys = data.cities
        }
      })
    },
    getinput () {
      const that = this
      if (that.$route.query.id) {
        that.val = that.$route.query.id
        that.result = [that.$route.query.id]
      }
    },
    getson (e) {
      if (e) {
        this.result = [e]
      }
    },
    close (i) {
      this.result.splice(i, 1)
    },
    closesearch () {
      this.more = false
      this.searchzhong = null
    },
    add () {
      this.more = true
      if (this.searchzhong === null) { return }
      this.result.push(this.searchzhong)
    },
    moregjc () {
      const copy = [...this.casegjc]
      let mgjc = copy.splice(6, this.casegjc.length)
      if (mgjc.length === 0) {
        return
      }
      for (let i = 0; i < mgjc.length; i++) {
        this.limitgjc.push(mgjc[i])
      }
    },
    lessgjc () {
      this.limitgjc = this.limitgjc.splice(0, 6)
    },
    zk (i) {
      this.flag = this.flag === i ? !i : i
    },
    douban () {
      const options = {
        text: '数据加载中'
      }
      const that = this
      Loading.service(options)
      this.axios.get('https://www.easy-mock.com/mock/5cd8d456f38e844213d39e7c/example/list').then((res) => {
        that.anlist = res.data.data
        Loading.service().close()
      }).catch((res) => {
        Loading.service().close()
      })
    },
    collect (id, index) {
      let options = {
        message: '',
        type: ''
      }
      if (!window.sessionStorage.username) {
        options = {
          message: '登录后才可以收藏案例哦！',
          type: 'warning'
        }
        Message(options)
        return
      } else {
        options = {
          message: id + '收藏成功！',
          type: 'success'
        }
        Message(options)
      }
      this.anlist[index].collect = 1
    },
    uncollect (id, index) {
      let options = {
        message: '',
        type: ''
      }
      if (!window.sessionStorage.username) {
        options = {
          message: '登录后才可以取消收藏案例哦！',
          type: 'warning'
        }
        Message(options)
        return
      } else {
        options = {
          message: id + '取消收藏案例成功！',
          type: 'success'
        }
        Message(options)
      }
      this.anlist[index].collect = 0
    },
    morecpsj () {
      this.cpsjlimit = [...this.cpsj]
    },
    seemore () {
      let options = {
        message: '没有更多了',
        type: 'warning'
      }
      if (this.anlist.length > 20) {
        return Message(options)
      }
      this.anlist = this.anlist.concat(this.anlist)
    },
    changecolor () {
      this.colorflag = true
    },
    cancelcolor () {
      this.colorflag = false
    },
    changecolorfy () {
      this.colorflag1 = true
    },
    cancelcolorfy () {
      this.colorflag1 = false
    }
  },
  mounted () {
    this.getcity()
    this.getfy()
    this.getson()
    this.limitgjc = this.casegjc
    this.limitgjc = this.limitgjc.slice(0, 6)
    this.cpsjlimit = this.cpsj
    this.cpsjlimit = this.cpsjlimit.slice(0, 4)
    this.douban()
  },
  created () {
    this.getinput()
  },
  computed: {
    nodata () {
      return this.fylist.length
    }
  }
}
</script>

<style>
  .result .alldata .right button.seemore{
    background: #F4F4F4;
    border: 1px solid #666666;
    font-family: PingFang-SC-Medium;
    font-size: 16px;
    color: #666666;
    letter-spacing: 0;
    display: block;
    margin: 20px auto;
    width: 204px;
    height: 50px;
    box-sizing: border-box;
    text-align: center;
    cursor: pointer;
  }
  .result .alldata .right button.seemore:hover{
    color: #3aa3ff;
    border-color: #3aa3ff;
  }
  .result .alldata .right .bottom .cz img{
    width: 22px;
    margin-left: 20px;
    cursor: pointer;
  }
  .result .alldata .right .bottom .cz img:hover{
    background-color: #eee;
  }
  .result .alldata .right .bottom .cz{
    float: right;
    margin-right: 50px;
  }
  .result .alldata .right .bottom{
    margin-top: 40px;
  }
  .result .alldata .right .bottom p{
    display: inline-block;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-family: PingFang-SC-Medium;
    font-size: 12px;
    color: #333333;
  }
  .result .alldata .titletext{
    padding: 30px 0 10px 0;
    font-size: 14px;
    color: #333;
  }
  .result .alldata .dispute{
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-family: PingFang-SC-Medium;
    font-size: 14px;
    color: #787878;
    letter-spacing: 0;
    line-height: 24px;
    padding-right: 50px;
    text-align: justify;
  }
  .result .alldata .right .anlist .top .status.bzc{
    background-color: #888888;
  }
  .result .alldata .right .anlist .top .status.wqzc{
    background-color: #FF6057;
  }
  .result .alldata .right .anlist .top .status.bfzc{
    background-color: #30BC9D;
  }
  .result .alldata .right .anlist .top .status:before{
    display:block;
    width:0;
    height:0;
    border-width:21px 0 21px 16px;
    border-style:solid;
    border-color:transparent transparent transparent #fff;/*透明 透明 透明 黄*/
    position:absolute;
    top:0px;
    left:0px;
    content: '';
    color: #fff;
  }
  .result .alldata .right .anlist .top .status{
    color: #fff;
    font-size: 16px;
    text-indent: 1em;
  }
  .result .alldata .right .anlist li{
    padding: 34px 0 40px 50px;
    box-sizing: border-box;
    width: 100%;
    overflow: hidden;
    border: 1px solid #ececec;
  }
  .result .alldata .right .anlist li a{
    cursor: pointer;
  }
  .result .alldata .right .anlist li:hover{
    background: #FFFFFF;
    border: 1px solid #ECECEC;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
  }
  .result .alldata .right .anlist .top{
    overflow: hidden;
  }
  .result .alldata .right .anlist .top h1{
    display: -webkit-box;
    text-align: left;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    vertical-align: middle;
    font-family: PingFang-SC-Bold;
    font-size: 22px;
    color: #333333;
    letter-spacing: 0;
    line-height: 36px;
    width: 629px;
    float: left;
  }
  .result .alldata .right .anlist .top .status{
    width: 96px;
    height: 42px;
    position: relative;
    display: inline-block;
    vertical-align: middle;
    float: right;
    line-height: 42px;
    text-align: center;
  }
  .result .alldata .right{
    float: right;
    width: 824px;
    box-sizing: border-box;
    margin-right: 10px;
  }
  .result .alldata .right p.top{
    font-family: PingFang-SC-Regular;
    font-size: 20px;
    color: #333333;
    margin-bottom: 16px;
  }

  .result .alldata .left .case.cpsj p.more{
    text-align: left;
    padding: 0;
    border: 0;
    text-indent: 1.5em;
  }
  .case.cpfy .search ul{
    position: absolute;
    top: 36px;
    left: 0;
    text-align: left;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    text-indent: 0;
    height: 100px;
    overflow-y: auto;
    background-color: #fff;
    box-shadow: 0 4px 10px 0 rgba(0,0,0,0.52);
  }
  .case.cpfy .search ul li{
    padding: 10px;
    font-size: 14px;
    cursor: pointer;
    background-color: #fff;
  }
  .case.cpfy .search ul li:hover{
    background-color: #eee;
    cursor: pointer;
  }
  .case.cpfy .search{
    width: 174px;
    height: 36px;
    display: inline-block;
    vertical-align: middle;
    background: #F8F8F8;
    border: 1px solid #CCCCCC;
    box-sizing: border-box;
    margin-left: 10px;
    position: relative;
  }
  .case.cpfy .search.active{
    border-color: #3aa3ff;
  }
  .case.cpfy input{
    float: left;
    width: 137px;
    height: 34px;
    line-height: 34px;
    border: none;
    outline: none;
    box-sizing: border-box;
    font-family: PingFang-SC-Medium;
    font-size: 14px;
    color: #999999;
    padding: 8px;
    background-color: transparent;
    -webkit-appearance: none;
    display: inline-block;
  }
  .case.cpfy button{
    float: right;
    width: 34px;
    height: 100%;
    border: none;
    outline: none;
    box-sizing: border-box;
    background: url("../../static/img/search.png")no-repeat;
    background-position: center;
    background-color: transparent;
  }
  .result{
    background-color: #FDFDFD;
  }
  .result .all{
    width: 1200px;
    margin: 0 auto;
  }
  .result .songet{
    font-family: PingFang-SC-Bold;
    font-size: 20px;
    color: #333333;
    margin: 42px 0 32px 0;
    font-weight: 600;
  }
  .result .songet span.list{
    font-family: PingFang-SC-Medium;
    font-size: 18px;
    color: #333333;
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
    margin-right: 20px;
    font-weight: normal;
  }
  .result .songet .form{
    width: 345px;
    overflow: hidden;
    display: inline-block;
    vertical-align: middle;
  }
  .result .songet span.close{
    font-family: PingFang-SC-Medium;
    font-size: 14px;
    color: #3AA3FF;
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
  }
  .result .songet .form input{
    float: left;
    width: 232px;
    height: 32px;
    line-height: 32px;
    box-sizing: border-box;
    padding: 5px;
    border: 1px solid #eee;
    font-size: 14px;
    -webkit-appearance: none;
    display: inline-block;
  }
  .result .songet .form input.active{
    border-color: #3aa3ff;
  }
  .result .songet img{
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
    margin-left: 8px;
  }
  .result .songet b{
    cursor: pointer;
  }
  .result .songet b:hover{
    color: #3AA3FF;
  }
  .result .alldata{
    overflow: hidden;
  }
  .result .alldata .left{
    float: left;
    width: 336px;
  }
  .result .alldata .left .case h2{
    font-family: PingFang-SC-Medium;
    font-size: 15px;
    color: #666666;
    display: block;
    padding: 13px 0;
    font-weight: normal;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .result .alldata .left .case h2:hover{
    background-color: #F4F4F4;;
  }
  .result .alldata .left .case{
    background: #FFFFFF;
    box-shadow: 0 4px 10px 0 rgba(0,0,0,0.05);
    padding: 30px 0;
    margin-bottom: 30px;
  }
  .result .alldata .left .case.anyou h2{
    text-indent: 4em;
  }
  .result .alldata .left .case.anyou p{
    cursor: pointer;
  }
  .result .alldata .left .case p.more{
    font-family: PingFang-SC-Medium;
    font-size: 14px;
    color: #3AA3FF;
    text-align: center;
    cursor: pointer;
    margin: 12px;
    border-top: 1px solid #eee;
    padding: 13px 0;
    text-indent: 0;
  }
  .result .alldata .left .case p.more img{
    display: inline-block;
    vertical-align: middle;
    margin-bottom: 3px;
  }
  .result .alldata .left .case .top span{
    display: inline-block;
    vertical-align: middle;
    font-family: PingFang-SC-Bold;
    font-size: 20px;
    color: #333333;
    text-indent: 0;
    font-weight: 600;
  }
  .result .alldata .left .case .top{
    margin-bottom: 20px;
  }
  .result .alldata .left .case{
    background-color: #fff;
    text-indent: 2em;
    padding-bottom: 0;
    padding-bottom: 30px;
  }
  .result .alldata .left .case .top img{
    width: 24px;
    display: inline-block;
    vertical-align: middle;
  }
  .result .alldata .left .case.anyou .icon{
    width: 16px;
    height: 16px;
    display: inline-block;
    vertical-align: middle;
    background: url("../../static/img/add.png")no-repeat;
  }
  .result .alldata .left .case.anyou li.active .icon{
    background: url("../../static/img/reduce.png")no-repeat;
  }
  .result .alldata .left .case.anyou li h2{
    display: none;
  }
  .result .alldata .left .case.anyou li{
    padding: 13px 0;
    font-size: 16px;
  }
  .result .alldata .left .case.anyou li.active h2{
    display: block;
  }

  .all .form.fankui {
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
  .all .form.fankui b{
    width: 16px;
    height: 16px;
    font-size: 25px;
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
  }
  .all .form.fankui h1{
    font-family: PingFang-SC-Bold;
    font-size: 18px;
    color: #333333;
    letter-spacing: 0;
    text-align: justify;
    margin-bottom: 20px;
  }
  .all .form.fankui p{
    font-family: PingFang-SC-Medium;
    font-size: 14px;
    color: #999999;
    letter-spacing: 0;
    text-align: justify;
    line-height: 24px;
  }
  .all .form.fankui textarea{
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
  .all .form.fankui .line span{
    display: inline-block;
    vertical-align: middle;
    font-size: 14px;
  }
  .all .form.fankui .line label{
    margin: 30px 0;
  }
  .all .form.fankui .line input{
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
  .all .form.fankui button{
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
</style>
