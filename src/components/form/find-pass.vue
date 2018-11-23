<template lang="html">
  <div class="find-pass">
    <div class="form-register">
      <div class="box-register">
        <mt-header fixed title="找回密码">
          <a @click="back()" slot="left">
            <mt-button icon="back"></mt-button>
          </a>
        </mt-header>

        <mt-field label="手机号" placeholder="请输入手机号" v-model="phone.openId"></mt-field>
        <mt-field v-if="!check" label="验证码" placeholder="请输入验证码" v-model="phone.key">
          <mt-button type="primary" size="small" :disabled="btnMagDis" @click.native="sendMsg">{{btnTxt}}</mt-button>
        </mt-field>

        <mt-field v-if="check" label="新密码" placeholder="6~18位" :attr="{type: pwd}" v-model="phone.password">
          <i class="iconfont" :class="{'icon-eye3': iconbi, 'icon-eye2': iconzh}" @click="toggleEye"></i>
        </mt-field>
        <mt-field v-if="check" label="确认密码" placeholder="6~18位" :attr="{type: pwd}" v-model="phone.password2">
          <i class="iconfont" :class="{'icon-eye3': iconbi, 'icon-eye2': iconzh}" @click="toggleEye"></i>
        </mt-field>

        <div class="page-btn-groups" style="margin-top: 30px;">
          <mt-button v-if="check === false" type="primary" size="large" @click.native="checkPass()">提交</mt-button>
          <mt-button v-if="check === true" type="primary" size="large" @click.native="resetPass()">确认</mt-button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {Toast} from "mint-ui"

export default {
  data () {
    return {
      tel: '',
      btnTxt: '发送验证码',
      btnMagDis: false,
      count: '',
      timer: null,
      iconbi: true,
      iconzh: false,
      pwd: 'password',
      phone: {
        openType: 'mobile',
        openId: '',
        key: '',
        password: '',
        password2: ''
      },
      check: false
    }
  },
  methods: {
      back() {
          this.$router.go(-1)
      },
    isPhone (str) {
      let regPhone = /(1[3-9]\d{9}$)/;
      return regPhone.test(str)
    },
    sendMsg () {
      if(this.phone.openId === '') {
        Toast({ message: '请填写手机号码', position: 'bottom', duration: 2000 })
        return
      }
      if(this.phone.openId !== '' && !(/^1[34578]\d{9}$/.test(this.phone.openId))) {
        Toast({ message: '手机号格式不正确', position: 'bottom', duration: 2000 })
        return
      }
      const timeCount = 60;
      if (!this.timer) {
        this.count = timeCount;
        this.btnMagDis = true;
        this.btnTxt = this.count + 's后重新发送';
        this.getKey()
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
    },
    /* 获取验证码 */
    getKey() {
        this.$http.post('/ms/pass/msg',
            this.phone
        ).then(res => {
            if(res.data.status === 200) {
                Toast({ message: '验证码已发送，请注意查收', position: 'bottom', duration: 2000 })
            } else if(res.data.status !== 100) {
                Toast({ message: res.data.msg, position: 'bottom', duration: 2000 })
            }
        })
    },
    /* 重置密码验证 */
    checkPass() {
        if(this.phone.openId === '') {
            Toast({ message: '请填写手机号码', position: 'bottom', duration: 2000 }); return;
        } else if(this.phone.openId !== '' && !(/^1[34578]\d{9}$/.test(this.phone.openId))) {
            Toast({ message: '手机号格式不正确', position: 'bottom', duration: 2000 }); return;
        } else if(this.phone.key === '') {
            Toast({ message: '请输入验证码', position: 'bottom', duration: 2000 }); return;
        }
        this.$http.post('/ms/pass/check',
            this.phone
        ).then(res => {
            /* 验证通过 */
            if(res.data.status === 200) {
                this.check = true
                this.phone.key = res.data.data
            } else if(res.data.status !== 100) {
                Toast({ message: res.data.msg, position: 'bottom', duration: 2000 })
                this.check = false
                /* 验证不通过 */
            }
        })
    },
    /* 重置密码 */
    resetPass() {
        if(this.phone.openId === '') {
            Toast({ message: '请填写手机号码', position: 'bottom', duration: 2000 }); return;
        } else if(this.phone.openId !== '' && !(/^1[34578]\d{9}$/.test(this.phone.openId))) {
            Toast({ message: '手机号格式不正确', position: 'bottom', duration: 2000 }); return;
        } else if(this.phone.password === '') {
            Toast({ message: '请输入新密码', position: 'bottom', duration: 2000 }); return;
        } else if(this.phone.password !== '' && (this.phone.password.length < 6 || this.phone.password.length > 18)) {
            Toast({ message: '请输入6~18位密码', position: 'bottom', duration: 2000 }); return;
        } else if(this.phone.password2 === '') {
            Toast({ message: '请输入确认密码', position: 'bottom', duration: 2000 }); return;
        } else if(this.phone.password2 !== this.phone.password) {
            Toast({ message: '两次输入的密码不一致', position: 'bottom', duration: 2000 }); return;
        }
        this.$http.post('/ms/pass/reset',
            this.phone
        ).then(res => {
            if(res.data.status === 200) {
                Toast({ message: '密码已重置', position: 'bottom', duration: 2000 })
                this.$store.commit('setRestPhone', this.phone.openId)
                this.$router.push({path: '/form-login'})
            }
        })
    },
    toggleEye () {
      if (this.iconbi == false) {
        this.iconbi = true;
        this.iconzh = false;
        this.pwd = 'password'
      } else {
        this.iconbi = false;
        this.iconzh = true;
        this.pwd = 'text'
      }
    }
  }
}
</script>

<style lang="css">
.find-pass{ padding-top: 50px; background-color: #ffffff;}
.form-register{ padding: 0 25px 20px;}
.form-register .mint-cell-title{ width: 80px; text-align: left;}
.form-register .mint-cell-wrapper{ background-image: none; border-bottom: 1px solid #d9d9d9;}
.pass-tips{ font-size: 12px; text-align: left; padding: 10px; color: #999;}
.icon-eye{ display: block; width: 16px; height: 16px; margin-left: 15px; background-repeat: no-repeat; background-position: center;}
.icon-eye.iconzheng{ background-image: url(../../assets/images/icon_eye1.png);}
.icon-eye.iconbi{ background-image: url(../../assets/images/icon_eye2.png);}

.page-btn-groups{ margin-top: 15px;}
</style>
