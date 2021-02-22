<template>
  <div>
    <el-table :data="tableList"   :height="autoHeight || '69vh'" style="width: 100%" stripe highlight-current-row border>
    <template v-for="(value, name, index) in tableHead">
    <el-table-column :key="index" align="center" :label="value.title" :width="value.width">
        <template slot-scope="scope">
          <template v-if="scope.row[name] && scope.row[name].node">
              <template v-if="scope.row[name].type === 'img'">
                  <el-image 
                    :class="scope.row[name].class" 
                    :src="scope.row[name].value"
                    :preview-src-list="[scope.row[name].value]">
                  </el-image>
              </template>
                <template v-if="scope.row[name].type === 'status'">
                  <span :class="scope.row[name].class">{{scope.row[name].title}}</span>
              </template>
                <template v-if="scope.row[name].type === 'scenic_title'">
                  <el-input type="textarea" disabled v-model="scope.row[name].value" />
              </template>
              <template v-if="scope.row[name].type === 'sex'">
                  <span :class="scope.row[name].class">{{scope.row[name].title}}</span>
              </template>
              <template v-if="scope.row[name].type === 'star'">
                    <el-rate v-model="scope.row[name].value" :colors="scope.row[name].colors"> </el-rate>
              </template>
              <template v-if="scope.row[name].type === 'lable'">
                <div :class="scope.row[name].class"> 
                  <div v-for="(e,i) in scope.row[name].value"  :key="i">
                      <el-tag  :type="tagObj[i]">{{e}}</el-tag>
                   </div>
                  </div>
              </template>
              <template v-if="scope.row[name].type === 'check'">
                  <el-progress :width="scope.row[name].width" type="dashboard" :percentage="scope.row[name].value" :color="scope.row[name].colors"></el-progress>
              </template>
                <template v-if="scope.row[name].type === 'switch'" >
                  <el-switch v-model="scope.row[name].value" @change="switchChange(scope.row)"  active-value="1"
                      inactive-value="0" active-color="#13ce66" inactive-color="#ff4949">
                  </el-switch>
              </template>
              <template  v-if="scope.row[name].type === 'span'">
                  <span :class="scope.row[name].class">{{scope.row[name].value}}</span>
              </template>
                 <template  v-if="scope.row[name].type === 'click'">
                  <div  :class="scope.row[name].class"  >
                    <div v-for="(item, i) in scope.row[name].value" :key="i">
                      <el-button :type="item.type" :icon="scope.row[name].icon[item.name]"  @click="clickBut(item.id,scope.row)" size="mini"  plain>{{item.name}}</el-button>
                    </div>
                   </div>
                </template>
          </template>
          <template v-else>
            {{scope.row[name]}}
          </template>
        </template>
      </el-table-column>
    </template>
  
  </el-table>
  
  </div>
</template>

<script>
export default {
  props: {
    tableList: {
      type: Array,//限制类型
      required: true,//必传
    },
    tableHead: {
      type: Object,//限制类型
      required: true,//必传
    },
    autoHeight: {
      type: String,
      defaultValue: '69vh'
    }
  },
  data() {
    return {
      tagObj:{0:'success',1:'info',2:'warning',3:'danger'},
    };
  },
  watch: {},
  // 监听
  computed: {},
  // 计算属性
  created() {},
  mounted() {
  },
  methods: {
     /*
      * 派发父组件分点击事件 根据id判断点击按钮的操作
      *   @id 按钮的id 
      *   @row 当前列的数据
      */
    clickBut(id,row){
      switch (id) {
        case 0:
          this.$emit('tableEdit',row);
          break;
        case 1:
         this.$emit('tableDel',row);
          break;
        default:
          break;
      }
    },
     /*
      * 派发父组件分点击事件 根据id判断点击按钮的操作
      *   @row 当前列的数据
      */
    switchChange(row){
       this.$emit('switchChange',row.id,row.status.value);
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
