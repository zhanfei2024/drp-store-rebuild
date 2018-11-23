import axios from 'axios'
import {Toast} from 'mint-ui'
// state
const state = {
    linePlan: {
        selectedYear: '',
        selectedMonth: '',
        selectedDay: '',
        months: [
            { id: new Date(), month: '', price: '', selected: true, noPlans: '' },
            { id: new Date(new Date().setMonth(new Date().getMonth() + 1)), month: '', price: '', selected: false, noPlans: '' },
            { id: new Date(new Date().setMonth(new Date().getMonth() + 2)), month: '', price: '', selected: false, noPlans: '' },
            { id: new Date(new Date().setMonth(new Date().getMonth() + 3)), month: '', price: '', selected: false, noPlans: '' }
        ],
        dates: {
            queryed: false,
            dates: [
                { date: 1, price: '', ticket: '', ticketShow: '', ref: 'date1', expired: '', marginLeft: '0', show: true, selected: false, planDate: '', planInfo: '' },
                { date: 2, price: '', ticket: '', ticketShow: '', ref: 'date2', expired: '', show: true, selected: false, planDate: '', planInfo: '' },
                { date: 3, price: '', ticket: '', ticketShow: '', ref: 'date3', expired: '', show: true, selected: false, planDate: '', planInfo: '' },
                { date: 4, price: '', ticket: '', ticketShow: '', ref: 'date4', expired: '', show: true, selected: false, planDate: '', planInfo: '' },
                { date: 5, price: '', ticket: '', ticketShow: '', ref: 'date5', expired: '', show: true, selected: false, planDate: '', planInfo: '' },
                { date: 6, price: '', ticket: '', ticketShow: '', ref: 'date6', expired: '', show: true, selected: false, planDate: '', planInfo: '' },
                { date: 7, price: '', ticket: '', ticketShow: '', ref: 'date7', expired: '', show: true, selected: false, planDate: '', planInfo: '' },
                { date: 8, price: '', ticket: '', ticketShow: '', ref: 'date8', expired: '', show: true, selected: false, planDate: '', planInfo: '' },
                { date: 9, price: '', ticket: '', ticketShow: '', ref: 'date9', expired: '', show: true, selected: false, planDate: '', planInfo: '' },
                { date: 10, price: '', ticket: '', ticketShow: '', ref: 'date10', expired: '', show: true, selected: false, planDate: '', planInfo: '' },
                { date: 11, price: '', ticket: '', ticketShow: '', ref: 'date11', expired: '', show: true, selected: false, planDate: '', planInfo: '' },
                { date: 12, price: '', ticket: '', ticketShow: '', ref: 'date12', expired: '', show: true, selected: false, planDate: '', planInfo: '' },
                { date: 13, price: '', ticket: '', ticketShow: '', ref: 'date13', expired: '', show: true, selected: false, planDate: '', planInfo: '' },
                { date: 14, price: '', ticket: '', ticketShow: '', ref: 'date14', expired: '', show: true, selected: false, planDate: '', planInfo: '' },
                { date: 15, price: '', ticket: '', ticketShow: '', ref: 'date15', expired: '', show: true, selected: false, planDate: '', planInfo: '' },
                { date: 16, price: '', ticket: '', ticketShow: '', ref: 'date16', expired: '', show: true, selected: false, planDate: '', planInfo: '' },
                { date: 17, price: '', ticket: '', ticketShow: '', ref: 'date17', expired: '', show: true, selected: false, planDate: '', planInfo: '' },
                { date: 18, price: '', ticket: '', ticketShow: '', ref: 'date18', expired: '', show: true, selected: false, planDate: '', planInfo: '' },
                { date: 19, price: '', ticket: '', ticketShow: '', ref: 'date19', expired: '', show: true, selected: false, planDate: '', planInfo: '' },
                { date: 20, price: '', ticket: '', ticketShow: '', ref: 'date20', expired: '', show: true, selected: false, planDate: '', planInfo: '' },
                { date: 21, price: '', ticket: '', ticketShow: '', ref: 'date21', expired: '', show: true, selected: false, planDate: '', planInfo: '' },
                { date: 22, price: '', ticket: '', ticketShow: '', ref: 'date22', expired: '', show: true, selected: false, planDate: '', planInfo: '' },
                { date: 23, price: '', ticket: '', ticketShow: '', ref: 'date23', expired: '', show: true, selected: false, planDate: '', planInfo: '' },
                { date: 24, price: '', ticket: '', ticketShow: '', ref: 'date24', expired: '', show: true, selected: false, planDate: '', planInfo: '' },
                { date: 25, price: '', ticket: '', ticketShow: '', ref: 'date25', expired: '', show: true, selected: false, planDate: '', planInfo: '' },
                { date: 26, price: '', ticket: '', ticketShow: '', ref: 'date26', expired: '', show: true, selected: false, planDate: '', planInfo: '' },
                { date: 27, price: '', ticket: '', ticketShow: '', ref: 'date27', expired: '', show: true, selected: false, planDate: '', planInfo: '' },
                { date: 28, price: '', ticket: '', ticketShow: '', ref: 'date28', expired: '', show: true, selected: false, planDate: '', planInfo: '' },
                { date: 29, price: '', ticket: '', ticketShow: '', ref: 'date29', expired: '', show: true, selected: false, planDate: '', planInfo: '' },
                { date: 30, price: '', ticket: '', ticketShow: '', ref: 'date30', expired: '', show: true, selected: false, planDate: '', planInfo: '', marginLeft: '0', marginTop: '0' },
                { date: 31, price: '', ticket: '', ticketShow: '', ref: 'date31', expired: '', show: true, selected: false, planDate: '', planInfo: '', marginLeft: '0', marginTop: '0' }
            ]
        },
        planId: '',
        periods: [ ],
        selectedCity: '', // 出发城市
        price: '', // 价格（团期价格+出发城市的附加价格（如联运城市））
        selectedPack: {
            priceTitle: null,
            adultNum: 0,
            adult1Num: 0,
            adult2Num: 0,
            childNum: 0,
            child1Num: 0,
            adultPrice: null,
            adultPrice1: null,
            adultPrice2: null,
            childPrice: null,
            childPrice1: null,
            newAdultPrice: null,
            newAdultPrice1: null,
            newAdultPrice2: null,
            newChildPrice: null,
            newChildPrice1: null
        }, // 保存的套餐
        pricePack: {
            showName: {
                childPrice1: '', // 小童不占床价,
                adultPrice: '', // 市场成人价2,
                adultPrice2: '', // 老人价,
                adultPrice1: '', // 小年轻价,
                childPrice: '' // 市场小童价
            },
            prices: [ ]
        }, // 价格套餐
        sum: '', // 总价
        otherBillPrice: '' // 每月出游人杂费
    },
    packages: [],
    baseTransportCityId: '', // 联运城市id,无联运城市：0
    linePlanPriceId: '', // 价格套餐id,默认套餐：0
    sellers: {
        isShowSale: '',
        saleList: []
    }, // 销售
    disPrice: 0, // 选择联运城市时的差价
    cities: [], // 出发城市
    ordered: false, // 是否已下单
    selectedCityName: ''
}

