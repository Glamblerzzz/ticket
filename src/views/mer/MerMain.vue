<template>
  <div>
    <mt-header fixed title="用户中心" class="u_title"></mt-header>
    <div class="u_content">
      <div v-for="(item) in menu" :key="item.name" class="item">
        <div v-on:click="next_page(item.url)" class="item_d">
          <img :src="item.icon" alt class="item_img" />
          <div class="item_msg">{{item.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mianHis from "../../assets/icon/mainHis.png";
import mainMer from "../../assets/icon/main_mer.png";
import mainTicket from "../../assets/icon/main_ticket.png";
import lotteryDraw from "../../assets/icon/lottery_draw.png";
import router from "../../router/index";
export default {
  name: "MerMain",
  components: {},
  data() {
    return {
      mianHis,
      menu: [
        {
          name: "消费券核销",
          icon: mainTicket,
          url: "/mer/cancel"
        },
        {
          name: "消费记录",
          icon: mianHis,
          url: "/mer/mer_his"
        },
      ]
    };
  },
  beforeMount() {},
  methods: {
    next_page(e) {
      console.log(e);
      this.$router.push({ path: e });
    }
  }
};
</script>
<style lang="scss" scoped>
@function wd($wd) {
  @return ($wd/7.5) * 1vw;
}
.u_title {
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  text-align: center;
}
.u_content {
  margin: wd(160) wd(30);
  width: wd(690);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  .item {
    width: wd(216);
    height: wd(216);
    border: wd(6) solid white;
    border-radius: wd(20);
    background-color: #f4f4f4;
    .item_img {
      height: wd(80);
      width: wd(80);
    }
    .item_d {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #555;
      .item_msg {
        margin-top: wd(20);
      }
    }
  }
}
</style>