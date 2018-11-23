<template>
    <div class="net-error-page">
        <div class="notice">
            <p class="head">404</p>
            <p class="error">ERROR</p>
        </div>
        <div class="info">对不起，您访问的页面不存在...</div>
        <div class="operate">
            <router-link :to="{path: '/home'}" class="home">返回首页</router-link><a 
            @click="back()" class="back">返回上一页</a>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    data() {
      return {

      }
    },
    methods: {
        back() {
            this.$router.go(-1)
        }
    }
}
</script>

<style scoped lang="scss">
@import './net-error.scss'
</style>
