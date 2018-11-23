<template lang="html">
  <div class="form-register">
    <div class="box-register">
      <div class="part-one">
        <mt-header fixed title="注册"></mt-header>
        <ul id="tabFrom" class="form-tab">
          <li><router-link to="/form-login">登录</router-link></li>
          <li><router-link to="/form-register">注册</router-link></li>
        </ul>
        <mt-field label="手机号码" placeholder="请输入手机号" :attr="{type: 'tel', maxlength: 15}" v-model="tel"></mt-field>
        <mt-field label="短信验证码" placeholder="请输入验证码" v-model="smsCode" :attr="{maxlength: 6}">
          <mt-button type="primary" size="small" :disabled="btnMagDis" @click.native="sendMsg">{{btnTxt}}</mt-button>
        </mt-field>
        <mt-field id="imgCode" label="图形验证码" placeholder="请输入验证码" v-model="captcha">
          <img class="img-code" :src="captCode" height="45px" width="100px" @click="refreshCode">
        </mt-field>
        <mt-field label="设置密码" placeholder="6~18位密码" :attr="{type: pwd, maxlength: 18}" v-model="pass">
          <i class="iconfont" :class="{'icon-eye3': iconbi, 'icon-eye2': iconzh}" @click="toggleEye"></i>
        </mt-field>
        <p class="tips-protocol">点击完成即同意<a href="javascript: void(0);" @click="toggleProtocol">《用户协议》</a></p>
        <div class="page-btn-groups" style="margin-top: 30px;">
          <mt-button type="primary" size="large" :disabled="disabled" @click.native="btnRegister">立即注册</mt-button>
        </div>

        <mt-popup v-model="popupProtocol" position="right">
          <div class="content">
            <mt-header fixed title="用户协议" id="protocolTlt">
              <mt-button icon="back" slot="left" @click="toggleProtocol"></mt-button>
            </mt-header>
            <protocol></protocol>
          </div>
        </mt-popup>
      </div>
    </div>
  </div>
</template>

<script>
import {Toast} from "mint-ui"
import protocol from './protocol'

export default {
  data () {
    return {
      popupProtocol: false,
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
      captcha: false,
      captCode: 'http://192.168.110.249:8088/ms/imgcode?d='
    }
  },
  components: {
    protocol
  },
  methods: {
    isPhone (str) {
      let regPhone = /(1[3-9]\d{9}$)/;
      return regPhone.test(str)
    },
    toggleProtocol () {
      this.popupProtocol = !this.popupProtocol;
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
        '/ms/isResigned', {openId: this.tel}
      ).then(res => {
        if(res.data.status !== 200) {
          this.btnMagDis = false;
          Toast({ message: res.data.msg, position: 'top', duration: 1500 }); return;
        } else {
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
        }
      });
    },
    btnRegister () {  //点击注册
      if(this.tel === '') {
        Toast({ message: '请填写手机号码', position: 'top', duration: 1500 }); return;
      }
      if(this.tel !== '' && !this.isPhone(this.tel)) {
        Toast({ message: '手机号格式不正确', position: 'top', duration: 1500 }); return;
      }
      if(this.smsCode === '') {
        Toast({ message: '请输入验证码', position: 'top', duration: 1500 }); return;
      }
      if(this.pass === '') {
        Toast({ message: '请输入密码', position: 'top', duration: 1500 }); return;
      }
      if(this.pass !== '' && (this.pass.length < 6 || this.pass.length > 18)) {
        Toast({ message: '密码长度在6~18位', position: 'top', duration: 2000 }); return;
      }
      if(this.pass !== '' && this.pass.indexOf(' ') !== -1) {
        Toast({ message: '密码不能包含空格', position: 'top', duration: 2000 }); return;
      }

      this.disabled = true;
      this.$http.post(
        '/ms/regist', {openType: 'mobile', openId: this.tel, password: this.pass, code: this.smsCode}
      ).then(res => {
        if(res.data.status !== 200) {
          this.disabled = false;
          Toast({ message: res.data.msg, position: 'top', duration: 2000 }); return;
        } else {
          Toast({message: '注册成功', duration: 1000  });
          setTimeout(() => {
            this.$router.push({path: '/form-login'});
          }, 1000);
        }
      });
    },
    toggleEye () {  //切换密码是否可见
      if (this.iconbi == false) {
        this.iconbi = true;
        this.iconzh = false;
        this.pwd = 'password'
      } else {
        this.iconbi = false;
        this.iconzh = true;
        this.pwd = 'text'
      }
    },
    refreshCode () {
      this.captCode = 'http://192.168.110.249:8088/ms/imgcode?d=' + Math.random()*1000;
    }
  }
}
</script>

<style lang="css">
#protocolTlt{ z-index: 99999;}
#imgCode{ display: none;}
.form-register{ padding: 0 25px 20px; background-color: #ffffff}
.form-register .part-two{ padding-top: 60px;}
.form-register .mint-cell-title{ width: 80px; text-align: left;}
.form-register .mint-cell-wrapper{ background-image: NONE; border-bottom: 1px solid #d9d9d9;}
.pass-tips{ font-size: 12px; text-align: left; padding: 10px; color: #999;}
.icon-eye{ display: block; width: 16px; height: 16px; margin-left: 15px; background-repeat: no-repeat; background-position: center;}
.icon-eye.iconzheng{ background-image: url(../../assets/images/icon_eye1.png);}
.icon-eye.iconbi{ background-image: url(../../assets/images/icon_eye2.png);}
.tips-protocol{ text-align: left; color: #ccc; font-size: 12px; padding-top: 15px;}
.form-register .mint-popup{ position: absolute; height: 100%; overflow-y: auto; box-sizing: border-box;}
.form-register .mint-popup .content{ position: relative;}
.form-register .mint-popup .box{ text-align: left; padding: 50px 20px 20px;}

.box-register .mint-cell-value input{ padding-left: 10px;}

.page-btn-groups{ margin-top: 15px;}
</style>
