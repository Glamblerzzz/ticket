<template>
  <div>
    <mt-header title="消费记录">
      <router-link to="/user/main" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="content">
      <div v-if="his_list.length==0" class="none">什么都没有!</div>
      <div v-else>
        <div class="title">
          <div v-for="item in menu_list" :key="item.id">{{item}}</div>
        </div>
        <div class="item" v-for="item in his_list" :key="item.id"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyHis",
  components: {},
  data() {
    return {
      his_list: [
        {
          id: "123456",
          aa: "",
          bb: "",
          cc: ""
        }
      ],
      menu_list: ["时间", "商户", "金额"]
    };
  }
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
    color: #999;
    margin-top: wd(100);
  }
  .title{
    display: flex;
    position: fixed;
    z-index: 1000;
    width: 90%;
    justify-content: space-between;
  }
  .item {
    margin-top: wd(50);
    width: 100%;
    height: wd(180);
    border-radius: wd(16);
    background-color: #dbf2fa;
  }
}
</style>