// getters
const getters = {
    selectedCityName: state => state.selectedCityName,
    ordered: state => state.ordered,
    cities: state => state.cities,
    pricePack: state => state.linePlan.pricePack,
    disPrice: state => state.disPrice,
    selectedYear: state => {
        let year = new Date().getFullYear()
        state.linePlan.selectedYear = year
        return state.linePlan.selectedYear
    },
    sellers: state => state.sellers,
    otherBillPrice: state => state.linePlan.otherBillPrice,
    selectedDay: state => state.linePlan.selectedDay,
    selectedMonth: state => state.linePlan.selectedMonth,
    // months: state => state.linePlan.months,
    months: state => {
        state.linePlan.months.forEach(item => {
            if (item.id === 0) {
                item.id = 12
            }
        })
        return state.linePlan.months
    },
    dates: state => state.linePlan.dates,
    periods: state => state.linePlan.periods,
    planId: state => state.linePlan.planId,
    selectedCity: state => state.linePlan.selectedCity,
    linePlan: state => state.linePlan,
    selectedPack: state => state.linePlan.selectedPack,
    sum: state => {
        if (state.linePlan.pricePack.prices.length) {
            let selectPack = state.linePlan.pricePack.prices.filter(item => item.selected === true)[0]
            return (selectPack.adultNum + selectPack.adult1Num + selectPack.adult2Num + selectPack.childNum + selectPack.child1Num) * state.linePlan.otherBillPrice + selectPack.newAdultPrice * selectPack.adultNum + selectPack.newAdultPrice1 * selectPack.adult1Num + selectPack.newAdultPrice2 * selectPack.adult2Num + selectPack.newChildPrice * selectPack.childNum + selectPack.newChildPrice1 * selectPack.child1Num
        } else {
            return 0
        }
    }
}

