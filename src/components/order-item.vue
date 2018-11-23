<template>
      <div class="order-detail-component">
        <div v-for="order in orders" v-bind:key="order.id" class="order">
          <div @click="slectedOrder(order)">
            <div class="hd clearfix">
              <div class="fl">
                <p class="light-gray">订单编号：<span>{{order.id}}</span></p>
                <p class="light-gray">下单时间：<span>{{order.addTime | YYYY-MM-DD HH:mm}}</span></p>
              </div>
              <div class="fr">
                <p>
                  <span v-if="order.isOk === 1" class="status statu-green">确认</span>
                  <span v-if="order.isOk === 0" class="status statu-green">预留单</span>
                  <span v-if="order.isOk === -2 || order.isOk === -3 || order.isOk === -4" class="status statu-gray">取消单</span>
                </p>
                <p v-if="order.isOk === 0" class="end-time"><span>到期:&nbsp;{{order.endTime}}</span></p>
              </div>
            </div>
            <div class="bd">
              <h4 class="order-title">
                <div v-show="order.reloadMore" class="title-wrapper">
                  <p class="title-text">{{order.lineTitle}}</p>
                  <span class="show-btn" @click.stop="selected(order.id)"><i class="iconfont icon-xiajiantou"></i></span>
                </div>
                <p v-show="!order.reloadMore" class="title-text-more">{{order.lineTitle}}</p>
              </h4>
              <div class="infos clearfix">
                <div class="fl">
                  <p>出发城市：<span>{{order.fromCityName}}</span></p>
                  <p>往返日期：<span>{{order.planDate | MM-DD}}</span> ~ <span>{{order.backDate}}</span></p>
                </div>
                <div class="fr num">
                  <p><span>成人&nbsp;x&nbsp;<span>{{order.aduNum}}</span></span><span>小童&nbsp;x&nbsp;<span>{{order.chdNum}}</span></span></p>
                </div>
              </div>
            </div>
            <div v-if="order.payShow" class="ft clearfix">
              <div class="fl">
                <p>合计：<span class="price">{{order.amount}}</span><span class="paid">（未付：<em>{{order.amount - order.pingAmount}}</em>）</span></p>
              </div>
              <div class="fr">
                <button class="btn-pay" v-if="(order.isOk === 0 && order.amount - order.pingAmount > 0) || (order.isOk === 1 && order.amount - order.pingAmount > 0)" @click.stop="pay(order.id)">支付</button>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>

<script type="text/ecmascript-6">
import moment from 'moment'
export default {
  data () {
    return {

    }
  },
  props: {
    orders: Array
  },
  components: {

  },
  methods: {
    selected(id) {
      this.$emit('filterOrder', id)
    },
    slectedOrder(value) {
      this.$router.push(value.url)
      this.$store.commit('setOrder', value)
    },
    pay(id) {
      this.$router.push(`/order-pay/${id}`)
    },
  }
}
</script>

<style scoped lang="scss">
@import '../assets/scss/order-item.scss';
</style>
