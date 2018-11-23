<template>
    <div class="home-page" :class="{shopHome: storeId}" id="page" :style="{overflow:'hide'}">
        <!-- 店铺模式头部 -->
        <shop-banner v-on:openMask="disableScroll" v-on:hideMask="hasScroll" v-if="storeId"></shop-banner>
        <!-- 蒙版层 -->
        <div v-if="storeId" class="default-mask" :class="{hasMask: sideOpen === 'yes', noMask: sideOpen === 'no'}"></div>
        <!-- 扩展栏 -->
        <div v-if="storeId" class="side-bar" :class="{openSide: sideOpen === 'yes', closeSide: sideOpen === 'no'}">
            <i @click.stop="hideSide()" class="extend-side iconfont icon-zhankaicelalan"></i>
            <div class="right">
                <div class="head">用户登录</div>
                <div class="login">
                    <i class="iconfont icon-clear"></i>
                    <div class="text">登录/注册</div>
                </div>
                <div class="list">
                    <div class="item">
                        <i class="iconfont icon-clear"></i><router-link :to="'/user-center'" class="text">首页</router-link>
                    </div>
                </div>
            </div>
        </div>
        <!-- 顶部搜索 -->
        <section class="search" :class="{mdDevice: parseInt(this.mdDevice, 10) > 0}" :style="{left: `${this.mdDevice}px`}">
            <div class="choic">
                <span class="city">全国</span>
                <i class="iconfont icon-xiajiantou"></i>
            </div> 
            <form class="search-form" action="" v-on:submit.prevent="onSubmit">
                <input id="searchInput" type="search" class="search-input" :class="{searchInputing: lineFilter.keyword}" autocomplete="off" placeholder="请输入关键字" v-model="lineFilter.keyword">
                <i class="iconfont icon-search"></i>
                <i v-show="lineFilter.keyword" @click="lineFilter.keyword = ''" class="iconfont icon-clear"></i>
            </form>
            <a v-if="!storeId" class="pc-extend" @click="picCookie()">访问电脑版</a>
            <!-- <i @click="sideOpen ='yes'" class="extend iconfont icon-zhankaicelalan"></i> -->
        </section>
        <!-- 轮播图， 一二级导航， 产品加载中 -->
        <!-- <loading :options="!allLoading"></loading> -->
        <!-- 轮播图， 一二级导航， 产品完成加载 -->
        <!-- 多张广告图 -->
        <section v-if="ads && ads.length > 1" class="banner swiper-container">
            <!-- Additional required wrapper -->
            <div class="swiper-wrapper">
                <!-- Slides -->
                <a v-for="item in ads" :key="item.id" :href="item.url" target="_blank" class="swiper-slide">
                    <img class="ad-pic" :src="item.img || defaultImg" alt="">
                </a>
            </div>
            <!-- If we need pagination -->
            <div class="swiper-pagination"></div>
        </section>
        <!-- 单张广告图 -->
        <section v-if="ads && ads.length === 1" class="one-ad-banner">
            <a :href="ads[0].url" target="_blank">
                <img class="ad-pic"  :src="ads[0].img || defaultImg" alt="">
            </a>
        </section>


        <!-- 一二级导航 -->
        <section class="nav swiper-container">
            <!-- Additional required wrapper -->
            <div class="swiper-wrapper">
                <!-- Slides -->
                <div v-for="item in navs" :key="item.id" class="swiper-slide">
                    <div class="nav-box clear-float">
                        <div v-for="(item, index) in item.data" :key="item.autoId" @click="selecteNav(item)" class="item">
                            <div :id="JSON.stringify(item)" class="icon-bg">
                                <img v-if="index === 0" src="../assets/images/nav1.png" alt="">
                                <img v-if="index === 1" src="../assets/images/nav2.png" alt="">
                                <img v-if="index === 2" src="../assets/images/nav3.png" alt="">
                                <img v-if="index === 3" src="../assets/images/nav4.png" alt="">
                                <img v-if="index === 4" src="../assets/images/nav5.png" alt="">
                                <img v-if="index === 5" src="../assets/images/nav6.png" alt="">
                                <img v-if="index === 6" src="../assets/images/nav7.png" alt="">
                                <img v-if="index === 7" src="../assets/images/nav8.png" alt="">
                                <img v-if="index === 8" src="../assets/images/nav9.png" alt="">
                                <img v-if="index === 9" src="../assets/images/nav10.png" alt="">
                            </div> 
                            <p class="text">{{item.cnName | sliceA(0, 4)}}</p>
                        </div>
                    </div>
                </div>

            </div>
            <!-- If we need pagination -->
            <div class="swiper-pagination"></div>
        </section>

        <!-- 热门产品 -->
        <!-- <section class="hot public">
            <div class="head">
                <span class="tag red-line-gradient">热门产品</span><span class="text">特价优惠，限时秒杀</span><span class="more">更多&nbsp;<i class="iconfont icon-right"></i></span>
            </div>
            <div class="double clear-float">
                <div v-for="item in arr2" :key="item.id" class="box bg1" :style="{background: item.bg}">
                    <p class="title">{{item.text}}</p>
                    <div class="cicle">
                        <p class="inner-cicle">
                            <img src="https://ohp96o3wl.qnssl.com/files/1/image/20180727/Cii-slrEjBeIYZbiAAkQquA3qMcAAFIhAEsPNUACRDC168_w450_h300_c1_t0_w640_h480_c1_t0_1532662194873.jpg" alt="">
                        </p>
                    </div>
                </div>
            </div>
            <div class="one">
                <div v-for="item in arr3" :key="item.id" class="box">
                    <div class="avatar">
                        <img src="https://ohp96o3wl.qnssl.com/files/1/image/20180727/Cii-slrEjBeIYZbiAAkQquA3qMcAAFIhAEsPNUACRDC168_w450_h300_c1_t0_w640_h480_c1_t0_1532662194873.jpg" alt="">
                    </div>
                    <div class="content">
                        <p class="title">新加坡，马来学校新加坡，马来学校新加坡，马来学校新加坡，马来学校新加坡，马来学校新加坡，马来学校新加坡，马来学校新加坡，马来学校新加坡，马来学校新加坡，马来学校</p>
                        <div class="small-tag"><span class="item lijian">立减</span><span class="item zaoniao">早鸟</span></div>
                        <div class="price">¥<span class="big">29999</span>&nbsp;<span class="start">起</span></div>
                    </div>
                </div>
                
            </div>
        </section> -->

        <!--  产品区 -->
        <!-- 加载中 -->
        <loading :options="linesLoading"></loading>
        <section v-if="!linesLoading && getSiteInfo.wxSysShow && Boolean(item.lineType) && item.lineType.length" v-for="(item, index) in homeLines" :key="item.id" :id="item.cnName" class="inner public">
            <div class="line-head">
                <div class="head">
                    <span class="tag" 
                    :class="{'line-gradient-1': index === 0, 'line-gradient-2': index === 1, 'line-gradient-3': index === 2, 'line-gradient-4': index === 3, 'line-gradient-5': index >= 4}"
                    >{{item.cnName | sliceA(0,5)}}</span><span class="more" @click="moreLines(item.id)"><span class="more-text">更多</span><i class="iconfont icon-right"></i></span>
                </div>
                <div class="tab swiper-container">
                <!-- Additional required wrapper -->
                    <div class="swiper-wrapper">
                        <!-- Slides -->
                        <div v-for="item in item.lineType" :key="item.id" @click="selectedLineType(item)" class="swiper-slide item" :class="{active: item.selected}">
                            {{item.cnName | sliceA(0,5)}}
                        </div>
                    </div>
                    <!-- If we need pagination -->
                    <div class="swiper-pagination"></div>
                </div>
            </div>            
            <!-- 加载中 -->
            <!-- <loading :options="lineLoading"></loading> -->
            <!-- 无数据 -->
            <nodate v-if="item.lines" :options="item.lines.length === 0"></nodate>
            <!-- 数据已加载完成 -->
            <div v-if="getSiteInfo.wxSysShow.slice(2,3) === '1' && Boolean(item.lines) && item.lines.length" class="double clear-float">
                <div v-for="item in item.lines" @click="toDetail(item.id)" :key="item.id" class="box bg1" :style="{background: item.bg}">
                    <div class="pic">
                        <img :src="item.img1" :onerror="noImage" alt="">
                        <p class="tag">{{item.tag}}</p>
                    </div> 
                    <p class="title1">{{item.title}}</p>
                    <div v-if="item.minAdultPrice && item.minSadultPrice === null" class="price1"><span class="label">同</span>&nbsp;¥<span class="big">{{item.minAdultPrice}}</span>&nbsp;<span class="start">起</span></div>
                    <div v-if="item.minAdultPrice === null && item.minSadultPrice" class="price1"><span class="label">市</span>&nbsp;¥<span class="big">{{item.minSadultPrice}}</span>&nbsp;<span class="start">起</span></div>
                    <div v-if="item.minAdultPrice && item.minSadultPrice" class="price1"><span class="label">同</span>&nbsp;¥<span class="big">{{item.minAdultPrice}}</span>&nbsp;<span class="start">起</span></div>
                </div>
            </div>
            <div v-if="getSiteInfo.wxSysShow.slice(2,3) === '0' && Boolean(item.lines) && item.lines.length" class="one">
                <div v-for="item in item.lines" @click="toDetail(item.id)" :key="item.id" class="box">
                    <div class="avatar">
                        <img :src="item.img1" :onerror="noImage" alt="">
                    </div>
                    <div class="content">
                        <p class="title">{{item.title}}</p>
                        <!-- <div class="small-tag"><span v-for="(item, index) in item.policyList" :key="index" class="item" 
                        :class="{maimian: item === 1, lijian: item === 2, zaoniao: item === 3, zaixianyouhui: item === 4, superzaoniao: item === 5, youhuiquan: item === 100, jifen: item === 200}">
                            <span v-show="item === 1">满免</span>
                            <span v-show="item === 2">立减</span>
                            <span v-show="item === 3">早鸟</span>
                            <span v-show="item === 4">在线优惠</span>
                            <span v-show="item === 5">超级早鸟</span>
                            <span v-show="item === 100">优惠券</span>
                            <span v-show="item === 200">积分</span>
                        </span></div> -->
                        <div v-if="item.minAdultPrice !== null && item.minSadultPrice === null" class="price"><span class="label">同</span>&nbsp;¥<span class="big">{{item.minAdultPrice}}</span>&nbsp;<span class="start">起</span></div>
                        <div v-if="item.minAdultPrice === null && item.minSadultPrice !== null" class="price"><span class="label">市</span>&nbsp;¥<span class="big">{{item.minSadultPrice}}</span>&nbsp;<span class="start">起</span></div>
                        <div v-if="item.minAdultPrice !== null && item.minSadultPrice !== null" class="price"><span class="label">同</span>&nbsp;¥<span class="big">{{item.minAdultPrice}}</span>&nbsp;<span class="start">起</span></div>
                    </div>
                </div>
                
            </div>
        </section>

        <!-- 底部导航 微站模式-->
        <section v-if="!storeId" class="bottom-nav" :class="{mdDevice: parseInt(this.mdDevice, 10) > 0}" :style="{left: `${this.mdDevice}px`}">
            <div @click="change('home')" class="tab" :class="{active : bottomTab === 'home'}">
                <i class="iconfont icon-shouye"></i>
                <p class="text">首页</p>
            </div>
            <div @click="toStore()" v-if="shopShow && !storeId" class="tab">
                <i class="iconfont icon-wode"></i>
                <p class="text">我的店铺</p>
            </div>
            <!-- <div class="tab">
                <i class="iconfont icon-cancle"></i>
                <p class="text">客户</p>
            </div> -->
            <div @click="change('center')" class="tab" :class="{active : bottomTab === 'center'}">
                <i class="iconfont icon-wode"></i>
                <p class="text">我的</p>
            </div>
        </section>

        <!-- 底部导航 店铺模式，已开通在线注册及支付-->
        <section v-if="storeId && shop.allowRegist" class="bottom-nav" :class="{mdDevice: parseInt(this.mdDevice, 10) > 0}" :style="{left: `${this.mdDevice}px`}">
            <div @click="change('home')" class="tab" :class="{active : bottomTab === 'home'}">
                <i class="iconfont icon-shouye"></i>
                <p class="text">首页</p>
            </div>
            <div @click="change('center')" class="tab" :class="{active : bottomTab === 'center'}">
                <i class="iconfont icon-wode"></i>
                <p class="text">我的</p>
            </div>
        </section>

        <!-- 店铺模式，未开通在线注册及支付 -->
        <shop-phone v-if="storeId && !shop.allowRegist"></shop-phone>


    </div>