// action
const actions = {
    // 获取四个月团期中最低价
    async minSadultPrice ({commit}, id) {
        await axios.post('/ms/linePlan/searchMinSadultPrice', {
            'lineID': id
        }).then(res => {
            if (res.data.status === 200) {
                let result = res.data.data.minAdultPriceList
                commit('setMinPrice', result)
            } else if (res.data.status !== 100) {
                Toast({ message: res.data.msg, position: 'bottom', duration: 5000 })
            }
        })
    },
    // 获取当月团期
    async getPlans ({commit}, val) {
        await axios.post('/ms/linePlan/searchList',
            { month: val.mon, lineID: val.lineID }
        ).then(res => {
            if (res.data.status === 200) {
                let arr = res.data.data.linePlan
                commit('setDates', {'mon': val.mon, 'date': val.pds, 'arr': arr})
                commit('saveOtherBillPrice', res.data.data.otherBillPrice)
            } else if (res.data.status !== 100) {
                Toast({ message: res.data.data.msg, position: 'bottom', duration: 5000 })
            }
        })
    },
    // 根据日期和线路id查询当天的ABC团
    async getCurrentPlan ({commit}, val) {
        await axios.post('/ms/linePlan/searchABCPlan',
            val
        ).then(res => {
            if (res.data.status === 200) {
                let arr = res.data.data.linePlan
                commit('setPeriods', arr)
            } else if (res.data.status !== 100) {
                Toast({ message: res.data.data.msg, position: 'bottom', duration: 5000 })
            }
        })
    },
    /* 获取价格套餐 */
    async getPackages ({commit}, id) {
        await axios.get(
            `/ms/linePlan/price/${id}`
        ).then(res => {
            if (res.data.status === 200) {
                let result = res.data.data
                state.linePlan.pricePack.showName = result.showName
                // 设置默认团期数量为2
                state.linePlan.pricePack.prices = []
                result.prices.forEach(item => {
                    if (item.id === 0) {
                        let defaultPack = item
                        defaultPack.selected = true
                        if (defaultPack.adultPrice) {
                            defaultPack.adultNum = 2
                            defaultPack.adult1Num = 0
                            defaultPack.adult2Num = 0
                            defaultPack.childNum = 0
                            defaultPack.child1Num = 0
                        } else if (defaultPack.adultPrice1) {
                            defaultPack.adultNum = 0
                            defaultPack.adult1Num = 2
                            defaultPack.adult2Num = 0
                            defaultPack.childNum = 0
                            defaultPack.child1Num = 0
                        } else if (defaultPack.adultPrice2) {
                            defaultPack.adultNum = 0
                            defaultPack.adult1Num = 0
                            defaultPack.adult2Num = 2
                            defaultPack.childNum = 0
                            defaultPack.child1Num = 0
                        } else if (defaultPack.childPrice) {
                            defaultPack.adultNum = 0
                            defaultPack.adult1Num = 0
                            defaultPack.adult2Num = 0
                            defaultPack.childNum = 2
                            defaultPack.child1Num = 0
                        } else if (defaultPack.childPrice1) {
                            defaultPack.adultNum = 0
                            defaultPack.adult1Num = 0
                            defaultPack.adult2Num = 0
                            defaultPack.childNum = 0
                            defaultPack.child1Num = 2
                        }
                        /* 如果选择的城市是默认城市，初始价为套餐默认价 */
                        let defaultCity = state.cities[0].cityName
                        if (state.selectedCityName === defaultCity || !state.selectedCityName) {
                            defaultPack.newAdultPrice = defaultPack.adultPrice
                            defaultPack.newAdultPrice1 = defaultPack.adultPrice1
                            defaultPack.newAdultPrice2 = defaultPack.adultPrice2
                            defaultPack.newChildPrice = defaultPack.childPrice
                            defaultPack.newChildPrice1 = defaultPack.childPrice1
                            state.linePlan.selectedPack = defaultPack
                            state.linePlanPriceId = defaultPack.id
                        } else {
                            /* 如果选择的城市是联运城市，初始价加上联运城市价 */
                            let val = state.cities.filter(item => item.cityName === state.selectedCityName)[0]
                            if (val) {
                                let addPrice = val.price
                                defaultPack.newAdultPrice = defaultPack.adultPrice + addPrice
                                defaultPack.newAdultPrice1 = defaultPack.adultPrice1 + addPrice
                                defaultPack.newAdultPrice2 = defaultPack.adultPrice2 + addPrice
                                defaultPack.newChildPrice = defaultPack.childPrice + addPrice
                                defaultPack.newChildPrice1 = defaultPack.childPrice1 + addPrice
                                state.linePlan.selectedPack = defaultPack
                                state.linePlanPriceId = defaultPack.id
                            } else {
                                defaultPack.newAdultPrice = defaultPack.adultPrice
                                defaultPack.newAdultPrice1 = defaultPack.adultPrice1
                                defaultPack.newAdultPrice2 = defaultPack.adultPrice2
                                defaultPack.newChildPrice = defaultPack.childPrice
                                defaultPack.newChildPrice1 = defaultPack.childPrice1
                                state.linePlan.selectedPack = defaultPack
                                state.linePlanPriceId = defaultPack.id
                            }
                        }
                        state.linePlan.pricePack.prices.push(defaultPack)
                    } else {
                        item.selected = false
                        item.adultNum = 0
                        item.adult1Num = 0
                        item.adult2Num = 0
                        item.childNum = 0
                        item.child1Num = 0
                        /* 如果选择的城市是默认城市，初始价为套餐默认价 */
                        let defaultCity = state.cities[0].cityName
                        if (state.selectedCityName === defaultCity) {
                            item.newAdultPrice = item.adultPrice
                            item.newAdultPrice1 = item.adultPrice1
                            item.newAdultPrice2 = item.adultPrice2
                            item.newChildPrice = item.childPrice
                            item.newChildPrice1 = item.childPrice1
                        } else {
                            /* 如果选择的城市是联运城市，初始价加上联运城市价 */
                            let val = state.cities.filter(item => item.cityName === state.selectedCityName)[0]
                            if (val) {
                                let addPrice = val.price
                                item.newAdultPrice = item.adultPrice + addPrice
                                item.newAdultPrice1 = item.adultPrice1 + addPrice
                                item.newAdultPrice2 = item.adultPrice2 + addPrice
                                item.newChildPrice = item.childPrice + addPrice
                                item.newChildPrice1 = item.childPrice1 + addPrice
                            } else {
                                item.newAdultPrice = item.adultPrice
                                item.newAdultPrice1 = item.adultPrice1
                                item.newAdultPrice2 = item.adultPrice2
                                item.newChildPrice = item.childPrice
                                item.newChildPrice1 = item.childPrice1
                            }
                        }
                        state.linePlan.pricePack.prices.push(item)
                    }
                })
            } else if (res.data.status !== 100) {
                Toast({ message: res.data.msg, position: 'top', duration: 3000 })
            }
        })
    },
    /* 获取出发城市 */
    async getCities ({commit}, val) {
        await axios.get(`/ms/linePlan/city/${val.planId}`
        ).then(res => {
            if (res.data.status === 200) {
                let result = res.data.data
                result.forEach(item => {
                    item.selected = false
                    item.addDisPrice = false
                })
                if (state.selectedCityName === result[0].cityName || !state.selectedCityName) {
                    result[0].selected = true
                } else {
                    let index = result.findIndex(item => item.cityName === state.selectedCityName)
                    if (index < 0) {
                        index = 0
                    }
                    result[index].selected = true
                }
                commit('setCity', result)
            } else if (res.data.status !== 100) {
                Toast({ message: res.data.data.msg, position: 'bottom', duration: 5000 })
            }
        })
    },
    /* 销售列表 */
    async getSellers ({commit}) {
        await axios.get('/ms/order/sale'
        ).then(res => {
            if (res.data.status === 200) {
                let data = res.data.data
                data.saleList.sort((a, b) => a.name.localeCompare(b.name, 'zh-Hans-CN', { sensitivity: 'accent' }))
                commit('saveSellers', data)
            } else if (res.data.status !== 100) {
                Toast({ message: res.data.data.msg, position: 'bottom', duration: 5000 })
            }
        })
    }
}
// mutations

