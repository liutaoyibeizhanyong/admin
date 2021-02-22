<template>
  <div class="city">
    <div id="container"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      map: null, //定义地图
      infoWindow: null,
    };
  },
  watch: {},
  // 监听
  computed: {},
  // 计算属性
  created() {
    this.$nextTick(() => {
      let that = this;
      that.map = new AMap.Map("container", {
        zoom: 8, //初始化地图层级
        viewMode: "2D", //使用3D视图
        isHotspot: true, //开启地图热点功能
        pitch: 36, //仰角度，有效范围 0 度- 83 度
        resizeEnable: true, //是否监控地图容器尺寸变化
        mapStyle: "amap://styles/normal", //设置地图的显示样式
      });
      // 同时引入工具条插件，比例尺插件和鹰眼插件
      AMap.plugin(
        [
          "AMap.ToolBar",
          "AMap.Scale",
          "AMap.OverView",
          "AMap.MapType",
          "AMap.Geolocation",
        ],
        function () {
          // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
          that.map.addControl(new AMap.ToolBar());

          // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
          that.map.addControl(new AMap.Scale());

          // 在图面添加鹰眼控件，在地图右下角显示地图的缩略图
          that.map.addControl(new AMap.OverView({ isOpen: true }));

          // 在图面添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
          that.map.addControl(new AMap.MapType());

          // 在图面添加定位控件，用来获取和展示用户主机所在的经纬度位置
          that.map.addControl(new AMap.Geolocation());
        }
      );
      const placeSearch = new AMap.PlaceSearch(); //构造地点查询类
      that.infoWindow = new AMap.AdvancedInfoWindow({});
      that.map.on("hotspotclick", function (result) {
        placeSearch.getDetails(result.id, function (status, result) {
          if (status === "complete" && result.info === "OK") {
            that.placeSearch_CallBack(result);
          }
        });
      });
      //回调函数
    });
  },
  mounted() {},
  methods: {
    placeSearch_CallBack(data) {
      //infoWindow.open(map, result.lnglat);
      var poiArr = data.poiList.pois;
      var location = poiArr[0].location;
      this.infoWindow.setContent(this.createContent(poiArr[0]));
      this.infoWindow.open(this.map, location);
    },
    createContent(poi) {
      //信息窗体内容
      var s = [];
      s.push(
        '<div class="info-title">' +
          poi.name +
          '</div><div class="info-content">' +
          "地址：" +
          poi.address
      );
      s.push("电话：" + poi.tel);
      s.push("类型：" + poi.type);
      s.push("<div>");
      return s.join("<br>");
    },
  },
  destroyed() {
    this.map.destroy();
  },
};
</script>
