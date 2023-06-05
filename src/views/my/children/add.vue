<template>
  <div class="page">
    <van-nav-bar title="Add Bank Card"  left-arrow  left-text="Back"  @click-left="back">
   </van-nav-bar>
   <van-cell-group>
  <van-field
    :value="name"
    required
    clearable
    label="Name"
    icon="question-o"
    placeholder="please input name"
    bind:click-icon="onClickIcon"
  />

  <van-field
    :value="bankNo"
    type="password"
    label="Bank Card "
    placeholder="please input card number"
    required
    border
  />
   <van-field
    :value="bankNo"
    type="password"
    label="Bank Type"
    placeholder="please input bank type"
    required
    border
  />
   <van-field
    :value="bankNo"
    type="password"
    label="Remark"
    placeholder="please input remark "
    required
    border
  />
</van-cell-group>

    <div style="margin: 10px;">
        <van-button type="primary" icon="guide-o" block >Sumbit</van-button>
      </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      name:'',
      bankNo:'',
      src:'https://img.yzcdn.cn/vant/cat.jpeg',
      fileList: [
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
      },
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

