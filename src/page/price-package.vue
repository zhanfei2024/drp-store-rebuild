<template>
    <div class="price-package-page page-wrapper">
        <mt-header fixed title="价格套餐">
            <div @click="back()" slot="left">
                <mt-button icon="back"></mt-button>
            </div>
        </mt-header>

        <div class="scroll-box package-list">

            <div class="tab">
                <!-- 头部滚动 -->
                <div class="filter-scroll swiper-container">
                    <div class="swiper-wrapper">
                        <!-- Slides -->
                        <div class="swiper-slide item" v-for="item in pricePack.prices" :key="item.id" @click="selectedPack(item.id)" :class="{selected: item.selected}">
                            <span class="text">{{item.priceTitle.slice(0,4)}}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 市场价 -->
            <div v-for="item in pricePack.prices" :key="item.id">
                <div v-show="item.selected"  class="average-list section">
                    <div v-if="item.newAdultPrice" class="item">
                        <span class="title">{{pricePack.showName.adultPrice}}</span>
                        <span class="reload">
                            <span class="num">¥{{item.newAdultPrice}}</span>
                        </span>
                    </div>
                    <div v-if="item.newAdultPrice1" class="item">
                        <span class="title">{{pricePack.showName.adultPrice1}}</span>
                        <span class="reload">
                            <span class="num">¥{{item.newAdultPrice1}}</span>
                        </span>
                    </div>
                    <div v-if="item.newAdultPrice2" class="item">
                        <span class="title">{{pricePack.showName.adultPrice2}}</span>
                        <span class="reload">
                            <span class="num">¥{{item.newAdultPrice2}}</span>
                        </span>
                    </div>
                    <div v-if="item.newChildPrice" class="item">
                        <span class="title">{{pricePack.showName.childPrice}}</span>
                        <span class="reload">
                            <span class="num">¥{{item.newChildPrice}}</span>
                        </span>
                    </div>
                    <div v-if="item.newChildPrice1" class="item">
                        <span class="title">{{pricePack.showName.childPrice1}}</span>
                        <span class="reload">
                            <span class="num">¥{{item.newChildPrice1}}</span>
                        </span>
                    </div>
                </div>
            </div>

        </div>

        <div class="button-wrapper">
            <mt-button type="primary" @click="back()">确认</mt-button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import Swiper from "swiper"
import "swiper/dist/css/swiper.min.css"
import {mapGetters} from 'vuex'
let addDisPrice = true
export default {
    data() {
      return {
      }
    },
    computed: {
        ...mapGetters([
            'disPrice',
            'pricePack'
        ])
    },
    methods: {
        selectedPack(id) {
            let selectedId = parseInt(id, 10)
            this.$store.commit('selectedPack', selectedId)
        },
        back() {
            this.$router.go(-1)
        },
        /* 初始化轮播图 */
        carousel(selector) {
            var mySwiper = new Swiper(selector, {
                // Optional parameters
                direction: "horizontal",
                // loop: true,
                // If we need pagination
                // pagination: {
                //     el: ".swiper-pagination"
                // },
                speed: 400,
                spaceBetween: 0,
                autoplay: true,
                effect: "slide",
                observer: true, //修改swiper自己或子元素时，自动初始化swiper
                observerParents: true, //修改swiper的父元素时，自动初始化swiper
                slidesPerView: 5,
                // And if we need scrollbar
                scrollbar: {
                    el: ".swiper-scrollbar"
                }
            })
        }
    },
    mounted() {
        this.carousel('.filter-scroll')
    }
}
</script>

<style scoped lang="scss">
@import './price-package.scss'
</style>