const mutations = {
    /* 记录产品详情页选择城市 */
    selectCityName (state, val) {
        state.selectedCityName = val
    },
    /* 记录已下单 */
    setOrdered (state, val) {
        state.ordered = val
    },
    /* 选中价格套餐 */
    selectedPack (state, id) {
        state.linePlan.pricePack.prices.forEach(item => {
            if (item.id === id) {
                item.selected = true
            } else {
                item.selected = false
            }
        })
    },
    /* 价格套餐补充联运城市差价 */
    setDisPrice (state, val) {
        state.linePlan.pricePack.prices.forEach(item => {
            if (item.newAdultPrice > 0) {
                item.newAdultPrice += val.disPrice
            }
            if (item.newAdultPrice1 > 0) {
                item.newAdultPrice1 += val.disPrice
            }
            if (item.newAdultPrice2 > 0) {
                item.newAdultPrice2 += val.disPrice
            }
            if (item.newChildPrice > 0) {
                item.newChildPrice += val.disPrice
            }
            if (item.newChildPrice1 > 0) {
                item.newChildPrice1 += val.disPrice
            }
        })
        state.cities[val.cityIndex].addDisPrice = true
    },
    /* 保存销售列表 */
    saveSellers (state, val) {
        state.sellers.isShowSale = val.isShowSale
        let arr = []
        if (val.saleList) {
            if (val.saleList.length === 1) {
                val.saleList.forEach(item => {
                    item.selected = true
                    arr.push(item)
                })
            } else if (val.saleList.length > 1) {
                val.saleList.forEach(item => {
                    if (item.id === 0) {
                        item.selected = true
                    } else {
                        item.selected = false
                    }
                    arr.push(item)
                })
            }
        }
        state.sellers.saleList = arr
    },
    /* 保存选中销售 */
    setSeller (state, id) {
        state.sellers.saleList.forEach(item => {
            if (item.id === id) {
                item.selected = true
            } else {
                item.selected = false
            }
        })
        // state.sellers.saleList[index].selected = true
        // Vue.set(state.sellers.saleList[index], 'selected', true)
    },
    /* 保存选中的天 */
    setSelectedDay (state, val) {
        state.linePlan.dates.dates[val].selected = true
        state.linePlan.selectedDay = val
    },
    /* 保存选中的月 */
    setMonths (state, id) {
        state.linePlan.dates.dates.forEach(item => {
            item.selected = false
        })
        state.linePlan.months.forEach(item => {
            item.selected = false
        })
        state.linePlan.months.forEach(item => {
            if (new Date(item.id).getMonth() === new Date(id).getMonth()) {
                item.selected = true
            } else {
                item.selected = false
            }
        })
    },
    /* 设置每月最低价 */
    setMinPrice (state, val) {
        for (let index = 0; index < val.length; index++) {
            const minPrice = val[index]
            state.linePlan.months[index].price = minPrice
        }
    },
    /* 保存切换的团期 */
    changePeriods (state, index) {
        state.linePlan.periods.forEach(item => {
            item.selected = false
        })
        state.linePlan.periods[index].selected = true
    },
    /* 保存月份团期数据 */
    setDates (state, val) {
        // 选中的月份 1，2，3，4
        let month = val.mon
        // 选中的日期
        let date = new Date(val.date).getDate()
        let currentDate = new Date().getDate()
        state.linePlan.dates.queryed = true
        state.linePlan.dates.dates.forEach(item => {
            item.price = ''
            item.ticket = ''
        })
        if (month === 1) {
            state.linePlan.dates.dates.forEach((item, index) => {
                if (index < currentDate - 1) {
                    item.expired = true
                } else {
                    item.expired = false
                }
            })
            if (state.linePlan.dates.dates[currentDate - 1]) {
                state.linePlan.dates.dates[currentDate - 1].date = '今'
            }
            if (state.linePlan.dates.dates[currentDate]) {
                state.linePlan.dates.dates[currentDate].date = '明'
            }
            if (state.linePlan.dates.dates[currentDate + 1]) {
                state.linePlan.dates.dates[currentDate + 1].date = '后'
            }
            if (state.linePlan.dates.dates[date - 1]) {
                state.linePlan.dates.dates[date - 1].selected = true
            }
        } else {
            state.linePlan.dates.dates.forEach((item) => {
                item.expired = false
            })
            if (state.linePlan.dates.dates[currentDate - 1]) {
                state.linePlan.dates.dates[currentDate - 1].date = currentDate
            }
            if (state.linePlan.dates.dates[currentDate]) {
                state.linePlan.dates.dates[currentDate].date = currentDate + 1
            }
            if (state.linePlan.dates.dates[currentDate + 1]) {
                state.linePlan.dates.dates[currentDate + 1].date = currentDate + 2
            }
            if (state.linePlan.dates.dates[date - 1]) {
                state.linePlan.dates.dates[date - 1].selected = true
            }
        }
        if (val.arr.length > 0) {
            state.linePlan.noPlans = true
            let sort = val.arr.sort((a, b) => a.adultPrice - b.adultPrice)
            sort.forEach(item => {
                let dayIndex = parseInt(item.planDate.slice(8, 10), 10)
                state.linePlan.dates.dates[dayIndex - 1].price = item.adultPrice
                state.linePlan.dates.dates[dayIndex - 1].ticket = item.endNum
                state.linePlan.dates.dates[dayIndex - 1].ticketShow = item.endNumShow
                state.linePlan.dates.dates[dayIndex - 1].planInfo = item.planInfo
                state.linePlan.dates.dates[dayIndex - 1].planDate = item.planDate
            })
        } else {
            state.linePlan.noPlans = false
        }
        state.linePlan.selectedDay = date - 1
    },
    /* 保存一天的团期 */
    setPeriods (state, val) {
        if (val.length > 0) {
            let arr = val.sort((a, b) => a.adultPrice - b.adultPrice)
            // let minId = arr[0].id
            if (!state.linePlan.planId) {
                state.linePlan.planId = arr[0].id
            }
            let mindIndex = arr.findIndex(item => item.id === parseInt(state.linePlan.planId, 10))
            arr.forEach(item => {
                item.selected = false
            })
            arr[mindIndex].selected = true
            state.linePlan.periods = arr
            // state.linePlan.planId = arr[mindIndex].id
        } else {
            state.linePlan.periods = []
            state.linePlan.pricePack.prices = []
            state.linePlan.planId = null
        }
    },
    /* 改变ABC团期时，保存团期id */
    setPlanId (state, val) {
        state.linePlan.planId = val
    },
    /* 保存游客人数 */
    setTouristNum (state, val) {
        let numArr = []
        let planTiket = state.linePlan.periods.filter(item => item.id === state.linePlan.planId)[0]['endNum']
        let selectPrice = state.linePlan.pricePack.prices.filter(item => item.selected === true)[0]
        if (val.operate === 1) {
            if (selectPrice.adultNum + selectPrice.adult1Num + selectPrice.adult2Num + selectPrice.childNum + selectPrice.child1Num + 1 > planTiket) {
                Toast({ message: '你选择的总人数已超过余位', position: 'bottom', duration: 5000 })
            } else {
                selectPrice[val.type] += 1
            }
        } else if (val.operate === -1) {
            if (selectPrice[val.type] === 0) {
                selectPrice[val.type] = 0
            } else {
                selectPrice[val.type] -= 1
            }
        }
    },
    /* 初始化出发城市 */
    setCity (state, val) {
        state.cities = val
    },
    /* 保存出发城市 */
    selectedCity (state, id) {
        state.cities.forEach(item => {
            if (item.id === id) {
                item.selected = true
            } else {
                item.selected = false
            }
        })
    },
    /* 保存杂费 */
    saveOtherBillPrice (state, val) {
        state.linePlan.otherBillPrice = val
    },
    /* 设置当前日期的价格和余票 */
    setDate (state, val) {
        state.linePlan.dates.dates.filter(item => item.selected === true)[0].price = val.adultPrice
        state.linePlan.dates.dates.filter(item => item.selected === true)[0].ticket = val.endNum
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
