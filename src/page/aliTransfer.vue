<template>
    <div class="alitransfer-page page-wrapper">
        <img v-if="isWeiXin" src="../assets/images/alitransfer.jpg"/>

        <div v-if="!isWeiXin" class="more-loading">
            <div class="loading-box">
                <mt-spinner type="fading-circle" color="#999"></mt-spinner>
                <div class="loading-text">{{payInfo}}</div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    name: 'aliTransfer',
    data() {
      return {
          payInfo: '',
          isWeiXin: ''
      }
    },
    components: {

    },
    created() {
        const userAgent = window.navigator.userAgent
        const isAli = /aplipay/i.test(userAgent)
        this.isWeiXin = /micromessenger/i.test(userAgent)
        if (!this.isWeiXin) {
            this.payInfo = '正在跳转到支付通道...'
            location.href = this.$route.query.url
        }
    }
}
</script>

<style scoped lang="scss">
.alitransfer-page {
    img {
        width: 100%;
    }
   .more-loading {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        color: $lightGray;
    }
    .loading-box {
        height: 60px;
    }
    .loading-text {
        line-height: 2rem;
    }
}
</style>

