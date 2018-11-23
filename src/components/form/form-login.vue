<template lang="html">
  <div class="box-login">
    <!-- <div class="login-bg" style="background-image: url('https://free.modao.cc/uploads3/images/1814/18140853/raw_1521719632.png');"></div> -->
    <div class="login-cpy">
      <p>{{baseInfos.siteName}}</p>
    </div>
    <mt-header fixed title="登录">
        <mt-button icon="back" @click.native="back()" slot="left"></mt-button>
    </mt-header>
    <div class="form-login">
      <mt-field label="手机" :attr="{id: 'tel', 'type': 'tel', maxlength: 15}" v-model="openId" placeholder="请输入手机号码"></mt-field>
      <mt-field label="密码" :attr="{id: 'loginPass', type: pwd}" placeholder="请输入您的密码" v-model="passwd">
        <i class="iconfont icon-eye3" style="margin-left:4px;"  @click="toggleEye"></i>
      </mt-field>
      <div class="page-btn-groups" style="margin-top: 30px;">
        <mt-button type="primary" size="large" @click.native="btnLogin">立即登录</mt-button>
      </div>
    </div>
    <p class="other">
      <router-link to="/find-pass" class="left">忘记密码?</router-link>
      <router-link to="/form-register" class="right">没有账号?立即注册</router-link>
    </p>
    <div class="foot">
      <p class="shortcut">使用第三方账号登录</p>
      <!-- <a class="login-other qq" href="http://dev.op110.com.cn:808/qqlogin"></a>
      <a class="login-other wc" href="http://192.168.110.182:8088/m/login_wx.html"></a> -->
      <a class="login-other qq" @click="qqLogin()"></a>
      <a class="login-other wc" @click="wxLogin()"></a>
    </div>
  </div>
</template>

<script>
import util from '../../util.js'
import { Toast } from "mint-ui";
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      iconbi: true,
      iconzh: false,
      pwd: "password",
      openId: "",
      passwd: "",
      href: ""
    };
  },
  created() {
    this.$store.dispatch("saveSiteInfo")
  },
  mounted() {
      this.cookiePost()
      this.openId = this.restPhone
  },
  computed: {
    baseInfos() {
      return this.$store.getters["getSiteInfo"];
    },
    ...mapGetters([
        'restPhone',
        'getSiteInfo'
    ])
  },
  methods: {
        back() {
            if(this.$route.query.redirect === '/user-center') {
                this.$router.push({path: '/home'})
            } else {
                this.$router.go(-1)
            }
        },
      /* 是否展示我的店铺 */
      isShowShop() {
          this.$http.get('/ms/store/isShowStore'
          ).then(res => {
              if(res.data.status === 200) {
                  let d = new Date();
                  d.setMinutes(d.getMinutes()+30)
                  this.$store.commit('isShowShop', res.data.data)
                  /* 店铺显影存入到cookie */
                  document.cookie=`isShowShop=${res.data.data};path=/;expires=${new Date(d).toUTCString()}`
                  this.$router.replace(this.$route.query.redirect || '/')
                  this.shopInfo()
              } else if(res.data.status !== 100) {
                  Toast({ message: res.data.msg, position: 'top', duration: 1500 })
              }
          })
      },
      /* 获取店铺信息 */
        shopInfo () {
            this.$http.get('/ms/store/baseInfo/info'
            ).then(res => {
                if (res.data.status === 200) {
                    let result = res.data.data
                    if (result) {
                        this.$store.commit('setShop', result)
                    }
                } else if(res.data.status === 100000) {
                    Toast({ message: res.data.msg, position: 'top', duration: 1500 })
                }
            })
        },
      /* qq登录 */
      qqLogin() {
            window.localStorage.setItem('role', 'qq')
            window.location.href = '/qq/login.html'
      },
      /* 微信登录 */
      wxLogin() {
            window.localStorage.setItem('role', 'wx')
            window.location.href = '/wx/login_wx'
      },
      /* 设置cookie */
      cookiePost() {
            let route = this.$route.query.redirect
            let path = `${window.location.pathname}`
            let newUrl = `/v${route}`
            // 设置cookie
            document.cookie = `fallbackUrl=${newUrl};path=/`
            this.$http.get('/ms/logincheck')
            .then(res => {
                if (res.data.status === 200) {
                    let result = res.data
                }
            })
      },
    isPhone(str) {
      let regPhone = /(1[3-9]\d{9}$)/;
      return regPhone.test(str);
    },
    toggleEye() {
      if (this.iconbi == false) {
        this.iconbi = true;
        this.iconzh = false;
        this.pwd = "password";
      } else {
        this.iconbi = false;
        this.iconzh = true;
        this.pwd = "text";
      }
    },
    btnLogin() {
        let needToPeerForm = this.getSiteInfo.weiXinIsNoPass === 1 && !util.getCookie('peer_login_token')
      if (this.openId === "" || this.passwd == "") {
        Toast({
          message: "手机号码或密码不能为空",
          position: "top",
          duration: 2000
        });
        return;
      } else if (
        this.openId !== "" &&
        !this.$options.methods.isPhone(this.openId)
      ) {
        Toast({ message: "手机号格式不正确", position: "top", duration: 2000 });
        return;
      } else if (this.passwd !== "" && (this.passwd.length < 6 || this.passwd.length > 18)) {
        Toast({ message: "请输入6~18位密码", position: "top", duration: 2000 });
        return;
      }
      if(needToPeerForm) {
          this.$router.push({path: '/peer-form-login', query: { redirect: '/form-login' }})
      }
      this.$http
        .post(
          "/ms/login",
          { openId: this.openId, password: this.passwd },
          { emulateJSON: true }
        )
        .then(res => {
          if (res.data.status != 200) {
            Toast({
              message: res.data.msg || "登录失败",
              position: "top",
              duration: 2000
            });
            return;
          } else {
            Toast({ message: "登录成功", duration: 1000 });
            this.$store.commit("saveUser", res.data.body);
            this.isShowShop()
          }
        })
    }
  },
  watch: {
      'openId': function (val) {
          this.passwd = ''
      }
  }
};
</script>

