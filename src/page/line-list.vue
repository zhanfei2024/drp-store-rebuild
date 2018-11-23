<template>
    <div class="line-list-page" :class="{'shop-line-list': storeId}">
        <!-- 店铺模式头部 -->
        <shop-banner v-on:openMask="disableScroll" v-on:hideMask="hasScroll" v-if="storeId"></shop-banner>
        <div class="search-wrapper">
            <!-- 头部搜索 -->
            <div class="search" :class="{mdDevice: parseInt(this.mdDevice, 10) > 0}" :style="{left: `${this.mdDevice}px`}">
                <div @click="back()" class="left"><i class="iconfont icon-left"></i></div>
                <div class="search-box">
                    <div class="search-content">
                        <div class="city-choice">
                            <div class="city-choice-wrapper">
                                <span class="city-name">全国</span>
                                <i class="iconfont icon-xiajiantou"></i>
                            </div>
                        </div>
                        <form class="search-form" action="" v-on:submit.prevent="onSubmit">
                            <input id="myinput" type="search" class="search-input" autocomplete="off" placeholder="请输入关键字" v-model="lineFilter.keyword">
                        </form>
                      </div>
                    <i @click="globalReset()" v-show="lineFilter.keyword" class="cancle iconfont icon-clear"></i>
                    <i v-show="!lineFilter.keyword" class="cancle iconfont icon-search"></i>
                </div>
                <a @click="toLineFilter()" class="right filter"><i class="iconfont icon-filter"></i></a>
            </div>
            <!-- 头部滚动 -->
            <div class="filter-scroll swiper-container">
                <!-- Additional required wrapper -->
                <div class="swiper-wrapper">
                    <!-- Slides -->
                    <div class="swiper-slide item" v-for="(item, index) in lineCity" :key="item.lineTypeAppId || item.lineTypeID" @click="selectedTwoNav(index)" :class="{selected: item.selected}">
                        <span class="text" :id="item.lineTypeAppId || item.lineTypeID">{{item.cnName | sliceA(0, 4)}}</span>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- 产品列表 -->
        
        <div class="lines" ref="wrapper" id="wrapper">
            <ul >
                <div v-for="item in list" :key="item.id" @click="toDetail(item.id)" class="line">
                    <div class="avator">
                        <img class="pic" :src="item.img1.split(/,|，/)[0]" :onerror="noImage"  alt="">
                        <span v-if="item.tag" class="tag-pic" :class="{recommend: item.tag === '推荐', hot: item.tag === '热门',hotPoint: item.tag === '爆品',special: item.tag === '特价',well: item.tag === '畅销', first: item.tag === '首推'}">{{item.tag.slice(0, 4)}}</span>
                        <div v-if="item.fromCityName" class="bottom-banner">
                            {{item.fromCityName.slice(0, 4)}}出发
                        </div>
                    </div>
                    <div class="content">
                        <p class="title">{{item.title}}</p>
                        <div class="line-content">
                            <div class="left">
                                <!-- <div v-if="item.policyList" class="hot-tag">
                                    <span v-for="(item, index) in item.policyList.slice(0, 4)" :key="index" class="tag-list">
                                        <span class="tag-item" :style="{backgroundColor: '#fe3c2e'}" v-show="item === 1">满免</span>
                                        <span class="tag-item" :style="{backgroundColor: '#39abfe'}" v-show="item === 2">满减</span>
                                        <span class="tag-item" :style="{backgroundColor: '#ff861b'}" v-show="item === 3">早鸟</span>
                                        <span class="tag-item" :style="{backgroundColor: '#05d5ae'}" v-show="item === 4">在线付款</span>
                                    </span>
                                </div> -->

                                <div class="plan">
                                    <span class="plan-label">团期:</span>
                                    <span v-if="item.planDatesString" class="plan-date">
                                        <span v-for="(item,index) in item.planDatesString.slice(0, 4)" :key="index" class="date-item">{{item}}<span v-show="index<3">,</span></span>
                                        <span v-if="item.planDatesString.slice(0, 4).length === 4">...</span>
                                    </span>
                                    <span v-if="!item.planDatesString" class="plan-date">
                                        <span class="date-item">暂无</span>
                                    </span>
                                </div>
                            </div>
                
                            <div class="right">
                                <!-- <p class="days">
                                    <span class="dates">{{item.days}}天</span>
                                    <span class="naight">{{item.night}}晚</span>
                                </p> -->
                                <div class="price-content">
                                    <div v-show="typeof(item.minSadultPrice) === 'number'" class="price-text">
                                        <span class="label">市:</span><span class="monney-tag">¥</span>
                                        <span class="monney-text">{{item.minSadultPrice}}</span>
                                        <span class="price-start">起</span>
                                    </div>
                                    <div v-show="typeof(item.minAdultPrice) === 'number'" class="price-text">
                                        <span class="label">同:</span><span class="monney-tag">¥</span>
                                        <span class="monney-text">{{item.minAdultPrice}}</span>
                                        <span class="price-start">起</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ul>
            <p v-show="loading" class="page-infinite-loading">
                <mt-spinner type="fading-circle"></mt-spinner>
                加载中...
            </p>
            <p v-show="loadingEnd" class="no-data">
                <mt-spinner v-show="!loadingEnd" type="fading-circle"></mt-spinner>
                没有更多数据了...
            </p>
        </div>
        <!-- 回到顶部 -->
        <to-top v-show="scrollTop" v-on:toTop="backToTop()"></to-top>
    </div>
