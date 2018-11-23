<template>
    <div class="start-city-page page-wrapper">
        <mt-header fixed title="选择销售">
            <a @click="back()" slot="left">
                <mt-button icon="back"></mt-button>
            </a>
        </mt-header>
        <form class="search-form" action="">
            <input class="search-seller" placeholder="请输入关键字" v-model="keyword">
        </form>
        <div class="scroll-box city-list">
            <!-- 选择项 -->
            <div v-if="sellerList.length" class="choice-list section">
                <div v-for="item in sellerList" :key="item.id" @click="selected(item.id)" class="item">
                    <span class="title">{{item.name}}</span>
                    <span class="reload">
                        <i v-show="!item.selected" class="iconfont icon-dui"></i>
                        <i v-show="item.selected" class="iconfont icon-yes"></i>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
export default {
    data() {
      return {
          keyword: '',
          sellerList: []
      }
    },
    watch: {
        keyword: function(newValue, oldvalue) {
            if (newValue) {
                this.sellerList = this.sellers.saleList.filter(item => item.name.search(newValue) >= 0)
            } else {
                this.sellerList = this.sellers.saleList
            }
        }
    },
    methods: {
        back() {
            this.$router.go(-1)
        },
        selected (id) {
            this.$store.commit('setSeller', id)
            this.$router.go(-1)
        },
        onSubmit() {
            return false
        }
    },
    computed: {
        ...mapGetters([
            'sellers'
        ])
    },
    async created() {
        if (this.sellers.isShowSale === '') {
            await this.$store.dispatch('getSellers')
        }
        this.sellerList = this.sellers.saleList
    }
}
</script>

<style scoped lang="scss">
.start-city-page {
    .search-form {
        position: fixed;
        padding: .625rem;
        top: 2.5rem;
        z-index: 100;
        width: calc(100% - 20px);
        background-color: $light-background-color;
    }
    .search-seller {
        width: calc(100% - 20px);
        height: 2rem;
        padding: 0 .6rem;
    }
    .choice-list {
        border-top: none;
    }
    .item:last-child {
        border-bottom: none;
    }
    .scroll-box {
        padding-top: 5.75rem;
    }
}
</style>
