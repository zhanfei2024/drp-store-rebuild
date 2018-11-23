
// state
const state = {
    phoneInfo: {
        system: '',
        mobile: ''
    }
}

// getters
const getters = {
    phoneInfo: state => state.phoneInfo
}

// actions

// mutaition
const mutations = {
    initPhone (state, val) {
        state.phoneInfo.system = val.system
        state.phoneInfo.mobile = val.mobile
    }
}

export default {
    state,
    getters,
    mutations
}
