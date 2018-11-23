<template>
    <div class="order-pay-page page-wrapper">
        <mt-header fixed title="订单支付">
            <mt-button icon="back" @click.native="back()" slot="left"></mt-button>
        </mt-header>
        <loading :options="loading"></loading>
        <div class="order-pay-content scroll-box" :class="{filter: maskShow}">
          <div class="order-info">
            <div v-if="diff > 0" class="countdown">
                <div class="countdown-label">支付剩余时间</div>
                <div class="timer">
                    <span class="box">{{hour.slice(0, 1)}}</span><span class="box">{{hour.slice(1, 2)}}</span>:
                    <span class="box">{{minute.slice(0, 1)}}</span><span class="box">{{minute.slice(1, 2)}}</span>:
                    <span class="box">{{second.slice(0, 1)}}</span><span class="box">{{second.slice(1, 2)}}</span>
                </div>
            </div>
            <div class="box-shadow first-box-shadow">
                <p class="order-item order-title">{{orderInfo.lineTitle}}</p>
            </div>

            <div class="box-shadow">
                <ul class="order-item">
                    <li class="info-item border-bottom"><span class="label">订单号</span><span class="content">{{orderInfo.id}}</span></li>
                    <li class="info-item border-bottom"><span class="label">出发日期</span><span class="content">{{orderInfo.planDate}}</span></li>
                    <li class="info-item"><span class="label">游客人数</span>
                        <span class="content">
                            <span class="title">成人X</span>
                            <span class="num">{{aduSum}}</span>
                        </span>
                        <span class="content">
                             <span class="title">小童X</span>
                            <span class="num">{{chdSum}}</span>
                        </span>
                    </li>
                </ul>
            </div>
 
            <div class="box-shadow">
                <ul class="order-item">
                    <li class="border-bottom">
                        <span class="label current-pay">本次支付</span>
                        <span class="content pay-text">(订单总额:{{orderInfo.amount | .00}}，已支付:{{orderInfo.pingAmount | .00}})</span>
                        <span class="remain"><span class="tag">¥</span>{{confirmPay | .00}}</span>
                    </li>
                </ul>
                <div class="times-pay">
                    <p @click="maskShow = true" class="times-button">分次支付</p>
                </div>
            </div>

            <div class="box-shadow">
                <div class="order-item pay-item">
                    <a v-if="openCodeData === 0" @click="aliPay()" class="info-item border-bottom">
                        <span class="label"><i class="iconfont icon-zhifubao"></i></span>
                        <span class="content'">支付宝支付</span>
                        <span class="recommend">推荐</span>
                    </a>
                    <a v-if="openCodeData === 0" @click="weixinPay()" class="info-item">
                        <span class="label"><i class="iconfont icon-xiangmulan-weixinhao"></i></span>
                        <span class="content'">微信支付</span>
                        <span class="recommend">推荐</span>
                    </a>
                </div>
            </div>


          </div>
        </div>

        <!-- 支付蒙版 -->

        <div v-show="maskShow" class="pay-box">
            <h1 class="pay-title">分次支付</h1>
            <div class="pay-content">
                <div v-if="payConfigData.payNum === 0" class="pay-content-wrapper">
                    <div class="pay-input">
                        <span class="pay-lable">本次支付(元)</span><input v-model="inputPay" class="input-price" type="number">
                    </div>
                    <div class="pay-addinfo">
                        <p>第1次支付，
                            <span v-if="payConfigData.pay1 === 0">按定金支付，本次需支付{{basePay}}</span>
                            <span v-if="payConfigData.pay1 > 0">支付比例不小于{{payConfigData.pay1}}%，需最少支付{{basePay}}</span>
                        </p>
                    </div>
                </div>
                <div v-if="payConfigData.payNum === 1" class="pay-content-wrapper">
                    <div class="pay-input">
                        <span class="pay-lable">本次支付(元)</span><input v-model="inputPay" class="input-price" type="number">
                    </div>
                    <div class="pay-addinfo">
                        <p>第2次支付，
                            <span v-if="payConfigData.pay2 === 0">本次不限制支付额度</span>
                            <span v-if="payConfigData.pay2 > 0">支付比例不小于{{payConfigData.pay2}}%，需最少支付{{basePay}}</span>
                        </p>
                    </div>
                </div>
                <div v-if="payConfigData.payNum === 2" class="pay-content-wrapper">
                    <div class="pay-input">
                        <span class="pay-lable">本次支付(元)</span><input v-model="inputPay" class="input-price" type="number">
                    </div>
                    <div class="pay-addinfo">
                        <p>第3次支付，
                            <span v-if="payConfigData.pay3 === 0">本次支付剩余全款{{basePay}}</span>
                            <span v-if="payConfigData.pay3 === 1">本次支付不限制额度</span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="button">
                <div @click.stop="cancle()" class="cancle">取消</div>
                <div @click.stop="confirm(basePay, payConfigData)" class="confirm" :class="{active: basePay}">确认</div>
            </div>
        </div>

        <div v-show="maskShow" @click.stop="maskShow = false" class="pay-mask-bottom">
        </div>

        <!-- 支付宝提示弹层 -->
        <div v-show="aliMaskShow" @click.stop="aliMaskShow = false" class="ali-pay-mask pay-mask-bottom">
            <img src="../assets/images/alitransfer.jpg">
        </div>


    </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue'
