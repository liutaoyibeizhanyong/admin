<template>
  <div class="user">
    <el-card class="box-card">
      <el-form :inline="true" size="mini"  class="demo-form-inline">
        <el-form-item>
          <el-input v-model="params.phone" @keyup.enter.native="onSubmit()" clearable show-word-limit maxlength="11" placeholder="请搜索酒店手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain  @click="onSubmit">查询</el-button>
        </el-form-item>
         <el-button style="float:right" @click="addBoolean=true" type="info" size="mini" plain>添加</el-button>
      </el-form>
      <table-data :tableList = "tableList" :tableHead = "$tableHead.hotel.tableHead" @tableDel="tableDel" @tableEdit="tableEdit"></table-data>
      <pageination ref="pageination" @handleSizeChange="sizeChange" @handleCurrentChange ="currentChange" :count = "count" ></pageination>
     <!-- 添加的弹窗 -->
      <el-dialog width="40%" title="添加" :visible.sync="addBoolean" append-to-body>
        <el-form :model="addParams" :rules="addRules" ref="addForm">
            <el-form-item prop="name" size="mini" label="酒店名称：" :label-width="formLabelWidth">
              <el-input v-model="addParams.name" placeholder="请输入酒店名称" autocomplete="off"></el-input>
            </el-form-item>
              <el-form-item prop="address" size="mini" label="酒店地址：" :label-width="formLabelWidth">
              <el-input v-model="addParams.address" placeholder="请输入酒店地址" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="star" size="mini" label="酒店评分：" :label-width="formLabelWidth">
                 <el-rate v-model="addParams.star" :colors="colors"> </el-rate>
            </el-form-item>
            <el-form-item prop="phone" size="mini" label="酒店电话：" :label-width="formLabelWidth">
              <el-input v-model="addParams.phone" placeholder="请输入酒店电话" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="hotel_img" size="mini" label="酒店图片：" :label-width="formLabelWidth">
              <el-upload
                action
                list-type="picture-card"
                :limit="1"
                ref="upload"
                :on-success="upload"
                :on-remove="uploadRemove"
                :before-upload="limitUpload"
                :http-request="fnUploadRequest">
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
             
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" plain  size="mini" @click="setReset('addForm')">重 置</el-button>
          <el-button type="success" plain  size="mini" @click="addToList('addForm')">确 定</el-button>
        </span>
      </el-dialog>
     <!-- 编辑的弹窗 -->
      <el-dialog width="40%" title="编辑" :visible.sync="editBoolean" @close = "editElDialog" append-to-body>
        <el-form :model="editParams" :rules="editRules" ref="editParams">
            <el-form-item prop="name" size="mini" label="酒店名称：" :label-width="formLabelWidth">
              <el-input v-model="editParams.name" placeholder="请输入酒店名称" autocomplete="off"></el-input>
            </el-form-item>
              <el-form-item prop="address" size="mini" label="酒店地址：" :label-width="formLabelWidth">
              <el-input v-model="editParams.address" placeholder="请输入酒店地址" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="star" size="mini" label="酒店评分：" :label-width="formLabelWidth">
                 <el-rate v-model="editParams.star" :colors="colors"> </el-rate>
            </el-form-item>
            <el-form-item prop="phone" size="mini" label="酒店电话：" :label-width="formLabelWidth">
              <el-input v-model="editParams.phone" placeholder="请输入酒店电话" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="hotel_img" size="mini" label="酒店图片：" :label-width="formLabelWidth">
              <el-upload
                  action
                list-type="picture-card"
                :limit="1"
                ref="upload"
                :file-list="editList"
                :on-success="upload"
                :on-remove="uploadRemove"
                :before-upload="limitUpload"
                :http-request="fnUploadRequest">
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
        
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" plain  size="mini" @click="setReset('editParams')">重 置</el-button>
          <el-button type="success" plain  size="mini" @click="editToList('editParams')">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import oss from "@/assets/js/aliOss";
