import Vue from 'vue'

Date.prototype.format = function (fmt) { // eslint-disable-line
    const o = {
        'M+': this.getMonth() + 1, // 月份
        'd+': this.getDate(), // 日
        'h+': this.getHours(), // 小时
        'm+': this.getMinutes(), // 分
        's+': this.getSeconds(), // 秒
        'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
        'S': this.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
    }
    return fmt
}

const util = {
    /* 判断到期时间是否在本年内 */
    formatEndTime (date) {
        let nowYear = new Date().getFullYear()
        let dateYear = parseInt(date.slice(0, 4))
        if (nowYear === dateYear) {
            return date.slice(5)
        } else {
            return date
        }
    },
    /* 判断出团日期和返回日期所在时间范围 */
    formatTimes (date1, date2) {
        let nowYear = new Date().getFullYear()
        let date1Year = parseInt(date1.slice(0, 4))
        let date2Year = parseInt(date2.slice(0, 4))
        if (date1Year === nowYear && date1Year === date2Year) {
            return {
                date1: date1.slice(5),
                date2: date2.slice(5)
            }
        } else if (date1Year === nowYear && date1Year < date2Year) {
            return {
                date1: date1.slice(5),
                date2: date2
            }
        } else if (date1Year > nowYear) {
            return {
                date1: date1,
                date2: date2
            }
        }
    },
    getCookie (name) {
        const value = '; ' + document.cookie;
        const parts = value.split('; ' + name + '=')
        if (parts.length === 2) return parts.pop().split(';').shift()
    },
    resJudge (res) {
        if (res && res.data && res.data.meta &&
        res.data.meta.success && res.data.data) {
            return true
        }
        return false
    },
    extentDate (type = 'last', beginDate) {
        const extent = {
            today: { start: 0, end: 0 },
            last: { start: 86400000, end: 86400000 },
            seven: { start: 518400000, end: 0 },
            thirty: { start: 2505600000, end: 0 },
        }
        const beginTime = beginDate ? new Date(beginDate).getTime() : Date.now();
        const startDate = new Date(beginTime - extent[type].start);
        const endDate = new Date(beginTime - extent[type].end);
        const start = new Date(
            startDate.getFullYear(),
            startDate.getMonth(),
            startDate.getDate(),
            0, 0, 0
        ).format('yyyy-MM-dd hh:mm:ss')
        const end = new Date(
            endDate.getFullYear(),
            endDate.getMonth(),
            endDate.getDate(),
            23, 59, 59
        ).format('yyyy-MM-dd hh:mm:ss')
        return {
            start,
            end
        }
    },
    dateRange (start, end) {
        if (start && end) {
            start = new Date(start)
            end = new Date(end)
            if (start !== 'Invalid Date' && end !== 'Invalid Date') {
                if (start.getFullYear() === end.getFullYear()) {
                    if (start.getMonth() === end.getMonth()) {
                        if (start.getDate() === end.getDate()) {
                            return 'D'
                        }
                        return 'M'
                    }
                    return 'Y'
                }
            }
        }
    }
}

const plugin = {
    install (_Vue, options) {
        if (!_Vue.prototype.$util) _Vue.prototype.$util = {}
        Object.assign(_Vue.prototype.$util, util)
    }
}

Vue.use(plugin)
if (!Vue.util) Vue.util = {}
Object.assign(Vue.util, util)

export default util
