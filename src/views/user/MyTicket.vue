<template>
  <div>
    <mt-header title="我的消费券">
      <router-link to="/user/main" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="content">
      <div v-if="ticket_list.length==0" class="none">什么都没有!</div>
      <div v-else>
        <div v-for="(item) in ticket_list" :key="item.ddd" class="ticket">
          <div class="ticket_left">￥{{item.Amt}}</div>
          <div class="ticket_right">
            <div v-if="item.Status==0" class="ticket_right_top">
              xxxx消费券
              <span class="type1">(未使用)</span>
            </div>
            <div v-else-if="item.Status==1" class="ticket_right_top">
              xxxx消费券
              <span class="type1">(已使用)</span>
            </div>
            <div v-else class="ticket_right_top">
              xxxx消费券
              <span class="type1">(已过期)</span>
            </div>
            <div class="ticket_right_bottom">有效期至：{{item.DelTime}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get_ticket_list } from "../../api/user";
import { dateFormat } from "../../api/base";
export default {
  name: "MyTicket",
  components: {},
  data() {
    return {
      ticket_list: []
    };
  },
  async beforeMount() {
    await get_ticket_list({ openID: "123456" }).then(res => {
      for (const val of res.data.ticketInfo) {
        val.DelTime = new Date(val.DelTime);
        val.DelTime = dateFormat("YYYY-mm-dd", val.DelTime);
      }
      this.ticket_list = res.data.ticketInfo;
    });
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
@function wd($wd) {
  @return ($wd/7.5) * 1vw;
}
.content {
  width: 90%;
  margin: auto;
  .none {
    width: 100%;
    text-align: center;
    margin-top: wd(100);
    color: #999;
  }
  .ticket {
    width: 100%;
    height: wd(180);
    margin-top: wd(50);
    display: flex;
    .ticket_left {
      width: 35%;
      height: wd(180);
      background-color: #6ac8e7;
      border-radius: wd(16);
      z-index: 100;
      line-height: wd(180);
      text-align: center;
      color: #fff;
      font-size: 25px;
      font-weight: bold;
    }

    .ticket_right {
      height: 100%;
      width: 68%;
      background-color: #f4f4f4;
      margin-left: -3%;
      border-radius: wd(16);
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .ticket_right_top {
        width: 80%;
        margin: auto;
      }
      .type1 {
        margin-left: wd(8);
        color: rgb(76, 165, 76);
        font-size: 14px;
      }
      .type2 {
        margin-left: wd(8);
        color: #f00;
        font-size: 14px;
      }
      .type3 {
        color: #aaa;
        margin-left: wd(8);
        font-size: 14px;
      }
      .ticket_right_bottom {
        width: 80%;
        margin: auto;
        font-size: 12px;
        color: #555;
      }
    }
  }
}
</style>