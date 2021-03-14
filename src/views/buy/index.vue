<template>
  <div>
    <van-nav-bar title="交易"  />
    <div class="container">
        日总，交易页代码写这里哦
    </div>
    <Footer page="buy"></Footer>
  </div>
</template>

<script>
import Footer from "@/components/Footer";
export default {
  components: {
    Footer
  }
};
</script>
<style scoped>
  .container{
    width:100%;
    height:20rem;
    overflow: hidden;
  }
</style>

