<template lang="html">
  <div class="modify-pass">
    <mt-header fixed title="修改密码">
      <router-link to="/user-center" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="mod-pass">
      <mt-field :attr="{type: pwd, maxLength: 18}" placeholder="请输入旧密码" v-model="oriPass"></mt-field>
      <mt-field :attr="{ type: pwd, maxLength: 18}" placeholder="请输入新密码" v-model="newPass">
        <i class="iconfont" :class="{'icon-eye3': iconbi, 'icon-eye2': iconzh}" @click="toggleEye"></i>
      </mt-field>
    </div>
    <div class="page-btn-groups" style="margin-top: 30px;">
      <mt-button type="primary" size="large" @click.native="subModify">确定</mt-button>
    </div>
  </div>
</template>

<script>
import {Toast} from "mint-ui"

export default {
  data () {
    return {
      iconbi: true,
      iconzh: false,
      pwd: 'password',
      oriPass: '',
      newPass: '',
    }
  },
  methods: {
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
    },
    subModify () {
      if(this.oriPass === '') {
        Toast({ message: '请填写旧密码', position: 'top', duration: 1500 }); return;
      }
      if(this.newPass === '') {
        Toast({ message: '请填写新密码', position: 'top', duration: 1500 }); return;
      }
      if(this.newPass !== ''  && (this.newPass.length < 6 || this.newPass.length > 18)) {
        Toast({ message: '请输入6~18位密码', position: 'top', duration: 1500 }); return;
      }
      if(this.newPass !== ''  && this.newPass.indexOf(' ') !== -1) {
        Toast({ message: '密码不能包含空格', position: 'top', duration: 1500 }); return;
      }
      this.$http.post(
        '/ms/user/editpwd',
        {pwd1: this.oriPass, pwd2: this.newPass, pwd3: this.newPass}
        // {
        //   headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        // }
      ).then(res => {
        if(res.data.status != 200) {
          Toast({ message: res.data.msg, position: 'top', duration: 1500 }); return;
        } else {
          setTimeout(() => {
            this.$router.push({path: '/user-center'});
          }, 1500);
          Toast({ message: '修改成功', position: 'top', duration: 1500 }); return;
        }
      });
    }
  }
}
</script>

<style lang="css">
.modify-pass{ padding: 40px 20px 20px;}
</style>
