// function GetCookie(name) {
//   var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
//   if (arr = document.cookie.match(reg)) {
//     return unescape(arr[2]);
//   }
//   return null;
// }

import Vue from 'vue'
var MobileDetect = require('mobile-detect')

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
    // 实现一：获取当月的天数，及当月第一天、第30日、第31日是星期几
    get_data (year, month) {
        var result = {}
        var d = new Date()
        // 如果是2月
        if (month == 2) {
            // 如果是闰年
            if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
                result.days = 29
                // 如果是平年
            } else {
                result.days = 28
            }
            // 如果是第4、6、9、11月
        } else if (month == 4 || month == 6 || month == 9 || month == 11) {
            result.days = 30
        } else {
            result.days = 31
            // 当月第31天是星期几
            result.day31week = d.getDay(d.setFullYear(year, month - 1, 31))
        }

        // 当月第一天是星期几
        result.day1week = d.getDay(d.setFullYear(year, month - 1, 1))
        if (month != 2) {
            // 当月第30天是星期几
            result.day30week = d.getDay(d.setFullYear(year, month - 1, 30))
        }
        return result
    },
    // 实现二：根据当月第一天的星期x，设置第一天的margin-left=宽度*x，使其对应到正确的星期位置上
    move_day1 (year, month, date) {
        var week1 = this.get_data(year, month).day1week
        if (week1 > 1 && week1 < 7) {
            date[0].marginLeft = `calc((100%)/7*${week1})`
        } else if (week1 === 7) {
            date[0].marginLeft = 'calc((100%)/7*0)'
        }
    },
    // 实现三：根据当月的天数，来隐藏多余的天数。当然首先要先显示在其他月份被隐藏的天数
    hide_days (year, month, date) {
        // 恢复其他月份可能隐藏的天数
        for (var i = 28; i < 31; i++) {
            date[i].show = true
        }

        // 隐藏当月多余的天数
        var days = this.get_data(year, month).days;
        for (var i = days; i < 31; i++) {
            date[i].show = false
        }
    },
    // 实现四：如果当月30日或31日是星期日，则会新占一行，通过设置margin-top把新占一行的天移动到第一行
    move_day30 (year, month, date) {
        // 如果当月30日是星期日
        if (this.get_data(year, month).day30week === 0) {
            date[29].marginTop = 'calc(-64*5)'
            date[30].marginLeft = '0'
            date[30].marginTop = 'calc(-64*5)'
            date[30].marginLeft = 'calc(100%/7*1)'
        } else {
            date[29].marginTop = date[30].marginTop = date[30].marginLeft = '0'
        }
        // 如果当月31日是星期日
        if (this.get_data(year, month).day31week === 0) {
            date[30].marginTop = 'calc(-64*5)'
        } else {
            date[30].marginTop = '0'
        }
    },
    // 删除cookie
    // delCookie (name) {
    //     var exp = new Date();
    //     exp.setTime(exp.getTime() - 1);
    //     var cval = getCookie(name);
    //     if (cval != null)
    //         document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    // },
    // // 写cookies
    // setCookie (name, value, days) {
    //         var exp = new Date();
    // exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
    // document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    // },

    // // 读cookie
    getCookie (name) {
        const reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)")
        const arr = document.cookie.match(reg)
        if (arr && arr.length > 2) {
            return decodeURI(arr[2])
        } else {
            return null
        }
    },
    // 清除所有cookie函数
    clearAllCookie () {
        var keys = document.cookie.match(/[^ =;]+(?=\=)/g)
        if (keys) {
            for (let index = 0; index < keys.length; index++) {
                if (keys[index] !== 'peer_login_token') {
                    document.cookie = keys[index] + '=;path=/;expires=' + new Date(0).toUTCString()
                }
            }
        }
    },
    /* 判断当前手机类型 */
    phoneInfo () {
        // 判断数组中是否包含某字符串
        Array.prototype.contains = function (needle) {
            for (i in this) {
                if (this[i].indexOf(needle) > 0)
                    return i;
            }
            return -1;
        }
        let deviceType = window.navigator.userAgent // 获取userAgent信息
        let md = new MobileDetect(deviceType)// 初始化mobile-detect
        let os = md.os() // 获取系统
        let model = '' // 手机型号
        if (os === 'iOS') { // ios系统的处理
            os = md.os() + md.version('iPhone')
            model = md.mobile()
        } else if (os === 'AndroidOS') { // Android系统的处理
            os = md.os() + md.version('Android')
            var sss = deviceType.split(';')
            var i = sss.contains('Build/')
            if (i > -1) {
                model = sss[i].substring(0, sss[i].indexOf('Build/'));
            }
        }
        /* 手机系统和型号存入vuex */
        return {
            system: os,
            mobile: model
        }
    },
    resJudge (res) {
        if (res && res.data && res.data.meta &&
        res.data.meta.success && res.data.data) {
            return true
        } else {
            return false
        }
    },
    extentDate (type = 'last', beginDate) {
        const extent = {
            today: { start: 0, end: 0 },
            last: { start: 86400000, end: 86400000 },
            seven: { start: 518400000, end: 0 },
            thirty: { start: 2505600000, end: 0 }
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
