<template>
  <div class="page">
    <el-pagination v-if="count"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="$store.state.currentPage"
                   :page-sizes="[10, 20, 30, 40]"
                   :page-size="$limit"
                   layout=" jumper,prev, pager, next,sizes,total"
                   :total="count">
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    count: {
      type: Number, //限制类型
      required: true, //必传
    },
  },
  data() {
    return {
      // currentPage: 1, //当前分页器显示的页码
    };
  },
  watch: {},
  // 监听
  computed: {},
  // 计算属性
  created() {},
  mounted() {},
  methods: {
    /*
     *派发父组件每页数量改变事件
     *@this.$store.commit("setCurrentPage", 1); 修改vuex的值
     */
    handleSizeChange(val) {
      this.$store.commit("setCurrentPage", 1);
      this.$emit('handleSizeChange', val)
    },
     /*
     *派发父组件分液器显示的值改变事件
     */
    handleCurrentChange(val) {
      this.$emit('handleCurrentChange', val)
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  text-align: center;
  margin-top: 10px;
}
</style>
