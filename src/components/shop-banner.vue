<template>
    <div class="shop-banner-component">
        <div class="content">
            <div class="box">
                <div class="head">
                    <div class="shop-avatar">
                        <img class="avatar-pic" :src="shop.storeImg || defaultAvatar">
                    </div>
                    <div class="info">
                        <div class="shop-name">{{shop.storeName}}</div>
                        <div class="shop-nick">{{shop.nickName || '昵称'}}</div>
                        <div class="shop-contact">联系电话：{{shop.mobile}}</div>
                    </div>
                </div>
                <div class="tabs">
                    <div class="item">
                        <i class="iconfont icon-phone07"></i>
                        <a :href="`tel:${shop.mobile}`" class="text">
                            电话联系
                        </a>
                    </div>
                    <div v-if="storeHomeShow" class="item">
                        <i class="iconfont icon-shop"></i>
                        <router-link :to="`/home?storeId=${storeId}`" class="text">店铺首页</router-link>
                    </div>
                    <div class="item">
                        <i class="iconfont icon-share"></i>
                        <a class="text" @click="openMask('share')">分享店铺</a>
                    </div>
                    <div class="item">
                        <i class="iconfont icon-shoucang"></i>
                        <a class="text" @click="openMask('favorite')">收藏店铺</a>
                    </div>
                </div>
            </div>
            <img class="banner-pic bgFilter" :src="shop.storeBackImg || defaultBg" alt="">
        </div>
        
        <!-- 分享店铺 -->
        <div v-show="share" class="share-shop">
            <i @click="hideMask('share')" class="iconfont icon-close"></i>
            <img src="../assets/images/mask_share.png" alt="">
        </div>
        <!-- 收藏店铺 -->
        <div v-show="favorite" class="apply-shop">
            <i @click="hideMask('favorite')" class="iconfont icon-close"></i>
            <img src="../assets/images/mask_favorite.png" alt="">
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import {Vuex, mapGetters} from 'vuex'
import {Toast} from 'mint-ui'
import shopPhoneVue from './shop-phone.vue';
export default {
    name: 'shopBanner',
    data() {
      return {
          share: false,
          favorite: false,
          defaultBg: require('../assets/images/bg_usercenter.jpg'),
          defaultAvatar: require('../assets/images/avatar.png'),
          storeId: '',
          storeHomeShow: true
      }
    },
    components: {

    },
    methods: {
        /* 获取店铺信息 */
        async shopInfo () {
            await this.$http.get('/ms/store/baseInfo/info'
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
        /* 打开浮层 */
        openMask(str) {
            this[str] = true
            this.$emit('openMask')
        },
        /* 打开浮层 */
        hideMask(str) {
            this[str] = false
            this.$emit('hideMask')
        },
        /* 是否展示我的店铺 */
        async isShowShop() {
            await this.$http.get('/ms/store/isShowStore'
            ).then(res => {
                if(res.data.status === 200) {
                    this.$store.commit('isShowShop', res.data.data)
                } else if(res.data.status !== 100) {
                    Toast({ message: res.data.msg, position: 'top', duration: 1500 })
                }
            })
        },
    },
    computed: {
        ...mapGetters([
            'shop'
        ])
    },
    created() {
        this.storeId = this.$route.query.storeId || null
        let path = this.$route.path
        if(path === '/home' && this.storeId) {
            this.storeHomeShow = false
        }
    },
    async mounted() {
        /* 获取店铺信息 */
        await this.shopInfo()
        await this.isShowShop()
        if(this.shop.storeName) {
            document.title = this.shop.storeName
        }
    }
}
</script>

<style scoped lang="scss">
@import './shop-banner.scss';
</style>
