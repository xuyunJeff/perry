<template>
  <div>
    <van-nav-bar title="Trade">
      <!-- <van-switch v-model="check"  size="24px"  slot="right"   @change="switchChange" /> -->
    </van-nav-bar>
    <van-popup v-model="showSwitch" style="width: 90%; height: 48vh;">

      <van-row gutter="20" class="pop">
        <van-col span="8">id:</van-col>
        <van-col span="8">{{ billForShow.id }}</van-col>
      </van-row>


      <van-row gutter="20" class="pop">
        <van-col span="8">Amount:</van-col>
        <van-col span="8">￥{{ billForShow.price }}</van-col>
        <van-col span="8"> <van-button type="info" size="small" @click="copy(billForShow.price)"
            class="btn">Copy</van-button></van-col>
      </van-row>

      <van-row gutter="20" class="pop">
        <van-col span="8">Bank:</van-col>
        <van-col span="8">{{ billForShow.bankName }}</van-col>
      </van-row>

      <van-row gutter="20" class="pop">
        <van-col span="8">Notify:</van-col>
        <van-col span="8"><van-tag type="warning">{{ getNotice(billForShow) }}</van-tag></van-col>
      </van-row>


      <van-row gutter="20" class="pop">
        <van-col span="8">Order Status:</van-col>
        <van-col span="8"><van-tag type="danger">{{ getBillStatus(billForShow) }}</van-tag></van-col>
      </van-row>

      <van-row gutter="20" class="pop">
        <van-col span="10">Third Party Order Number:</van-col>
        <van-col span="10">{{ billForShow.thirdBillId }}</van-col>

      </van-row>


      <van-row gutter="20" class="pop">
        <van-col span="8">Bank Card Number:</van-col>
        <van-col span="10"> {{ billForShow.bankCardNo }}</van-col>
        <van-col span="6"> <van-button type="info" size="small" @click="copy(billForShow.bankCardNo)"
            class="btn">Copy</van-button></van-col>
      </van-row>


      <van-row gutter="20" class="pop">
        <van-col span="8">Name:</van-col>
        <van-col span="8">{{ billForShow.bankAccountName }}</van-col>
        <van-col span="8"> <van-button type="info" size="small" @click="copy(billForShow.bankAccountName)"
            class="btn">Copy</van-button></van-col>
      </van-row>


      <van-row gutter="20" class="pop">

        <van-cell style="padding-bottom: 1vh;">
          <van-button type="primary" size="small" @click="sumbit(billForShow)"> Confirm</van-button>
          <van-button plain type="info" size="small" @click="back(billForShow)"> Back</van-button>
        </van-cell>
      </van-row>
    </van-popup>


    <van-calendar v-model="show" :value="date" :min-date="minDate" color='#1678ff' confirm-text="Confirm"
      :max-date="maxDate" @confirm="onConfirm_time" />
    <van-cell-group id="top">
      <van-cell title="YYYY-MM-DD " :value=data.createTime is-link label="please select" @click="show = true" />
      <van-field v-model="data.merchantName" placeholder="Merchant Name" />
      <van-field v-model="data.thirdBillId" placeholder="Third Party Order Number" />
      <van-field v-model="data.billId" placeholder="Order Number" />
      <van-field readonly clickable name="picker" :value="value" placeholder="Order Status" @click="showPicker = true" />

      <van-popup v-model="showPicker" position="bottom">
        <van-picker show-toolbar :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
      </van-popup>


      <div style="margin: 10px">
        <van-button type="primary" icon="search" block round @click="search()">Search</van-button>
      </div>
    </van-cell-group>

    <div style="margin-bottom: 8vh" v-if="user.roleName === '出款员'">
      <van-list style="margin-top: 10px" v-for="(item, index) in list" :key="index">
        <van-cell-group @click="showContent(item)">
          <van-cell title="Third Party Order Number" :value="item.thirdBillId" />
          <van-cell title="Create Time" :value="item.createTime" />
          <van-cell title="Bank Type" :value="item.businessBankName" />
          <van-cell title="Bank Card Number" :value="item.bankCardNo" />
          <van-cell title="Amount" :value="item.price" />
          <van-cell>
            <span>Order Status:</span><van-tag type="danger" style="margin-right: 10vw">{{
              getBillStatus(item)
            }}</van-tag>
            <span>Notify:
              <van-tag type="warning">{{ getNotice(item) }}</van-tag></span>
          </van-cell>
          <van-cell>
            <van-button type="info" size="small" @click="lock(item)"> Locking</van-button>
            <van-button plain type="info" size="small" @click="note(item)"> Notify</van-button>
          </van-cell>
        </van-cell-group>
      </van-list>
    </div>

    <div style="margin-bottom: 8vh" v-else>
      <van-list style="margin-top: 10px" v-for="(item, index) in list" :key="index">
        <van-cell-group @click="showContent(item)">
          <van-cell title="Third Party Order Number" :value="item.thirdBillId" />
          <van-cell title="Create Time" :value="item.createTime" />
          <van-cell title="Bank Type" :value="item.businessBankName" />
          <van-cell title="Bank Card Number" :value="item.bankCardNo" />
          <van-cell title="Amount" :value="item.price" />
          <van-cell>
            <span>Order Status:</span><van-tag type="danger" style="margin-right: 10vw">{{
              getBillStatus(item)
            }}</van-tag>
            <span>Notify:
              <van-tag type="warning">{{ getNotice(item) }}</van-tag></span>
          </van-cell>
          <van-cell>
            <van-button type="info" size="small" @click="lock(item)"> Locking</van-button>
            <van-button plain type="info" size="small" @click="note(item)"> Notify</van-button>
          </van-cell>
        </van-cell-group>
      </van-list>
    </div>

    <Footer page="buy"></Footer>
  </div>
