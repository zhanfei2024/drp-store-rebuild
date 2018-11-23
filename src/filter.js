import moment from 'moment'

const filter = {
    'sliceA': function (data, start, end) {
        if (typeof (data) === 'string' || data instanceof Array) {
            return data.slice(start, end)
        }
    },
    '5': function (date) {
        if (date) {
            return date.slice(0, 5)
        }
    },
    'toZh': function (date) {
        if (date === '') {
            return '不限'
        } else if (date === 0) {
            return '0'
        } else if (date > 100 && date < 1000) {
            let str = date + ''
            return str.slice(0, 1) + '百'
        } else if (date > 1000 && date < 10000) {
            let str = date + ''
            return str.slice(0, 1) + '千'
        } else if (date === 10000) {
            return '1万'
        } else if (date > 10000) {
            return '1万以上'
        }
    },
    'YYYY-MM-DD HH:mm': function (date) {
        if (moment(date).format('YYYY-MM-DD HH:mm') === 'Invalid date') {
            return ''
        }
        if (!date) {
            return ''
        }
        return moment(date).format('YYYY-MM-DD HH:mm')
    },
    'MMM-DD': function (date) {
        return moment(date).format('MM-DD')
    },
    'YYYY-MM-DD': function (date) {
        if (date instanceof Date) {
            if (date.getTime() === new Date(1970, 0, 1).getTime()) {
                return null
            } else {
                return moment(date).format('YYYY-MM-DD')
            }
        } else {
            return null
        }
    },
    'MM-DD': function (date) {
        if (moment(date).format('MM-DD') === 'Invalid date') {
            return ''
        }
        return moment(date).format('MM-DD')
    },
    '.00': function (date) {
        if (isNaN(date)) {
            return
        }
        let num = new Number(date)
        return num.toFixed(2)
    }
}

export default filter
