import moment from 'moment'
import axios from 'axios'
// state
const state = {
    selectedOrder: [],
    orderId: '',
    line: { },
    bill: '',
    contact: {},
    tourist: {},
    remark: '',
    filter: {
        createStartDate: moment(moment().subtract(30, 'days').calendar()).format('YYYY-MM-DD'),
        createEndDate: moment().format('YYYY-MM-DD'),
        type: '1',
        isOk: '4',
        pageSize: '5',
        currentPage: 1
    },
    bak: '',
    mark: '',
    idType: '',
    touristLock: ''
}

// getters
const getters = {
    selectedOrder: state => state.selectedOrder,
    lineDetail: state => state.line,
    bill: state => state.bill,
    contact: state => state.contact,
    tourist: state => state.tourist,
    remark: state => state.remark,
    filter: state => state.filter,
    bak: state => state.bak,
    mark: state => state.mark,
    idType: state => state.idType,
    touristLock: state => state.touristLock
}

// actions
const actions = {
    /* 订单详情 */
    getOrderDetail ({commit}) {
        axios.get(
            '/ms/order/52382'
        ).then(res => {
            if (res.status === 200) {
                commit('setOrderDetail', res.data.data)
            } else if (res.data.status !== 100) {
                console.log('请求失败')
            }
        }).catch(error => {
            console.log(error)
        })
    }
}

// mutations
const mutations = {
    setOrderDetail (state, value) {
        state.line = value
    },
    setFilter (state, value) {
        state.filter = value
    },
    setOrder (state, value) {
        state.selectedOrder = [value]
    },
    saveBak (state, value) {
        state.bak = value
    },
    saveMark (state, value) {
        state.mark = value
    },
    saveIdtype (state, value) {
        state.idType = value
    },
    addCurrentPage (state) {
        state.filter.currentPage += 1
    },
    resetCurrentPage (state) {
        state.filter.currentPage = 1
    },
    steTouristLock (state, value) {
        state.touristLock = value
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
