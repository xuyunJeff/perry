<template>
  <div>
    <van-nav-bar title="Trade" right-text="Refresh">
     <van-switch v-model="check"  size="24px"  slot="right"   @change="switchChange" />
   </van-nav-bar>
   
    <van-popup v-model="showSwitch" style="width: 80%">
      <br /><br />
      &nbsp;&nbsp;&nbsp; id： {{ billForShow.id }} <br /><br />
      &nbsp;&nbsp;&nbsp; Amount: ￥ {{ billForShow.price }} <van-button type="default" size="small" @click="copy(billForShow.price)">Copy</van-button><br /><br />
      &nbsp;&nbsp;&nbsp; Bank card number: {{ billForShow.bankCardNo }} <van-button type="default" size="small" @click="copy(billForShow.bankCardNo)">Copy</van-button><br /><br />
      &nbsp;&nbsp;&nbsp; Bank:{{ billForShow.bankName }}<br /><br />
      &nbsp;&nbsp;&nbsp; Name:{{ billForShow.bankAccountName }} <van-button type="default" size="small" @click="copy(billForShow.bankAccountName)">Copy</van-button><br /><br />
      &nbsp;&nbsp;&nbsp; Third party order number:{{ billForShow.thirdBillId }}<br /><br />
      <div style="color: red">&nbsp;&nbsp;&nbsp;Order Status：{{ getBillStatus(billForShow) }}</div><br /><br />
      &nbsp;&nbsp;&nbsp; notify:{{ getNotice(billForShow) }}<br /><br />
    </van-popup>
    <van-cell-group id = "top">
      <van-field v-model="data.createTime" type="date" placeholder="Time"/>
      <van-field v-model="data.merchantName" placeholder="Merchant name"/>
      <van-field v-model="data.thirdBillId" placeholder="Third party order number"/>
      <van-field v-model="data.billId" placeholder="Order number"/>
      <van-field
        readonly
        clickable
        name="picker"
        :value="value"
        placeholder="Click to select order status"
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
        <van-button type="info" icon="search" block  @click="query(1)">Search</van-button>
      </div>
      <!-- <div style="margin: 10px;">
        <van-button type="default" icon="down" block round >Download</van-button>
        <br />
      </div> -->
    </van-cell-group>
    <div  style="padding-bottom: 60px;">
      
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
  </div>
      <!-- <van-list style="margin-top: 10px;">
        <van-cell
            v-for="(item,index) in list"
            :key="index"
            :title="item.id +' '+item.createTime"
            :label="item.thirdBillId"
            :value="'￥'+item.price + '  '+ getBillStatus(item)+'  ' + getNotice(item)+'  ' + item.bankCardNo+'    ' + item.bankName+'  ' + item.bankAccountName"
            @click="showContent(item)"
        />
      </van-list> -->
  

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
      check:false,
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
      ],
      value: '',
      columns: ['全部','未支付', '成功', '失败'],
      showPicker: false,
      showSwitch: false,
      billForShow: "",
      timer:null
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
    let index = this.active + 1;
    this.list = this[`list${index}`]; // this.list1
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
    onchange(index) {
      this.list = this[`list${index + 1}`];
    },
    switchChange (flag) {
      this.check = flag;
      if (!flag) {
        clearInterval(this.timer)
      } else {
        this.timer = setInterval(()=>{
      console.log('定时刷新')
      this.query(1);
    },5000)
      }},
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
<style scoped="scss">
.container {
  width: 100%;
  padding-bottom: 53px;
}
.container .van-cell__title, .container  .van-cell__value {
  flex: inherit;
}
.van-nav-bar {
  background-color: #1678ff !important;
 
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
::v-deep .van-nav-bar__title {
    color: white;
}
</style>

