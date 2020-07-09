<template>
  <div class="home">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div class="l_title">xxxx消费券</div>
    <div class="l_cotent">
      <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
      <mt-field label="验证码" v-model="captcha">
        <mt-button v-if="code_tp" type="primary" size="small" v-on:click="get_vrcode">获取验证码</mt-button>
        <mt-button v-else type="default" size="small" disabled>剩余时间：{{time}}秒</mt-button>
      </mt-field>
    </div>
    <div class="l_sub">
      <mt-button type="primary" size="large" v-on:click="sub_msg">提交</mt-button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { get_cst_code, check_code } from "../../api/login";
import { Toast } from "mint-ui";
import { set_session, get_session } from "../../api/base";

export default {
  name: "MerLogin",
  components: {
    HelloWorld
  },
  data() {
    return {
      time: 60,
      code_tp: true,
      phone: "",
      captcha: "",
      code_id: ""
    };
  },
  async beforeMount() {},
  methods: {
    //获取验证码
    get_vrcode() {
      if (this.phone.length != 11) {
        let instance = Toast("手机号码错误！");
        setTimeout(() => {
          instance.close();
        }, 2000);
        return 0;
      }
      this.code_tp = false;
      get_cst_code({
        phone: this.phone,
        openID: "aaaaaa",
        otp: "register"
      })
        .then(res => {
          this.count_down();
          console.log(res);

          this.code_id = res.data.codeID;
          let inst = Toast("短信发送成功！");
          setTimeout(() => {
            instance.close();
          }, 2000);
        })
        .catch(err => {
          this.code_tp = true;
          let inst = Toast(err);
          setTimeout(() => {
            instance.close();
          }, 2000);
        });
    },

    //倒计时
    count_down() {
      setTimeout(() => {
        if (this.time > 0) {
          this.time--, this.count_down();
        } else {
          (this.code_tp = true), (this.time = 60);
        }
      }, 1000);
    },
    //提交验证码
    sub_msg() {
      check_code({
        openID: "aaaaaa",
        phone: this.phone,
        semsCode: this.captcha,
        codeID: this.code_id,
        otp: "register"
      }).then(res => {
        this.$router.push({ path: "/user/main" });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@function wd($wd) {
  @return ($wd/7.5) * 1vw;
}
.l_title {
  height: 50px;
  widows: 100%;
  font-size: 28px;
  text-align: center;
  margin-top: 30px;
}
.l_phone {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.l_cotent {
  width: 100%;
  margin: 50px 0 100px 0;
}
.l_sub {
  width: 95%;
  margin: auto;
}
</style>