<template>
  <div class="center">
    <!-- 头部 -->
    <header>
      <div class="beijin"></div>
      <div class="flex aic users pixed" style="width:70%;">
        <img :src="require('../../../assets/img/personal/tx.jpg')" class="imege" />
        <router-link v-if="!isLogin" to="/login" class="f16 fff ml-20">Login</router-link>
        <span v-else class="f16 fff ml-20">User {{username}}---出款员</span>
      </div>
    </header>

    <!-- 主体 -->
    <main class="mt-10">
      <div class="bg-fff">
<!--        <van-cell title="我的订单" isLink to="/order"></van-cell>-->
<!--        <van-cell title="钱包" isLink to="/wallet"></van-cell>-->
        <van-cell title="Set Up" isLink to="/my/set"></van-cell>
        <van-cell title="Bind Bank Card" isLink to="/my/card"></van-cell>
        <van-cell title="Bind QR code" isLink to="/my/code"></van-cell>
      </div>
    </main>
    <Footer page="my" />
  </div>
</template>

<script>
import Footer from "@/components/Footer";
import { mapGetters } from "vuex";
export default {
  components: {
    Footer
  },
  computed: {
    ...mapGetters(["username", "isLogin"])
  }
};
</script>

<style lang="less" scoped>
@import "./center.less";
</style>