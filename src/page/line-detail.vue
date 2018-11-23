<template lang="html">
  <div class="line-detail" :class="{shopLineDetail: storeId}">
        <!-- 店铺模式头部 -->
        <shop-banner  v-on:openMask="disableScroll" v-on:hideMask="hasScroll" v-if="storeId"></shop-banner>
        <section class="head">
        <div class="hd">
            <img class="img" v-if="line.img && line.img.length > 0" :src="line.img.split(/,|，/)[0]" :onerror="noImage" >
            <img class="img" v-else src="../assets/images/noImg.png">
            <div class="btns">
            <a class="return" href="javascript:void(0);" @click="back()">返回</a>
            <!-- <a class="share" href="javascript:void(0);">分享</a> -->
            </div>
            <div class="infos">
            <p class="one">
                <span>{{line.fromCityName}}出发</span> |
                <span>{{line.days}}天{{line.night}}晚</span>
            </p>
            <p class="two">
                <span class="img-num"><i class="icon icon-imgs"></i>1/1</span><br>
                <span class="id-num">编号：{{line.id}}</span>
            </p>
            </div>
        </div>
        <div class="bd">
            <h3 class="title">{{line.title}}</h3>
            <div class="content">
            <div class="price" v-if="getSiteInfo.weixinOtherPriceTypeShow !== 2">
                <span class="orange">&yen; {{line.minAdultPrice}}</span>/人起
            </div>
            <div class="tags" v-if="line.tags && line.tags.length > 0">
                <span class="tag" v-for="(tag, index) in line.tags" v-if="index < 4">{{tag}}</span>
            </div>
            </div>
            <!-- <div class="coupons" @click="maskShow = !maskShow"
            v-if="(line.mzPolicys && line.mzPolicys.length>0) || (line.mjPolicys && line.mjPolicys.length>0) || (line.ctPolicys && line.ctPolicys.length>0) || (line.zxPolicys && line.zxPolicys.length>0)">
            <span class="name">可选优惠</span>
            <div class="tags">
                <span class="tag" v-if="line.mzPolicys && line.mzPolicys.length > 0">满免</span>
                <span class="tag" v-if="line.mjPolicys && line.mjPolicys.length > 0">满减</span>
                <span class="tag" v-if="line.ctPolicys && line.ctPolicys.length > 0">早鸟优惠</span>
                <span class="tag" v-if="line.zxPolicys && line.zxPolicys.length > 0">在线优惠</span>
            </div>
            <span class="num">{{line.couponsNum}}个</span>
            <div class="iconfont icon-right"></div>
            </div> -->
        </div>
        <div class="ft">
            <div class="toggle-city" @click="toggleCity = !toggleCity">
            <div class="city">
                <i class="icon icon-locat"></i>
                <span class="name"><em>{{cityName}}</em>出发</span>
                <span class="tips">(以下价格均为起价)</span>
            </div>
            <span class="toggle-tips">选择出发城市</span>
            <div class="iconfont icon-right"></div>
            </div>
            <div class="plans" v-if="plans.length > 0">
            <div class="clearfix">
                <div class="plan" v-for="plan in plans" @click="choiceDate(plan.planDate, plan.id, line.id)">
                <div class="col">
                    <p class="info">
                    <span class="date">{{plan.planDate}}</span>
                    <em>|</em>
                    <span class="end">{{plan.endNumShow}}</span>
                    </p>
                    <p class="price" v-if="getSiteInfo.weixinOtherPriceTypeShow !== 2">&yen;{{plan.minPrice}}</p>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>

        <section id="viewInfos" class="body">
        <ul id="viewInfoTabs" class="tabs line-hd clearfix">
            <li class="item" :class="{'active': isActive==1}" @click="goAnchor('#lineTs', 1)">行程特色</li>
            <li class="item" :class="{'active': isActive==2}" v-if="line.isDayEdit == 1" @click="goAnchor('#linePlans', 2)">{{line.days}}日行程</li>
            <li class="item" :class="{'active': isActive==2}" v-else @click="goAnchor('#linePlans', 2)">行程安排</li>
            <li class="item" :class="{'active': isActive==3}" @click="goAnchor('#billsCont', 3)">费用说明</li>
            <li class="item" :class="{'active': isActive==4}" @click="goAnchor('#lineInfos', 4)">行程信息</li>
            <!-- <li class="item tab-jump" v-for="(item, index) in tabItems.items" @click="jump(index)">{{ item.title }}</li> -->
        </ul>
        <div class="line-bd">
            <section id="lineTs" class="module">
            <h6 class="module-title">行程特色</h6>
            <div class="module-box line-ts" v-if="line.theLineTs && line.theLineTs.lineItemDetail" v-html="line.theLineTs.lineItemDetail">
            </div>
            <div v-else>暂无行程特色相关信息</div>
            </section>
            <section id="linePlans" class="module module-route" v-if="line.isDayEdit == 1">
            <div v-if="line.baseLineTravelApis && line.baseLineTravelApis.length > 0">
                <div class="day-line" v-for="day in line.baseLineTravelApis">
                <div class="day-num">
                    <p><span>第{{day.theDay}}天</span></p>
                </div>
                <p class="day-title">{{day.theTitle}}</p>
                <div class="trip-box">
                    <div class="box">
                    <p class="name name-1">用餐：<span v-if="!day.theCan">暂无</span></p>
                    <div class="info" v-if="day.theCan">{{day.theCan}}</div>
                    </div>
                    <div class="box">
                    <p class="name name-2">住宿：<span v-if="!day.theHotel">暂无</span></p>
                    <div class="info">{{day.theHotel}}</div>
                    </div>
                    <div class="box">
                    <p class="name name-3">交通：<span v-if="!day.theTraffic">暂无</span></p>
                    <div class="info">{{day.theTraffic}}</div>
                    </div>
                    <div class="box">
                    <p class="name name-4">行程内容：<span v-if="!day.theDesc">暂无</span></p>
                    <div class="info" v-html="day.theDesc"></div>
                    <div class="imgs" v-if="day.img && day.img.length > 0">
                        <div class="img" v-for="(img, index) in day.img" v-if="index < 4">
                        <img :src="img">
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div class="no-data" v-else>
                暂无行程天数信息
            </div>
            </section>
            <section id="linePlans" class="module" v-else>
            <h6 class="module-title">行程安排</h6>
            <div class="module-box" v-if="line.theLinePlan && line.theLinePlan.lineItemDetail" v-html="line.theLinePlan.lineItemDetail">
            </div>
            <div v-else>暂无行程安排相关信息</div>
            </section>
            <section id="billsCont" class="module">
            <h6 class="module-title">费用说明</h6>
            <div class="module-box" v-if="line.theBills && line.theBills.lineItemDetail" v-html="line.theBills.lineItemDetail">
            </div>
            <div v-else>
                暂无费用说明相关信息
            </div>
            </section>
            <section id="lineInfos" class="module line-plan" style="padding-bottom: 20px;">
            <div class="part">
                <h6 class="module-title">参考航班</h6>
                <div class="module-box" v-if="line.theFlight && line.theFlight.lineItemDetail" v-html="line.theFlight.lineItemDetail">
                </div>
                <div v-else>
                暂无参考航班相关信息
                </div>
            </div>
            <div class="part">
                <h6 class="module-title">参考酒店</h6>
                <div class="module-box" v-if="line.theHotel && line.theHotel.lineItemDetail" v-html="line.theHotel.lineItemDetail">
                </div>
                <div v-else>
                暂无参考酒店相关信息
                </div>
            </div>
            <div class="part">
                <h6 class="module-title">注意事项</h6>
                <div class="module-box" v-if="line.theNotice && line.theNotice.lineItemDetail" v-html="line.theNotice.lineItemDetail">
                </div>
                <div v-else>
                暂无注意事项相关信息
                </div>
            </div>
            </section>
        </div>
        </section>

        <!-- 微站模式 -->
        <section v-if="!storeId" class="foot" :class="{mdDevice: parseInt(this.mdDevice, 10) > 0}" :style="{left: `${this.mdDevice}px`}">
        <!-- <mt-button type="primary">立即预定</mt-button> -->
            <a :href="`tel:${getSiteInfo.tel}`" class="phone">
                <i class="iconfont icon-phone07"></i>
                <p class="text">联系电话</p>
            </a>
            <button @click="enterInput(line.id)" class="button">立即预定</button>
        </section>

        <!-- 店铺模式，已开通在线注册及支付 -->
        <section v-if="storeId && shop.allowRegist" class="foot" :class="{mdDevice: parseInt(this.mdDevice, 10) > 0}" :style="{left: `${this.mdDevice}px`}">
        <!-- <mt-button type="primary">立即预定</mt-button> -->
            <a :href="`tel:${getSiteInfo.tel}`" class="phone">
                <i class="iconfont icon-phone07"></i>
                <p class="text">联系电话</p>
            </a>
            <button @click="enterInput(line.id)" class="button">立即预定</button>
        </section>
        
        <!-- 店铺模式，未开通在线注册及支付 -->
        <shop-phone v-if="storeId && !shop.allowRegist"></shop-phone>

        <!--优惠政策弹层-->
        <mt-popup v-model="maskShow" position="right" popup-transition="popup-fade">
        <div class="coupons-pop">
            <p class="title">优惠政策</p>
            <div class="coupons-list">
            <div class="box" v-if="line.mzPolicys && line.mzPolicys.length > 0">
                <p class="name">满免</p>
                <ul>
                <li v-for="mm in line.mzPolicys">{{mm}}</li>
                </ul>
            </div>
            <div class="box" v-if="line.mjPolicys && line.mjPolicys.length > 0">
                <p class="name">满减</p>
                <ul>
                <li v-for="mj in line.mjPolicys">{{mj}}</li>
                </ul>
            </div>
            <div class="box" v-if="line.ctPolicys && line.ctPolicys.length > 0">
                <p class="name">早鸟优惠</p>
                <ul>
                <li v-for="ct in line.ctPolicys">{{ct}}</li>
                </ul>
            </div>
            <div class="box" v-if="line.zxPolicys && line.zxPolicys.length > 0">
                <p class="name">在线优惠</p>
                <ul>
                <li v-for="zx in line.zxPolicys">{{zx}}</li>
                </ul>
            </div>
            </div>
            <div class="closed">
                <i class="iconfont icon-close" @click="maskShow = !maskShow"></i>
            </div>
        </div>
        </mt-popup>
        <!--优惠政策弹层-->

        <!--切换出发城市-->
        <mt-popup v-model="toggleCity" position="right">
        <div class="city-wrapper">
            <mt-header fixed title="选择出发城市">
            <a @click="toggleCity = !toggleCity" slot="left">
                <mt-button icon="back"></mt-button>
            </a>
            </mt-header>
            <div class="scroll-box city-list" v-if="line.citys && line.citys.length > 0">
            <div class="choice-list section">
                <div class="item" v-for="(city, index) in line.citys" @click="selectCity(city.cityName)">
                <span class="title">{{city.cityName}}</span>
                <span class="reload">
                    <span class="num">¥{{city.price}}</span>
                    <i class="iconfont icon-dui" v-show="!city.selected"></i>
                    <i class="iconfont icon-yes" v-show="city.selected"></i>
                    <!-- <i class="iconfont" :class="resultIndex === index ? 'icon-choice' : 'icon-choice1'"></i> -->
                </span>
                </div>
            </div>
            </div>
            <div class="button-wrapper">
            <mt-button type="primary" @click="confirmCity">确认</mt-button>
            </div>
        </div>
        </mt-popup>
        <!--切换出发城市-->

        <div v-show="scrollTop" class="side-bar">
        <div class="back-top">
            <i @click="scrollTo" class="iconfont icon-huidaodingbu"></i>
        </div>
        </div>

  </div>
