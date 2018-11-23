import axios from 'axios'
// state
const state = {
    getUser: {},
    getSiteInfo: {},
    mine: {},
    address: [],
    tokenCard: {}
}

// getters
const getters = {
    getUser: state => state.getUser,
    getSiteInfo: state => state.getSiteInfo,
    mine: state => state.mine,
    address: state => state.address,
    tokenCard: state => state.tokenCard
}

// actions
const actions = {
    saveUser ({ state, commit }, user) {
        return axios.get(
            '/ms/user/info'
        ).then(res => {
            commit('saveUser', res.data.data)
        })
    },
    saveSiteInfo ({ state, commit }, params) {
        return axios.get(
            '/ms/baseInfo'
        ).then(res => {
            commit('saveSiteInfo', { getSiteInfo: res.data.data })
        })
    },
    addressRequest ({ state, commit }) {
        return axios.post(
            "/ms/user/searchfromcity", { parentId: 0 }
        ).then(res => {
            if (!res.data) return
            let address = res.data.data
            commit("change_address", { address })
            return address
        })
    },
    tokenCardUpload ({ state, commit }) {
        return axios.post(
            '/ms/user/picture/token'
        ).then(res => {
            commit("token_cardupload", { tokenCard: res.data })
        })
    }
}

// mutations
const mutations = {
    saveUser (state, value) {
        state.getUser = value || {}
    },
    saveSiteInfo (state, { getSiteInfo }) {
        state.getSiteInfo = getSiteInfo || {}
    },
    change_address (state, { address }) {
        state.address = address
    },
    token_cardupload (state, { tokenCard }) {
        state.tokenCard = tokenCard || {}
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
