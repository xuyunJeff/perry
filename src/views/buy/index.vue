<template>
  <div>
    <van-nav-bar title="交易"/>
    <van-cell-group>
      <van-field v-model="data.createTime" type="date" placeholder="时间"/>
      <van-field v-model="data.merchantName" placeholder="商户名"/>
      <van-field v-model="data.thirdBillId" placeholder="第三方订单号"/>
      <van-field v-model="data.billId" placeholder="订单号"/>
      <van-field
        readonly
        clickable
        name="picker"
        :value="value"
        placeholder="点击选择订单状态"
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
      <div style="margin: 10px;">
        <van-button type="primary" icon="search" block round @click="query">搜索</van-button>
      </div>
      <div style="margin: 10px;">
        <van-button type="default" icon="down" block round >下载</van-button>
        <br />
      </div>
    </van-cell-group>
    <div class="container">
      <van-list style="margin-top: 10px;">
        <van-cell
            v-for="(item,index) in list"
            :key="index"
            :title="item.createTime"
            :label="item.thirdBillId"
            :value="'￥'+item.price + '  '+ getBillStatus(item)+'  ' + getNotice(item)+'  ' + item.bankCardNo+'    ' + item.bankName+'  ' + item.bankAccountName"
        />
      </van-list>
    </div>

    <Footer page="buy"></Footer>
  </div>
</template>

<script>
import Footer from "@/components/Footer";
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      baseURL: "/apiV1/billOut/",
      data: {
        sortOrder: "asc",
        pageSize: 10,
        pageNumber: 1,
        merchantName: "",
        thirdBillId: "",
        billId: "",
        billStatus: "",
        createTime: ""
      },
      active: 0,
      list: [],
      value: '',
      columns: ['全部','未支付', '成功', '失败'],
      showPicker: false,
    };
  },
  computed: {
    ...mapGetters(["username", "isLogin"])
  },
  created() {
    if(!this.isLogin){
      this.$router.push("/login")
    }
    let index = this.active + 1;
    const obj = {
      id: "1", price: 400, thirdBillId: 1566893214215, billStatus: 1, notice: 1,createTime: '2021-06-15',
      bankCardNo: "8888888888888888", bankName: "中国银行", bankAccountName: "李四"
    };
    const mockData = new Array(20).fill(obj);
    this.list = mockData; 
    this.query();
  },
  components: {
    Footer
  },
  methods: {
    query() {
      let url = this.baseURL + "wap/list/"
      let token = localStorage.getItem("token")
      let data = this.data
      if(data.billStatus == "0"){
        data.billStatus = ""
      }
      this.$axios.post(url, data).then(res => {
        console.log(res)
        this.list = res.page.rows
        console.log(this.list)
      }).catch(err => {
        console.log('登陆失败')
      });
    },
    download() {

    },
    getBillStatus(row){
      if (row.billStatus == 1) {
        let msg ="未支付";
        if(row.isLock == 1) {
          msg += " 已锁"
        }
        if(row.isLock == 0) {
          msg += " 未锁"
        }
        return msg
      }
      if (row.billStatus == 2) {

        return "成功"
      }
      if (row.billStatus == 3) {
        return "失败"
      }
    },
    getNotice(row){
      let noticeMsg = "";
      if (row.noticeMsg && row.noticeMsg != null) {
        if (row.noticeMsg == "成功,已作废订单" || row.noticeMsg == "成功,已确认出款") {
          noticeMsg = ": " + row.noticeMsg
        } else {
          noticeMsg = ": <span style='color: blue'>" + row.noticeMsg + "</span>"
        }
      }
      if (row.notice == 1) {
        return  "未通知"+ noticeMsg
      }
      if (row.notice == 2) {
        return "已通知" + noticeMsg
      }
      if (row.notice == 3) {
        return "通知失败" + noticeMsg
      }
    },
    onConfirm(value) {
      this.value = value;
      this.showPicker = false;
    }
  }
};
</script>
<style scoped>
.container {
  width: 100%;
  padding-bottom: 53px;
}
.container .van-cell__title, .container  .van-cell__value {
  flex: inherit;
}
</style>

