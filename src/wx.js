import wx from 'weixin-js-sdk' // 微信sdk
import axios from 'axios'
const wxShare = function (title, desc, link, imgUrl) {
    axios.post('/',
    ).then(res => {
        if (res.data.status === 200) {
            let result = res.data.data
            // 微信分享配置
            wx.config({
                debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: '', // 必填，公众号的唯一标识
                timestamp: Date.now(), // 必填，生成签名的时间戳
                nonceStr: '', // 必填，生成签名的随机串
                signature: '', // 必填，签名
                jsApiList: [
                    'updateAppMessageShareData',
                    'updateTimelineShareData',
                    'onMenuShareWeibo'
                ] // 必填，需要使用的JS接口列表
            })
            // 通过ready接口处理成功验证
            wx.ready(function () { // 需在用户可能点击分享按钮前就先调用
                // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容
                wx.updateAppMessageShareData({
                    title: title, // 分享标题
                    desc: desc, // 分享描述
                    link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: imgUrl, // 分享图标
                    success: function () {
                        // 设置成功
                    }
                })
                // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
                wx.updateTimelineShareData({
                    title: title, // 分享标题
                    desc: desc, // 分享描述
                    link: link, // 分享链接
                    imgUrl: imgUrl, // 分享图标
                    success: function () {
                        // 设置成功
                    }
                })
                // 获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
                wx.onMenuShareWeibo({
                    title: '', // 分享标题
                    desc: '', // 分享描述
                    link: '', // 分享链接
                    imgUrl: '', // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                })
            })
            // 通过error接口处理失败验证
            wx.error(function (res) {
                console.log(res)
            })
        } else {
            console.log('error')
        }
    })
}

export default wxShare
