<template>
    <div class="order-info-page page-wrapper" :class="{scroll: maskShow}">
        <mt-header fixed title="出游信息填写">
            <div @click="back()" slot="left">
                <mt-button icon="back"></mt-button>
            </div>
        </mt-header>

        <div class="scroll-box">
            <div class="head-bg">
                <div class="title-wrapper" :class="{titleLong: periods[0].lineTitle.length > 30 && !titleMore}">
                    <h1 v-show="!titleMore" @click="titleMore = true" class="title">{{periods[0].lineTitle.slice(0, 46)}}</h1>
                    <h1 v-show="titleMore" class="title">{{periods[0].lineTitle}}</h1>
                    <i @click="titleMore = true" v-show="!titleMore" class="iconfont icon-xiajiantou"></i>
                </div>
                <div class="add">
                    <p class="start">{{periods[0].planDate |  MMM-DD }}&nbsp;出发</p>
                    <p class="num">
                        <span v-if="pricePack.prices.filter(item => item.selected === true)[0].adultNum + pricePack.prices.filter(item => item.selected === true)[0].adult1Num + pricePack.prices.filter(item => item.selected === true)[0].adult2Num > 0" class="adu">成人x<span class="num">{{pricePack.prices.filter(item => item.selected === true)[0].adultNum + pricePack.prices.filter(item => item.selected === true)[0].adult1Num + pricePack.prices.filter(item => item.selected === true)[0].adult2Num}}</span></span>
                        <span v-if="pricePack.prices.filter(item => item.selected === true)[0].childNum + pricePack.prices.filter(item => item.selected === true)[0].child1Num > 0" class="adu">儿童x<span class="num">{{pricePack.prices.filter(item => item.selected === true)[0].childNum + pricePack.prices.filter(item => item.selected === true)[0].child1Num}}</span></span>
                    </p>
                </div>
            </div>

            <!-- <div class="section has-confirm">
                <div class="icon">
                    <i class="iconfont icon-good"></i>
                </div>
                <div class="text">
                    <h1 class="title">即时确认</h1>
                    <p class="info">本产品付款后快速确认，放心期待您的旅游</p>
                </div>
            </div> -->

            <div class="section">
                <div class="item">
                    <span class="title">联系人信息</span>
                    <span class="reload">
                        <span class="num"></span>
                    </span>
                </div>
                <div class="item name">
                    <div class="title label">
                        <span class="need">*</span><span class="title">联系人</span>
                    </div>
                    <div class="content">
                        <input style="line-height:38px" type="text" v-model="orderInfo.ctName" placeholder="请填写联系人的姓名">
                    </div>
                </div>
                <div class="item phone none-border-bottom">
                    <div class="title label">
                        <span class="need">*</span><span class="title">手机号码</span>
                    </div>
                    <div class="content">
                        <input style="line-height:38px" type="text" v-model="orderInfo.ctInfo" placeholder="必填，用于接收短信">
                    </div>
                </div>
            </div>


            <div class="section add-tourist">
                <div class="item">
                    <span class="title">出游人信息</span>
                    <span class="reload">
                        <span class="num"></span>
                    </span>
                </div>
                <div v-for="item in editArr" :key="item.id" @click="toEdit(item.id)" class="item">
                    <div class="title">
                        <span v-show="item.type === '成人'">成人</span>
                        <span v-show="item.type === '小青年'">小青年</span>
                        <span v-show="item.type === '老人'">老人</span>
                        <span v-show="item.type === '儿童占床'">儿童占床</span>
                        <span v-show="item.type === '儿童不占床'">儿童不占床</span>
                    </div>
                    <span class="content">
                        <span>{{item.idInfo.cnName || item.passInfo.cnName || item.taiwanInfo.cnName || item.otherInfo.cnName}}</span>
                        <i class="iconfont icon-right"></i>
                    </span>
                </div>
                <!-- <div class="add">
                    <div class="add-button">添加出行人</div>
                    <p class="notice">为了您的顺利出行,请务必保证填写项与出游所持证件一致</p>
                </div> -->
            </div>
            <!-- <div class="hide">
                <div class="section">
                    <h1 class="head">优惠政策</h1>
                    <div class="item">
                        <span class="title">我的优惠金额</span>
                        <span class="reload">
                            <span class="num">¥&nbsp;600</span>
                            <i class="iconfont icon-right"></i>
                        </span>
                    </div>
                </div>
                <div class="section">
                    <h1 class="head">优惠券</h1>
                    <div class="item">
                        <span class="title">卡券优惠的金额</span>
                        <span class="reload">
                            <span class="num">¥&nbsp;600</span>
                            <i class="iconfont icon-right"></i>
                        </span>
                    </div>
                </div>
                <div class="section">
                    <h1 class="head">附加产品</h1>
                    <div class="item">
                        <span class="title">接送机服务</span>
                        <span class="reload">
                            <span class="num">¥&nbsp;600</span>
                            <i class="iconfont icon-right"></i>
                        </span>
                    </div>
                    <div class="item">
                        <span class="title">保险服务</span>
                        <span class="reload">
                            <span class="num">¥&nbsp;50</span>
                            <i class="iconfont icon-right"></i>
                        </span>
                    </div>

                    <div class="item">
                        <span class="title">单房差费用</span>
                        <span class="reload">
                            <span class="num">¥&nbsp;600</span>
                            <i class="iconfont icon-right"></i>
                        </span>
                    </div>
                </div>
            </div> -->



            <div class="section">
            <!-- <div class="section" :class="{marginBottom: sellersShow !== 0}"> -->
                <div class="item">
                    <span class="title">订单备注</span>
                    <span class="reload">
                        <span class="num"></span>
                    </span>
                </div>
                <div class="add">
                    <textarea v-model="orderInfo.ordBak" class="textarea" placeholder="可以输入150字以内的订单备注"></textarea>
                </div>
            </div>

            <div v-if="sellers.isShowSale === 0" class="section choice-seller">
                <router-link :to="'/sellers'" class="item none-border-bottom">
                    <span class="title">销售</span>
                    <span class="reload">
                        <span v-if="sellers.saleList.length === 1" class="num">
                            {{sellers.saleList[0].name}}
                        </span>
                        <span v-if="sellers.saleList.length > 1 && sellers.saleList.filter(item => item.selected === true).length" class="num">
                            {{sellers.saleList.filter(item => item.selected === true)[0].name}}
                        </span>
                        <span v-if="sellers.saleList.length > 1 && !sellers.saleList.filter(item => item.selected === true).length" class="num">
                            {{'选择销售'}}
                        </span>
                        <i class="iconfont icon-right"></i>
                    </span>
                </router-link>
            </div>
        </div>

        <!-- 提交订单 -->
        <div class="confirm">
            <div class="price">
                <span class="sum-title">总额:</span>
                <span class="tag">¥</span>
                <span class="sum-price">{{sum | .00}}</span>
                <span @click="show()" class="detail">明细</span>
            </div>
            <div class="button">
                <button @click="enterOrder()" :disabled="orderSumbiting" class="button-text">提交订单</button>
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

            </div>
            <div class="order-sum">
                <span class="sum-title">总额</span>
                <span class="sum-price">¥&nbsp;{{sum | .00}}</span>
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
import { mapGetters } from 'vuex'
import {Toast, Indicator} from 'mint-ui'
import {MessageBox} from 'mint-ui'
export default {
    data() {
      return {
        titleMore: false,
        sellerVisible: false,
        sellerName: '',
        sellersShow: '',
        selectedSeller: '',
        maskShow: false,
        contactName: '',
        contactPhone: '',
        orderMark: '',
        orderInfo: {
            aduNum: this.$store.state.lineInput.linePlan.pricePack.prices.filter(item => item.selected === true)[0].adultNum || 0,  //成人数
            aduNum1: this.$store.state.lineInput.linePlan.pricePack.prices.filter(item => item.selected === true)[0].adult1Num || 0,  // 小青年数
            aduNum2: this.$store.state.lineInput.linePlan.pricePack.prices.filter(item => item.selected === true)[0].adult2Num || 0,  //老人数
            chdNum: this.$store.state.lineInput.linePlan.pricePack.prices.filter(item => item.selected === true)[0].childNum || 0,  //小童数
            chdNum1: this.$store.state.lineInput.linePlan.pricePack.prices.filter(item => item.selected === true)[0].child1Num || 0,  //小童不占床数
            ctName: '', // 联系人姓名
            ctInfo: '', //联系人电话
            planId: this.$store.state.lineInput.linePlan.planId, //团期id
            ordBak: '', //订单备注
            saleId: '', //销售
            baseTransportCityId: this.$store.state.lineInput.cities.filter(item => item.selected === true)[0].id, //联运城市id,无联运城市：0
            linePlanPriceId: this.$store.state.lineInput.linePlan.pricePack.prices.filter(item => item.selected === true)[0].id, // 价格套餐id,默认套餐：0
            sources: '微店' // 下单参数
        },
        orderSumbiting: false,
        editNeed: ''
      }
    },
    methods: {
        toEdit(id) {
            this.$router.push(`/order-edit/${id}`)
            this.$store.commit('initEdit')
        },
        show () {
            window.scroll(0, 0)
            this.maskShow = true
        },
        back() {
            MessageBox.confirm('是否要离开此页面?如果离开，填写的游客信息会丢失').then(action => {
                if (action === 'confirm') {
                    this.$store.commit('resetEdit', true)
                    this.$router.go(-1)
                }
            }).catch(error => {
            })
        },
        /* 验证 */
        infoValidate() {
            if (!this.orderInfo.ctName) {
                Toast({message: '联系人名称是必填项',position: 'bottom',duration: 3000})
                return false
            } else if (this.orderInfo.ctName && this.orderInfo.ctName.length > 20) {
                Toast({message: '联系人名称不能超过20个字符',position: 'bottom',duration: 3000})
                return false
            } else if(!this.orderInfo.ctInfo) {
                Toast({message: '手机号码是必填项',position: 'bottom',duration: 3000})
                return false
            } else if (this.orderInfo.ctInfo && !/[0-9]{11}/.test(parseInt(this.orderInfo.ctInfo), 10) ){
                Toast({message: '请输入正确的手机号码',position: 'bottom',duration: 3000})
            } else if (this.orderInfo.ordBak && this.orderInfo.ordBak.length > 150) {
                Toast({message: '请输入150字以内的订单备注',position: 'bottom',duration: 3000})
                return false
            } else if (this.sellers.isShowSale === 0 && this.orderInfo.saleId === '') {
                Toast({message: '请选择销售',position: 'bottom',duration: 3000})
                return false
            } else {
                return true
            }
        },
        /* 下单 */
        async enterOrder() {
            if(this.editNeed === '1') {
                if(this.checkInfo()) {
                    // 获取提交的游客信息
                    this.formateInfo(this.editArr)
                    let seller = this.sellers.saleList.filter(item => item.selected === true)
                    if (seller.length) {
                        this.orderInfo.saleId = seller[0].id
                    } else {
                        this.orderInfo.saleId = ''
                    }
                    if (this.ordered) {
                        Toast({message: '订单已失效！', position: 'bottom',duration: 3000})
                    } else {
                        if(this.infoValidate()) {
                            /* 验证通过提交订单 */
                            Indicator.open('订单已提交，正在占位中...')
                            setTimeout(() => {
                                this.order()
                                this.$store.commit('setOrdered', true)
                                Indicator.close()
                            }, 3000)
                                            
                        }
                    }
                }
            } else {
                this.formateInfo(this.editArr)
                let seller = this.sellers.saleList.filter(item => item.selected === true)
                if (seller.length) {
                    this.orderInfo.saleId = seller[0].id
                } else {
                    this.orderInfo.saleId = ''
                }
                if (this.ordered) {
                    Toast({message: '订单已失效！', position: 'bottom',duration: 3000})
                } else {
                    if(this.infoValidate()) {
                        /* 验证通过提交订单 */
                        Indicator.open('订单已提交，正在占位中...')
                        setTimeout(() => {
                            this.order()
                            this.$store.commit('setOrdered', true)
                            Indicator.close()
                        }, 3000)
                                        
                    }
                }
            }
            
        },
        /* 联系人信息 */
        getUser () {
            this.$http.get('/ms/user/info'
            ).then(res => {
                if (res.data.status === 200) {
                    let result = res.data.data
                    this.orderInfo.ctName = result.trueName
                    this.orderInfo.ctInfo = result.mobile
                } else if(res.data.status !== 100) {
                    Toast({message: res.data.msg, position: 'bottom',duration: 3000})
                }
            })
        },
        /* 验证游客信息是否填写完整 */
        checkInfo() {
            for (const i in this.editArr) {
                let idType = this.editArr[i].selectedIdType
                if(idType === '01') {
                    if(!this.editArr[i].idInfo.save) {
                        Toast({message: `${this.editArr[i].type}的身份证信息未填写完整`, position: 'bottom',duration: 3000})
                        return false
                    }
                } else if(idType === '03') {
                    if(!this.editArr[i].passInfo.save) {
                        Toast({message: `${this.editArr[i].type}的护照信息未填写完整`, position: 'bottom',duration: 3000})
                        return false
                    }
                } else if(idType === '09') {
                    if(!this.editArr[i].taiwanInfo.save) {
                        Toast({message: `${this.editArr[i].type}的台湾通行证信息未填写完整`, position: 'bottom',duration: 3000})
                        return false
                    }
                } else if(idType === '99') {
                    if(!this.editArr[i].otherInfo.save) {
                        Toast({message: `${this.editArr[i].type}的其他证件信息未填写完整`, position: 'bottom',duration: 3000})
                        return false
                    }
                }
            }
            return true
        },
        /* 提取游客信息 */
        formateInfo(arr) {
            let arr1 = []
            arr.forEach(item => {
              if(item.selectedIdType === '01') {
                  item.idInfo.perType = item.type
                  arr1.push(item.idInfo)
              } else if(item.selectedIdType === '03') {
                  item.passInfo.perType = item.type
                  arr1.push(item.passInfo)
              } else if(item.selectedIdType === '09') {
                  item.taiwanInfo.perType = item.type
                  arr1.push(item.taiwanInfo)
              } else if(item.selectedIdType === '99') {
                  item.otherInfo.perType = item.type
                  arr1.push(item.otherInfo)
              }
            })
            this.orderInfo.linePlanOrdUsers = arr1
        },
        /* 游客信息是否必填配置项 */
        async editConfig() {
            await this.$http.post('/ms/order/user/needNameList'
            ).then(res => {
                if (res.data.status === 200) {
                    let result = res.data.data.flag
                    this.editNeed = result
                } else if(res.data.status !== 100) {
                    Toast({message: res.data.msg, position: 'bottom',duration: 3000})
                }
            })
        },
        /* 下单 */
        async order() {
            this.orderSumbiting = true
            await this.$http.post('/member/lp_ord/createord',
                this.orderInfo
            ).then (res => {
                if (res.data.status === 1) {
                    Toast({message: res.data.msg, position: 'bottom',duration: 3000})
                    this.$router.push('/user-center')
                    this.orderSumbiting = false
                } else {
                    Toast({message: '下单成功', position: 'bottom',duration: 3000})
                    this.$router.push('/order-list')
                    this.orderSumbiting = false
                }
            })
        },
        // 根据下单游客人数，生成数组对象
        initEdits() {
            let id = -1
            this.$store.commit('clearEdit')
            this.$store.commit('resetEdit', false)
            if(this.orderInfo.aduNum) {
                for (let index = 0; index < this.orderInfo.aduNum; index++) {
                    id += 1
                    this.$store.commit('addEidt', {id: id, type: '成人'})
                }
            }
            if(this.orderInfo.aduNum1) {
                for (let index = 0; index < this.orderInfo.aduNum1; index++) {
                    id += 1
                    this.$store.commit('addEidt', {id: id, type: '小青年'})
                }
            }
            if(this.orderInfo.aduNum2) {
                for (let index = 0; index < this.orderInfo.aduNum2; index++) {
                    id += 1
                    this.$store.commit('addEidt', {id: id, type: '老人'})
                }
            }
            if(this.orderInfo.chdNum) {
                for (let index = 0; index < this.orderInfo.chdNum; index++) {
                    id += 1
                    this.$store.commit('addEidt', {id: id, type: '儿童占床'})
                }
            }
            if(this.orderInfo.chdNum1) {
                for (let index = 0; index < this.orderInfo.chdNum1; index++) {
                    id += 1
                    this.$store.commit('addEidt', {id: id, type: '儿童不占床'})
                }
            }

        }

    },
    computed: {
        ...mapGetters([
            'periods',
            'sum',
            'otherBillPrice', // 杂费
            'sellers',
            'pricePack',
            'ordered',
            'editArr',
            'editedInit',
            'resetedit',
            'idType'
        ])
    },
    created() {
        this.getUser()
        this.editConfig()
        if (!this.sellers.saleList.length) {
            this.$store.dispatch('getSellers')
        }
        // 第一次进入出游信息页，根据出游人数初始化信息
        if(!this.editedInit) {
            this.initEdits()
        }

        if(this.resetedit) {
            this.initEdits()
        }
    }
}
</script>

<style scoped lang="scss">
@import './order-info.scss';
</style>
