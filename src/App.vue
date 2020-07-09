<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
  @function wd($wd) {
    @return ($wd/7.5) * 1vw;
  }
</style>
