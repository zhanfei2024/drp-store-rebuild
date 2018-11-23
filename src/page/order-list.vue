<template lang="html">
  <div id="orderList" class="order-list">
    <mt-header fixed title="订单列表">
        <router-link to="/user-center" slot="left">
            <mt-button icon="back"></mt-button>
        </router-link>
        <router-link to="/order-filter" slot="right">
            <mt-button>筛选</mt-button>
        </router-link>
    </mt-header>
    <div class="order-list-wrapper">
        <ul class="order-lists">
            <li v-for="order in orders" v-bind:key="order.id" class="order">
                <div @click="slectedOrder(order)">
                    <div class="hd clearfix">
                        <div class="fl">
                        <p class="light-gray">订单编号：<span>{{order.id}}</span></p>
                        <p class="light-gray">下单时间：<span>{{order.addTime | YYYY-MM-DD HH:mm}}</span></p>
                        </div>
                        <div class="fr">
                        <p>
                            <span v-if="order.isOk === 1" class="status statu-green">确认单</span>
                            <span v-if="order.isOk === 0" class="status statu-green">预留单</span>
                            <span v-if="order.isOk === -2 || order.isOk === -3 || order.isOk === -4" class="status statu-gray">取消单</span>
                        </p>
                        <p v-if="order.isOk === 0" class="end-time"><span>到期:&nbsp;{{order.endTime}}</span></p>
                        </div>
                    </div>
                    <div class="bd">
                        <h4 class="order-title">
                            <div v-if="order.reloadMore" class="title-wrapper" :class="{limitHeight: order.reloadMore}">
                                <p class="title-text">{{order.lineTitle}}</p>
                                <span class="show-btn" @click.stop="filterOrders(order.id)"><i class="iconfont icon-xiajiantou"></i></span>
                            </div>
                            <div v-if="!order.reloadMore" class="title-wrapper">
                                <p class="title-text-more">{{order.lineTitle}}</p>
                            </div>
                        </h4>
                        <div class="infos clearfix">
                        <div class="fl">
                            <p>出发城市：<span>{{order.pubFromcityName || order.fromCityName}}</span></p>
                            <p>往返日期：<span>{{order.plandate}}</span> ~ <span>{{order.backdate}}</span></p>
                        </div>
                        <div class="fr num">
                            <p><span>成人&nbsp;x&nbsp;<span>{{order.aduNum + order.aduNum1 + order.aduNum2}}</span></span><span>小童&nbsp;x&nbsp;<span>{{order.chdNum + order.chdNum1}}</span></span></p>
                        </div>
                        </div>
                    </div>
                    <div v-if="order.payShow" class="ft clearfix">
                        <div class="fl">
                            <p>合计：<span class="price">{{order.amount | .00}}</span><span class="paid">（未付：<em>{{(order.amount - order.pingAmount) | .00}}</em>）</span></p>
                        </div>
                        <div v-if="order.isOk === 0 || order.isOk === 1" class="fr">
                            <button class="btn-cancle" v-if="order.isOk === 0" @click.stop="cancle(order.id)">取消</button>
                            <button class="btn-pay" v-if="(order.isOk === 0 && order.amount - order.pingAmount > 0) || (order.isOk === 1 && order.amount - order.pingAmount > 0)" @click.stop="pay(order.id)">支付</button>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <p v-show="loading" class="page-infinite-loading">
            <mt-spinner type="fading-circle"></mt-spinner>
            加载中...
        </p>
        <p v-show="!hasMore" class="page-infinite-nodata">
            没有更多订单了
        </p>
    </div>
    <!-- 回到顶部 -->
    <to-top v-show="scrollTop" v-on:toTop="scrollToTop()"></to-top>
  </div>
</template>

<script>
import orderItem from '../components/order-item.vue'
import toTop from '../components/toTop.vue'
import nodate from '../components/nodate.vue'
import { Toast, Indicator } from 'mint-ui'
import {MessageBox} from 'mint-ui'
import { moment } from 'moment'
import { mapGetters } from 'vuex'
import util from '../common.js'