import moment from 'moment'
import {Toast, Indicator} from 'mint-ui'
import loading from '../components/loading.vue'
export default {
    name: 'orderPay',
    data() {
      return {
        orderInfo: '',
        payInfo: '',
        bill: '',
        time: '',
        loading: false,
        hour: '',
        minute: '',
        second: '',
        status: 'confirm',
        maskShow: false,
        diff: '',
        payCodeData: '',
        openCodeData: '',
        payConfigData: '',
        aliMaskShow: false,
        isWeiXin: true,
        aduSum: '',
        chdSum: '',
        inputPay: '',
        basePay: '',
        confirmPay: 0
      }
    },
    methods: {
        goAli() {
            this.$router.push('/aliTransfer')
        },
        checkPay(input, payConfig) {
            if (payConfig.payNum === 0) {
                if (payConfig.pay1 === 0 && payConfig.dingPrice === 0 && input < this.basePay) {
                    Toast({message: `本次支付金额为${this.basePay}`, position: 'top', duration: 3000})
                    return false
                } else if (payConfig.pay1 === 0 && payConfig.dingPrice !== 0 && input < this.basePay) {
                    Toast({message: `按定金支付，本次需支付${this.basePay}`, position: 'top', duration: 3000})
                    return false
                } else if (payConfig.pay1 > 0 && input < this.basePay) {
                    Toast({message: `按照比例支付，本次需最少支付${this.basePay}`, position: 'top', duration: 3000})
                    return false
                } else if (input > this.basePay) {
                    this.confirmPay = input
                    return true
                } else {
                    this.confirmPay = this.basePay
                    return true
                }
            } else if (payConfig.payNum === 1) {
                if (payConfig.pay2 === 0 && input < 0) {
                    Toast({message: `输入的金额不能小于0`, position: 'top', duration: 3000})
                    return false
                } else if (payConfig.pay2 > 0 && input < this.basePay) {
                    Toast({message: `按照比例支付，本次需最少支付${this.basePay}`, position: 'top', duration: 3000})
                    return false
                } else if (input > this.basePay) {
                    this.confirmPay = input
                    return true
                } else {
                    this.confirmPay = this.basePay
                    return true
                }
            } else if (payConfig.payNum === 2) {
                if (payConfig.pay3 === 0 && input < this.basePay) {
                    Toast({message: `全款支付，支付金额为${this.basePay}`, position: 'top', duration: 3000})
                    return false
                } else if (payConfig.pay3 === 0 && input < 0) {
                    Toast({message: `输入的金额不能小于0`, position: 'top', duration: 3000})
                    return false
                } else if (input > this.basePay) {
                    this.confirmPay = input
                    return true
                } else {
                    this.confirmPay = this.basePay
                    return true
                }
            }

        },
        computedPay(payConfig) {
            if (payConfig.payNum === 0) {
                if (payConfig.pay1 === 0 && payConfig.dingPrice === 0) {
                    this.basePay = new Number(this.orderInfo.amount).toFixed(2)
                } else if (payConfig.pay1 === 0 && payConfig.dingPrice !== 0) {
                    this.basePay = new Number(payConfig.dingPrice * (this.aduSum + this.chdSum) ).toFixed(2)
                }  else if (payConfig.pay1 > 0) {
                    this.basePay = new Number(payConfig.pay1/100*this.orderInfo.amount).toFixed(2)
                }
            } else if (payConfig.payNum === 1) {
                if (payConfig.pay2 > 0) {
                    this.basePay = new Number(payConfig.pay2/100*this.orderInfo.amount - this.orderInfo.pingAmount).toFixed(2)
                }
            } else if (payConfig.payNum === 2) {
                if (payConfig.pay3 === 0) {
                    this.basePay = new Number(this.orderInfo.amount - this.orderInfo.pingAmount).toFixed(2)
                }
            }
        },
        cancle () {
            this.maskShow = false
        },
        payLoading() {
            Indicator.open('加载中...');
            setTimeout(() => Indicator.close(), 2000);
        },
        async aliPay() {
            if (this.inputPay === 0) {
                Toast({message: '请先点击分次支付，输入本次支付金额，再进行支付宝支付', position: 'top', duration: 3000})
                return
            } else if (this.confirmPay > 0) {
                Indicator.open('支付跳转中...');
                await this.payCode(this.$route.params.id, this.confirmPay, 1)
                Indicator.close()
                if(this.payCodeData) {
                    this.$router.push({path:'/aliTransfer', query: {url: this.payCodeData}})
                }
            }
        },
        async weixinPay() {
            if (this.inputPay === 0) {
                Toast({message: '请先点击分次支付，输入本次支付金额，再进行微信支付', position: 'top', duration: 3000})
                return
            } else if (this.confirmPay > 0) {
                Indicator.open('支付跳转中...');
                await this.payCode(this.$route.params.id, this.confirmPay, 0)
                Indicator.close()
                if (this.payCodeData) {
                    window.location.href = this.payCodeData
                }
            }
        },
        confirm() {
            if (this.checkPay(this.inputPay, this.payConfigData)) {
                this.maskShow = false
            }
        },
        timer: function () {
            setInterval(() => {
                let remin = Date.parse(moment(this.orderInfo.endTime).format()) - Date.now()
                this.diff = Math.floor(remin / 1000 )
                this.hour = `${Math.floor(this.diff / 3600 )}`
                if (this.hour.length === 1) {
                    this.hour = '0'.concat(this.hour)
                }
                this.minute = `${Math.floor(this.diff % 3600 / 60)}`
                if (this.minute.length === 1) {
                    this.minute = '0'.concat(this.minute)
                }
                this.second = `${this.diff % 60}`
                if (this.second.length === 1) {
                    this.second = '0'.concat(this.second)
                }
             }, 1000)
        },
        back() {
            this.$router.go(-1)
        },
        /* 获取订单详情 */
        async getOrder(id) {
            await this.$http.get('/ms/order/list', {
                params: {ordId: id}
            }).then(res => {
                if (res.data.status === 200) {
                    this.orderInfo = res.data.data.result[0]
                    this.aduSum = this.orderInfo.aduNum + this.orderInfo.aduNum2 + this.orderInfo.aduNum1
                    this.chdSum = this.orderInfo.chdNum + this.orderInfo.chdNum1
                } else if(res.data.status !== 100) {
                    Toast({message: res.data.msg, position: 'top', duration: 3000})
                }
            }).catch(error => {
                Toast({message: '网络错误', position: 'top', duration: 3000})
            })
        },
        /* 获取支付配置 */
        async payConfig(id) {
            await this.$http.get(`/ms/order/payBaseConfig/${id}`
            ).then(res => {
                if (res.data.status === 200) {
                    this.payConfigData = res.data.data
                } else if(res.data.status !== 100) {
                    Toast({message: res.data.msg, position: 'top', duration: 3000})
                }
            }).catch(error => {
                Toast({message: '网络错误', position: 'top', duration: 3000})
            })
        },
        /* 扫码付开通 */
        async openCode() {
            await this.$http.get('/isQrCodePay'
            ).then( res => {
                this.openCodeData = res.data.status
            }).catch(erro => {
                Toast({message: '网络错误', position: 'top', duration: 3000})
            })
        },
        /* 获取支付二维码 */
        async payCode(id, amount, type) {
           await this.$http.get('/qrCode/get_paycode' , {
                params: {
                    linePlanOrdID: id,
                    amount: amount,
                    payType: type
                }
            }).then( res => {
                if (res.data.status === 0) {
                    this.payCodeData = res.data.qrCode
                } else {
                    Toast({message: res.data.msg, position: 'top', duration: 3000})
                    // 支付失败，跳转到支付页
                }
            }).catch(erro => {
                Toast({message: '网络错误', position: 'top', duration: 3000})
            })
        }
    },
    async created() {
        clearInterval(this.timer)
        this.loading = true
        await this.getOrder(this.$route.params.id)
        this.timer()
        await this.payConfig(this.$route.params.id)
        await this.openCode(this.$route.params.id)
        this.loading = false
        this.computedPay(this.payConfigData)
        this.inputPay = this.basePay
        this.confirmPay = this.basePay
    },
    components: {
        loading
    }
}
</script>

<style scoped lang="scss">
@import './order-pay.scss'
</style>
