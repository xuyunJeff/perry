<template>
  <header class="login">
    <van-icon name="balance-list-o" class="orange mt-30 logo" color="#1678ff"></van-icon>
    <div class>
      <div class="handset ml-20 mr-20 flex jc-sb pb-5">
        <van-field v-model="data.username"   placeholder="Account"/>
      </div>
      <div class="handset ml-20 mr-20 flex jc-sb pb-5">
        <van-field v-model="data.password"  type="password" placeholder="Password"/>
      </div>
      <div class="handset ml-20 mr-20 flex jc-sb mt-20 pb-5">
        <van-field v-model="data.code"   placeholder="Google verification code"/>
      </div>
      <!-- 登录 -->
      <button @click="login" class="butt ml-20 mr-20 fff">Login</button>
    </div>
  </header>
</template>

<script>

export default {
  data() {
    return {
      data:{
      username: "",
      password: "",
      code: ""
      }
      
    };
  },
  methods: {
    login() {
      let url = "/wap/login";
      this.$axios.post(url, this.data).then(res => {
        const {user,balance} = res;
        const {username} = user;
        console.log(res)
        // 修改登陆状态
        this.$store.commit("updateLogin", true);
        // 把token存入store
        let token = "JSESSIONID=" + res.token;
        localStorage.setItem("token",token)
        localStorage.setItem("username",username)
        this.$store.commit("updateToken", token);
        this.$store.commit("updateUsername", username);
        this.$store.commit("updateBalance", balance.balance)
        this.$store.commit("updateUser", user);
        this.$router.push("/my");
      }).catch(err=> {
        console.log('login fail')
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

