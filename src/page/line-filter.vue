<template>
    <div class="line-filter-page page-wrapper">
        <mt-header fixed title="产品筛选">
            <a @click="back()" slot="left">
                <mt-button icon="back"></mt-button>
            </a>
        </mt-header>
        <div class="scroll-box">
            <!-- 价格区间 -->
            <div class="section">
                <div class="item">
                    <span class="title">价格区间</span>
                    <span class="reload">
                        <span class="num"></span>
                    </span>
                </div>
                <div class="name">
                    <div class="content price-content">
                        <span v-for="(item, index) in priceRange" :key="index" @click="rangPrice(item)"  class="price-item">
                            <div class="point-item active">
                                <span class="point" :class="{activePoint: item.selected}"></span>
                            </div>
                            <div v-show="!item.pre" class="text" :class="{activeText: item.selected}">{{item.prs | toZh }}</div>
                            <div v-show="item.pre" class="text" :class="{activeText: item.selected}">{{item.prs | toZh }}-{{item.pre | toZh}}</div>
                        </span>
                    </div>
                </div>
            </div>

            <!-- 行程天数 -->
            <div class="section">
                <div @click="daysVisible = true" class="item">
                    <span class="title">行程天数</span>
                    <span class="reload">
                        <span v-show="lineFilter.day === 'all' || lineFilter.day === ''" class="num">不限</span>
                        <span v-show="lineFilter.day === '1'" class="num">1天</span>
                        <span v-show="lineFilter.day === '2'" class="num">2天</span>
                        <span v-show="lineFilter.day === '3'" class="num">3天</span>
                        <span v-show="lineFilter.day === '5'" class="num">5天</span>
                        <span v-show="lineFilter.day === '6'" class="num">6天</span>
                        <span v-show="lineFilter.day === '7'" class="num">7天及以上</span>
                        <i class="iconfont icon-right"></i>
                    </span>
                </div>
            </div>

            <!-- 出发日期 -->
            <div class="section">
                <div class="item">
                    <span class="title">出发日期</span>
                    <span class="reload">
                        <span class="num"></span>
                    </span>
                </div>
                <div @click="open('startDay')" class="item name">
                    <div class="title label">
                        <span class="title">开始</span>
                    </div>
                    <span class="reload">
                            <span class="num">{{lineFilter.planDatePrs | YYYY-MM-DD}}</span>
                            <i class="iconfont icon-right"></i>
                    </span>
                </div>
                <div @click="open('endDay')" class="item name">
                    <div class="title label">
                        <span class="title">结束</span>
                    </div>
                    <span class="reload">
                            <span class="num">{{lineFilter.planDatePre | YYYY-MM-DD}}</span>
                            <i class="iconfont icon-right"></i>
                    </span>
                </div>
            </div>

            
        </div>
        <div class="customs-button">
            <span @click="rest()" class="reset button-item">重置</span>
            <span @click="confirm()" class="confirm button-item">确定</span>
        </div>
        

        <!-- 行程天数 -->
        <mt-popup v-model="daysVisible" position="bottom" class="mint-popup-4 sex-popup">
            <mt-radio
                class="page-part custom-cell-title-full"
                :options="daysOptions"
                v-model="lineFilter.day"/>
        </mt-popup>

        <!-- 开始日期 -->
        <mt-datetime-picker
            ref="startDay"
            type="date"
            :startDate="startDate1"
            :endDate="endDate1"
            v-model="lineFilter.planDatePrs">
        </mt-datetime-picker>

        <!-- 结束日期 -->
        <mt-datetime-picker
            ref="endDay"
            type="date"
            :startDate="startDate2"
            :endDate="endDate2"
            v-model="lineFilter.planDatePre">
        </mt-datetime-picker>

    </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
export default {
    name: 'LineFilter',
    data() {
        return {
            daysVisible: false,
            startDate1: new Date(),
            endDate1: new Date(new Date().setUTCMonth(new Date().getUTCMonth() + 4)),
            startDate2: new Date(),
            endDate2: new Date(new Date().setUTCMonth(new Date().getUTCMonth() + 4)),
            storeId: ''
        }
    },
    computed: {
        ...mapGetters([
            'lineFilter',
            'priceRange'
        ])
    },
    methods: {
        back () {
            if(this.storeId) {
                this.$router.push({path: '/line-list', query: {storeId: this.storeId, params: JSON.stringify(this.lineFilter)}})
            } else if(!this.storeId) {
                this.$router.push({path: '/line-list', query: {params: JSON.stringify(this.lineFilter)}})
            }
            
        },
        rest () {
            this.$store.commit('rest')
        },
        open (picker) {
            this.$refs[picker].open()
        },
        rangPrice (val) {
            this.$store.commit('setRange', val)
        },
        confirm() {
            this.$store.commit('resetCurrenPage')
            if(this.storeId) {
                this.$router.push({path: '/line-list', query: {storeId: this.storeId, params: JSON.stringify(this.lineFilter)}})
            } else if(!this.storeId) {
                this.$router.push({path: '/line-list', query: {params: JSON.stringify(this.lineFilter)}})
            }
        },
        setFilterDates (val) {
            this.$store.commit('setFilterDates', val)
        }
    },
    created() {
        this.daysOptions = [
            {label: '不限', value: 'all'},
            {label: '1天', value: '1'},
            {label: '2天', value: '2'},
            {label: '3天', value: '3'},
            {label: '5天', value: '5'},
            {label: '6天', value: '6'},
            {label: '7天及以上', value: '7'}
        ],
        this.storeId = this.$route.query.storeId || ''
    }
}
</script>

<style scoped lang="scss">
@import './line-filter.scss';
</style>
