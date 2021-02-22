import BaseEntity from './BaseEntity'
export default class scenic extends BaseEntity {
  // class类处理接口返回的数据    
  constructor(props) {
    //使用this，必须首先调用super。不然访问不了this
    super(props)
    this.id = props.id
    this.scenic_name = props.scenic_name
    this.scenic_img = {
      node: true,
      value: `${props.scenic_img}`,
      type: 'img',
      event: 'img',
      class: 'table-img'
    }
    this.title = {
      node: true,
      value: `${props.title}`,
      type: 'scenic_title',
      event: 'img',
      class: 'table-img'
    }
    this.price = props.price!=0?`${props.price}￥`:'免费'
    this.status =props.status?'开放':'关闭'
    this.address =props.address
    this.open_time = props.open_time
 
  }
}
