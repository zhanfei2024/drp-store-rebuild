<template>
    <div class="order-mark-page">
      <mt-header title="订单备注">
        <mt-button @click="back()" slot="left" icon="back">返回</mt-button>
        <mt-button @click="submitMark()" slot="right">保存</mt-button>
      </mt-header>

      <textarea class="order-mark" name="mark" cols="30" rows="10" 
                v-on:keyup="change(orderMark.ordBak)" 
                v-model="orderMark.ordBak"
                placeholder="请输入备注"></textarea>
      <div v-if="chartNum > 0" class="mark-bottom">当前还能输入{{chartNum}}个字符</div>
      <div v-if="chartNum < 0" class="mark-bottom over-chart">你输入的字符数超过限制</div>
    </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue'
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      orderMark: '',
      chartNum: 150,
      sumChart: 150,
      orderMark: {
        id: parseInt(this.$route.params.id),
        ordBak: this.$store.state.order.mark
      }
    }
  },
  computed: {
    ...mapGetters([
      'mark'
    ])
  },

  methods: {
    back() {
      MessageBox.confirm('是否要离开此页面?').then(action => {
        if (action === 'confirm') {
          this.$router.go(-1)
        }
      }).catch(error => {
        // this.$router.go(-1)
      })
    },
    validate() {
      if (this.chartNum < 0) {
          Toast({ message: '你输入的字符数超过限制', position: 'bottom', duration: 3000})
          return false
      } else if (this.orderMark.ordBak.length === 0) {
        Toast({ message: '请输入完备注，再提交', position: 'bottom', duration: 3000})
          return false
        } else {
          return true
        }
      },
    submitMark() {
      if (this.validate()) {
        this.$http.post('/ms/order/edit_ord_remark', this.orderMark).then(res => {
          if (res.data.status === 200) {
            this.$store.commit('saveBak', res.data.msg)
            Toast({ message: '操作成功', position: 'bottom', duration: 3000})
            this.$router.go(-1)
          } else if(res.data.status !== 100){
            Toast({ message: res.data.msg, position: 'bottom', duration: 3000})
          }
        }).catch(error => {
          Toast({ message: '网络错误', position: 'bottom', duration: 3000})
        })
      }
      
    },
    change(value) {
      this.chartNum = this.sumChart - value.length;
    }
  },
  created() {
    this.change(this.orderMark.ordBak)
  },
  components: {}
}
</script>

<style scoped lang="scss">
  .order-mark {
    width: calc(100% - 2.5rem);
    margin: .625rem;
    padding: .625rem;
    font-size: .875rem;
    border: 1px solid $lightGray;
  }
  .order-mark:focus {
    border: 1px solid $lightGray;
  }
  .mark-bottom {
    margin: 0 .625rem;
    font-size: .75rem;
    text-align: right;
  }
  .over-chart {
    color: $orange;
  }
</style>
