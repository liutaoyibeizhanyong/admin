<template>
  <div class="user">
    <el-card class="box-card">
      <table-data :autoHeight = "autoHeight" :tableList = "tableList" :tableHead = "$tableHead.hotel_check_in.tableHead" ></table-data>
      <pageination ref="pageination" @handleSizeChange="sizeChange" @handleCurrentChange ="currentChange" :count = "count" ></pageination>
    </el-card>
  </div>
</template>
<script>
import tableData from "@/components/tableData";
import pageination from "@/components/pageination";
import {post_hotel_check_in } from "@/assets/js/request/main";
export default {
  data() {
    return {
      count:0,//总页数
      params: {
        page: this.$page,//获取全局的配置项页码
        limit: this.$limit,//获取全局的配置项每页条数
        phone: null,
      },//列表数据参数
      tableList:[],//表格数据
      autoHeight:'75vh'
    };
  },
  components: {
    tableData,
    pageination
  },
  watch: {},
  // 监听
  computed: {},
  // 计算属性
  created() {
    this.$nextTick(() => {
      this.getHotelCheckIn();
    });
  },
  mounted() {},
  methods: {
    /*
     *获取用户数据
     * @params 参数 type:Object
     */
    async getHotelCheckIn() {
      let that = this;
      //{ list, code ,count} 取出接口里面的 list, code ,count
      let { list, code ,count} = await post_hotel_check_in(that.params);
      if (code === 200) {
        //表格数据tableList
        that.tableList = list;
        //表格总页数count
        that.count = count;
      }
    },
    /*
     *每页多少条数改变事件
     * @val 改变的值
     */
    sizeChange(val) {
      this.$set(this.params,'page',1);
      this.$set(this.params,'limit',val);
      this.getHotelCheckIn();
    },
    /*
     *分页显示改变事件
     * @val 分液器显示的值
     */
    currentChange(val) {
      this.$store.commit("setCurrentPage", val);
      this.$set(this.params,'page',val);
      this.getHotelCheckIn();
    },
  }
};
</script>