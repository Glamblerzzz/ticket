<template>
  <div class="hello">
    <div class="aaaaa">aaaaaaa</div>
    <mt-button type="primary">primary</mt-button>

  </div>
</template>

<script>
import {get_token} from '../api/login'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  async beforeCreate(){
    get_token().then(res=>{
      console.log(res)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @function wd($wd) {
    @return ($wd/7.5) * 1vw;
  }
  .aaaaa{
    height: wd(500);
    width: wd(750);
    background-color: aqua;
  }
</style>
