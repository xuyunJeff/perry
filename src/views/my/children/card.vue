<template>
  <div class="page">
    <van-nav-bar title="My Bank Card" left-arrow left-text="Back"  @click-left="back" @click-right="addCard">
      <van-icon name="add" size="24px"  slot="right" />
   </van-nav-bar>
    <van-cell-group class="mt-10">
      <van-card
  desc="中国银行"
  title="281928192912192922121"
  :thumb="src"
/>
<van-card
  desc="中国工商银行"
  title="4444449999999"
  :thumb="src"
/>
    </van-cell-group>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      src:'https://img.yzcdn.cn/vant/cat.jpeg'
    }
  },
  computed: {
    ...mapGetters(["username"])
  },
  methods: {
    back() {
      history.back();
    },
    addCard () {
      this.$router.push("/my/add");
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
::v-deep .van-tabs__line {
  position: absolute;
  bottom: 0.4rem;
  left: 0;
  z-index: 1;
  width: 1.06667rem;
  height: 0.08rem;
  background-color: #1678ff !important;
  border-radius: 0.08rem;
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

