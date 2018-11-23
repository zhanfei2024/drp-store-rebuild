<template>
    <div class="tourist-list-page order-detail-page page-wrapper">
        <mt-header fixed title="出游人信息">
            <mt-button icon="back" @click.native="back()" slot="left"></mt-button>
        </mt-header>
        <div class="scroll-box">
            <!-- 加载中 -->
            <loading :options="queryLoading"></loading>
            <!-- 无数据 -->
            <nodate :options="nodate"></nodate>
            <!-- 加载完成，数据展示-->
            <div class="custom-title-component tourist-list">
                <div class="item titleItem" v-for="(item, index) in tousist" :key="item.id" @click="goList(item)">
                    <div class="label">
                        <span v-if="item.cnName">{{item.cnName}}</span>
                        <span v-if="!item.cnName">游客{{index+1}}</span>
                        <span v-if="item.perType">&nbsp;{{item.perType}}&nbsp;</span>
                    </div>
                    <div v-if="item.isLock === 1 " class="content">
                        <span class="text">已审核</span>
                        <i class="iconfont icon-right"></i>
                    </div>
                    <div v-else-if="item.isLock === 0 " class="content">
                        <span class="text">未审核</span>
                        <i class="iconfont icon-right"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue'
import {Toast} from "mint-ui"
import loading from '../components/loading.vue'
import nodate from '../components/nodate.vue'
export default {
    name: 'touristList',
    data() {
      return {
          tousist: [],
          queryLoading: true,
          nodate: false
      }
    },
    components: {
        loading,
        nodate
    },
    methods: {
        goList (val) {
            let url = `/tourist-editer/${val.id}`
            this.$router.push({path: url, query: { orderId: this.$route.params.id}})
            this.$store.commit('steTouristLock', val.isLock)
        },
        /* 获取订单详情 */
        async getOrderDetail(id) {
            await this.$http.get(
                `/ms/order/${id}`
            ).then(res => {
                if (res.data.status === 200) {
                    let result = res.data.data
                    this.tousist = result.ordUser
                    if (this.tousist.length === 0) {
                        this.nodate = true
                    }
                } else if(res.data.status !== 100) {
                    Toast({ message: res.data.msg, position: 'bottom', duration: 2000 });
                }
            })
        },
        back() {
            this.$router.go(-1)
        }
    },
    async created() {
        let orderId = this.$route.params.id
        await this.getOrderDetail(orderId)
        this.queryLoading = false
    }

}
</script>

<style scoped lang="scss">
@import './order-detail.scss';
</style>
