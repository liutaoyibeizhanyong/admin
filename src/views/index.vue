<template>
  <div>
  <nav-bar></nav-bar>
<left-navigation></left-navigation>
 <div class="content-box" :class="{'content-collapse':collapse}">
      <v-tags ></v-tags>
      <div class="content">
        <transition mode="out-in">
          <router-view></router-view>
        </transition>
        <el-backtop target=".content"></el-backtop>
      </div>
    </div>
      
  </div>
</template>

<script>
import navBar from '@/components/navbar/navBar';
import leftNavigation from '@/components/navbar/leftNavigation';
import vTags from "@/components/navbar/Tags.vue";
import bus from "@/components/bus.js";
export default {
  data() {
    return {
      tagsList: [],
      collapse: false,
      list: [],
    }
  },
components: {
  navBar,
  leftNavigation,
  vTags
},
  watch: {},
  // 监听
  // 计算属性
 created() {
    this.$nextTick((callback) => {
      bus.$on("collapse-content", (msg) => {
        this.collapse = msg;
      });
      // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
      bus.$on("tags", (msg) => {
        let arr = [];
        for (let i = 0, len = msg.length; i < len; i++) {
          msg[i].name && arr.push(msg[i].name);
        }
        this.tagsList = arr;
      });
    });
  },
  methods: {
    sunShow() {
      this.$refs.sidebars.show()
    },
  },

};
</script>


<style scoped>

.content-box {
  position: absolute;
  left: 220px;
  right: 0;
  top: 60px;
  bottom: 0;
  padding-bottom: 30px;
  -webkit-transition: left 0.3s ease-in-out;
  transition: left 0.3s ease-in-out;
  background: #f0f0f0;
}
.content-collapse {
  left: 65px;
}
.content .dash {
  overflow: hidden;
}
.content {
  width: auto;
  height: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  overflow: auto;
}
.tags-li .active {
  border: 1px solid #409eff;
  background-color: #409eff;
}
.v-enter {
  opacity: 0.5;

  transform: rotateY(180deg);
  -ms-transform: rotateY(180deg);
  -moz-transform: rotateY(180deg);
  -webkit-transform: rotateY(180deg);
}
.v-enter-active,
.v-leave-active {
  transition: all 0.4s ease;
  -webkit-transition: all 0.4s ease;
  -moz-transition: all 0.4s ease;
  -ms-transition: all 0.4s ease;
  -o-transition: all 0.4s ease;
}
</style>
