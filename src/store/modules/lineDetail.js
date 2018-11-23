
// state
const state = {
    fromCity: [],
    requery: true,
    selectedMon: 1,
    selectedDate: new Date().toISOString().slice(0, 10)
}

// getters
const getters = {
    fromCity: state => state.fromCity,
    requery: state => state.requery,
    selectedMon: state => state.selectedMon,
    selectedDate: state => state.selectedDate
}

// mutaition

const mutations = {
    setFromCity (state, val) {
        state.fromCity = val
    },
    setRequery (state, val) {
        state.requery = val
    },
    setDetailMon (state, val) {
        state.selectedMon = val
    },
    setDetailDate (state, val) {
        state.selectedDate = val
    },
    resetLineDetail (state) {
        state.selectedMon = 1
        state.selectedDate = new Date().toISOString().slice(0, 10)
    }
}

export default {
    state,
    getters,
    mutations
}
