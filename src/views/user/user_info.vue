<template>
  <div class="user-info">
    <el-card class="box-card">123
      <el-form :inline="true" size="mini"  class="demo-form-inline">
        <el-form-item>
          <el-input v-model="params.number" @keyup.enter.native="onSubmit()" clearable show-word-limit maxlength="6" placeholder="请搜索用户ID"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain  @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <table-data :tableList = "tableList" :tableHead = "$tableHead.user_info.tableHead" @switchChange="switchChange" @tableDel="tableDel" @tableEdit="tableEdit"></table-data>
      <pageination ref="pageination" @handleSizeChange="sizeChange" @handleCurrentChange ="currentChange" :count = "count" ></pageination>
    </el-card>
  </div>
</template>

<script>
import tableData from "@/components/tableData";
import pageination from "@/components/pageination";
import { post_user_info,post_set_user_info_status,del_user_info } from "@/assets/js/request/main";
export default {
  data() {
    return {
      count: 0, //总页数
      params: {
        page: this.$page, //获取全局的配置项页码
        limit: this.$limit, //获取全局的配置项每页条数
        number: null,
      }, //列表数据参数
      tableList: [], //表格数据
    };
  },
  watch: {},
  // 监听
  computed: {},
  components: {
    tableData,
    pageination,
  },
  // 计算属性
  created() {
    this.$nextTick(() => {
      this.getUserInfo();
    });
  },
  mounted() {},
  methods: {
    /*
     *获取用户数据
     *  @params 参数 type:Object
     */
    async getUserInfo() {
      let that = this;
      //{ list, code ,count} 取出接口里面的 list, code ,count
      let { list, code, count } = await post_user_info(that.params);
      if (code === 200) {
        //表格数据tableList
        that.tableList = list;
        //表格总页数count
        that.count = count;
        console.log(list);
      }
    },
    sizeChange(val) {
      this.$set(this.params, "page", 1);
      this.$set(this.params, "limit", val);
      this.getUserInfo();
    },
    /*
     *分页显示改变事件
     *  @val 分液器显示的值
     */
    currentChange(val) {
      this.$store.commit("setCurrentPage", val);
      this.$set(this.params, "page", val);
      this.getUserInfo();
    },
    /*
     *搜索事件搜索number
     *@this.$store.commit("setCurrentPage", 1); 修改vuex的值
     */
    onSubmit() {
      this.$store.commit("setCurrentPage", 1);
      this.$set(this.params, "page", 1);
      this.getUserInfo();
    },
    /*
     *表格触发删除当前列事件
     *  @id 当前列的id
     *  @status 当前列的改变的状态
     */
    async switchChange(id,status){
      let {message,code,} = await post_set_user_info_status({id:id,status:status});
      if(code === 200) return  this.$message({
          message: message,
          type: 'success',
          duration:600,
        });
    },
    /*
     *表格触发删除当前列事件
     *  @row 当前列的数据
     */
    tableDel(row) {
      this.$confirm(`您确认要删除用户${row.name}吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async (_) => {
          let { message, code } = await del_user_info({ number: row.number });
          console.log(code);
          if (code === 200) {
            this.$message({
              message: message,
              type: "success",
              offset: 100,
               duration:600,
            });
            this.getUserInfo();
          }
        })
        .catch((_) => {});
    },
    /*
     *表格触发编辑当前列事件
     *  @row 当前列的数据
     */
    tableEdit(row) {
      console.log(row);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
