<template>
    <div class="peer-form-login-page">
        <img class="page-bg" :src="getSiteInfo.weixinBg" alt="" @error="imgLoadFail()">
        <div class="avatar">
            <img class="pic" :src="getSiteInfo.weixinLogo1" alt="">
        </div>
        <img v-if="getSiteInfo.weixinLogo2" :src="getSiteInfo.weixinLogo2" class="point">
        <div class="pass-word">
            <i class="iconfont icon-cc-lock label"></i>
            <input :type="type" placeholder="请输入同行密码" v-model="password" class="password-input">
            <span class="right">
                <i v-show="password && type === 'password'" @click="type = 'text'" class="iconfont icon-eye3"></i>
                <i v-show="password && type === 'text'" @click="type = 'password'" class="iconfont icon-eye1"></i>
                <i v-show="password" @click="password = ''" class="iconfont icon-clear"></i>
            </span>
        </div>
            
        <button :disabled="login" @click="peerLogin()" class="submit">
            立即登录
        </button>
    </div>
</template>

<script type="text/ecmascript-6">
import { Toast } from 'mint-ui'
import {mapGetters} from 'vuex'
const defaultBg = require('../assets/images/peer-bg.jpg')
export default {
    name: 'peerFormLogin',
    data() {
      return {
          password: '',
          login: false,
          type: 'password',
          imgload: true,
      }
    },
    computed: {
        ...mapGetters([
            'getSiteInfo'
        ])
    },
    methods: {
        imgLoadFail() {
            document.querySelector('.page-bg').src = defaultBg
        },
        isValid() {
            if (this.password == "") {
                Toast({message: "密码不能为空", position: "top", duration: 2000})
                return false
            } else {
                return true
            }
        },
        peerLogin() {
            let redirect = this.$route.query.redirect
            if(this.isValid()) {
                this.login = true
                this.$http({
                    method: 'post',
                    url: '/ms/index.html',
                    data: {indexPassword: this.password},
                    transformRequest: [function (data) {
                        let ret = ''
                        for (let it in data) {
                        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                        }
                        return ret
                    }],
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then((res) => {
                    this.login = false
                    if(res.status === 200 && res.data === 'success') {
                        Toast({
                            message: '登录成功',
                            iconClass: 'icon icon-success'
                        })
                        if(redirect) {
                            this.$router.replace({path: redirect})
                        } else {
                            this.$router.replace({path: '/home'})
                        }
                        
                    } else {
                        Toast({
                            message: '登录失败',
                            iconClass: 'icon icon-failed'
                        })
                        this.password = ''
                    }
                })
            }
        }
    }
}
</script>

<style scoped lang="scss">
@import './peer-form-login.scss'
</style>
