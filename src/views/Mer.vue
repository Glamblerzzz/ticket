<template>
  <div>
    <router-view />
  </div>
</template>
<script>
import { login } from "../api/login";
import { set_session, get_session } from "../api/base";
import router from "../router/index";
export default {
  name: "User",
  components: {},

  async beforeCreate() {
    await setTimeout(() => {
      set_session({
        user_open_id: "aaaaaa"
      });
    }, 1000);
    let openID = get_session("mer_open_id");
    console.log(window.Location.href);
    if (openID) {
    } else {
      await login({
        openID
      })
        .then(res => {
          console.log(openID);
          this.$router.push({ path: "/mer/main" });
        })
        .catch(err => {
          this.$router.push({ path: "/mer/login" });
        });
    }
  }
};
</script>
