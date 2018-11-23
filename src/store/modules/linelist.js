import axios from 'axios'
import { Toast } from 'mint-ui'

const lastMon = new Date(new Date().setMonth(new Date().getMonth() + 3))
const monDate = new Date(lastMon.getFullYear(), lastMon.getMonth() + 1, 0).getDate()
const fullEndDate1 = new Date(lastMon.getFullYear(), lastMon.getMonth(), monDate)
const initFilter = {
    keyword: '', // 输入框输入的关键字
    day: 'all', // 行程天数
    planDatePrs: new Date(), // 团期开始日期
    planDatePre: fullEndDate1, // 团期结束日期
    prs: '', // 团期最低价
    pre: '', // 团期最高价
    currentPage: 1, // 当前页数
    pageSize: '10', // 每页条数
    lineTypeID: '', // 线路类型id, 二级导id
    lineTypeAppId: '' // 导航id，一级全部id
}

// state
const state = {
    loading: false,
    nodata: false,
    lineFilter: initFilter,
    lines: [],
    priceRange: [
        {selected: true, prs: ''},
        { selected: false, prs: 0, pre: 500 },
        { selected: false, prs: 500, pre: 2000 },
        { selected: false, prs: 2000, pre: 5000 },
        { selected: false, prs: 5000, pre: 10000 },
        { selected: false, prs: 10000.01 }
    ],
    lineCity: [

    ]
}

// getters
const getters = {
    nodata: state => state.nodata,
    lineFilter: state => state.lineFilter,
    lines: state => state.lines,
    priceRange: state => state.priceRange,
    lineCity: state => state.lineCity,
    loading: state => state.loading
}

// actions
const actions = {
    // 产品列表
    async getlines ({commit}, filter) {
        await axios.post('/ms/line/lineList', filter
        ).then(res => {
            if (res.data.status === 200) {
                commit('saveline', res.data.data.result)
            } else if (res.data.status !== 100) {
                Toast({ message: res.data.msg, position: 'bottom', duration: 5000 })
            }
        })
    },
    async getLineType ({commit}, id) {
        await axios.post('/ms/line/searchLineType',
            {id: id}
        ).then(res => {
            if (res.data.status === 200) {
                commit('initlineType', res.data.data.baseLineTypeAppList)
            } else if (res.data.status !== 100) {
                Toast({ message: res.data.msg, position: 'bottom', duration: 5000 })
            }
        })
    }
}

// mutations
const mutations = {
    /* 遍历设置lineFilter */
    initLineFilter (state, obj) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                state.lineFilter[key] = obj[key]
            }
        }
    },
    /* 重置二级导航 */
    resetlineCity (state) {
        state.lineCity = [
            { lineTypeAppId: state.lineFilter.lineTypeAppId, cnName: '全部', selected: true }
        ]
    },
    initlineType (state, arr) {
        state.lineCity = [
            { lineTypeAppId: state.lineFilter.lineTypeAppId, cnName: '全部', selected: true }
        ]
        if (arr.length > 0) {
            arr.forEach(item => {
                state.lineCity.push({
                    lineTypeID: item.lineTypeId,
                    cnName: item.cnName,
                    selected: false
                })
            })
        }
    },
    setLineFilter (state, obj) {
        state.lineFilter[obj.type] = obj.val
        if (obj.type === 'lineTypeAppId') {
            state.lineCity[0].lineTypeAppId = obj.val
        }
    },
    clearLineFilter (state, type) {
        state.lineFilter[type] = ''
    },
    initCity (state, id) {
        state.lineFilter.city = state.lineCity.filter(item => item.id === id)[0].title
        state.lineCity.forEach(item => {
            if (item.id === id) {
                item.selected = true
            } else {
                item.selected = false
            }
        })
    },
    // 清除关键字
    restKey () {
        state.lineFilter.keyword = ''
    },
    // 保存选中二级导航
    selectedCity (state, val) {
        state.lineCity.forEach((item, index) => {
            if (index === parseInt(val, 10)) {
                item.selected = true
                if (item.cnName === '全部') {
                    state.lineFilter.lineTypeAppId = item.lineTypeAppId
                    state.lineFilter.lineTypeID = ''
                } else {
                    state.lineFilter.lineTypeID = item.lineTypeID
                }
            } else {
                item.selected = false
            }
        })
    },
    saveline (state, val) {
        if (val.length > 0) {
            state.lines = val
        } else {
            state.lines = []
            state.nodata = true
        }
    },
    setRange (state, val) {
        state.lineFilter.prs = val.prs
        state.lineFilter.pre = val.pre
        state.priceRange.forEach(item => {
            if (item.prs === val.prs) {
                item.selected = true
            } else {
                item.selected = false
            }
        })
    },
    restSearchKey (state) {
        state.lineFilter.day = 'all'
        state.lineFilter.planDatePrs = new Date()
        state.lineFilter.planDatePre = fullEndDate1
        state.lineFilter.prs = ''
        state.lineFilter.pre = ''
        state.lineFilter.currentPage = 1
        state.lineFilter.pageSize = '10'
        state.lineFilter.lineTypeID = '' // 线路类型id, 二级导id
        state.lineFilter.lineTypeAppId = '' // 导航id，一级全部id
        state.priceRange.forEach(item => {
            item.selected = false
        })
        state.priceRange[0].selected = true
    },
    rest (state) {
        state.lineFilter.day = 'all'
        state.lineFilter.planDatePrs = new Date()
        state.lineFilter.planDatePre = fullEndDate1
        state.lineFilter.prs = ''
        state.lineFilter.pre = ''
        state.lineFilter.currentPage = 1
        state.lineFilter.pageSize = '10'
        state.priceRange.forEach(item => {
            item.selected = false
        })
        state.priceRange[0].selected = true
    },
    resetCurrenPage (state) {
        state.lineFilter.currentPage = 1
    }

}

export default {
    state,
    getters,
    actions,
    mutations
}
