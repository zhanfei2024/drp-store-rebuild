import Vue from 'vue'
import vuex from 'vuex'
import user from './modules/user'
import order from './modules/order'
import lineInput from './modules/lineInput'
import lineList from './modules/linelist'
import lineDetail from './modules/lineDetail'
import orderEdit from './modules/orderEdit'
import home from './modules/home'
import phoneInfo from './modules/phoneInfo'
import shop from './modules/shop'
import login from './modules/login'

Vue.use(vuex)

export default new vuex.Store({
    modules: {
        user,
        order,
        lineInput,
        lineList,
        lineDetail,
        orderEdit,
        home,
        phoneInfo,
        shop,
        login
    }

})