</template>

<script type="text/ecmascript-6">
import loading from '../components/loading.vue'
import nodate from '../components/nodate.vue'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import {mapGetters} from 'vuex'
import shopBanner from '../components/shop-banner.vue'
import shopPhone from '../components/shop-phone.vue'
import {Toast, Popup} from 'mint-ui'
import util from '../util'
import wx from '../wx'
import wxShare from '../wx';
export default {
    name: 'home',
    data() {
      return {
            sideOpen: '',
            timer1: '',
            timer2: '',
            noImage: 'this.src="' + require('../assets/images/default.jpg') + '"',
            defaultImg: require('../assets/images/default.jpg'),
            lines: [], // 线路
            ads: [],
            navs: [],
            pointArr: [],
            direction: 'up',
             //产品区加载
            loadingArr: [{loading: true}, {loading: true}, {loading: this.$store.state.home.linesLoading}],
            allLoading: false,
            storeId: '',
            shopShow: '',
      }
    },
    components: {
        loading,
        nodate,
        shopBanner,
        shopPhone
    },
    computed: {
        ...mapGetters([
            'lineFilter',
            'homeLines',
            'lineTypeIdArr',
            'lineTypeId',
            'bottomTab',
            'getSiteInfo',
            'linesLoading',
            'mdDevice',
            'shop'
        ]),
    },
    methods: {
        /* 获取店铺信息 */
        async shopInfo () {
            await this.$http.get('/ms/store/baseInfo/info'
            ).then(res => {
                if (res.data.status === 200) {
                    let result = res.data.data
                    if (result) {
                        this.$store.commit('setShop', result)
                    }
                } else if(res.data.status === 100000) {
                    Toast({ message: res.data.msg, position: 'top', duration: 1500 })
                }
            })
        },
        picCookie() {
            document.cookie = 'pc_request=true;path=/'
            window.location.href = window.location.origin
        },
        /* 监听shopBanner子组件事件 */
        disableScroll() {
            document.getElementById('app').style.overflow = 'hidden'
        },
        hasScroll() {
            document.getElementById('app').style.overflow = 'scroll'
        },
        toDetail(id) {
            if(this.storeId) {
                this.$router.push({path: `/line-detail/${id}`, query: {storeId: this.storeId}})
            } else {
                this.$router.push({path: `/line-detail/${id}`})
            }
        },
        toStore() {
            window.location.href = this.shop.storeUrl
            this.storeId = this.storeId
        },
        hideSide() {
            this.sideOpen  = 'no'
            this.timer2 = setTimeout(() => {
                this.sideOpen = ''
                clearTimeout(this.timer2)
            }, 500);
        },
        /* 选中导航 */
        selecteNav(val) {
            this.lineFilter.keyword = ''
            /* 重置 */
            this.$store.commit('rest')
            this.$store.commit('resetlineCity')
            this.lineFilter.lineTypeAppId = val.lineTypeAppId
            if(val.lineTypeId !== 0) {
                this.lineFilter.lineTypeID = val.lineTypeId
            } else {
                this.lineFilter.lineTypeID = ''
            }
            if(this.storeId) {
                this.$router.push({path: '/line-list', query: {storeId: this.storeId, params: JSON.stringify(this.clearLineFilter(this.lineFilter))}})
            } else {
                this.$router.push({path: '/line-list', query:{params: JSON.stringify(this.clearLineFilter(this.lineFilter))}})
            }
            
        },
        /* 清除lineFilter中空的参数 */
        clearLineFilter (obj) {
            let query = {
            }
            for (const key in obj) {
                if (obj.hasOwnProperty(key) && (key !== 'pageSize' && key !== 'planDatePre' && key !== 'planDatePrs') && obj[key]) {
                    query[key] = obj[key]
                }
            }
            return query
        },
        moreLines(id) {
            this.lineFilter.keyword = ''
            /* 重置 */
            this.$store.commit('rest')
            this.$store.commit('resetlineCity')
            this.lineFilter.lineTypeAppId = id
            this.lineFilter.lineTypeID = ''
            if(this.storeId) {
                this.$router.push({path: '/line-list', query: {storeId: this.storeId, params: JSON.stringify(this.clearLineFilter(this.lineFilter))}})
            } else {
                this.$router.push({path: '/line-list', query:{params: JSON.stringify(this.clearLineFilter(this.lineFilter))}})
            }
        },
        change(val) {
            switch (val) {
                case 'home':
                    if(this.storeId) {
                        this.$router.push({path: '/home', query: {storeId: this.storeId}})
                    } else {
                        this.$router.push({path: '/home'})
                    }
                    this.$store.commit('setbottomTab', 'home')
                    break;
                case 'center':
                    this.$router.push('/user-center')
                    this.$store.commit('setbottomTab', 'center')
                    break;
            }
        },
        onSubmit() {
            return false
        },
        search() {
            if(this.storeId) {
                this.$router.push({path: '/line-list', query: {storeId: this.storeId, params: JSON.stringify(this.clearLineFilter(this.lineFilter))}})
            } else {
                this.$router.push({path: '/line-list',  query:{params: JSON.stringify(this.clearLineFilter(this.lineFilter))}})
            }
            /* 重置 */
            this.$store.commit('rest')
        },
        setAppId(item) {
            this.lineFilter.keyword = ''
            /* 重置 */
            this.$store.commit('rest')
            this.$store.commit('resetlineCity')
            this.lineFilter.lineTypeAppId = item.lineTypeAppId
            if(item.lineTypeId !== 0) {
                this.lineFilter.lineTypeID = item.lineTypeId
            } else {
                this.lineFilter.lineTypeID = ''
            }
            if(this.storeId) {
                this.$router.push({path: '/line-list', query: {storeId: this.storeId, params: JSON.stringify(this.clearLineFilter(this.lineFilter))}})
            } else {
                this.$router.push({path: '/line-list',  query:{params: JSON.stringify(this.clearLineFilter(this.lineFilter))}})
            }
        },
        /* 点击产品区二级导航 */
        async selectedLineType(val) {
            let top = document.body.scrollTop || document.documentElement.scrollTop
            /* 设置二级导航状态和lineTypeId */
            this.$store.commit('setLineType', val)
            /* 请求线路 */
            await this.getLines(val)

            /* 点击元素位置 */
            window.scrollTo(0 ,top)
        },
        /* 广告图 */
        getAds() {
            this.loadingArr[0].loading= true
            this.$http.post('/ms/ad/list',
                {typeCode: '手机首页滚动多图'}
            ).then(res => {
                if(res.data.status === 200) {
                    let result = res.data.data
                    if(Boolean(result) && result.length) {
                        this.ads = result.slice(0, 7)
                        let options = { 
                            // Optional parameters
                            direction: 'horizontal',
                            loop: true,
                            // If we need pagination
                            pagination: {
                                el: '.swiper-pagination',
                            },
                            speed: 400,
                            spaceBetween: 0,
                            autoplay: true,
                            effect: 'slide',
                            observer: true, //修改swiper自己或子元素时，自动初始化swiper
                            observerParents: true, //修改swiper的父元素时，自动初始化swiper
                            slidesPerView: 'auto',
                            preventLinksPropagation: false   // 阻止点击事件冒泡
                        }
                        this.$nextTick( () => this.carousel('.banner', options))
                        this.loadingArr[0].loading= false
                    }
                } else if(res.data.status !== 100) {
                    let error = res.data.msg
                    Toast({message: error, position: 'bottom', duration: 2000})
                    this.loadingArr[0].loading= false
                }
            }) 
        },
        /* 一二级导航 */
        getNavs() {
            this.loadingArr[1].loading = true
            this.$http.get('/ms/linetype/list'
            ).then(res => {
                if(res.data.status === 200) {
                    let result = res.data.data
                    if(Boolean(result) && result.length) {
                        let arr = []
                        let indexOther = 0
                        let length = Math.ceil(result.length/10)
                        for (let index = 0; index < length; index++) {
                            arr.push({
                                id: index,
                                data: result.slice(indexOther, indexOther += 10)
                            })
                        }
                        this.navs = arr.slice(0, 9)
                        let options = { 
                            // Optional parameters
                            direction: 'horizontal',
                            // If we need pagination
                            pagination: {
                                el: '.swiper-pagination',
                            },
                            speed: 400,
                            spaceBetween: 0,
                            effect: 'slide',
                            observer: true, //修改swiper自己或子元素时，自动初始化swiper
                            observerParents: true, //修改swiper的父元素时，自动初始化swiper
                            slidesPerView: 'auto',
                            preventLinksPropagation: false   // 阻止点击事件冒泡
                        }
                        this.$nextTick( () => this.carousel('.nav', options))
                        this.loadingArr[1].loading = false
                    }
                } else if(res.data.status !== 100) {
                    this.loadingArr[1].loading = false
                    let error = res.data.msg
                    Toast({message: error, position: 'bottom', duration: 2000})
                }
            })
        },
        /* 一二级导航，初始化查询产品 */
        getLines(val) {
            this.lineLoading = true
            this.$http.post('/ms/line/lineList',
            {lineTypeID: val.lineTypeId, currentPage: 1, pageSize: 100}).then(res => {
                if(res.data.status === 200) {
                    let result = res.data.data.result
                    if(Boolean(result) && result.length) {                        
                        result = result.slice(0, 6)
                    }
                    this.homeLines.forEach(item => {
                        if(item.id === val.parentId) {
                            this.$set(item, 'lines', result)
                        }
                    })
                    this.lineLoading = false
                } else if(res.data.status !== 100) {
                    let error = res.data.msg
                    Toast({message: error, position: 'bottom', duration: 2000})
                }
            })
        },
        /* 页面滚动方向 */
        // dire() {
        //     let dis = 0
        //     let point = document.body.scrollTop || document.documentElement.scrollTop
        //     this.pointArr.push(point)
        //     let length = this.pointArr.length
        //     dis = this.pointArr[length -1] - this.pointArr[length -2]
        //     this.direction = dis > 0 ? 'down' : 'up'
        // },
        /* 初始化一二级轮播图 */
        carousel(selector, config) {
            const mySwiper = new Swiper(selector, config)
        },
        /* 初始化产品区二级导航 */
        lineTypeCarousel() {
            const mySwiper = new Swiper('.tab', )
        }
    }, 
    created() {
        /* 如果地址包含storeId/v/index.html#/home?storeId=123456，说明当前在店铺模式下 */
        let storeId = this.$route.query.storeId
        if(storeId) {
            this.storeId = storeId
        }
        this.shopShow = parseInt(util.getCookie('isShowShop'), 10)
    },
    async mounted() {
        document.getElementById('searchInput').addEventListener('search', this.search)
        // document.addEventListener('scroll', this.dire)
        /* 广告图 */
        await this.getAds()
        /* 一二级导航 */
        await this.getNavs()
        /* 获取产品区一二级导航 */
        await this.$store.dispatch('gethomeLines')

        await this.shopInfo()

        // this.allLoading = this.loadingArr.every(item => item.loading === false)
        // console.log(this.allLoading, this.loadingArr);
        // this.loadingArr[2].loading = this.$store.state.home.linesLoading
        // this.allLoading = this.loadingArr.every(item => item.loading === false)

        /* 获取二级导航下的线路 */
        if(this.lineTypeIdArr) {
            this.lineTypeIdArr.forEach(item => {
                this.getLines(item)
            })
        }

        /* 分享 */
        wxShare()
    },
    beforeUpdate() {
        let options = {
            // Optional parameters
            direction: 'horizontal',
            slidesPerView: 4,
            speed: 400,
            spaceBetween: 0
        }
        /* 初始化产品区二级导航tab轮播图 */
        this.$nextTick(() => this.carousel('.tab', options))
    }
}
</script>

<style scoped lang="scss">
@import './home.scss'
</style>
