<template>
  <div>
    <van-nav-bar title="交易"/>
    <van-cell-group>
      <van-field v-model="data.createTime" type="date" placeholder="时间" />
      <van-field v-model="data.merchantName" placeholder="商户名" />
      <van-field v-model="data.thirdBillId" placeholder="第三方订单号" />
      <van-field v-model="data.billId" placeholder="订单号" />
      <select v-model="data.billStatus">
        <option  v-bind:value="0">请选择</option>
        <option  v-bind:value="1">未支付</option>
        <option  v-bind:value="2">成功</option>
        <option  v-bind:value="3">失败</option>
      </select>
      <van-button type="default">搜索</van-button>
      <van-button type="default">下载</van-button>
    </van-cell-group>
    <div class="container">
      <van-list style="margin-top: 10px;">
        <van-cell
            v-for="(item,index) in list"
            :key="index"
            :title="item.id"
            :label="item.thirdBillId"
            :value="item.price + '  '+ item.billStatus+'  ' + item.notice+'  ' + item.bankCardNo+'    ' + item.bankName+'  ' + item.bankAccountName"
        />
      </van-list>
    </div>

    <Footer page="buy"></Footer>
  </div>
</template>

<script>
import Footer from "@/components/Footer";

export default {
  data() {
    return {
      baseURL: "/apiV1/billOut/",
      data :{
        sortOrder:"asc",
        pageSize:10,
        pageNumber:1,
        merchantName:"",
        thirdBillId:"",
        billId:"",
        billStatus: "",
        createTime: ""
      },
      active: 0,
      list: [],
      // 买入数据
      list1: [
        {
          id: "1", price: 400, thirdBillId: 1566893214215, billStatus: "未支付", notice: "已通知",
          bankCardNo: "8888888888888888", bankName: "中国银行", bankAccountName: "李四"
        },
        {
          id: "2", price: 500, thirdBillId: 1566893214216, billStatus: "未支付", notice: "已通知",
          bankCardNo: "8888888888888888", bankName: "中国银行", bankAccountName: "张三"
        },
        {
          id: "3", price: 600, thirdBillId: 1566893214217, billStatus: "未支付", notice: "已通知",
          bankCardNo: "8888888888888888", bankName: "中国银行", bankAccountName: "王五"
        },
        {
          id: "4", price: 400, thirdBillId: 1566893214215, billStatus: "未支付", notice: "已通知",
          bankCardNo: "8888888888888888", bankName: "中国银行", bankAccountName: "李四"
        },
        {
          id: "5", price: 500, thirdBillId: 1566893214216, billStatus: "未支付", notice: "已通知",
          bankCardNo: "8888888888888888", bankName: "中国银行", bankAccountName: "张三"
        },
        {
          id: "6", price: 600, thirdBillId: 1566893214217, billStatus: "未支付", notice: "已通知",
          bankCardNo: "8888888888888888", bankName: "中国银行", bankAccountName: "王五"
        },
        {
          id: "7", price: 400, thirdBillId: 1566893214215, billStatus: "未支付", notice: "已通知",
          bankCardNo: "8888888888888888", bankName: "中国银行", bankAccountName: "李四"
        },
        {
          id: "8", price: 500, thirdBillId: 1566893214216, billStatus: "未支付", notice: "已通知",
          bankCardNo: "8888888888888888", bankName: "中国银行", bankAccountName: "张三"
        },
        {
          id: "9", price: 600, thirdBillId: 1566893214217, billStatus: "未支付", notice: "已通知",
          bankCardNo: "8888888888888888", bankName: "中国银行", bankAccountName: "王五"
        },
        {
          id: "10", price: 400, thirdBillId: 1566893214215, billStatus: "未支付", notice: "已通知",
          bankCardNo: "8888888888888888", bankName: "中国银行", bankAccountName: "李四"
        },
        {
          id: "11", price: 500, thirdBillId: 1566893214216, billStatus: "未支付", notice: "已通知",
          bankCardNo: "8888888888888888", bankName: "中国银行", bankAccountName: "张三"
        },
        {
          id: "12", price: 600, thirdBillId: 1566893214217, billStatus: "未支付", notice: "已通知",
          bankCardNo: "8888888888888888", bankName: "中国银行", bankAccountName: "王五"
        },
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
    query() {
      let url = this.baseURL + "/wap/list/"
      let data ={
        sortOrder:"asc",
        pageSize:10,
        pageNumber:1
      }

    }
  }
};
</script>
<style scoped>
.container {
  width: 100%;
  height: 20rem;
  overflow: hidden;
}
</style>

