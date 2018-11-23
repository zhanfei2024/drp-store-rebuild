<template lang="html">
  <div class="box-center">
    <div class="head">
      <img :src="bgCenter">
      <div class="info">
        <div class="avatar">
          <img :src="avatar">
        </div>
        <div class="name-tags">
          <p class="name">{{ userInfo.nickName }}</p>
          <p class="tags">
            <span class="tag" v-if="userInfo.levelName">{{ userInfo.levelName }}</span>
            <span class="tag" v-else>注册会员</span>
          </p>
        </div>
      </div>
      <router-link to="/person-general" class="to-person" v-if="baseInfos.conDevModule == 1"></router-link>
      <router-link to="/person-peer" class="to-person" v-else></router-link>
    </div>
    <div class="body">
        <mt-cell title="回到首页" @click.native="home"></mt-cell>
        <mt-cell title="修改密码" to="/modify-pass" is-link></mt-cell>
        <mt-cell title="我的订单" @click.native="toOrder" is-link></mt-cell>
        <mt-cell v-show="shopShow" title="我的店铺" :to="'/shop-editer'" is-link></mt-cell>
    </div>

    <div class="button-user-center">
        <mt-button type="primary" @click="logOut()">退出</mt-button>
    </div>

  </div>
</template>

<script>
import bgCenter from '../assets/images/bg_usercenter.jpg'
import avatar from '../assets/images/avatar.png'
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'
import {Toast} from 'mint-ui'
import util from '../util'
export default {
  data () {
    return {
      bgCenter: bgCenter,
      avatar: avatar,
      shopShow: ''
    }
  },
  computed: mapGetters({
    userInfo: 'getUser',
    baseInfos: 'getSiteInfo',
    shop: 'shop'
  }),
  methods: {
        /* 是否展示我的店铺 */
      isShowShop() {
          this.$http.get('/ms/store/isShowStore'
          ).then(res => {
              if(res.data.status === 200) {
                  let d = new Date();
                  d.setMinutes(d.getMinutes()+30)
                  this.$store.commit('isShowShop', res.data.data)
                  /* 店铺显影存入到cookie */
                  document.cookie=`isShowShop=${res.data.data};path=/;expires=${new Date(d).toUTCString()}`
                  this.shopShow = parseInt(util.getCookie('isShowShop'), 10)
              } else if(res.data.status !== 100) {
                  Toast({ message: res.data.msg, position: 'top', duration: 1500 })
              }
          })
      },
      /* 获取店铺信息 */
        shopInfo () {
            this.$http.get('/ms/store/baseInfo/info'
            ).then(res => {
                if (res.data.status === 200) {
                    let result = res.data.data
                    if (result) {
                        this.$store.commit('setShop', result)
                    }
                } else if(res.data.status === 100000) {
                    Toast({ message: res.data.msg, position: 'top', duration: 1500 })
                }
            })
        },
    toOrder() {
        if (this.order.memberType === 2 && this.order.isOk === -1) {
            Toast({ message: '您还未提交同行认证资料，请完善个人信息', position: 'bottom', duration: 2000 })
            return
        } else if (this.order.memberType === 2 && this.order.isOk === 0) {
            Toast({ message: '您的同行认证资料待审核，请耐心等待核', position: 'bottom', duration: 2000 })
            return
        } else if (this.order.memberType === 2 && this.order.isOk === -3) {
            Toast({ message: '您的同行认证资料被拒绝，请重新提交审核', position: 'bottom', duration: 2000 })
            return
        }
        if (this.order.isOk === -2) {
            Toast({ message: '您的账号被禁止登录3秒后强制退出', position: 'bottom', duration: 2000 })
            setTimeout(() => {
                window.location.href = '/m/logout.html'
            }, 3000);
        }

        this.$router.push('/order-list')
    },
    home() {
        this.$router.push('/')
    },
    quitLogin () {
        Toast({ message: '退出成功', position: 'bottom', duration: 2000 });
        util.clearAllCookie()
        this.$store.commit('isShowShop', 0)
        this.$router.push({path: '/home'})
    },
    logOut() {
        this.$http.get('/ms/logout')
        .then(res => {
            if(res.data.status === 200) {
                this.quitLogin()
            } else if(res.data.status !== 100) {
                Toast({ message: res.data.data.msg, position: 'bottom', duration: 2000 });
            }
        })
    },
    user() {
        this.$http.get('/ms/user/info'
            ).then(res => {
                if (res.data.status === 200) {
                    this.order = res.data.data
                } else if(res.data.status !== 100) {
                    Toast({ message: res.data.msg, position: 'bottom', duration: 2000 });
                }
            })
    }
  },
    created (){
        this.user()
        this.isShowShop()
        this.shopInfo()
    }
}
</script>

<style lang="css">
.box-center{ height: 100%; min-height: 100%; background: #fafafa;}
.box-center .mint-cell-wrapper {line-height: 3rem;}
.box-center .head{ position: relative; border-top: 1px solid #438ff3; background-color: #48a1ff;}
.box-center img{ width: 100%; height: auto;}
.box-center .info{ position: absolute; top: 50%; left: 0; width: 100%; height: 60px; padding: 0 30px; margin-top: -30px; box-sizing: border-box;}
.box-center .info .avatar{ float: left; width: 50px; height: 50px; border: 4px solid #56a9fe; border-radius: 50%;}
.box-center .info .avatar img{ width: 50px; height: 50px; border-radius: 50%;}
.box-center .info .name-tags{ float: left; margin-left: 10px; color: #fff;}
.box-center .info .name-tags .name{ font-size: 18px; margin-top: 5px}
.box-center .info .name-tags .tag{ display: block; float: left; padding: 1px 10px; font-size: 11px; border-radius: 8px; background: #ff861b;}
.box-center .to-person{ position: absolute; top: 50%; right: 20px; width: 24px; height: 24px; margin-top: -12px; background: url(../assets/images/icon_right_arrow.png); background-repeat: no-repeat; background-size: contain;}
.box-center .body{ margin-top: 20px; text-align: left;}
.box-center .body .mint-cell{ padding-left: 30px; color: #4d4d4d; background-image: none;}
.box-center .body .mint-cell-wrapper{ background-image: none;}
.button-user-center{margin: 0 1.25rem 2rem; position: absolute; bottom: 0; width: calc(100% - 2.5rem);}
.button-user-center .mint-button {width: 100%}
</style>