</template>

<script>
import {Toast, Popup} from 'mint-ui'
import { mapGetters } from 'vuex'
import shopBanner from '../components/shop-banner.vue'
import shopPhone from '../components/shop-phone.vue'
export default {
  data() {
    return {
      isActive: false,
      line: '',  //线路信息
      maskShow: false,
      toggleCity: false,
      plans: '',  //团期信息
      scrollTop: false,
      cityName: '',
      selectCityName: '',
      storeId: false,
      noImage: 'this.src="' + require("../assets/images/avatar.png") + '"'
    }
  },
  created() {
    this.lineId = this.$route.params.id
    this.getLineInfo(this.lineId)
    /* 如果地址包含storeId/v/index.html#/home?storeId=123456，说明当前在店铺模式下 */
    let storeId = this.$route.query.storeId
    if(storeId) {
        this.storeId = storeId
    }
  },
  mounted() {
    this.$store.commit('selectCityName', '')
    this.$store.commit('setRequery', true)
    this.$store.commit('setPlanId', '')
    /* 第一次进入页面，页面滚动到顶部 */
    window.scrollTo(0, 0)
    window.addEventListener('scroll', this.tabsMenu);
  },
  destroyed() {
      window.removeEventListener('scroll', this.tabsMenu)
  },
  computed: {
      ...mapGetters([
          'selectedMon',
          'fromCity',
          'getSiteInfo',
          'selectedCityName',
          'mdDevice',
          'shop'
      ]),
      resultIndex() {
        return this.cityIndex;
      }
  },
  components: {
      shopBanner,
      shopPhone
  },
  methods: {
      /* 监听shopBanner子组件事件 */
        disableScroll() {
            document.getElementById('app').style.overflow = 'hidden'
        },
        hasScroll() {
            document.getElementById('app').style.overflow = 'scroll'
        },
      nofind(event) {
          var img = event.srcElement; 
        img.src="../assets/images/noImg.png"; 
        img.onerror=null; //控制不要一直跳动 
      },
    // 直接点击立即预定
    enterInput(id) {
        this.$store.commit('resetLineDetail')
        this.$store.commit('setMonths', new Date())
        this.$router.push(`/line-input/${id}`)
    },
    // 选中团期跳转到日历指定位置
    choiceDate (val, id, lineId) {
        let mon = 0;
        let year = new Date().getFullYear();
        let m1 = parseInt(val.slice(0, 2), 10)
        let m2 = parseInt(new Date().getMonth(), 10)
        let dis = m1 - m2
        if(dis === -10) {
            mon = 2
            year+=1
        } else if(dis === -9) {
            mon = 3
            year+=1
        } else if(dis === -8) {
            mon = 4
            year+=1
        } else {
            mon = m1 - m2
        }
        let date = `${year}-${val.slice(0, 2)}-${val.slice(3,5)}`
        this.$store.commit('selectCityName', this.cityName);
        this.$store.commit('setMonths', date)
        this.$store.commit('setDetailMon', mon)
        this.$store.commit('setDetailDate', date)
        this.$store.commit('setPlanId', id)
        window.localStorage.setItem('redirectDate', val)
        window.localStorage.setItem('selectCityName', this.cityName)
        window.localStorage.setItem('setPlanId', id)
        if(this.storeId) {
            this.$router.push({path: `/shop-line-input/${lineId}`, query: {storeId: this.storeId} })
        } else {
            this.$router.push({path: `/line-input/${lineId}`})
        }
    },
    async getLineInfo(id) {
      //请求页面信息接口
      await this.$http.get(`/ms/line/${id}`).then(res => {
        if(res.data.status === 200) {
          let defaultCity = res.data.data.fromCityName;
          //将行程信息的数据做处理，方便取值
          let itemsInfo = res.data.data.baseLineItemApis;
          let theFlight = {};
          let theHotel = {};
          let theBills = {};
          let theLineTs = {};
          let theNotice = {};
          let theLinePlan = {};

          if(itemsInfo && itemsInfo.length > 0) {
            for(let i =0, len = itemsInfo.length; i < len; i++) {
              if(itemsInfo[i].lineItemName == '参考航班') {
                theFlight = itemsInfo[i];
              } else if(itemsInfo[i].lineItemName == '参考酒店') {
                theHotel = itemsInfo[i];
              } else if(itemsInfo[i].lineItemName == '费用说明') {
                theBills = itemsInfo[i];
              } else if(itemsInfo[i].lineItemName == '行程特色') {
                theLineTs = itemsInfo[i];
              } else if(itemsInfo[i].lineItemName == '注意事项') {
                theNotice = itemsInfo[i];
              } else {
                theLinePlan = itemsInfo[i];
              }
            }
          }
            this.$store.commit('setlineInputTitle', res.data.data.title)
          res.data.data.theFlight = theFlight;
          res.data.data.theHotel = theHotel;
          res.data.data.theBills = theBills;
          res.data.data.theLineTs = theLineTs;
          res.data.data.theNotice = theNotice;
          res.data.data.theLinePlan = theLinePlan;

          //优惠政策的数量
          let couponsNum = 0;
          if(res.data.data.mzPolicys && res.data.data.mzPolicys.length > 0) {
            couponsNum += res.data.data.mzPolicys.length;
          }
          if(res.data.data.mjPolicys && res.data.data.mjPolicys.length > 0) {
            couponsNum += res.data.data.mjPolicys.length;
          }
          if(res.data.data.ctPolicys && res.data.data.ctPolicys.length > 0) {
            couponsNum += res.data.data.ctPolicys.length;
          }
          if(res.data.data.zxPolicys && res.data.data.zxPolicys.length > 0) {
            couponsNum += res.data.data.zxPolicys.length;
          }

          res.data.data.couponsNum = couponsNum;

          //线路行程图片数据处理
          let baseLineTravelApis = res.data.data.baseLineTravelApis;
          if(baseLineTravelApis && baseLineTravelApis.length > 0) {
            for(let i = 0, len = baseLineTravelApis.length; i < len; i++) {
              if(baseLineTravelApis[i].img && baseLineTravelApis[i].img.length > 0) {
                baseLineTravelApis[i].img = baseLineTravelApis[i].img.split(',');
              }
            }
          }

          let citys = res.data.data.citys;
          if(citys && citys.length > 0) {
            citys.forEach(item => {
              item.selected = false;
            });
            citys[0].selected = true;
            this.selectCityName = citys[0].cityName;
          }

          res.data.data.baseLineTravelApis = baseLineTravelApis;

          this.line = res.data.data;
          
          this.cityName = res.data.data.fromCityName;

          //根据线路id和出发城市名称请求团期信息
          this.$http.get(`/ms/line/city/${id}/${defaultCity}`).then(r => {
            if(r.data.status === 200) {
              this.plans = r.data.data;
            } else if(r.data.status !== 100) {
              Toast({ message: r.data.msg, position: 'top', duration: 2000 });
            }
          }).catch(error => {
            Toast({ message: '团期数据请求失败，请稍后再试！', position: 'bottom', duration: 2000 });
          });


        } else if(res.data.status !== 100) {
          Toast({ message: res.data.msg, position: 'top', duration: 2000 });
        }
      }).catch(err => {
        Toast({ message: '网络错误，请重新进入！', position: 'bottom', duration: 2000 });
      });
    },
    //tab栏自动高亮
    tabsMenu() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      let lineTs = document.querySelector('#lineTs').offsetTop - 500;
      let linePlans = document.querySelector('#linePlans').offsetTop - 100;
      let billsCont = document.querySelector('#billsCont').offsetTop - 100;
      let lineInfos = document.querySelector('#lineInfos').offsetTop - 50;

      if(scrollTop >= lineTs && scrollTop < linePlans) {
        this.isActive = 1;
      } else if(scrollTop >= linePlans && scrollTop < billsCont) {
        this.isActive = 2;
      } else if(scrollTop >= billsCont && scrollTop < lineInfos) {
        this.isActive = 3;
      } else if(scrollTop >= lineInfos) {
        this.isActive = 4;
      } else {
        this.isActive = 0;
      }
    },
    //tab点击跳转锚点
    goAnchor(selector, index) {
      if(index == 1) {
        this.isActive = 1;
      } else if(index == 2) {
        this.isActive = 2;
      } else if(index == 3) {
        this.isActive = 3;
      } else {
        this.isActive = 4;
      }

      let anchor = this.$el.querySelector(selector);
      document.body.scrollTop = anchor.offsetTop - 40; // chrome
      document.documentElement.scrollTop = anchor.offsetTop - 40; // firefox
    },
    //选中出发城市
    selectCity(val) {
      this.selectCityName = val;
      this.line.citys.forEach(item => {
        if(item.cityName == this.selectCityName) {
          item.selected = true;
        } else {
          item.selected = false;
        }
      });
      this.$store.commit('selectCityName', val);
    },

    //确定选中的城市
    confirmCity() {
      this.toggleCity = !this.toggleCity;
      let cityName = this.selectCityName;
      this.cityName = cityName;
      this.$http.get(`/ms/line/city/${this.lineId}/${cityName}`).then(r => {
        if(r.data.status === 200) {
          this.plans = r.data.data;
        } else if(r.data.status !== 100) {
          Toast({ message: r.data.msg, position: 'top', duration: 2000 });
        }
      }).catch(error => {
        Toast({ message: '团期数据请求失败，请稍后再试！', position: 'bottom', duration: 2000 });
      });
    },

    linkPlans(date, cityId) {
      let planDate = new Date().getFullYear() + '-' + date.replace(/\//g, '-');

      this.$store.commit('setPlanDate', planDate);
      this.$router.push({ name: 'lineInput2', params: {id: this.line.id, d: planDate, city: cityId} });
    },



    //回到顶部
    scrollTo() {},
    //返回
    back() {
      if(window.history.length <= 1) {
        this.$router.push('/');
      } else {
        this.$router.go(-1);
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import './line-detail.scss'
</style>
<style>
  .module img { max-width: 100%;}
</style>
