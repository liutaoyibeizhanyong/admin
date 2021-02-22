<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>


<style lang="scss">
#app {
  height: 100%;
  background: #fff;
}
.unit-label,
.label-column {
  color: rgba(250, 250, 250, 0.6);
}
.rows {
  height: 80px !important;
}
</style>
