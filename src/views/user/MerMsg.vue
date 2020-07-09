<template>
  <div>
    <mt-header title="商户信息">
      <router-link to="/user/main" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="content">
      <div v-if="mer_list.length==0" class="none">什么都没有!</div>
      <div v-else class="item" v-for="item in mer_list" :key="item.id">
        <div class="mer_title">
          <img src="../../assets/icon/main_mer.png" class="icon" alt />
          <div class="name">
            {{item.UserName}}
            <span v-if="item.Type==1" class="use">(可使用所有消费券)</span>
            <span v-else class="unuse">(部分消费券可用)</span>
          </div>
        </div>
        <div class="mer_con">
          <div>地址：{{!item.Adress?'无':item.Adress}}</div>
          <div>联系方式：{{!item.Phone?'无':item.Phone}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get_mer_list } from "../../api/user";
import { Toast } from "mint-ui";
export default {
  name: "MerMsg",
  components: {},
  data() {
    return {
      mer_list: []
    };
  },
  async beforeMount() {
    await get_mer_list()
      .then(res => {
        console.log(res);
        this.mer_list = res.data;
      })
      .catch(err => {
        let instance = Toast(err);
        setTimeout(() => {
          instance.close();
        }, 2000);
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
  .item {
    width: 100%;
    height: wd(180);
    margin-top: wd(50);
    display: flex;
    background-color: #f4f4f4;
    border-radius: wd(10);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .mer_title {
      width: 100%;
      display: flex;
      margin: wd(10) wd(20);
      img {
        height: wd(60);
        width: wd(60);
        border-radius: wd(60);
        background-color: #fff;
      }
      .name {
        height: wd(60);
        margin-left: wd(30);
        line-height: wd(60);
      }
      span {
        height: wd(60);
        margin-left: wd(10);
        line-height: wd(60);
      }
      .use {
        font-size: 12px;
        color: #79cc79;
      }
      .unuse {
        font-size: 12px;
        color: #ff0000;
      }
    }
    .mer_con {
      display: flex;
      margin: wd(0) wd(20);
      height: wd(60);
      font-size: 14px;
      justify-content: space-between;
    }
  }
}
</style>