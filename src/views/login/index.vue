<template>
  <header class="login">
    <van-icon name="point-gift-o" class="orange mt-30 logo"></van-icon>
    <div class>
      <div class="handset ml-20 mr-20 flex jc-sb pb-5">
        <input v-model="username" class="f14" type="text" placeholder="账号" />
      </div>
      <div class="handset ml-20 mr-20 flex jc-sb pb-5">
        <input v-model="password" class="f14" type="password" placeholder="密码" />
      </div>
      <div class="handset ml-20 mr-20 flex jc-sb mt-20 pb-5">
        <input v-model="code" class="f14" placeholder="谷歌验证码" />
      </div>

      <!-- 登录 -->
      <button @click="login" class="butt ml-20 mr-20 fff">登录</button>
    </div>
  </header>
</template>

<script>

export default {
  data() {
    return {
      username: "",
      password: "",
      code: ""
    };
  },
  methods: {
    login() {
      let url = "/wap/login";
      // 请求参数
      let data = {
        username: this.username,
        password: this.password,
        code: this.code
      };
      this.$axios.post(url, data).then(res => {
        console.log(res)
        // 修改登陆状态
        this.$store.commit("updateLogin", true);
        // 把token存入store
        let token = "JSESSIONID=" + res.token;
        localStorage.setItem("token",token)
        localStorage.setItem("username",this.username)
        this.$store.commit("updateToken", token);
        this.$store.commit("updateUsername", this.username);
        this.$router.push("/center");
      }).catch(err=> {
        console.log('登陆失败')
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "./login.less";
.logo {
  font-size: 100px !important;
  margin-bottom: 150px;
}
</style>

