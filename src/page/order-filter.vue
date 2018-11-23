<template lang="html">
  <div class="order-filter">
    <!-- 页面头部 -->
    <mt-header fixed title="订单筛选">
      <router-link to="/order-list" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    
    <div class="scroll-box order-filter-content">
      <!-- 状态 -->
      <div class="module">
        <!-- 订单状态 -->
        <div v-if="query.isOk === '3'">
          <mt-cell title="订单状态" is-link value="全部" @click.native="statusVisible = true"></mt-cell>
        </div>
        <div v-if="query.isOk === '0'">
          <mt-cell title="订单状态" is-link value="预留单" @click.native="statusVisible = true"></mt-cell>
        </div>
        <div v-if="query.isOk === '1'">
          <mt-cell title="订单状态" is-link value="确认单" @click.native="statusVisible = true"></mt-cell>
        </div>
        <div v-if="query.isOk === '2'">
          <mt-cell title="订单状态" is-link value="取消单" @click.native="statusVisible = true"></mt-cell>
        </div>
        <div v-if="query.isOk === '4'">
          <mt-cell title="订单状态" is-link value="有效单" @click.native="statusVisible = true"></mt-cell>
        </div>
        <!-- 有效订单状态切换 -->
        <mt-cell class="no-background-image no-bottom-border" title="有效订单">
          <mt-switch v-model="validOrder"></mt-switch>
        </mt-cell>
      </div>


      <!-- 日期 -->
      <div class="module">
        <!-- 日期类型切换 -->
        <div v-if="query.type === '1'">
          <mt-cell title="日期类型" is-link value="下单日期" @click.native="dateType('1')"></mt-cell>
        </div>
        <div v-if="query.type === '2'">
          <mt-cell title="日期类型" is-link value="出团日期" @click.native="dateType('2')"></mt-cell>
        </div>

        <!-- 开始日期 -->
        <mt-cell  title="开始日期" is-link :value="query.startdate | YYYY-MM-DD" @click.native="startdateClick()"></mt-cell>
        <!-- 结束日期 -->
        <mt-cell class="no-background-image no-bottom-border" title="结束日期" is-link :value="query.enddate | YYYY-MM-DD" @click.native="enddateClick()"></mt-cell>
      </div>

      <!-- 关键字 -->
      <div class="module">
        <mt-field class="no-background-image no-bottom-border" label="关键字" placeholder="请输入订单号、线路名称" v-model="query.skey"></mt-field>
      </div>

      <!-- 搜索按钮 -->
      <div class="page-btn-groups" style="padding: 0 10px; margin-top: 20px;">
        <mt-button type="primary" size="large" @click.native="submitFilter()">搜索</mt-button>
      </div>
    </div>


     <!-- 底部弹层-订单状态 -->
    <mt-popup v-model="statusVisible" position="bottom" class="mint-popup-4">
        <mt-radio class="custom-cell-title-full" v-model="query.isOk" :options="orderStatus"></mt-radio>
    </mt-popup>
    
     <!-- 底部弹层-日期类型 -->
    <mt-popup v-model="typeVisible" position="bottom" class="mint-popup-4">
        <mt-radio class="custom-width custom-cell-title-full" :options="dateTypes" v-model="query.type" @change.native="dateChange(query.type)"></mt-radio>
    </mt-popup>

    <!-- 顶部弹层-开始日期 -->
    <mt-datetime-picker ref="startPicker"
                        v-model="query.startdate" 
                        type="date">
    </mt-datetime-picker>

    <!-- 底部弹层-结束日期 -->
    <mt-datetime-picker ref="endPicker"
                        v-model="query.enddate" 
                        type="date">
    </mt-datetime-picker>

  </div>
</template>

<script>
import moment from 'moment'
export default {
    data () {
        return {
            typeVisible: false,
            statusVisible: false,
            status: '',
            validOrder: true,
            query: {
                isOk: '3',
                type: '1',
                currentPage: 1,
                startdate: new Date(new Date().setDate(new Date().getDate() - 30)),
                enddate: new Date(),
                skey: ''
            },
        }
    },
    methods: {
        dateChange(value) {
            if (value === '1') {
                this.query.startdate = new Date()
                this.query.enddate = new Date(new Date().setDate(new Date().getDate() + 30))
            } else if (value === '2') {
                this.query.startdate = new Date(new Date().setDate(new Date().getDate() - 30)),
                this.query.enddate = new Date()
        }
    },
    // 日期类型选择
    dateType(value) {
      this.typeVisible = true
      this.query.type = value
    },
    startdateClick () {
      this.$refs.startPicker.open();
    },
    enddateClick () {
      this.$refs.endPicker.open();
    },
    /* 提交搜索 */
    submitFilter() {
      if (this.validOrder && this.query.isOk === '0') {
        this.query.isOk = '0'
      } else if (this.validOrder && this.query.isOk === '1') {
        this.query.isOk = '1'
      } else if (this.validOrder && this.query.isOk === '2') {
        this.query.isOk = '4'
      } else if (this.validOrder && this.query.isOk ==='3') {
        this.query.isOk = '4'
      } else if (!this.validOrder && this.query.isOk === '0') {
          this.query.isOk = '0'
      } else if (!this.validOrder && this.query.isOk === '1') {
          this.query.isOk = '1'
      } else if (!this.validOrder && this.query.isOk === '2') {
          this.query.isOk = '2'
      } else if (!this.validOrder && this.query.isOk === '3') {
          this.query.isOk = '3'
      }
      let filter = {
        currentPage: 1,
        pageSize: 5,
        isOk: this.query.isOk,
        skey: this.query.skey,
        type: this.query.type,
      }
      if (filter.type === '1') {
        filter.createStartDate = moment(this.query.startdate).format('YYYY-MM-DD')
        filter.createEndDate = moment(this.query.enddate).format('YYYY-MM-DD')
      } else if (filter.type === '2') {
        filter.planStartDate = moment(this.query.startdate).format('YYYY-MM-DD')
        filter.planEndDate = moment(this.query.enddate).format('YYYY-MM-DD')
      }
      this.$store.commit('setFilter', filter)
      this.$router.push({path: '/order-list'})
    }
  },
  created() {
        this.dateTypes = [
            {
            label: '下单日期',
            value: '1'
            },
            {
            label: '出团日期',
            value: '2'
            }
        ],
        this.orderStatus = [
            {
            label: '全部',
            value: '3'
            },
            {
            label: '预留单',
            value: '0'
            },
            {
            label: '确认单',
            value: '1'
            },
            {
            label: '取消单',
            value: '2'
            }
        ]
  }
}
</script>

<style scoped lang="scss">
  .module {
      padding: 0 .625rem;
    margin-bottom: .625rem;
    @include boxshadow()
  }
  .order-filter-content {
      background-color: $white-color;
  }
</style>
