<template>
    <div class="order-detail-page page-wrapper">
        <mt-header fixed title="订单详情">
            <router-link to="/order-list" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>

        <div class="scroll-box" :class="{bgFilter: maskShow}">
            <!-- 订单详情 -->
            <div class="order-header">
                <div class="order" @click="slectedOrder(order)">
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
                            <div class="title-wrapper">
                                <p class="title-text">{{order.lineTitle}}</p>
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
                </div>

            </div>

            <!-- 账单信息 -->
            <div class="custom-title-component">
                <div @click="maskShow = !maskShow" class="item titleItem">
                    <div class="label">账单信息</div>
                    <i class="iconfont icon-right"></i>
                </div>
            </div>

            <!-- 联系人信息 -->
            <div class="contact-info order-detail-section">
                <div class="bill-info order-item border-bottom">
                    <div class="title">联系人信息</div>
                </div>
                <div class="contact-item-wrapper">
                    <div class="contact-item">
                        <span class="label">联系人</span>
                        <span class="left-content">{{detail.ctName}}</span>
                    </div>
                    <div class="contact-item">
                        <span class="label">手机</span>
                        <span class="left-content">{{detail.ctInfo}}</span>
                    </div>
                </div>
            </div>
            <!-- 出游人信息 -->
            <div class="custom-title-component">
                <router-link :to="`/tourist-list/${orderId}`" class="item titleItem">
                    <div class="label">出游人信息</div>
                    <a class="content">
                        <i class="iconfont icon-right"></i>
                    </a>
                </router-link>
            </div>

            <!-- 订单备注 -->
            <div class="custom-title-component order-mark">
                <div v-if="detail.isOk === 0" @click="editmark(detail.ordBak)" class="item titleItem">
                    <div class="label">订单备注</div>
                    <i class="iconfont icon-right"></i>
                </div>
                <div v-if="detail.isOk !== 0" class="item titleItem">
                    <div class="label">订单备注</div>
                </div>
                <div class="mark-text">{{detail.ordBak || '此订单没有备注'}}</div>
            </div>


        </div>

        <!-- 账户信息蒙版 -->
        <div v-if="maskShow" class="bill-detail-mask">
            <mt-header class="mask-header" title="账单信息">
                <div v-on:click="maskShow = !maskShow"  slot="left">
                    <mt-button icon="back"></mt-button>
                </div>
            </mt-header>

            <div class="bill-content">
                <div class="title">费用明细</div>
                <!-- 基本团费 -->
                <div class="class inline border-bottom">
                    <span class="label second-label">基本团费</span>
                    <span class="label-text">¥&nbsp;{{bills.basicSum | .00}}</span>
                </div>
                <div class="content">
                    <div v-for="item in bills.basicBillList" :key="item.id" class="content-item inline">
                        <span class="label">{{item.theTitle}}</span>
                        <span class="content-text">¥&nbsp;{{item.thePrice | .00}}&nbsp;x&nbsp;{{item.theNum}}人</span>
                    </div>
                </div>

                <!-- 优惠政策 -->
                <div class="class inline border-bottom">
                    <span class="label second-label">优惠政策</span>
                    <span class="label-text">¥&nbsp;{{bills.discountSum | .00}}</span>
                </div>
                <div class="content">
                    <div v-if="!bills.discountBillList.length" class="content-item inline">
                        <span class="label">暂无优惠政策</span>
                    </div>
                    <div v-for="item in bills.discountBillList" :key="item.id" class="content-item inline">
                        <span class="label">{{item.theTitle}}</span>
                        <span class="content-text">¥&nbsp;{{item.thePrice | .00}}&nbsp;x&nbsp;{{item.theNum}}人</span>
                    </div>
                </div>

                <!-- 附加产品 -->
                <div class="class inline border-bottom">
                    <span class="label second-label">附加产品</span>
                    <span class="label-text">¥&nbsp;{{bills.additionSum | .00}}</span>
                </div>
                <div class="content">
                    <div v-if="!bills.additionalBillList.length"  class="content-item inline">
                        <span class="label">暂无附加产品</span>
                    </div>
                    <div v-for="item in bills.additionalBillList" :key="item.id" class="content-item inline">
                        <span class="label">{{item.theTitle}}</span>
                        <span class="content-text">¥&nbsp;{{item.thePrice | .00}}&nbsp;x&nbsp;{{item.theNum}}人</span>
                    </div>
                </div>
            </div>
            <div class="order-sum">
                <span class="sum-title">总额</span>
                <span class="sum-price">¥&nbsp;{{bills.sum | .00}}</span>
            </div>

            <div class="closed">
                <i class="iconfont icon-close" @click="maskShow = !maskShow"></i>
            </div>
            <div class="mask">
            </div>
        </div>

        <div v-show="!maskShow" class="bottom-pay">
            <div v-if="order.amount - order.pingAmount > 0" class="ft clearfix">
                <div class="fl">
                    <p>合计：<span class="price">{{order.amount | .00}}</span><span class="paid">（未付：<span>{{(order.amount - order.pingAmount) | .00}}</span>）</span></p>
                </div>
                <div class="fr">
                    <button class="btn-pay" v-if="(order.isOk === 0 && order.amount - order.pingAmount > 0) || (order.isOk === 1 && order.amount - order.pingAmount > 0)" @click.stop="pay(order.id)">支付</button>
                </div>
            </div>
        </div>

    </div>

