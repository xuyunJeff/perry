<template>
  <div style="padding-bottom: 60px;">
    <van-tabs v-model="active" @change="onchange">
      <van-tab title="Payment orders"></van-tab>
      <van-tab title="Collection orders"></van-tab>
    </van-tabs>

    <van-list style="margin-top: 10px"  v-for="(item,index) in list" :key="index">
      <van-cell title="商户单号" :value="item.order" />
      <van-cell title="支付姓名" :value="item.name"/>
      <van-cell title="收款时间" :value="item.time" />
      <van-cell title="支付金额" :value="item.saleDate" />
      <van-cell>
        <van-button type="info"  size="small"> 确认支付</van-button>
        <van-button plain type="info" size="small"> 取消支付</van-button>
      </van-cell>
    </van-list>

    <Footer page="index"></Footer>
  </div>
</template>

<script>
import Footer from "@/components/Footer";
// import { Tabbar, TabbarItem } from "vant";
// import { Tab, Tabs } from "vant";

export default {
  // components: {
  //   [Tab.name]: Tab,
  //   [Tabs.name]: Tabs
  // },
  data() {
    return {
      active: 0,
      list: [],
      // 买入数据
      list1: [
        { name: "leao", order: 28918291289291, saleDate: 1111 ,time:'2020-10-02'},
        { name: "well", order: 932323203323, saleDate: 66 ,time:'2020-10-04'},
        { name: "right", order: 3232323232, saleDate: 33 ,time:'2020-12-02'},
        { name: "lufu", order: 787878787878, saleDate: 55 ,time:'2021-11-02'},
        { name: "lufu", order: 787878787878, saleDate: 55 ,time:'2021-11-02'},
        { name: "lufu", order: 787878787878, saleDate: 55 ,time:'2021-11-02'},
      ],
      // 卖出数据
      list2: [
        { name: "卖出1", price: 200, saleDate: 1566893214215 },
        { name: "卖出2", price: 500, saleDate: 1566893114215 },
        { name: "卖出3", price: 500, saleDate: 1566893114215 }
      ]
    };
  },
  created() {
    let index = this.active + 1;
    this.list = this[`list${index}`]; // this.list1
    // this.getGoods();
  },
  components: {
    Footer
  },
  methods: {
    onchange(index) {
      this.list = this[`list${index + 1}`];
    },

    getGoods() {
      let url = "/goods";
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

<style>
.van-tabs__line {
  position: absolute;
  bottom: 0.4rem;
  left: 0;
  z-index: 1;
  width: 1.06667rem;
  height: 0.08rem;
  background-color: #1678ff !important;
  border-radius: 0.08rem;
}
.van-cell__value--alone {
    color: #323233;
    text-align: right;
}
.van-button--small {
  margin-left: 0.3rem;
}

.van-tab--active {
  color: #1678ff !important;
  font-weight: 500;
}
</style>
