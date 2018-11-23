<template>
    <div class="more-loading" v-show="options">
        <div class="loading-box">
            <mt-spinner type="fading-circle" color="#999"></mt-spinner>
            <div class="loading-text">正在加载中...</div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    props: {
        options: Boolean
    },
    data() {
      return {

      }
    },
    components: {

    }
}
</script>

<style scoped lang="scss">
    .more-loading {
        // position: fixed;
        // top: calc(50% - 2rem);
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 4rem;
        color: $lightGray;
    }
    .loading-box {
        height: 60px;
    }
    .loading-text {
        line-height: 2rem;
    }
</style>
