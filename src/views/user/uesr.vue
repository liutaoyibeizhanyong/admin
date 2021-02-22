<template>
  <div class="user">111
    <el-card class="box-card">
      <el-form :inline="true" size="mini"  class="demo-form-inline">
        <el-form-item>
          <el-input v-model="params.phone" @keyup.enter.native="onSubmit()" clearable show-word-limit maxlength="11" placeholder="请搜索用户手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain  @click="onSubmit">查询</el-button>
        </el-form-item>
         <el-button style="float:right" @click="addBoolean=true" type="info" size="mini" plain>添加</el-button>
      </el-form>
      <table-data :tableList = "tableList" :tableHead = "$tableHead.user.tableHead" @tableDel="tableDel" @tableEdit="tableEdit"></table-data>
      <pageination ref="pageination" @handleSizeChange="sizeChange" @handleCurrentChange ="currentChange" :count = "count" ></pageination>
     <!-- 添加的弹窗 -->
      <el-dialog width="40%" title="添加" :visible.sync="addBoolean" append-to-body>
        <el-form :model="addParams" :rules="addRules" ref="addForm">
            <el-form-item prop="name" size="mini" label="姓名：" :label-width="formLabelWidth">
              <el-input v-model="addParams.name" placeholder="请输入姓名" autocomplete="off"></el-input>
            </el-form-item>
             <el-form-item prop="sex" size="mini" label="性别：" :label-width="formLabelWidth">
              <el-radio v-model="addParams.sex" label="0">男</el-radio>
              <el-radio v-model="addParams.sex" label="1">女</el-radio>
            </el-form-item>
            <el-form-item prop="status" size="mini" label="状态：" :label-width="formLabelWidth">
                 <el-switch
                  v-model="addParams.status"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-value=1
                  inactive-value=0
                  active-text="抵达"
                  inactive-text="预约">
                </el-switch>
            </el-form-item>
            <el-form-item prop="user_img" size="mini" label="图片：" :label-width="formLabelWidth">
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
             <el-form-item prop="phone" size="mini" label="手机号：" :label-width="formLabelWidth">
              <el-input v-model="addParams.phone" placeholder="请输入手机号" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="title" size="mini" label="个人说明：" :label-width="formLabelWidth">
              <el-input   type="textarea" :rows="2" v-model="addParams.title" placeholder="请输入个人说明" autocomplete="off"></el-input>
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
            <el-form-item prop="name" size="mini" label="姓名：" :label-width="formLabelWidth">
              <el-input v-model="editParams.name" placeholder="请输入姓名" autocomplete="off"></el-input>
            </el-form-item>
             <el-form-item prop="sex" size="mini" label="性别：" :label-width="formLabelWidth">
              <el-radio v-model="editParams.sex" label="0">男</el-radio>
              <el-radio v-model="editParams.sex" label="1">女</el-radio>
            </el-form-item>
              <el-form-item prop="status" size="mini" label="状态：" :label-width="formLabelWidth">
                 <el-switch
                  v-model="editParams.status"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-value=1
                  inactive-value=0
                  active-text="抵达"
                  inactive-text="预约">
                </el-switch>
            </el-form-item>
            <el-form-item prop="user_img" size="mini" label="图片：" :label-width="formLabelWidth">
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
             <el-form-item prop="phone" size="mini" label="手机号：" :label-width="formLabelWidth">
              <el-input v-model="editParams.phone" placeholder="请输入手机号" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="title" size="mini" label="个人说明：" :label-width="formLabelWidth">
              <el-input   type="textarea" :rows="2" v-model="editParams.title" placeholder="请输入个人说明" autocomplete="off"></el-input>
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
import { getUesr,delUser,add_user_list,edit_user_list } from "@/assets/js/request/main";
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
      addBoolean:false,//添加表格的Boolean值
      addParams:{
        sex:'0',
        name:null,
        phone:null,
        title:null,
        status:'0',
        user_img:null,
        create_time:null,
      },//添加的参数
      addRules:{
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        phone: [{ required: true,pattern: /^1[3456789]\d{9}$/, message: "请输入正确手机号", trigger: "blur" }],
        title: [{ required: true, message: "请输入个人说明", trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
        user_img: [{ required: true, message: "请上传用户图片", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
      },//添加的正则
      formLabelWidth:'100px',//lable的宽度
      editBoolean:false,//编辑表格的Boolean值
      editParams:{
        id:null,
        sex:null,
        name:null,
        phone:null,
        title:null,
        status:null,
        user_img:null,
        create_time:null,
      },//添加的参数
      editRules:{
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        phone: [{ required: true,pattern: /^1[3456789]\d{9}$/, message: "请输入正确手机号", trigger: "blur" }],
        title: [{ required: true, message: "请输入个人说明", trigger: "blur" }],
        user_img: [{ required: true, message: "请上传用户图片", trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
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
      this.getUser();
    });
  },
  mounted() {},
  methods: {
    /*
     *获取用户数据
     * @params 参数 type:Object
     */
    async getUser() {
      let that = this;
      //{ list, code ,count} 取出接口里面的 list, code ,count
      let { list, code ,count} = await getUesr(that.params);
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
      this.getUser();
    },
    /*
     *分页显示改变事件
     * @val 分液器显示的值
     */
    currentChange(val) {
      this.$store.commit("setCurrentPage", val);
      this.$set(this.params,'page',val);
      this.getUser();
    },
    /*
     *搜索事件搜索number 
     * @this.$store.commit("setCurrentPage", 1); 修改vuex的值
     */
    onSubmit(){
      this.$store.commit("setCurrentPage", 1);
      this.$set(this.params,'page',1);
      this.getUser();
    },
    /*
     * 添加事件
     */
    addToList(addForm){
      this.$refs[addForm].validate(async (valid) => {
        if (valid) {
            this.addParams.create_time = this.$moment().format("YYYY-MM-DD HH:mm:ss");
            let {code,message} = await add_user_list(this.addParams);
            if(code===200){
              this.addBoolean=false;
              this.$message({
              message: message,
              type: 'success',
              offset:100,
              duration:600,
            });
              this.addParams={
                  sex:'0',
                  name:null,
                  phone:null,
                  title:null,
                  status:'0',
                  user_img:null,
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
     this.editParams.title = row.title;
     this.editList[0].url = row.user_img.value;
     this.editParams.user_img = row.user_img.value;
     this.editParams.sex =  row.sex.value.toString();
     this.editParams.status = row.status.value.toString();
    },
    /*
     *编辑确定时间
     * @params object
     */
    editToList(editParams){
      this.$refs[editParams].validate(async (valid) => {
        if (valid) {
           this.editParams.create_time = this.$moment().format("YYYY-MM-DD HH:mm:ss");
            let {code,message} = await edit_user_list(this.editParams);
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
          let {message,code} = await delUser({id:row.id})
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
        this.addParams.user_img = file.res.requestUrls[0];
        this.editParams.user_img = file.res.requestUrls[0];
      }
    },
    /*
     *点击图片的删除事件
     */
    uploadRemove(){
      this.addParams.user_img = null
      this.editParams.user_img = null
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