export default {
    data () {
        return {
            queryLoading: false,
            nodate: false,
            popFilter: false,
            moreLoading: false,
            totalNum: 0,
            pageSize: 20,
            pageNum: 1,
            orders: [ ],
            list: [],
            loading: false,
            allLoaded: false,
            wrapperHeight: 0,
            checked: false,
            hasMore: false,
            sw: true,
            scrollTop:false,
        }
    },
    computed: {
        ...mapGetters([
            'filter'
        ])
      },
    components: {
        toTop
    },
    methods: {
        scrollToTop () {
            (function smoothscroll() {
                var currentScroll = document.documentElement.scrollTop || document.body.scrollTop
                if (currentScroll > 0) {
                    window.requestAnimationFrame(smoothscroll);
                    window.scrollTo(0, currentScroll - currentScroll / 5)
                }
            })()
            this.scrollTop = false
        },
        slectedOrder(value) {
            this.$router.push(value.url)
            this.$store.commit('setOrder', value)
        },
        pay(id) {
            this.$router.push(`/order-pay/${id}`)
        },
        filterOrders(id) {
            this.orders.forEach(item => {
                if (item.id === id) {
                    item.reloadMore = !item.reloadMore
                }
            })
        },
        /* 页面滚动事件 */
        handleScroll() {
            /* 判断是否滚动到顶部，如果滚动到底部并且还有下一页，调用获取订单方法 */
            if (document.body.scrollTop === 0) {
                this.scrollTop = false
            } else if (document.body.scrollTop + window.innerHeight >= document.body.offsetHeight) {
                this.scrollTop = true;
                if (!this.loading && this.hasMore) {
                    this.loading = true
                    this.getOrders()
                }
            }
        },
        /* 取消订单 */
        cancle(id) {
            MessageBox.confirm('是否要取消此订单?').then(action => {
                if (action === 'confirm') {
                    Indicator.open('订单取消中...')
                    this.$http.get(`/sys/api/order_cancel/${id}`
                    ).then((res) => {
                        if(res.data.status === 200) {
                            this.orders = []
                            this.$store.commit('resetCurrentPage')
                            this.getOrders()
                        } else if(res.data.status !== 100) {
                            Toast({message: res.data.msg, position: 'top', duration: 2000})
                        }
                    })
                }
            })
        },
        /* 订单列表 */
        getOrders() {
            this.loading = true
            this.$http.get('/ms/order/list', {
                params: this.filter
            }).then(res => {
                this.loading = false
                Indicator.close()
                if (res.data.status === 200) {
                    let data = res.data.data.result;
                    if (res.data.data.currentPage < res.data.data.totalPage && Boolean(data) && data.length>0) {
                        this.hasMore = true
                        this.$store.commit('addCurrentPage')
                    } else if(res.data.data.currentPage >= res.data.data.totalPage) {
                        this.hasMore = false
                    } else if(!Boolean(data)) {
                        this.hasMore = false
                    }
                    if (Boolean(data) && data.length>0) {
                        data.forEach(item => {
                            item.plandate = util.formatTimes(item.planDate, item.backDate).date1
                            item.backdate = util.formatTimes(item.planDate, item.backDate).date2
                            item.endTime = util.formatEndTime(item.endTime)
                            item.payShow = true
                            item.url = `/order-detail/${item.id}`
                            if (item.lineTitle.length > 40) {
                                item.reloadMore = true
                            } else {
                                item.reloadMore = false
                            }
                        })
                        this.orders = this.orders.concat(data)
                    }
                } else if(res.data.status !== 100) {
                    Toast({message: res.data.msg, position: 'top', duration: 3000})
                }
            })
        }
    },
    created () {
        this.wrapperHeight = document.documentElement.clientHeight
        this.getOrders()
    },
    mounted () {
        // 注册scroll监听事件
        window.addEventListener("scroll", this.handleScroll)
    },
    destroyed () {
        window.removeEventListener("scroll", this.handleScroll)
        this.$store.commit('resetCurrentPage')
    }
}
</script>

<style scoped lang="scss">
@import '../assets/scss/order-item.scss';
</style>
