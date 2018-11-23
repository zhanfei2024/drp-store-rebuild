// state
const state = {
    editedInit: false,
    resetedit: false,
    editArr: [
    ]
}

// getters
const getters = {
    editArr: state => state.editArr,
    editedInit: state => state.editedInit,
    resetedit: state => state.resetedit
}

// mutations
const mutations = {
    // 初始化根据下单人数及类型，生成数组对象
    initEdit (state) {
        state.editedInit = true
    },
    setIdtype (state, val) {
        state.editArr.forEach(item => {
            if (item.id === val.id) {
                item.selectedIdType = val.idType
            }
        })
    },
    // 根据下单人数及类型，生成数组对象
    addEidt (state, val) {
        let idInfo = {
            idType: '01',
            save: false,
            cnName: '',
            enName2: '',
            enName1: '',
            idcard: '',
            sex: '男',
            birth: '',
            ctInfo: '',
            address: '',
            perType: ''
        }
        let passInfo = {
            idType: '03',
            save: false,
            passport: '',
            cnName: '',
            enName2: '',
            enName1: '',
            sex: '男',
            idcard: '',
            birth: '',
            ctInfo: '',
            address: '',
            doi: '',
            doe: '',
            perType: ''
        }
        let taiwanInfo = {
            idType: '09',
            save: false,
            passport: '',
            cnName: '',
            enName2: '',
            enName1: '',
            sex: '男',
            idcard: '',
            birth: '',
            ctInfo: '',
            address: '',
            doi: '',
            doe: '',
            perType: ''
        }
        let otherInfo = {
            idType: '99',
            save: false,
            passport: '',
            cnName: '',
            enName2: '',
            enName1: '',
            sex: '男',
            idcard: '',
            birth: '',
            ctInfo: '',
            address: '',
            doi: '',
            doe: '',
            perType: ''
        }
        val.selectedIdType = '01'
        val.idInfo = idInfo
        val.passInfo = passInfo
        val.taiwanInfo = taiwanInfo
        val.otherInfo = otherInfo
        state.editArr.push(val)
    },
    updateEidt (state, val) {
        let idInfo = {
            idType: '01',
            save: false,
            cnName: '',
            enName2: '',
            enName1: '',
            idcard: '',
            sex: '',
            birth: '',
            ctInfo: '',
            address: ''
        }
        let passInfo = {
            idType: '03',
            save: false,
            passport: '',
            cnName: '',
            enName2: '',
            enName1: '',
            sex: '',
            idcard: '',
            birth: '',
            ctInfo: '',
            address: '',
            doi: '',
            doe: ''
        }
        val.idInfo = idInfo
        val.passInfo = passInfo
        if (!val.backIndex) {
            state.editArr.push(val)
        } else if (val.backIndex >= 0) {
            state.editArr.reverse().splice(val.backIndex, 0, val)
        }
        state.editArr.reverse()
    },
    deleteEidt (state, val) {
        state.editArr.reverse().splice(val.backIndex - val.reduceNum, val.reduceNum)
        state.editArr.reverse()
    },
    // 保存身份信息
    saveEditId (state, val) {
        state.editArr.forEach(item => {
            if (item.id === val.id) {
                for (const key in item) {
                    if (item[val.type].hasOwnProperty(key)) {
                        item[val.type].key = val.info[key]
                    }
                }
            }
        })
    },
    //
    resetEdit (state, val) {
        state.resetedit = val
    },
    clearEdit (state) {
        state.editArr = []
    }
}

export default {
    state,
    getters,
    mutations
}
