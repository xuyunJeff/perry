<template>
  <div>
    <van-nav-bar title="首页" />
    <div class="main">
      <iframe src="https://www.baidu.com" class="main-iframe" />
    </div>
    <Footer page="buy"></Footer>
  </div>
</template>

<script>
import Footer from "@/components/Footer";

export default {
  data() {
    
  },
  created() {
    this.getData();
  },
  components: {
    Footer
  },
  methods: {
    // 日总 这里可以请求数据哦
    getData() {
      let url = "/goods";
      console.log('gh',url)
      this.$axios
        .get(url)
        .then(res => {
          console.log("res", res);
        })
        .catch(err => {
          console.log("err", err);
        });
    }
  }
};
</script>

<style scoped>
  .main{
    width: 100%;
    height: 20rem;
    overflow: hidden;
  }
  .main-iframe{
    width: 100%;
    height: 100%;
  }
</style>>
