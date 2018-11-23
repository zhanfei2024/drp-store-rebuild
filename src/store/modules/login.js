
// state
const state = {
    restPhone: ''
}

// getters
const getters = {
    restPhone: state => state.restPhone
}

// actions

// mutaition
const mutations = {
    setRestPhone (state, val) {
        state.restPhone = val
    }
}

export default {
    state,
    getters,
    mutations
}
