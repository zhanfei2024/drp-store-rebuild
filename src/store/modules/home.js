import axios from 'axios'
import { Toast } from 'mint-ui'

// state
const state = {
    homeLines: [],
    lineTypeIdArr: [],
    lineTypeId: '',
    bottomTab: 'home',
    linesLoading: true,
    mdDevice: ''
}

// getters
const getters = {
    homeLines: state => state.homeLines,
    lineTypeIdArr: state => state.lineTypeIdArr,
    lineTypeId: state => state.lineTypeId,
    bottomTab: state => state.bottomTab,
    linesLoading: state => state.linesLoading,
    mdDevice: state => state.mdDevice
}

// actions
const actions = {
    async gethomeLines ({ commit, state }) {
        state.linesLoading = true
        await axios.get(
            '/ms/line/searchNavigation'
        ).then(res => {
            state.linesLoading = false
            if (res.data.status === 200) {
                let result = res.data.data
                if (result) {
                    commit('initHomeLines', result)
                }
            } else if (res.data.status !== 100) {
                Toast({ message: res.data.msg, position: 'bottom', duration: 5000 })
            }
        })
    }
}

// mutations
const mutations = {
    initScreen (state, val) {
        state.mdDevice = val
    },
    setbottomTab (state, val) {
        state.bottomTab = val
    },
    initHomeLines (state, arr) {
        arr.forEach(item => {
            if (item.lineType) {
                item.lineType.forEach((item, index) => {
                    if (index === 0) {
                        item.selected = true
                        let obj = { lineTypeId: item.lineTypeId, parentId: item.parentId }
                        state.lineTypeIdArr.push(obj)
                    } else {
                        item.selected = false
                    }
                })
            }
        })
        state.homeLines = arr
    },
    setLineType (state, val) {
        state.homeLines.forEach(item => {
            if (item.id === val.parentId) {
                item.lineType.forEach(item => {
                    if (item.lineTypeId === val.lineTypeId) {
                        item.selected = true
                        state.lineTypeId = val.lineTypeId
                    } else {
                        item.selected = false
                    }
                })
            }
        })
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
