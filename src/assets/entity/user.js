import BaseEntity from './BaseEntity'
export default class user extends BaseEntity {
  // class类处理接口返回的数据    
  constructor(props) {
    //使用this，必须首先调用super。不然访问不了this
    super(props)
    this.id = props.id
    this.name = props.name
    this.sex = {
      node: true,
      className: 'table-status',
      title: props.sex?'女':'男',
      value:props.sex,
      type: 'sex'
    }
    this.phone = props.phone
    this.title =props.title
    this.create_time = props.create_time
    //添加type 判断类型
    this.status = {
      node: true,
      className: 'table-status',
      title: props.status?'抵达':'预约',
      value: props.status,
      type: 'status'
    }
    this.user_img = {
      node: true,
      value: `${props.user_img}`,
      type: 'img',
      event: 'img',
      class: 'table-img'
    }
    this.user_click= {
      node: true,
      value: [{type:'info',name:'编辑',id:0},{type:'danger',name:'删除',id:1}],
      type: 'click',
      event: 'click',
      icon:{
        '编辑': "el-icon-edit",
        '删除': "el-icon-delete",
      },
      class: 'table-click'
    }
    
    //删除不需要的数据
  }
}
