<template>
  <div>
    <van-nav-bar title="交易"/>
    <van-popup v-model="showSwitch" style="width: 80%">
      <br /><br />
      &nbsp;&nbsp;&nbsp; id： {{ billForShow.id }} <br /><br />
      &nbsp;&nbsp;&nbsp; 金额： ￥ {{ billForShow.price }} <van-button type="default" size="small" @click="copy(billForShow.price)">复制</van-button><br /><br />
      &nbsp;&nbsp;&nbsp; 银行卡号： {{ billForShow.bankCardNo }} <van-button type="default" size="small" @click="copy(billForShow.bankCardNo)">复制</van-button><br /><br />
      &nbsp;&nbsp;&nbsp; 银行：{{ billForShow.bankName }}<br /><br />
      &nbsp;&nbsp;&nbsp; 姓名：{{ billForShow.bankAccountName }} <van-button type="default" size="small" @click="copy(billForShow.bankAccountName)">复制</van-button><br /><br />
      &nbsp;&nbsp;&nbsp; 第三方订单号：{{ billForShow.thirdBillId }}<br /><br />
      <div style="color: red">&nbsp;&nbsp;&nbsp;订单状态：{{ getBillStatus(billForShow) }}</div><br /><br />
      &nbsp;&nbsp;&nbsp; 通知：{{ getNotice(billForShow) }}<br /><br />
    </van-popup>
    <van-cell-group id = "top">
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
        <van-button type="primary" icon="search" block round @click="query(1)">搜索</van-button>
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
            :title="item.id +' '+item.createTime"
            :label="item.thirdBillId"
            :value="'￥'+item.price + '  '+ getBillStatus(item)+'  ' + getNotice(item)+'  ' + item.bankCardNo+'    ' + item.bankName+'  ' + item.bankAccountName"
            @click="showContent(item)"
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
      showSwitch: false,
      billForShow: ""
    };
  },
  computed: {
    ...mapGetters(["username", "isLogin"])
  },
  mounted(){
    //滑到距离底部一定距离时，自动加载下一页的数据
    this.scroll();
  },
  created() {
    if(!this.isLogin){
      this.$router.push("/login")
    }
    // let index = this.active + 1;
    // const obj = {
    //   id: "1", price: 400, thirdBillId: 1566893214215, billStatus: 1, notice: 1,createTime: '2021-06-15',
    //   bankCardNo: "8888888888888888", bankName: "中国银行", bankAccountName: "李四"
    // };
    // const mockData = new Array(20).fill(obj);
    // this.list = mockData;
    this.query(1);
  },
  components: {
    Footer
  },
  methods: {
    query(pageNumber) {
      let url = this.baseURL + "wap/list/"
      let token = localStorage.getItem("token")
      this.data.pageNumber = pageNumber
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
      if(value == "未支付"){
        this.data.billStatus = 1
      }
      if(value == "成功"){
        this.data.billStatus = 2
      }
      if(value == "失败"){
        this.data.billStatus = 3
      }
      this.showPicker = false;
    },
    scroll() {
      let isLoading = false
      window.onscroll = () => {
        // 距离底部200px时加载一次
        let bottomOfWindow = document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight <= 200
        if (bottomOfWindow && isLoading == false) {
          isLoading = true
          this.data.pageNumber += 1
          let pageNumber = this.data.pageNumber
          this.query(pageNumber)
        }
      }
    },
    showContent(bill){
      this.showSwitch = true
      this.billForShow = bill
    },
    copy(val){
      let oInput = document.createElement('input');
      oInput.value = val;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象;
      console.log(oInput.value);
      document.execCommand("Copy", false);
      oInput.remove()
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

