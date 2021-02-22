import BaseEntity from './BaseEntity'
export default class hotel extends BaseEntity {
  // class类处理接口返回的数据    
  constructor(props) {
    //使用this，必须首先调用super。不然访问不了this
    super(props)
    this.id = props.id
    this.name = props.name
    this.business_hours = props.business_hours
    this.star ={
      node: true,
      value: props.star,
      type: 'star',
      event: 'star',
      class: 'table-star',
      colors:['#99A9BF', '#f00', '#FF9900'],
    } 
    this.phone = props.phone
    this.address =props.address
    this.create_time = props.create_time
    this.hotel_img = {
      node: true,
      value: `${props.hotel_img}`,
      type: 'img',
      event: 'img',

      class: 'table-img'
    }
    this.hotel_click= {
      node: true,
      value: [{type:'info',name:'编辑',id:0},{type:'danger',name:'删除',id:1}],
      type: 'click',
      event: 'click',
      icon:{
        编辑: "el-icon-edit",
        删除: "el-icon-delete",
      },
      class: 'table-click'
    }
    
    //删除不需要的数据
  }
}
