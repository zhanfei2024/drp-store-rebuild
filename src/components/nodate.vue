<template>
    <div class="nodate-loading" v-show="options">
        无数据...
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    name: 'nodate',
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
    .nodate-loading {
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
</style>
