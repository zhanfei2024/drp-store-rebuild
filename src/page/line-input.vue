<template>
    <div class="line-input-page page-wrapper" :class="{scroll: maskShow}">
        <!-- 微站模式 -->
        <mt-header v-if="!storeId" fixed title="选择日期和人数">
            <a @click="back()" slot="left">
                <mt-button icon="back"></mt-button>
            </a>
        </mt-header>

        <!-- 店铺模式 -->
        <mt-header v-if="storeId" fixed :title="lineInputTitle">
            <a @click="back()" slot="left">
                <mt-button icon="back"></mt-button>
            </a>
        </mt-header>

        <div class="scroll-box">
            <!-- 日期控件 -->
            <div class="calendar" id="#calendar">
                <div class="month">
                    <span v-for="(item, index) in months" @click="searchPlans(item.id, index)" :key="index" class="item" :class="{selected: item.selected}">
                        <p class="title">{{new Date(item.id).getMonth() + 1}}月</p>
                        <p v-show="item.price !== -100000000" class="price">¥{{item.price}}起</p>
                        <p v-show="item.price === -100000000" class="price">无团期</p>
                    </span>
                </div>

                <div class="week">
                    <span class="title">日</span><span class="title">一</span><span class="title">二</span><span class="title">三</span><span class="title">四</span>
                    <span class="title">五</span><span class="title">六</span>
                </div>

                <div class="day">
                   <div class="item" v-for="(item, index) in dates.dates" @click="searchPlanABC(item, index)"
                        :key="item.ref"
                        v-show="item.show"
                        :style="{marginLeft: item.marginLeft, marginTop: item.marginTop}">
                       <div class="num" :class="{selected: item.selected, expired: item.expired}">
                           {{item.date}}
                       </div>
                       <div v-show="item.price !== ''" class="price">{{item.price}}起</div>
                       <div v-show="item.ticket" class="ticket">{{item.ticketShow}}</div>
                   </div>
                </div>
            </div>

            <!-- 有团期数据 -->
            <div v-if="periods.length > 0">

                <!-- 选择团期 -->
                <div class="mission-period section" ref="date">
                    <div v-if="periods.length > 1" class="list">
                        <div v-for="(item, index) in periods" @click="filterPlanABC(item, index)" :key="item.id" class="period-item">
                            <p v-show="index === 0" class="tab" :class="{selected: item.selected}">A团</p>
                            <p v-show="index === 1" class="tab" :class="{selected: item.selected}">B团</p>
                            <p v-show="index === 2" class="tab" :class="{selected: item.selected}">C团</p>
                            <p v-show="index === 3" class="tab" :class="{selected: item.selected}">D团</p>
                            <p v-show="index === 4" class="tab" :class="{selected: item.selected}">E团</p>
                            <p v-show="index === 5" class="tab" :class="{selected: item.selected}">F团</p>
                            <p v-show="index === 6" class="tab" :class="{selected: item.selected}">G团</p>
                            <p v-show="index === 7" class="tab" :class="{selected: item.selected}">H团</p>
                            <p v-if="item.isTj !== '无' && !item.isTj" class="title">{{item.isTj.slice(0, 4)}}</p>
                            <p class="price">¥{{item.adultPrice}}起</p>
                        </div>
                    </div>
                    <div class="period-content item none-border-bottom">
                        <span class="title">
                            {{periods.filter(item => item.selected === true)[0].planDate | MMM-DD }}
                            出发-{{periods.filter(item => item.selected === true)[0].backDate | MMM-DD }}返回
                        </span>
                        <span class="reload">
                            <span v-show="periods.filter(item => item.selected === true)[0].planStatus === 0 ">已成团</span>
                            {{periods.filter(item => item.selected === true)[0].endNumShow}}
                        </span>
                    </div>
                </div>

                <!-- 选择项 -->
                <div class="choice-list section">
                    <div @click="toStartCity(planId)" class="item">
                        <span class="title">出发城市</span>
                        <span class="reload">
                            <span v-if="cities.filter(item => item.selected === true).length" class="num">{{cities.filter(item => item.selected === true)[0].cityName}}出发</span>
                            <i class="iconfont icon-right"></i>
                        </span>
                    </div>
                    <div @click="toPricePackage(planId)" class="item">
                        <span class="title">价格套餐</span>
                        <span class="reload">
                            <span v-if="pricePack.prices.filter(item => item.selected === true).length" class="num">{{pricePack.prices.filter(item => item.selected === true)[0].priceTitle}}</span>
                            <i class="iconfont icon-right"></i>
                        </span>
                    </div>
                    <!-- 微站模式 -->
                    <div v-if="!storeId" v-for="item in pricePack.prices" :key="item.id">
                        <div v-show="item.selected">
                            <div v-if="item.newAdultPrice" class="item">
                                <span class="title">{{pricePack.showName.adultPrice}}</span>
                                <span class="reload num-count">
                                    <div class="big-num">¥{{item.newAdultPrice | .00}}</div>
                                    <div class="count">
                                        <div @click="inputNum({type: 'adultNum', operate: -1})" class="reduce">-</div>
                                        <div class="current-num">{{item.adultNum}}</div>
                                        <div @click="inputNum({type: 'adultNum', operate: 1})" class="add">+</div>
                                    </div>
                                </span>
                            </div>
                            <div v-if="item.newAdultPrice1" class="item">
                                <span class="title">{{pricePack.showName.adultPrice1}}</span>
                                <span class="reload num-count">
                                    <div class="big-num">¥{{item.newAdultPrice1 | .00}}</div>
                                    <div class="count">
                                        <div @click="inputNum({type: 'adult1Num', operate: -1})" class="reduce">-</div>
                                        <div class="current-num">{{item.adult1Num}}</div>
                                        <div @click="inputNum({type: 'adult1Num',  operate: 1})" class="add">+</div>
                                    </div>
                                </span>
                            </div>
                            <div v-if="item.newAdultPrice2" class="item">
                                <span class="title">{{pricePack.showName.adultPrice2}}</span>
                                <span class="reload num-count">
                                    <div class="big-num">¥{{item.newAdultPrice2 | .00}}</div>
                                    <div class="count">
                                        <div @click="inputNum({type: 'adult2Num', operate: -1})" class="reduce">-</div>
                                        <div class="current-num">{{item.adult2Num}}</div>
                                        <div @click="inputNum({type: 'adult2Num', operate: 1})" class="add">+</div>
                                    </div>
                                </span>
                            </div>
                            <div v-if="item.newChildPrice" class="item">
                                <span class="title">{{pricePack.showName.childPrice}}</span>
                                <span class="reload num-count">
                                    <div class="big-num">¥{{item.newChildPrice | .00}}</div>
                                    <div class="count">
                                        <div @click="inputNum({type: 'childNum', operate: -1})"  class="reduce">-</div>
                                        <div class="current-num">{{item.childNum}}</div>
                                        <div @click="inputNum({type: 'childNum', operate: 1})" class="add">+</div>
                                    </div>
                                </span>
                            </div>
                            <div v-if="item.newChildPrice1" class="item">
                                <span class="title">{{pricePack.showName.childPrice1}}</span>
                                <span class="reload num-count">
                                    <div class="big-num">¥{{item.newChildPrice1 | .00}}</div>
                                    <div class="count">
                                        <div @click="inputNum({type: 'child1Num', operate: -1})" class="reduce">-</div>
                                        <div class="current-num">{{item.child1Num}}</div>
                                        <div @click="inputNum({type: 'child1Num', operate: 1})" class="add">+</div>
                                    </div>
                                </span>
                            </div>
                        </div>
                    </div>
                    <!-- 店铺模式，已开通在线注册及支付 -->
                    <div v-if="storeId && shop.allowRegist" v-for="item in pricePack.prices" :key="item.id">
                        <div v-show="item.selected">
                            <div v-if="item.newAdultPrice" class="item">
                                <span class="title">{{pricePack.showName.adultPrice}}</span>
                                <span class="reload num-count">
                                    <div class="big-num">¥{{item.newAdultPrice | .00}}</div>
                                    <div class="count">
                                        <div @click="inputNum({type: 'adultNum', operate: -1})" class="reduce">-</div>
                                        <div class="current-num">{{item.adultNum}}</div>
                                        <div @click="inputNum({type: 'adultNum', operate: 1})" class="add">+</div>
                                    </div>
                                </span>
                            </div>
                            <div v-if="item.newAdultPrice1" class="item">
                                <span class="title">{{pricePack.showName.adultPrice1}}</span>
                                <span class="reload num-count">
                                    <div class="big-num">¥{{item.newAdultPrice1 | .00}}</div>
                                    <div class="count">
                                        <div @click="inputNum({type: 'adult1Num', operate: -1})" class="reduce">-</div>
                                        <div class="current-num">{{item.adult1Num}}</div>
                                        <div @click="inputNum({type: 'adult1Num',  operate: 1})" class="add">+</div>
                                    </div>
                                </span>
                            </div>
                            <div v-if="item.newAdultPrice2" class="item">
                                <span class="title">{{pricePack.showName.adultPrice2}}</span>
                                <span class="reload num-count">
                                    <div class="big-num">¥{{item.newAdultPrice2 | .00}}</div>
                                    <div class="count">
                                        <div @click="inputNum({type: 'adult2Num', operate: -1})" class="reduce">-</div>
                                        <div class="current-num">{{item.adult2Num}}</div>
                                        <div @click="inputNum({type: 'adult2Num', operate: 1})" class="add">+</div>
                                    </div>
                                </span>
                            </div>
                            <div v-if="item.newChildPrice" class="item">
                                <span class="title">{{pricePack.showName.childPrice}}</span>
                                <span class="reload num-count">
                                    <div class="big-num">¥{{item.newChildPrice | .00}}</div>
                                    <div class="count">
                                        <div @click="inputNum({type: 'childNum', operate: -1})"  class="reduce">-</div>
                                        <div class="current-num">{{item.childNum}}</div>
                                        <div @click="inputNum({type: 'childNum', operate: 1})" class="add">+</div>
                                    </div>
                                </span>
                            </div>
                            <div v-if="item.newChildPrice1" class="item">
                                <span class="title">{{pricePack.showName.childPrice1}}</span>
                                <span class="reload num-count">
                                    <div class="big-num">¥{{item.newChildPrice1 | .00}}</div>
                                    <div class="count">
                                        <div @click="inputNum({type: 'child1Num', operate: -1})" class="reduce">-</div>
                                        <div class="current-num">{{item.child1Num}}</div>
                                        <div @click="inputNum({type: 'child1Num', operate: 1})" class="add">+</div>
                                    </div>
                                </span>
                            </div>
                        </div>
                    </div>

                </div>

                <!-- 团期提醒 -->
                <div v-if="dates.dates[selectedDay].planInfo" class="recommend">
                    {{dates.dates[selectedDay].planInfo.slice(0, 20)}}
                </div>
                <div v-if="!dates.dates[selectedDay].planInfo" class="recommend">
                    由于各资源信息实时更新,价格以订单结算页面价格为准
                </div>
            </div>

            <!-- <div v-if="periods.length === 0">
                <div class="section">
                    <div class="item">
                        <span class="title">当天无团期，选择其他天试试吧~</span>
                    </div>
                </div>
            </div> -->
        </div>

        <!-- 继续预定 微站模式 -->
        <div v-if="!storeId" class="confirm">
            <div class="price">
                <span class="sum-title">总额:</span>
                <span class="tag">¥</span>
                <span class="sum-price">{{sum | .00}}</span>
                <span @click="show()" class="detail">明细</span>
            </div>
            <div @click="confirmLine()" class="button">
                <span class="button-text">继续预定</span>
            </div>
        </div>

        <!-- 继续预定 店铺模式，已开通在线注册及支付 -->
        <div v-if="storeId && shop.allowRegist" class="confirm">
            <div class="price">
                <span class="sum-title">总额:</span>
                <span class="tag">¥</span>
                <span class="sum-price">{{sum | .00}}</span>
                <span @click="show()" class="detail">明细</span>
            </div>
            <div @click="confirmLine()" class="button">
                <span class="button-text">继续预定</span>
            </div>
        </div>

        <!-- 店铺模式，未开通在线注册及支付 -->
        <shop-phone v-if="storeId && !shop.allowRegist"></shop-phone>

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
                    <span class="label-text">¥&nbsp;{{sum | .00}}</span>
                </div>
                <div class="content">
                    <div v-for="item in pricePack.prices" :key="item.id">
                        <div v-show="item.selected">
                            <div v-show="item.adultNum > 0" class="content-item inline">
                                <span class="label">成人</span>
                                <span class="content-text">¥&nbsp;{{item.newAdultPrice | .00}}&nbsp;x&nbsp;{{item.adultNum}}人</span>
                            </div>
                            <div v-show="item.adult1Num > 0" class="content-item inline">
                                <span class="label">小年轻</span>
                                <span class="content-text">¥&nbsp;{{item.newAdultPrice1 | .00}}&nbsp;x&nbsp;{{item.adult1Num}}人</span>
                            </div>
                            <div v-show="item.adult2Num > 0" class="content-item inline">
                                <span class="label">老人</span>
                                <span class="content-text">¥&nbsp;{{item.newAdultPrice2 | .00}}&nbsp;x&nbsp;{{item.adult2Num}}人</span>
                            </div>
                            <div v-show="item.childNum > 0" class="content-item inline">
                                <span class="label">小童</span>
                                <span class="content-text">¥&nbsp;{{item.newChildPrice | .00}}&nbsp;x&nbsp;{{item.childNum}}人</span>
                            </div>
                            <div v-show="item.child1Num > 0" class="content-item inline">
                                <span class="label">小童不占床</span>
                                <span class="content-text">¥&nbsp;{{item.newChildPrice1 | .00}}&nbsp;x&nbsp;{{item.child1Num}}人</span>
                            </div>
                            <div v-show="item.adultNum + item.adult1Num + item.adult2Num +  item.childNum + item.child1Num > 0" class="content-item inline">
                                <span class="label">杂费</span>
                                <span class="content-text">¥&nbsp;{{otherBillPrice | .00}}&nbsp;x&nbsp;{{item.adultNum + item.adult1Num + item.adult2Num +  item.childNum + item.child1Num }}人</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 优惠政策 -->
                <!-- <div class="class inline border-bottom">
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
                </div> -->

                <!-- 附加产品 -->
                <!-- <div class="class inline border-bottom">
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
                </div> -->
            </div>
            <div class="order-sum">
                <span class="sum-title">总额</span>
                <span class="sum-price">¥&nbsp;{{sum}}</span>
            </div>

            <div class="closed">
                <i class="iconfont icon-close" @click="maskShow = !maskShow"></i>
            </div>
            <div class="mask">
            </div>
        </div>

    </div>