</template>

<script type="text/ecmascript-6">
import { mapGetters, mapActions } from 'vuex'
import orderItem from '../components/order-item.vue'
import Vue from 'vue'
import {Toast} from "mint-ui"
import util from '../common.js'

export default {
    name: 'orderDetail',
    data () {
        return {
            order: '',
            detail: '',
            maskShow: false,
            bills: ''
        }
    },
    methods: {
        selected(id) {
            this.$emit('filterOrder', id)
        },
        slectedOrder(value) {
            this.$router.push(value.url)
            this.$store.commit('setOrder', value)
        },
        pay(id) {
            this.$router.push(`/order-pay/${id}`)
        },
        basicSum: () => {
            let sum = 0
            if (this.bills.basicBillList.length) {
                this.bills.basicBillList.forEach(item => {
                    sum += item.thePrice*item.theNum
                });
                return sum
            } else {
                return sum
            }
        },
        discountSum: () => {
            let sum = 0
            this.bills.discountBillList.forEach(item => {
                sum += item.thePrice*item.theNum
            });
            return sum
        },
        additionSum: () => {
            let sum = 0
            this.bills.additionalBillList.forEach(item => {
                sum += item.thePrice*item.theNum
            });
            return sum
        },
        editmark(value) {
            this.$store.commit('saveMark', value)
            this.$router.push(`/order-mark/${this.$route.params.id}`)
        },
        setBillShow($event) {
            this.maskShow = !this.maskShow
        },
        formatTime(type, date1, date2) {
            switch (type) {
                case 'order':
                    let disOrder = parseInt(date2.slice(0, 4)) - parseInt(date1.slice(0, 4))
                    return disOrder > 0 ? date2 : date2.slice(5, 16)
                    break;
                case 'plan':
                    let disPlan = parseInt(date2.slice(0, 4)) - parseInt(date1.slice(0, 4))
                    return disPlan > 0 ? date2 : date2.slice(5)
                    break;
            }
        },
        /* 获取订单 */
        async getOrder(id) {
            await this.$http.get(`/ms/order/list`, {
                params: {ordId: id}
            }).then(res => {
                if (res.data.status === 200) {
                    this.order = res.data.data.result[0]
                    this.order.endTime = util.formatEndTime(this.order.endTime)
                    this.order.plandate = util.formatTimes(this.order.planDate, this.order.backDate).date1
                    this.order.backdate = util.formatTimes(this.order.planDate, this.order.backDate).date2
                } else if(res.data.status !== 100) {
                    Toast({ message: res.data.msg, position: 'bottom', duration: 2000 });
                }
            }).catch(error => {
                Toast({ message: '网络错误', position: 'bottom', duration: 2000 });
             })
        },
        /* 获取订单详情 */
        async getOrderDetail(id) {
            await this.$http.get(`/ms/order/${id}`
            ).then(res => {
                if (res.data.status === 200) {
                    this.detail = res.data.data
                } else if(res.data.status !== 100) {
                    Toast({ message: res.data.msg, position: 'bottom', duration: 2000 });
                }
            }).catch(error => {
                Toast({ message: '网络错误', position: 'bottom', duration: 2000 });
             })
        },
        /* 获取账单详情 */
        async getBill(id) {
            await this.$http.get('/ms/order/searchOrdBills',
                { params: {ordId: id}}
            ).then(res => {
                    if (res.status === 200) {
                        this.bills = res.data
                        this.bills.basicSum = 0
                        this.bills.discountSum = 0
                        this.bills.additionSum = 0
                        this.bills.basicBillList.forEach(item => {
                            this.bills.basicSum += item.thePrice * item.theNum
                        })
                        this.bills.discountBillList.forEach(item => {
                            this.bills.discountSum += item.thePrice * item.theNum
                        })
                        this.bills.additionalBillList.forEach(item => {
                            this.bills.additionSum += item.thePrice * item.theNum
                        })
                        this.bills.sum = this.bills.basicSum + this.bills.discountSum + this.bills.additionSum
                    }  else if(res.data.status !== 100) {
                        Toast({ message: res.data.msg, position: 'bottom', duration: 2000 });
                }
            }).catch(error => {
                Toast({ message: '网络错误', position: 'bottom', duration: 2000 });
            })
        }
    },
    computed: {
        orderDetail: () => {
            let data = this.$store.state;
            return data
        },
        ...mapGetters([
            'selectedOrder',
            'bak'
        ])
    },
    created() {
        this.orderId = this.$route.params.id
        localStorage.setItem('orderId', this.orderId)
        this.getOrder(this.orderId)
        this.getOrderDetail(this.orderId)
        this.getBill(this.orderId)
     },
    components: {
        orderItem
    }
}
</script>

<style scoped lang="scss">
@import './order-detail.scss';

</style>
