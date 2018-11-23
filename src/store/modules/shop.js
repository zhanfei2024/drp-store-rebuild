
// state
const state = {
    shop: {
        show: 0,
        storeName: '',
        storeUrl: '',
        storeUrlEncode: '',
        storeImg: '',
        storeBackImg: '',
        storeAddPrice: '',
        allowRegist: false,
        nickName: '',
        mobile: ''
    },
    lineInputTitle: ''
}

// getters
const getters = {
    shop: state => state.shop,
    lineInputTitle: state => state.lineInputTitle
}

// actions
const actions = {

}

// mutations
const mutations = {
    setShop (state, val) {
        for (const key in val) {
            if (val.hasOwnProperty(key) && state.shop[key] !== undefined) {
                if (key === 'allowRegist' && val[key] === 0) {
                    val[key] = false
                } else if (key === 'allowRegist' && val[key] === 1) {
                    val[key] = true
                }
                state.shop[key] = val[key]
            }
        }
    },
    isShowShop (state, val) {
        state.shop.show = val
    },
    updateShop (state, obj) {
        state.shop[obj.key] = obj.val
    },
    setlineInputTitle (state, val) {
        state.lineInputTitle = val
    }

}

export default {
    state,
    getters,
    actions,
    mutations
}