</template>

<script>
import Footer from "@/components/Footer";
import { mapGetters } from "vuex";
import { Toast } from 'vant';

export default {
  data() {
    return {
      baseURL: "/apiV1/billOut/",
      date: '',
      data: {
        sortOrder: "asc",
        pageSize: 10,
        pageNumber: 1,
        merchantName: "",
        thirdBillId: "",
        billId: "",
        billStatus: "",
        createTime: "",
      },
      active: 0,
      minDate: new Date('1900/01/01'),
      maxDate: new Date(),
      list: [],
      value: "",
      columns: ["All", "Unpaid", "Success", "Fail"],
      showPicker: false,
      showSwitch: false,
      show: false,
      billForShow: "",
    };
  },
  computed: {
    ...mapGetters(["username", "isLogin", "user"]),
  },
  mounted() {
    //滑到距离底部一定距离时，自动加载下一页的数据
    // this.scroll();
  },
  created() {
    if (!this.isLogin) {
      this.$router.push("/login");
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
    Footer,
  },
  methods: {
    query(pageNumber) {
      let url = this.baseURL + "wap/list/";
      let token = localStorage.getItem("token");
      this.data.pageNumber = pageNumber;
      let data = this.data;
      if (data.billStatus == "0") {
        data.billStatus = "";
      }
      this.$axios
        .post(url, data)
        .then((res) => {
          console.log(res);
          this.list = res.page.rows;
          console.log(this.list);
        })
        .catch((err) => {
          console.log("登陆失败");
        });
    },
    search() {
      this.query(1);
    },
    formatDate(now) {
      let year = now.getFullYear();
      let month = now.getMonth() + 1;
      let date = now.getDate();
      return year + "/" + month + "/" + date;
    },
    onConfirm_time(date) {
      this.show = false;
      this.data.createTime = this.formatDate(date);
    },
    lock(item) {
      const url = `/apiV1/billOut/wap/bill/lock?billId=${item.billId}`
      this.billForShow = item;
      this.$axios
        .get(url)
        .then((res) => {
          this.showSwitch = true;
          const { code, msg } = res;
          if (code === 0) {
            Toast.success(msg);
          }
        })
        .catch((err) => {
          Toast(msg);
        });
    },
    sumbit(item) {
      const url = `/apiV1/billOut/wap/bill/success?billId=${item.billId}`
      this.$axios
        .get(url)
        .then((res) => {
          const { code, msg } = res;
          if (code === 0) {
            Toast.success(msg);
          }
        })
        .catch((err) => {
          Toast(msg);
        });
    },
    back(item) {
      const url = `/apiV1/billOut/wap/bill/goBackOrg?billId=${item.billId}`
      this.$axios
        .get(url)
        .then((res) => {
          const { code, msg } = res;
          if (code === 0) {
            Toast.success(msg);
          }
        })
        .catch((err) => {
          Toast(msg);
        });
    },
    note(item) {
      const url = `/apiV1/billOut/wap/bill/notice?billId=${item.billId}`
      this.$axios
        .get(url)
        .then((res) => {
          const { code, msg } = res;
          if (code === 0) {
            Toast.success(msg);
          }
        })
        .catch((err) => {
          Toast(msg);
        });
    },
    getBillStatus(row) {
      if (row.billStatus == 1) {
        let msg = "未支付";
        if (row.isLock == 1) {
          msg += " 已锁";
        }
        if (row.isLock == 0) {
          msg += " 未锁";
        }
        return msg;
      }
      if (row.billStatus == 2) {
        return "成功";
      }
      if (row.billStatus == 3) {
        return "失败";
      }
    },
    getNotice(row) {
      let noticeMsg = "";
      if (row.noticeMsg && row.noticeMsg != null) {
        if (
          row.noticeMsg == "成功,已作废订单" ||
          row.noticeMsg == "成功,已确认出款"
        ) {
          noticeMsg = ": " + row.noticeMsg;
        } else {
          noticeMsg =
            ": <span style='color: blue'>" + row.noticeMsg + "</span>";
        }
      }
      if (row.notice == 1) {
        return "未通知" + noticeMsg;
      }
      if (row.notice == 2) {
        return "已通知" + noticeMsg;
      }
      if (row.notice == 3) {
        return "通知失败" + noticeMsg;
      }
    },
    onConfirm(value) {
      if (value == "未支付") {
        this.data.billStatus = 1;
      }
      if (value == "成功") {
        this.data.billStatus = 2;
      }
      if (value == "失败") {
        this.data.billStatus = 3;
      }
      this.showPicker = false;
    },
    scroll() {
      let isLoading = false;
      window.onscroll = () => {
        // 距离底部200px时加载一次
        let bottomOfWindow =
          document.documentElement.offsetHeight -
          document.documentElement.scrollTop -
          window.innerHeight <=
          200;
        if (bottomOfWindow && isLoading == false) {
          isLoading = true;
          this.data.pageNumber += 1;
          let pageNumber = this.data.pageNumber;
          this.query(pageNumber);
        }
      };
    },
    showContent(bill) {
      this.showSwitch = true;
      this.billForShow = bill;
    },
    copy(val) {
      let oInput = document.createElement("input");
      oInput.value = val;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象;
      console.log(oInput.value);
      document.execCommand("Copy", false);
      oInput.remove();
    },
  },
};
</script>
<style scoped>
.container {
  width: 100%;
  padding-bottom: 53px;
}

.container .van-cell__title,
.container .van-cell__value {
  flex: inherit;
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

.van-nav-bar {
  background-color: #1678ff !important;
}

.pop {
  line-height: 5vh;
  padding-left: 2vh;
  height: 5vh;
  border-bottom: 0.5px solid #d1d1d1;
}

.btn {
  vertical-align: middle;
}
</style>
