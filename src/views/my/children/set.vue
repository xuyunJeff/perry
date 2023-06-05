<template>
  <div class="page">
    <van-nav-bar title="Setting" left-text="Back" left-arrow @click-left="back"></van-nav-bar>

    <van-cell-group class="mt-10">
      <!-- <van-cell title="Account" value="">{{username}}</van-cell> -->
<!--      <van-cell isLink title="登录密码" value="未设置"></van-cell>-->
<!--      <van-cell isLink title="安全密码" value="未设置"></van-cell>-->
    </van-cell-group>

    <!-- 退出登录 -->
    <div class="logout f16 flex fcc bg-fff  w100pc" @click="logout">
      <p class="blue">Logout</p>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  computed: {
    ...mapGetters(["username"])
  },
  methods: {
    back() {
      history.back();
    },
    async logout() {
      let url = "/logout";
      // let res = await this.$axios.post(url);
      // 修改登陆状态
      this.$store.commit("updateLogin", false);
      // 把用户名置空
      this.$store.commit("updateUsername", "");
      // 清除token
      this.$store.commit("updateToken", "");
      this.$router.push("/my");
    }
  }
};
</script>

<style lang="less" scoped>
.logout {
  bottom: 0;
  height: 50px;
  color: #ff5f16;
}
.van-nav-bar {
  background-color: #1678ff !important;
 
}
::v-deep .van-nav-bar__title {
    color: white;
}
::v-deep .van-nav-bar__text {
    color: white;
}
::v-deep .van-nav-bar .van-icon{
  color: white;
}
</style>