</template>

<script type="text/ecmascript-6">
import moment from "moment"
import {Toast} from 'mint-ui'
import { mapGetters } from "vuex"
import shopBanner from '../components/shop-banner.vue'
import toTop from '../components/toTop.vue'
import Swiper from "swiper"
import "swiper/dist/css/swiper.min.css"
export default {
  name: "lineList",
  data() {
    return {
      blured: true, // 失去焦点
      noImage: 'this.src="' + require("../assets/images/avatar.png") + '"',
      sw: true,
      loadingEnd: false,
      list: [],
      hasLoading: false,
      loading: false,
      nodata: false,
      linesLoading: false,
      allLoaded: false,
      wrapperHeight: 0,
      scrollTop: false,
      localtion: '',
      storeId: ''
    };
  },
  methods: {
        backToTop () {
            (function smoothscroll() {
                var currentScroll =
                document.documentElement.scrollTop || document.body.scrollTop
                if (currentScroll > 0) {
                    window.requestAnimationFrame(smoothscroll);
                    window.scrollTo(0, currentScroll - currentScroll / 5)
                }
            })()
            this.scrollTop = false
        },
        /* 监听shopBanner子组件事件 */
        disableScroll() {
            document.getElementById('app').style.overflow = 'hidden'
        },
        hasScroll() {
            document.getElementById('app').style.overflow = 'scroll'
        },
    toLineFilter () {
        if(this.storeId) {
            this.$router.push({path: '/line-filter', query: {storeId: this.storeId}})
        } else {
            this.$router.push({path: '/line-filter'})
        }
    },
    toDetail(id) {
        if(this.storeId) {
            this.$router.push({path: `/line-detail/${id}`, query: {storeId: this.storeId}})
        } else {
            this.$router.push({path: `/line-detail/${id}`})
        }
    },
    onSubmit() {
      return false;
    },
    back() {
      if(this.storeId) {
        this.$router.push({path: '/home', query: {storeId: this.storeId}})
      } else if(!this.storeId) {
        this.$router.push({path: '/home'})
      }
    },
    inputSearch() {
        this.list = []
        this.lineFilter.currentPage = 1
        this.getlines(this.lineFilter);
    },
    // 请求产品列表
    async getlines(filter) {
        this.loadingEnd = false;
      this.loading = true;
      if (filter.day === "all") {
        filter.day = "";
      }
      filter.keyword = filter.keyword.trim()
      filter.planDatePrs = moment(filter.planDatePrs).format("YYYY-MM-DD");
      filter.planDatePre = moment(filter.planDatePre).format("YYYY-MM-DD");
      await this.$http.post("/ms/line/lineList", filter).then(res => {
        if (res.data.status === 200) {
          // 如果数据条数大于0
          let result = res.data.data.result;
          if (result && result.length > 0) {
            result.forEach(item => {
              this.list.push(item);
            });
            this.sw = false;
          } else if (!res.data.data.result) {
            // 如果数据条数为空
            this.sw = false;
            if (this.list.length > 0) {
              return;
            } else {
              this.list = [];
            }
          }
          this.loading = false;
          // 判断当前页是否是最后一页
          if (res.data.data.currentPage < res.data.data.totalPage) {
            this.loadingEnd = false;
            this.lineFilter.currentPage += 1;
          } else if (res.data.data.currentPage >= res.data.data.totalPage) {
            this.loadingEnd = true;
          }
        } else if(res.data.status !== 100) {
          Toast({ message: res.data.msg, position: "bottom", duration: 5000 });
        }
      });
    },
    globalReset() {
      // 清除筛选参数
      this.$store.commit("rest");
      // 清除关键字
      this.$store.commit("restKey");
      // 清除二级导航
      this.$store.commit("selectedCity", this.$route.params.id)
      this.list = [];
      this.getlines(this.lineFilter);
      return false;
    },
    handleScroll() {
        if (document.body.scrollTop === 0) {
            this.scrollTop = false
        } else if (document.body.scrollTop + window.innerHeight >= document.body.offsetHeight) {
            this.scrollTop = true;
            if (!this.loadingEnd && !this.sw) {
            this.sw = true;
            this.getlines(this.lineFilter);
            }
        }
    },
    onBlur() {
      this.blured = true;
    },
    onFocus() {
      this.blured = false;
    },
    /* 选中二级导航 */
    selectedTwoNav(index) {
        /* 过滤条件还原 */
        this.$store.commit('rest')
        /* 设置二级导航状态 */
      this.$store.commit("selectedCity", index)
      this.list = []
      this.getlines(this.lineFilter)
    },
    /* 初始化轮播图 */
    carousel(selector) {
      var mySwiper = new Swiper(selector, {
        // Optional parameters
        direction: "horizontal",
        // loop: true,
        // If we need pagination
        pagination: {
          el: ".swiper-pagination"
        },
        speed: 400,
        spaceBetween: 0,
        autoplay: true,
        effect: "slide",
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observerParents: true, //修改swiper的父元素时，自动初始化swiper
        slidesPerView: 5,
        // And if we need scrollbar
        scrollbar: {
          el: ".swiper-scrollbar"
        }
      });
    }
  },
  components: {
      shopBanner,
      toTop
  },
  computed: {
    ...mapGetters([
        "lineFilter", 
        "lineCity", 
        'filterSeted',
         'mdDevice'
        ])
  },
  created() {
    /* 如果地址包含storeId/v/index.html#/home?storeId=123456，说明当前在店铺模式下 */
    let storeId = this.$route.query.storeId
    let params = JSON.parse(this.$route.query.params)
    if(storeId) {
        this.storeId = storeId
    }
    /* 设置lineFilter */
    this.$store.commit('initLineFilter', params)
  },
  async mounted() {
    /* 如果存在关键字, 一级二级导航id为空 */
    /* 如果存在一级导航id, 清除关键字 */
    /* 如果存在一级和二级导航id, 清除关键字  */
    if (this.lineFilter.keyword) {
      this.$store.commit("clearLineFilter", "lineTypeAppId");
      this.$store.commit("clearLineFilter", "lineTypeID");
    } else if (this.lineFilter.lineTypeAppId || this.lineFilter.lineTypeID) {
      this.$store.commit("clearLineFilter", "keyword");
    }
    await this.getlines(this.lineFilter);
    
    if (!this.lineFilter.lineTypeID && this.lineFilter.lineTypeAppId) {
      await this.$store.dispatch("getLineType", this.lineFilter.lineTypeAppId)
    } else if(!this.lineFilter.lineTypeID && !this.lineFilter.lineTypeAppId) {
        this.$store.commit('resetlineCity')
    }
    this.$nextTick(() => this.carousel(".filter-scroll"))
    window.scrollTo(0, 0)
    // 注册scroll监听事件
    window.addEventListener("scroll", this.handleScroll);
    document.getElementById("myinput").addEventListener("search", this.inputSearch);
    document.getElementById("myinput").addEventListener("blur", this.onBlur); // 失去焦点
    document.getElementById("myinput").addEventListener("focus", this.onFocus); //获取焦点
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style scoped lang="scss">
@import "./line-list.scss";
</style>
