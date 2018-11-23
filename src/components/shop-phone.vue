<template>
    <div class="shop-phone-component">
        <div class="phone-info">
            <p class="shop-nick">{{shop.nickName}}</p>
            <p class="shop-phone">{{shop.mobile}}</p>
        </div>
        <a :href="`tel:${shop.mobile}`" class="phone-button">
            <i class="iconfont icon-phone07"></i>
            <a class="text">电话联系</a>
        </a>
    </div>
</template>

<script type="text/ecmascript-6">
import {Vuex, mapGetters} from 'vuex'
import {Toast} from 'mint-ui'
import shopBannerVue from './shop-banner.vue';
export default {
    name: 'shopPhone',
    data() {
      return {

      }
    },
    methods: {
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
        }
    },
    computed: {
        ...mapGetters([
            'shop'
        ])
    },
    mounted() {
        /* 获取店铺信息 */
        this.shopInfo()
    }
}
</script>

<style scoped lang="scss">
    @import './shop-phone.scss';
</style>