import tableData from "@/components/tableData";
import pageination from "@/components/pageination";
import { post_hotel_info,add_hotel_info,edit_hotel_info,del_hotel_info } from "@/assets/js/request/main";
export default {
  data() {
    return {
      count:0,//总页数
      colors:['#99A9BF', '#f00', '#FF9900'],
      params: {
        page: this.$page,//获取全局的配置项页码
        limit: this.$limit,//获取全局的配置项每页条数
        phone: null,
      },//列表数据参数
      tableList:[],//表格数据
      addBoolean:false,//添加表格的Boolean值
      addParams:{
        name:null,
        phone:null,
        address:null,
        business_hours:[9,22],
        hotel_img:null,
        star:1,
        create_time:null,
      },//添加的参数
      addRules:{
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        phone: [{ required: true,pattern: /^1[3456789]\d{9}$/, message: "请输入正确手机号", trigger: "blur" }],
        address: [{ required: true, message: "请输入酒店地址", trigger: "blur" }],
        hotel_img: [{ required: true, message: "请上传酒店图片", trigger: "blur" }],
        star: [{ required: true, message: "请选择评分", trigger: "blur" }],
      },//添加的正则
      formLabelWidth:'100px',//lable的宽度
      editBoolean:false,//编辑表格的Boolean值
      editParams:{
        id:null,
        name:null,
        phone:null,
        address:null,
        business_hours:null,
        hotel_img:null,
        star:1,
        create_time:null,
      },//添加的参数
      editRules:{
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        phone: [{ required: true,pattern: /^1[3456789]\d{9}$/, message: "请输入正确手机号", trigger: "blur" }],
        address: [{ required: true, message: "请输入酒店地址", trigger: "blur" }],
        hotel_img: [{ required: true, message: "请上传酒店图片", trigger: "blur" }],
        star: [{ required: true, message: "请选择评分", trigger: "blur" }],
      },//添加的正则
      editList:[[{url:null}]],
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
      this.getHotelInfo();
    });
  },
  mounted() {},
  methods: {
    /*
     *获取用户数据
     * @params 参数 type:Object
     */
    async getHotelInfo() {
      let that = this;
      //{ list, code ,count} 取出接口里面的 list, code ,count
      let { list, code ,count} = await post_hotel_info(that.params);
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
      this.getHotelInfo();
    },
    /*
     *分页显示改变事件
     * @val 分液器显示的值
     */
    currentChange(val) {
      this.$store.commit("setCurrentPage", val);
      this.$set(this.params,'page',val);
      this.getHotelInfo();
    },
    /*
     *搜索事件搜索number 
     * @this.$store.commit("setCurrentPage", 1); 修改vuex的值
     */
    onSubmit(){
      this.$store.commit("setCurrentPage", 1);
      this.$set(this.params,'page',1);
      this.getHotelInfo();
    },
    /*
     * 添加事件
     */
    addToList(addForm){
      this.$refs[addForm].validate(async (valid) => {
        if (valid) {
          this.addParams.create_time = this.$moment().format("YYYY-MM-DD HH:mm:ss");
            let {code,message} = await add_hotel_info(this.addParams);
            if(code===200){
              this.addBoolean=false;
              this.$message({
              message: message,
              type: 'success',
              offset:100,
              duration:600,
            });
              this.addParams={
                name:null,
                phone:null,
                address:null,
                business_hours:null,
                hotel_img:null,
                star:1,
                create_time:null,
              };
              this.$refs.upload.clearFiles();
              this.onSubmit();
            }
        }
      })
    },
    /*
     * 删除事件
     */
    setReset(Form){
      this.$refs[Form].resetFields();
      this.$refs.upload.clearFiles();
      this.uploadRemove();
    },
    /*
     *表格触发编辑当前列事件
     * @row 当前列的数据
     */
    tableEdit(row){
      
     this.editBoolean = true;
     this.editParams.id = row.id;
     this.editParams.name = row.name;
     this.editParams.phone = row.phone;
     this.editParams.star =  row.star.value;
     this.editParams.address = row.address;
     this.editList[0].url = row.hotel_img.value;
     this.editParams.hotel_img = row.hotel_img.value;
   
    },
    /*
     *编辑确定时间
     * @params object
     */
    editToList(editParams){
      this.$refs[editParams].validate(async (valid) => {
        if (valid) {
          this.addParams.create_time = this.$moment().format("YYYY-MM-DD HH:mm:ss");
            let {code,message} = await edit_hotel_info(this.editParams);
            if(code===200){
              this.editBoolean = false;
              this.$message({
              message: message,
              type: 'success',
              offset:100,
              duration:600,
            });
            this.onSubmit();
            }
        }
      })
    },
    /*
     *编辑弹窗关闭事件
     */
    editElDialog(){
      this.editList = [{url:null}];
      this.uploadRemove();
      this.$refs.upload.clearFiles();
    },
    /*
     *表格触发删除当前列事件
     */
    tableDel(row){
        this.$confirm(`您确认要删除用户${row.name}吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async (_) => {
          let {message,code} = await del_hotel_info({id:row.id})
          if(code === 200){
             this.$message({
              message: message,
              type: 'success',
              offset:100,
               duration:600,
            });
             this.onSubmit();
          }
        })
        .catch((_) => {});
    },
    async fnUploadRequest(option) {
      oss.ossUploadFile(option);
    },
    /*
     *上传成功的回调 
     *  @flie成功的数据
     */
    upload(file) {
      if(file){
        this.addParams.hotel_img = file.res.requestUrls[0];
        this.editParams.hotel_img = file.res.requestUrls[0];
      }
    },
    /*
     *点击图片的删除事件
     */
    uploadRemove(){
      this.addParams.hotel_img = null
      this.editParams.hotel_img = null
    },
    /*
     *限制上次的类型
     */
    limitUpload(file){
        const isIMG =
        file.type === "image/jpg" ||
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/gif";
      if (!isIMG) {
        this.$message.error("上传只支持图片格式!");
      }
      return isIMG;
    },
  },
};
</script>