<template>
    <div class="store-member-page">
        <mt-header fixed title="我的会员">
            <router-link to="/shop-editer" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>        

        <div class="member">
            <div class="wrapper head">
                <div class="item1">账号</div>
                <div class="item2">姓名</div>
                <div class="item3">有效单数</div>
                <div class="item4">返佣金额</div>
            </div>
           
            <!-- 有数据... -->
            <div v-for="item in members" :key="item.id" class="wrapper member-item">
                <div class="item1">{{item.id}}</div>
                <div class="item2">{{item.name}}</div>
                <div class="item3">{{item.num}}</div>
                <div class="item4">{{item.sum}}</div>
            </div>
            <!-- 加载中... -->
            <loading :options="true"></loading>
            <!-- 无数据... -->
            <nodate :options="true"></nodate>
        </div>
        <!-- 回到顶部 -->
        <to-top :options="scrollTop" v-on:toTop="backToTop()"></to-top>
    </div>
</template>

<script type="text/ecmascript-6">
import Loading from '../components/loading.vue'
import Nodate from '../components/nodate.vue'
import toTop from '../components/toTop.vue'
export default {
    data() {
      return {
            scrollTop: true,
            loading: false,
            hasMore: false,
            members: [
                {
                    id: 11111111,
                    name: 'zhanfei',
                    num: 22,
                    sum: 22
                },
                {
                    id: 11111111,
                    name: 'zhanfei',
                    num: 22,
                    sum: 22
                },
                {
                    id: 11111111,
                    name: 'zhanfei',
                    num: 22,
                    sum: 22
                },
                {
                    id: 11111111,
                    name: 'zhanfei',
                    num: 22,
                    sum: 22
                },
                {
                    id: 11111111,
                    name: 'zhanfei',
                    num: 22,
                    sum: 22
                }
            ],
      }
    },
    components: {
        Loading,
        Nodate,
        toTop
    },
    methods: {
        backToTop () {
            (function smoothscroll() {
                var currentScroll = document.documentElement.scrollTop || document.body.scrollTop
                if (currentScroll > 0) {
                    window.requestAnimationFrame(smoothscroll);
                    window.scrollTo(0, currentScroll - currentScroll / 5)
                }
            })()
            this.scrollTop = false
        },
        handleScroll() {
            if (document.body.scrollTop === 0) {
                this.scrollTop = false
            } else if (document.body.scrollTop + window.innerHeight >= document.body.offsetHeight) {
                this.scrollTop = true;
                if (!this.loading && this.hasMore) {
                    console.log('请求数据。。');
                }
            }
        },
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll)
    },
    destroyed() {
        window.removeEventListener("scroll", this.handleScroll)
    }
}
</script>

<style scoped lang="scss">
@import './store-member.scss'
</style>
