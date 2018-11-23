<template>
    <div v-show="options" class="bottom-bar-component">
        <div class="back-top" >
            <i @click="scrollTo" class="iconfont icon-backtotop"></i>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    name: 'toTop',
    props: {
        options: Boolean
    },
    data() {
      return {

      }
    },
    methods: {
        scrollTo() {
            this.$emit('toTop')
        }
    }
}
</script>

<style scoped lang="scss">
@import '../assets/scss/common.scss';
</style>
