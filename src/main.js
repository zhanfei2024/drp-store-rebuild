// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import MintUI from 'mint-ui'
import axios from 'axios'
import 'mint-ui/lib/style.css'
import './assets/css/app.css'
import './assets/iconfont/iconfont.css'
import store from './store'
import router from './router'
import filter from './filter.js'
import $ from 'jquery'
import $transtion from './assets/js/jQuery.Hz2Py-min.js'
import lodash from 'lodash'
import util from './util.js'
import Vuex from 'vuex'
import wxShare from './wx' // 引入微信接口
Vue.use(Vuex)

axios.defaults.withCredentials = true // 让ajax携带cookie
let instance = axios.create()

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config
}, function (error) {
    // Do something with request error
    return Promise.reject(error)
})

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Do something with response data
    return response
}, function (error) {
    // Do something with response error
    return Promise.reject(error)
})
/* 微信分享功能 */
Vue.prototype.wxConfig = wxShare

/* 设置storeId cookie */
var GetQueryString = function (name) {
    var index = window.location.href.indexOf('?')
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    var r = window.location.href.substr(index + 1).match(reg)
    if (r != null) return unescape(r[2]); return null
}
let storeId = GetQueryString('storeId')
if (storeId) {
    document.cookie = `storeId=${storeId};path=/;`
}

/* 注册axios实例 */
Vue.prototype.$http = instance

Vue.prototype.$lodash = lodash
Vue.prototype.$ = $
Vue.prototype.$transtion = $transtion

/* 注册过滤器 */
for (const key in filter) {
    if (filter.hasOwnProperty(key)) {
        const element = filter[key]
        Vue.filter(key, element)
    }
}

Vue.use(MintUI)

Vue.directive('title', {
    // inserted: (el, binding) => {
    //     document.title = '微站'
    // },
    update: (el, binding) => {
        document.title = binding.value
    }
})

Vue.config.productionTip = false
/* 手机系统和型号判断 */
let phoneInfo = util.phoneInfo()
store.commit('initPhone', phoneInfo)
/* 判断当前设备屏幕宽带是否大于768px */
let mdWidth = 0
if (document.documentElement.clientWidth >= 768 + 17) {
    mdWidth = (document.documentElement.clientWidth - 17 - 768) / 2
}
store.commit('initScreen', mdWidth)

/* 动态设置font-size */
var updateBaseFontSize = function () {
    var baseFontSize = 14
    var dWidth = document.documentElement.clientWidth
    if (dWidth <= 768) {
        baseFontSize = Number(dWidth / 23).toFixed(0)
    } else {
        baseFontSize = 16
    }
    $('html').css('font-size', baseFontSize + 'px')
}
window.addEventListener('resize', updateBaseFontSize)
updateBaseFontSize()

var routerBefore = function () {
    router.beforeEach((to, from, next) => {
        if (to.meta.title) {
            document.title = to.meta.title
        }
        if (to.matched.some(item => item.meta.requireAuth)) {
            const hasLogin = util.getCookie('xqapp_web_login_id')
            if (hasLogin) {
                if (!Object.keys(store.getters.getUser).length) {
                    let enter = false
                    // 如果登录，但没有用户信息，请求用户信息
                    instance.get('/ms/user/info', { emulateJSON: true }).then(res => {
                        return store.commit('saveUser', res.data.data)
                    }).then(() => {
                        if (Object.keys(store.getters.getUser).length) {
                            // 可以进入页面
                            enter = true
                            clearTimeout(st)
                            next()
                        } else {
                            next({ name: 'formLogin', query: { redirect: to.fullPath } })
                        }
                    })
                    const st = setTimeout(() => {
                        if (!enter) {
                            // 5秒后都没有进入其他页面，则到登录页面
                            next({ name: 'formLogin', query: { redirect: to.fullPath } })
                        }
                    }, 5000)
                } else {
                    next()
                }
            } else {
                // cookie不存在，则进到登录页面
                next({ name: 'formLogin', query: { redirect: to.fullPath } })
            }
        } else {
            next()
        }
    })
}

var getBaseInfo = function () {
    instance.get('/ms/baseInfo').then(async res => {
        await store.dispatch('saveSiteInfo', res.data.data)
        if (store.getters.getSiteInfo.weiXinIsNoPass === 1 && !util.getCookie('peer_login_token')) {
            router.push('/peer-form-login')
            routerBefore()
        } else {
            routerBefore()
        }
    })
}

getBaseInfo()

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
