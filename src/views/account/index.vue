<template>
  <div>
    <van-tabs v-model="active" @change="onchange">
      <van-tab title="买入"></van-tab>
      <van-tab title="卖出"></van-tab>
    </van-tabs>

    <van-list style="margin-top: 10px;">
      <van-cell
        v-for="(item,index) in list"
        :key="index"
        :title="item.name"
        :value="item.saleDate"
      />
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
        { name: "买入1", price: 400, saleDate: 1566893214215 },
        { name: "买入2", price: 500, saleDate: 1566892214215 },
        { name: "买入3", price: 800, saleDate: 1566893215215 }
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
</style>
