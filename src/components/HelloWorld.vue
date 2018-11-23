<template>
  <div class="hello">
    <!-- <mt-field placeholder="用户名" v-bind:state="state"></mt-field>
    <mt-field v-bind:state="state" placeholder="邮箱" ref="input" @change.native="testEmail"></mt-field> -->
    <ul id="tabFrom" class="form-tab">
      <li><router-link to="/form-login">登录</router-link></li>
      <li><router-link to="/form-register">注册</router-link></li>
      <li><router-link to="/user-center">个人中心</router-link></li>
      <li><router-link to="/person-general">综合资料</router-link></li>
      <li><router-link to="/person-peer">同行资料</router-link></li>
    </ul>

  </div>
</template>

<script>
import formLogin from '../components/form/form-login'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '测试',
      state: ''
    }
  },
  components: {
    formLogin
  },
  methods: {
    isEmail (str) {
      let regEmail = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
      return regEmail.test(str)
    },
    testEmail () {
      let emailVal = this.$refs.input.value
      if (emailVal !== '') {
        if (!this.$options.methods.isEmail(emailVal)) {
          this.$refs.input.state = 'error'
        } else {
          this.$refs.input.state = 'success'
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