</template>

<script type="text/ecmascript-6">
import {Toast} from 'mint-ui'
import { mapGetters } from 'vuex'
import shopPhone from '../components/shop-phone.vue'
import util from '../util.js'
export default {
    name: 'LineInput',
    data() {
      return {
          packages: [],
          defaultPack: {},
          maskShow: false,
          plans: [],
          currentPlan: [],
          selectedYear: '',
          selectedMonth: '',
          lineID: '',
          storeId: ''
      }
    },
    components: {
        shopPhone
    },
    computed: {
        ...mapGetters([
            'selectedPack',
            'city',
            'dates',
            'periods',
            'months',
            'planId',
            'selectedCity',
            'selectedDay',
            'otherBillPrice', // 杂费
            'pricePack', // 价格套餐
            'cities', // 出发城市
            'selectedMon',
            'selectedDate',
            'requery',
            'selectedCityName',
            'sum',
            'editedInit',
            'mdDevice',
            'getSiteInfo',
            'shop',
            'lineInputTitle'
          ])
    },
    methods: {
        toStartCity(id) {
            if(this.storeId) {
                this.$router.push({path: `/shop-start-city/${id}`, query: {storeId: this.storeId}})
            } else {
                this.$router.push({path: `/start-city/${id}`})
            }
        },
        toPricePackage(id) {
            if(this.storeId) {
                this.$router.push({path: `/shop-price-package/${id}`, query: {storeId: this.storeId}})
            } else {
                this.$router.push({path: `/price-package/${id}`})
            }
        },
        back() {
            if(window.history.length <= 1) {
                this.$router.push('/');
            } else {
                this.$router.go(-1);
            }
        },
        show() {
            window.scroll(0, 0)
            this.maskShow = true
        },
        /* 点击立即预定 */
        confirmLine() {
            if (this.sum === 0) {
                Toast({ message: '最少需选择一名游客', position: 'bottom', duration: 5000 })
            } else {
                this.$router.push(`/order-info/${this.planId}`)
                this.$store.commit('setOrdered', false)
            }
        },
        // 选择游客个数
        inputNum(val) {
            this.$store.commit('setTouristNum', val)
        },
        /* 切换月份 */
        async searchPlans (id, index) {
            /* 日历初始化 */
            const year = new Date(id).getFullYear()
            const month = new Date(id).getMonth() + 1
            const today = new Date().getDate()
            util.get_data(year, month)
            util.move_day1(year,month, this.dates.dates)
            util.hide_days(year,month, this.dates.dates)
            /* 请求数据 */
            this.$store.commit('setPlanId', '')
            this.$store.commit('setMonths', id)
            await this.$store.dispatch('getPlans', {'mon': index + 1, 'pds': id, 'lineID' : this.lineID})
            await this.$store.dispatch('getCurrentPlan', {'pds': id, 'lineID': this.lineID})
            if (this.planId) {
                this.$store.dispatch('getCities', {planId :this.planId, cityName: this.selectedCityName})
                this.$store.dispatch('getPackages', this.planId)
            }

        },
        /* 切换日期 */
        async searchPlanABC(item, index) {
            let year = new Date(item.planDate).getFullYear()
            let mon = new Date(item.planDate).getMonth() + 1
            let today = new Date(item.planDate).getDate()
            this.$store.commit('setPlanId', '')
            let currentDay = new Date().getDate()
            let currentMon = this.months.filter(item => item.selected === true)[0].id - new Date().getMonth()
            this.dates.dates.forEach(item => {
                item.selected = false
            })
            this.$store.commit('setSelectedDay', index)
            await this.$store.dispatch('getCurrentPlan', {'pds': item.planDate, 'lineID': this.lineID})
            if (this.planId) {
                await this.$store.dispatch('getCities', {planId :this.planId, cityName: this.selectedCityName})
                await this.$store.dispatch('getPackages', this.planId)
            }
        },
        /* 切换abc团期 */
        async filterPlanABC (item, index) {
            this.$store.commit('changePeriods', index)
            // 请求数据
            await this.$store.dispatch('getCities', {planId :item.id, cityName: this.selectedCityName})
            await this.$store.dispatch('getPackages', item.id)
            // 改变团期id
            this.$store.commit('setPlanId', item.id)
            // 设置当前日期的价格和余票
            this.$store.commit('setDate', item)
        },
        // 选择日期，查看团期
        checkPeriod(index, arr) {
            this[arr].forEach(item => {
                item.selected = false
            })
            this[arr][index].selected = true
        },
        
        // 选中团期跳转到日历指定位置，未登录，通过qq或微信登录后调用此方法
        choiceDate (val, id, cityName) {
            let mon = parseInt(val.slice(0, 2), 10) - parseInt(new Date().getMonth(), 10)
            let date = `${new Date().getFullYear()}-${val.slice(0, 2)}-${val.slice(3,5)}`
            this.$store.commit('selectCityName', cityName);
            this.$store.commit('setMonths', parseInt(val.slice(0, 2), 10))
            this.$store.commit('setDetailMon', mon)
            this.$store.commit('setDetailDate', date)
            this.$store.commit('setPlanId', id)
        },
        // 检查当前页面是否是qq或微信登录后跳转的页面
        checkRedirect() {
            const role = window.localStorage.getItem('role')
            const redirectDate = window.localStorage.getItem('redirectDate')
            const id = window.localStorage.getItem('setPlanId')
            const selectCityName = window.localStorage.getItem('selectCityName')
            if((role === 'qq' || role === 'wx') && redirectDate && selectCityName) {
                this.choiceDate(redirectDate, id, selectCityName)
            }
            window.localStorage.clear()
        }

     },
    async created() {
        this.lineId = this.$route.params.id;
        /* 如果地址包含storeId/v/index.html#/home?storeId=123456，说明当前在店铺模式下 */
        let storeId = this.$route.query.storeId
        if(storeId) {
            this.storeId = storeId
        }
        /* 初始化日历 */
        //实现五：当载入页面时，获取当前年和月，显示当月日历；当改变年或月时，获取改变后的年和月，更新当月日历
        let today = new Date().toISOString().slice(0, 10)
        let year = new Date().getFullYear()
        let month = new Date().getMonth() + 5
        util.get_data()
        util.move_day1(year,this.selectedMon + new Date().getMonth(), this.dates.dates)
        util.hide_days(year,this.selectedMon + new Date().getMonth(), this.dates.dates)

        this.lineID = parseInt(this.$route.params.id, 10)

        // 检查当前页面是否是qq或微信登录后跳转的页面
        this.checkRedirect()

        // 无选中。默认进入此页面
        // 获取当月团期
        if (!this.dates.queryed || this.requery) {
            await this.$store.dispatch('getPlans', {'mon': this.selectedMon, 'pds': this.selectedDate, 'lineID' : this.lineID})
        }

        /* 获取当月最低价 */
        if (!this.months[0].price || this.requery) {
            await this.$store.dispatch('minSadultPrice', this.lineID)
        }
        // 获取当天团期
        if (!this.periods.length || this.requery) {
            await this.$store.dispatch('getCurrentPlan', {'pds': this.selectedDate, 'lineID': this.lineID})
        }
        // 获取出发城市
        if (Boolean(this.planId && this.requery)) {
            await this.$store.dispatch('getCities', {planId :this.planId, cityName: this.selectedCityName})
        }
        // 请求价格套餐
        if (Boolean(this.planId) && this.requery) {
            await this.$store.dispatch('getPackages', this.planId)
        }
        this.$store.commit('setRequery', false)
        

    }
}
</script>

<style scoped lang="scss">
@import './line-input.scss';
@import './calendar.scss'
</style>
