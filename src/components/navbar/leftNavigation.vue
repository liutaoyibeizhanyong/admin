<template>
  <div class="leftNavigation">
    <el-menu class="sidebar-el-menu"
             :default-active="onRouUrl"
             background-color=" rgba(0,9,60,225)"
             text-color="#fff"
             active-text-color="pink"
             unique-opened
             router>
      <!--      <el-autocomplete-->
      <!--        v-model="state"-->
      <!--        :fetch-suggestions="querySearchAsync"-->
      <!--        placeholder="请搜索页面"-->
      <!--        @select="handleSelect"-->
      <!--        :trigger-on-focus="false"-->
      <!--      ></el-autocomplete>-->
      <!-- <el-input v-model="input" placeholder="请输入搜索内容" @change="change"></el-input> -->
      <!-- 一级菜单 -->
      <el-submenu :index="'/' +item.url"
                  v-for="(item,index) in this.$store.state.list"
                  :key="index">
        <!-- 一级菜单的模板区域 -->
        <template slot="title">
          <!-- 图标 -->
          <i :class="objIcon[item.title]"></i>
          <!-- 文本 -->
          <span>{{item.title}}</span>
        </template>
        <el-menu-item :index="subItem.url"
                      v-for="subItem in item.menuurl"
                      :key="subItem.id"
                      @click="saveNavState(subItem.url)">
          <template slot="title">
            <!-- 图标 -->
            <!-- 文本 -->
            <i :class="objIcon[subItem.title]"></i>
            <span>{{subItem.title}}</span>
          </template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>

export default {
  data() {
    return {
      onRouUrl: null,
      objIcon: {
        用户管理: "el-icon-user",
        酒店管理: "el-icon-school",
        景点管理: "el-icon-guide",
        用户列表: "el-icon-document",
        用户信息: "el-icon-edit-outline",
        酒店列表: "el-icon-tickets",
        酒店入住: "el-icon-document-add",
        景点列表: "el-icon-notebook-2",
        景点攻略: "el-icon-magic-stick",
        地图管理: "el-icon-map-location",
        位置服务: "el-icon-location-outline",
        
      },
    };
  },
  watch: {},
  // 监听
  computed: {},

  // 计算属性
  created() {
    this.$nextTick(() => {
      this.onRouUrl = this.$store.state.activePath;     
    });
  },
  mounted() {},
  methods: {
   
    saveNavState(activePath) {
      //选中的路由路径存入sessionStorage 然后刷新初始化取出
      this.$store.commit("setActivePath", activePath);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/navbar/leftNavigation";
</style>
