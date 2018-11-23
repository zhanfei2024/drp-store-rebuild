import Vue from 'vue'
import Router from 'vue-router'
// import formLogin from '@/components/form/form-login.vue'

Vue.use(Router)

const router = new Router({
    base: '/v/',
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        /* 会员中心 */
        {
            path: '/user-center',
            meta: {requireAuth: true},
            name: 'userCenter',
            component (resolve) {
                require.ensure(['../components/user-center.vue'], () => {
                    resolve(require('../components/user-center.vue'))
                }, 'user-center')
            }
        },
        /* 登录 */
        {
            path: '/peer-form-login',
            name: 'peerFormLogin',
            component (resolve) {
                require.ensure(['../page/peer-form-login.vue'], () => {
                    resolve(require('../page/peer-form-login.vue'))
                }, '/peer-form-login')
            }
        },
        /* 登录 */
        {
            path: '/form-login',
            name: 'formLogin',
            component (resolve) {
                require.ensure(['../components/form/form-login.vue'], () => {
                    resolve(require('../components/form/form-login.vue'))
                }, 'form-login')
            }
        },
        /* 注册 */
        {
            path: '/form-register',
            name: 'formRegister',
            component (resolve) {
                require.ensure(['../components/form/form-register.vue'], () => {
                    resolve(require('../components/form/form-register.vue'))
                }, 'form-register')
            }
        },
        /* 找回密码 */
        {
            path: '/find-pass',
            name: 'findPass',
            component (resolve) {
                require.ensure(['../components/form/find-pass.vue'], () => {
                    resolve(require('../components/form/find-pass.vue'))
                }, 'find-pass')
            }
        },
        /* 个人资料 */
        {
            path: '/person-peer',
            meta: { requireAuth: true },
            name: 'personPeer',
            component (resolve) {
                require.ensure(['../components/form/person-peer.vue'], () => {
                    resolve(require('../components/form/person-peer.vue'))
                }, 'person-peer')
            }
        },
        /* 同行认证-个人资料 */
        {
            path: '/person-general',
            meta: { requireAuth: true },
            name: 'personGeneral',
            component (resolve) {
                require.ensure(['../components/form/person-general.vue'], () => {
                    resolve(require('../components/form/person-general.vue'))
                }, 'person-general')
            }
        },
        /* 修改密码 */
        {
            path: '/modify-pass',
            name: 'modifyPass',
            meta: { requireAuth: true },
            component (resolve) {
                require.ensure(['../components/form/modify-pass.vue'], () => {
                    resolve(require('../components/form/modify-pass.vue'))
                }, 'modify-pass')
            }
        },
        /* 绑定手机 */
        {
            path: '/bind-phone',
            // meta: { requireAuth: true },
            name: 'bindPhone',
            component (resolve) {
                require.ensure(['../components/form/bind-phone.vue'], () => {
                    resolve(require('../components/form/bind-phone.vue'))
                }, 'bind-phone')
            }
        },
        /* 首页 */
        {
            path: '/home',
            name: 'Home',
            component (resolve) {
                require.ensure(['../page/home.vue'], () => {
                    resolve(require('../page/home.vue'))
                }, '/home')
            }
        },
        /* 产品列表 */
        {
            path: '/line-list',
            name: 'lineList',
            component (resolve) {
                require.ensure(['../page/line-list.vue'], () => {
                    resolve(require('../page/line-list.vue'))
                }, '/line-list')
            }
        },
        /* 产品筛选 */
        {
            path: '/line-filter',
            name: 'LineFilter',
            component (resolve) {
                require.ensure(['../page/line-filter.vue'], () => {
                    resolve(require('../page/line-filter.vue'))
                }, '/line-filter')
            }
        },
        /* 订单列表 */
        {
            path: '/order-list',
            name: 'orderList',
            meta: { requireAuth: true },
            component (resolve) {
                require.ensure(['../page/order-list.vue'], () => {
                    resolve(require('../page/order-list.vue'))
                }, '/order-list')
            }
        },
        /* 订单筛选 */
        {
            path: '/order-filter',
            meta: { requireAuth: true },
            name: 'orderFilter',
            component (resolve) {
                require.ensure(['../page/order-filter.vue'], () => {
                    resolve(require('../page/order-filter.vue'))
                }, '/order-filter')
            }
        },
        /* ********************微站直客和同行模式start****************** */
        /* 下单选择团期 */
        {
            path: '/line-input/:id',
            meta: {
                requireAuth: true,
                author: 'readAndWrite'
            },
            name: 'lineInput',
            component (resolve) {
                require.ensure(['../page/line-input.vue'], () => {
                    resolve(require('../page/line-input.vue'))
                }, 'lineInput')
            }
        },
        /* 下单选择出发城市 */
        {
            path: '/start-city/:id',
            meta: { requireAuth: true },
            name: 'startCity',
            component (resolve) {
                require.ensure(['../page/start-city.vue'], () => {
                    resolve(require('../page/start-city.vue'))
                }, 'startCity')
            }
        },
        /* 下单选择价格套餐 */
        {
            path: '/price-package/:id',
            meta: { requireAuth: true },
            name: 'pricePackage',
            component (resolve) {
                require.ensure(['../page/price-package.vue'], () => {
                    resolve(require('../page/price-package.vue'))
                }, 'pricePackage')
            }
        },
        /* ********************微站直客和同行模式end****************** */
        /* ********************店铺模式下，没有开通在线注册及下单start****************** */
        {
            path: '/shop-line-input/:id',
            name: 'LineInput',
            component (resolve) {
                require.ensure(['../page/line-input.vue'], () => {
                    resolve(require('../page/line-input.vue'))
                }, '/shop-line-input/:id')
            }
        },
        /* 下单选择出发城市 */
        {
            path: '/shop-start-city/:id',
            name: 'startCity',
            component (resolve) {
                require.ensure(['../page/start-city.vue'], () => {
                    resolve(require('../page/start-city.vue'))
                }, '/shop-start-city/:id')
            }
        },
        /* 下单选择价格套餐 */
        {
            path: '/shop-price-package/:id',
            name: 'pricePackage',
            component (resolve) {
                require.ensure(['../page/price-package.vue'], () => {
                    resolve(require('../page/price-package.vue'))
                }, '/shop-price-package/:id')
            }
        },
        /* ********************店铺模式下，没有开通在线注册及下单end****************** */
        /* 下单编辑出游人信息 */
        {
            path: '/order-edit/:id',
            meta: { requireAuth: true },
            name: 'orderEdit',
            component (resolve) {
                require.ensure(['../page/order-edit.vue'], () => {
                    resolve(require('../page/order-edit.vue'))
                }, 'orderEdit')
            }
        },
        /* 下单选择销售 */
        {
            path: '/sellers',
            meta: { requireAuth: true },
            name: 'sellers',
            component (resolve) {
                require.ensure(['../page/selected-sellers.vue'], () => {
                    resolve(require('../page/selected-sellers.vue'))
                }, '/sellers')
            }
        },
        /* 下单详情页 */
        {
            path: '/order-info/:id',
            meta: { requireAuth: true },
            name: 'orderInfo',
            component (resolve) {
                require.ensure(['../page/order-info.vue'], () => {
                    resolve(require('../page/order-info.vue'))
                }, '/order-info/:id')
            }
        },
        /* 订单详情页 */
        {
            path: '/order-detail/:id',
            meta: { requireAuth: true },
            name: 'orderDetail',
            component (resolve) {
                require.ensure(['../page/order-detail.vue'], () => {
                    resolve(require('../page/order-detail.vue'))
                }, '/order-detail/:id')
            }
        },
        /* 阿里支付中转页 */
        {
            path: '/aliTransfer',
            name: 'aliTransfer',
            meta: { requireAuth: true },
            component (resolve) {
                require.ensure(['../page/aliTransfer.vue'], () => {
                    resolve(require('../page/aliTransfer.vue'))
                }, '/aliTransfer')
            }
        },
        /* 订单支付 */
        {
            path: '/order-pay/:id',
            name: 'orderPay',
            meta: { requireAuth: true },
            component (resolve) {
                require.ensure(['../page/order-pay.vue'], () => {
                    resolve(require('../page/order-pay.vue'))
                }, '/order-pay/:id')
            }
        },
        /* 订单列表出游人编辑 */
        {
            path: '/tourist-editer/:id',
            name: 'touristEdit',
            meta: { requireAuth: true },
            component (resolve) {
                require.ensure(['../page/tourist-edit.vue'], () => {
                    resolve(require('../page/tourist-edit.vue'))
                }, '/tourist-editer/:id')
            }
        },
        /* 订单列表出游人列表 */
        {
            path: '/tourist-list/:id',
            name: 'touristList',
            meta: { requireAuth: true },
            component (resolve) {
                require.ensure(['../page/tourist-list.vue'], () => {
                    resolve(require('../page/tourist-list.vue'))
                }, '/tourist-list/:id')
            }
        },
        /* 订单备注 */
        {
            path: '/order-mark/:id',
            meta: { requireAuth: true },
            name: 'orderMark',
            component (resolve) {
                require.ensure(['../page/order-mark.vue'], () => {
                    resolve(require('../page/order-mark.vue'))
                }, '/order-mark/:id')
            }
        },
        /* 产品详情页 */
        {
            path: '/line-detail/:id',
            // meta: { requireAuth: true },
            name: 'lineDetail',
            component (resolve) {
                require.ensure(['../page/line-detail.vue'], () => {
                    resolve(require('../page/line-detail.vue'))
                }, '/line-detail/:id')
            }
        },
        // 404
        {
            path: '*',
            name: '404',
            component (resolve) {
                require.ensure(['../page/net-error.vue'], () => {
                    resolve(require('../page/net-error.vue'))
                }, '*')
            }
        },
        // demo
        {
            path: '/demo',
            name: 'Demo',
            component (resolve) {
                require.ensure(['../page/demo.vue'], () => {
                    resolve(require('../page/demo.vue'))
                }, '/demo')
            }
        },
        // 我的店铺
        {
            path: '/shop-editer',
            // meta: { requireAuth: true },
            name: 'shopEditer',
            component (resolve) {
                require.ensure(['../page/shop-editer.vue'], () => {
                    resolve(require('../page/shop-editer.vue'))
                }, '/shop-editer')
            }
        },
        // 我的店铺-我的会员
        {
            path: '/store-member',
            // meta: { requireAuth: true },
            name: 'storeMember',
            component (resolve) {
                require.ensure(['../page/store-member.vue'], () => {
                    resolve(require('../page/store-member.vue'))
                }, '/store-member')
            }
        }
    ]
})

export default router
