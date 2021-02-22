import BaseEntity from './BaseEntity'
export default class hotel_check_in extends BaseEntity {
  // class类处理接口返回的数据    
  constructor(props) {
    //使用this，必须首先调用super。不然访问不了this
    super(props)
    this.id = props.id
    this.name = props.name
    this.price = `￥${props.price}`,
      this.address = props.address
    this.create_time = props.create_time
    this.check = {
      width:60,
      node: true,
      value: props.check,
      type: 'check',
      event: 'check',
      class: 'table-check',
      colors: [{ color: '#f00', percentage: 20 },
      { color: 'pink', percentage: 40 },
      { color: '#e6a23c', percentage: 60 },
      { color: '#990afb', percentage: 80 },
      { color: '#67c23a', percentage: 100 }],
    }

    this.hotel_img = {
      node: true,
      value: `${props.hotel_img}`,
      type: 'img',
      event: 'img',
      class: 'table-img'
    }
    this.lable = {
      node: true,
      value: props.lable.split(","),
      type: 'lable',
      event: 'img',
      class: 'table-lable'
    }
    //删除不需要的数据
  }
}