<style lang="css">
.box-login {
    width: 100%;
    height: 100%;
    padding-top: 40px;
    background-color: #ffffff;
}
.login-cpy {
  padding: 30px 30px 20px;
  font-size: 22px;
  color: #34a2ff;
}
.form-login {
  padding: 20px;
}
.form-login .mint-cell-title {
  width: 60px;
  text-align: left;
}
.form-login .mint-cell-wrapper {
  background-image: none;
  border-bottom: 1px solid #d9d9d9;
}
.login-bg {
  height: 140px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.icon-eye {
  display: block;
  width: 16px;
  height: 16px;
  margin-left: 15px;
  background-repeat: no-repeat;
  background-position: center;
}
.icon-eye.iconzheng {
  background-image: url(../../assets/images/icon_eye1.png);
}
.icon-eye.iconbi {
  background-image: url(../../assets/images/icon_eye2.png);
}
.box-login .other a {
  font-size: 14px;
  padding: 0 20px;
}
.box-login .other a.left {
  float: left;
  color: #999;
}
.box-login .other a.right {
  float: right;
}
.box-login .foot {
  position: fixed;
  bottom: 20px;
  width: 100%;
  text-align: center;
  color: #999;
}
.box-login .shortcut {
  position: relative;
  margin-bottom: 10px;
}
.box-login .shortcut:before {
  position: absolute;
  left: 50%;
  top: 0;
  content: "";
  display: block;
  height: 12px;
  width: 150px;
  background: #fff;
  margin-left: -75px;
  z-index: -1;
}
.box-login .shortcut:after {
  position: absolute;
  left: 50%;
  top: 10px;
  content: "";
  display: block;
  height: 1px;
  width: 80%;
  background: #eee;
  margin-left: -40%;
  z-index: -2;
}
.box-login .login-other {
  display: inline-block;
  width: 40px;
  height: 40px;
  margin: 0 20px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.box-login .login-other.qq {
  background-image: url(../../assets/images/icon_qq.png);
}
.box-login .login-other.wc {
  background-image: url(../../assets/images/icon_wechat.png);
}
@media (max-height: 400px) {
  .box-login .foot {
    display: none;
  }
}
</style>
