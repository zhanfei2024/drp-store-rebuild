<template>
    <div class="start-city-page page-wrapper">
        <mt-header fixed title="选择出发城市">
            <a @click="back()" slot="left">
                <mt-button icon="back"></mt-button>
            </a>
        </mt-header>
        <div class="scroll-box city-list">
            <!-- 选择项 -->
            <div class="choice-list section">
                <div v-for="(item, index) in cities" @click="selectCity(index, item)" :key="item.id" class="item">
                    <span class="title">{{item.cityName}}</span>
                    <span class="reload">
                        <span style="color:#fe3c2e; font-weight: bold" v-show="index > 0">+</span>
                        <span class="num">¥{{item.price}}</span>
                        <i v-show="!item.selected" class="iconfont icon-dui"></i>
                        <i v-show="item.selected" class="iconfont icon-yes"></i>
                    </span>
                </div>
            </div>
        </div>
        <div class="button-wrapper">
            <mt-button type="primary" @click="back()">确认</mt-button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
export default {
    data() {
      return {
          arrDis: [this.$store.state.lineInput.cities.filter(item => item.selected === true)[0].price],
          dis: ''
      }
    },
    methods: {
        back() {
            this.$router.go(-1)
        },
        selectCity(index, item) {
            this.arrDis.push(item.price)
            let dis = this.arrDis[this.arrDis.length - 1] - this.arrDis[this.arrDis.length - 2]
            this.$store.commit('setDisPrice', {disPrice: dis, cityIndex: index})
            this.$store.commit('selectedCity', item.id)
        },
    },
    computed: {
        ...mapGetters([
            'cities'
        ])
    },
    created() {
    }
}
</script>

<style scoped lang="scss">
.start-city-page {
    .item:last-child {
        border-bottom: none;
    }
    .button-wrapper {
        position: fixed;
        bottom: 0;
        width: 100%;
        line-height: 2.4rem;
        .mint-button {
            text-align: center;
        }
    }
}
</style>
