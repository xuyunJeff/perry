<template>
  <div class="page">
    <van-nav-bar title="Add QR code" left-arrow left-text="Back"  @click-left="back">
   </van-nav-bar>
    <van-cell-group class="mt-10">
    <van-uploader :file-list="fileList" />
  <div style="margin: 10px;">
        <van-button type="primary" icon="guide-o" block >Sumbit</van-button>
      </div>
    </van-cell-group>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      src:'https://img.yzcdn.cn/vant/cat.jpeg',
      fileList:[
         {
        url: 'https://img.yzcdn.cn/vant/leaf.jpg',
        name: '图片1',
      },
      // Uploader 根据文件后缀来判断是否为图片文件
      // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
      {
        url: 'http://iph.href.lu/60x60?text=default',
        name: '图片2',
        isImage: true,
        deletable: true,
      }
      ]
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
      this.$router.push("/my/code");
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

