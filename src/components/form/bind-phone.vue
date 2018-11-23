<template lang="html">
  <div class="bind-phone">
    <mt-header fixed title="手机绑定">
      <mt-button slot="right" @click.native="logout()">退出</mt-button>
    </mt-header>
    <mt-field label="手机号" placeholder="请输入手机号" :attr="{type: 'tel', maxlength: 15}" v-model="tel"></mt-field>
    <mt-field label="验证码" placeholder="请输入验证码" v-model="smsCode" :attr="{maxlength: 6}">
      <mt-button type="primary" size="small" :disabled="btnMagDis" @click.native="sendMsg">{{btnTxt}}</mt-button>
    </mt-field>
    <div class="page-btn-groups" style="margin-top: 30px;">
      <mt-button type="primary" size="large" :disabled="disabled" @click.native="btnBind">立即绑定</mt-button>
    </div>
  </div>
</template>

<script>
import {Toast} from "mint-ui"
import util from '../../util'
export default {
  data () {
    return {
      tel: '',
      smsCode: '',
      pass: '',
      btnTxt: '发送验证码',
      btnMagDis: false,
      count: '',
      timer: null,
      iconbi: true,
      iconzh: false,
      pwd: 'password',
      disabled: false,
      quit: '不想绑定？立即退出'
    }
  },
  methods: {
    isPhone (str) {
      let regPhone = /(1[3-9]\d{9}$)/;
      return regPhone.test(str)
    },
    sendMsg () {  //发送验证码
      this.btnMagDis = true;
      if(this.tel === '') {
        this.btnMagDis = false;
        Toast({ message: '请填写手机号码', position: 'top', duration: 1500 }); return;
      }
      if(this.tel !== '' && !this.$options.methods.isPhone(this.tel)) {
        this.btnMagDis = false;
        Toast({ message: '手机号格式不正确', position: 'top', duration: 1500 }); return;
      }
      this.$http.post(
        '/ms/regist/code', {openId: this.tel}, {emulateJSON: true}
      ).then(res => {
        const timeCount = 60;
        if (!this.timer) {
          this.count = timeCount;
          this.btnMagDis = true;
          this.btnTxt = this.count + 's后重新发送';
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= timeCount) {
              this.count--;
              this.btnTxt = this.count + 's后重新发送';
            } else {
              clearInterval(this.timer);
              this.timer = null;
              this.btnTxt = '发送验证码';
              this.btnMagDis = false;
            }
          }, 1000);
        }
      });
    },
    btnBind () {  //点击绑定
      if(this.tel === '') {
        Toast({ message: '请填写手机号码', position: 'top', duration: 1500 }); return;
      }
      if(this.tel !== '' && !this.isPhone(this.tel)) {
        Toast({ message: '手机号格式不正确', position: 'top', duration: 1500 }); return;
      }
      if(this.smsCode === '') {
        Toast({ message: '请输入验证码', position: 'top', duration: 1500 }); return;
      }
      this.disabled = true;
      this.$http.post(
        '/ms/bindMobile', {openId: this.tel, code: this.smsCode}
      ).then(res => {
        if(res.data.status !== 200) {
          this.disabled = false;
          Toast({ message: res.data.msg, position: 'bottom', duration: 2000 }); return;
        } else {
          Toast({message: '操作成功', duration: 1000});
          setTimeout(() => {
            this.$router.push({path: '/user-center'});
            window.localStorage.clear()
          }, 1000);
        }
      });
    },
    quitLogin () {
        Toast({ message: '退出成功', position: 'bottom', duration: 2000 });
        util.clearAllCookie()
        this.$store.commit('isShowShop', 0)
        this.$router.push({path: '/home'})
    },
    logout() {
        this.$http.get('/ms/logout')
        .then(res => {
            if(res.data.status === 200) {
                this.quitLogin()
            } else if(res.data.status !== 100) {
                Toast({ message: res.data.data.msg, position: 'bottom', duration: 2000 });
            }
        })
    },
  },
}
</script>

<style lang="css">
.bind-phone{ padding: 40px 20px 20px;}
.bind-phone .mint-cell-title{ width: 60px; text-align: left;}
.bind-phone .mint-cell-wrapper{ background-image: NONE; border-bottom: 1px solid #d9d9d9;}
.bind-phone .tips-bind{ padding-top: 25px; text-align: right;}
</style>
