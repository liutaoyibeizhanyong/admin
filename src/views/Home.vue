<template>
  <div class="home">
    <!-- 左边 -->
    <div class="column left">
      <dv-border-box-12>
        <div class="box">
          <h5>游客来源柱状图</h5>
          <div class="chart"
               ref="bar_chart"></div>
        </div>
      </dv-border-box-12>
      <dv-border-box-12>
        <div class="box">
          <h5>旅游月份折线图</h5>
          <div class="chart line_chart"
               ref="line_chart"></div>
        </div>
      </dv-border-box-12>
      <dv-border-box-12>
        <div class="box">
          <h5>游客性别饼状图</h5>
          <div class="chart"
               ref="pie_chart"
               style="height:185px"></div>

        </div>
      </dv-border-box-12>
    </div>
    <!-- 中间 -->
    <div class="column middle">
      <div class="top">
        <dv-border-box-11 title="图表">
          <div class="no">
          <div class="no-hd">
            <ul>
              <li>2394166</li>
              <li>25.42%</li>
            </ul>
          </div>
          <div class="no-bd">
            <ul>
              <li>郑州月吞吐量</li>
              <li>同比增长</li>
            </ul>
          </div>
        </div>
        </dv-border-box-11>
      </div>
      <div class="button">

        <dv-border-box-8>

          <div class="map">
            <div class="map1"></div>
            <div class="map2"></div>
            <div class="map3"></div>
            <div class="chart"
                 ref="china_chart"></div>
          </div>
        </dv-border-box-8>
      </div>
    </div>
    <!-- 右边 -->
    <div class="column right">
      <dv-border-box-12>
        <!-- <div class="box">
          <h5>游客入住方式柱状图</h5>
          <dv-capsule-chart v-if="configs"
                            :config="configs"
                            style="height:188px" />
        </div> -->
      </dv-border-box-12>
      <dv-border-box-12>
        <div class="box">
          <h5>游客月入住柱状图</h5>
          <div class="chart"
               ref="line_chart_right"></div>
        </div>
      </dv-border-box-12>
      <dv-border-box-12>
        <div class="box">
          <h5>游客年龄玫瑰图</h5>
          <div class="chart"
               ref="pie_chart_right"></div>
        </div>
      </dv-border-box-12>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import { getEcharts } from "@/assets/js/request/main";
export default {
  data() {
    return {
      Loading: false, //loding的加载层boolean
      sourceTourists: {
        _X: null,
        _Y: null,
      }, //游客来源柱状图数据
      tourismMonth: {
        _X: null,
        _Y: null,
      }, //游客月份折线图数据
      sexObject: null, //游客性别数据
      configs: {}, //右边柱状图数据
   
    };
  },
  watch: {
    sourceTourists() {
      this.getSourceTourists(); //一旦值有变化 调用方法渲染数据
    },
    tourismMonth() {
      this.getTourismMonth(); //一旦值有变化 调用方法渲染数据
    },
    sexObject() {
      this.getSex(); //一旦值有变化 调用方法渲染数据
    },
  },
  // 监听
  created() {

    this.$nextTick(() => {
      this.getAllEcharts();
      this.getlinePictureRight();
      this.piePictureRight();
      this.chinaPicture();
    });
  },
  methods: {
    /**
     * 获得全部图表数据
     */
    async getAllEcharts() {
      let { data, code } = await getEcharts();
      if (code === 200) {
        if (data[0]) {
          this.sourceTourists = {
            _X: data[0].form_origin,
            _Y: data[0].form_origin_num,
          };
        }
        if (data[1]) {
          this.tourismMonth = {
            _X: data[1].form_origin,
            _Y: data[1].form_origin_num,
          };
        }
        if (data[2]) {
          this.sexObject = data[2].form_origin;
        }
        if (data[3]) {
          this.configs = {
            data: data[3].form_origin,
            colors: ["#e062ae", "#fb7293", "#e690d1", "#32c5e9", "#96bfff"],
          };
        }
      }

    },
    /**
     * 游客来源柱状图创建方法
     */
    getSourceTourists() {
      const that = this;
      //实例化对象
      const myChart = echarts.init(that.$refs.bar_chart);
      //配置项
      const option = {
        color: ["#2f89cf"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "0%",
          right: "0%",
          top: "10px",
          bottom: "4%",
          containLabel: true,
        },
        xAxis: [
          {
            //x轴文字的颜色以及大小
            type: "category",
            data: that.sourceTourists._X,
            axisTick: {
              alignWithLabel: true,
              //证刻度线和标签对齐
            },
            //x轴文字的颜色以及大小
            axisLabel: {
              color: "rgba(255,255,255,.6)",
              fontSize: "12",
            },
            axisLine: {
              show: false,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            //y轴文字的颜色以及大小
            axisLabel: {
              color: "rgba(255,255,255,.6)",
              fontSize: "12",
            },
            //y轴线的颜色以及大小
            axisLine: {
              lineStyle: {
                color: "rgba(255,255,255,.1)",
                width: 2,
              },
            },
            //y轴分割线的颜色以及大小
            splitLine: {
              lineStyle: {
                color: "rgba(255,255,255,.1)",
              },
            },
          },
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            barWidth: "16%",
            data: that.sourceTourists._Y,
            // 修改柱子圆角
            itemStyle: {
              barBorderRadius: 5,
            },
          },
        ],
      };
      myChart.setOption(option);
      //跟随屏幕自适应  获得游览器的尺寸发生变化的事件 然后在调用myChart的尺寸事件
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
    /**
     * 游客月份数据统计图
     */
    getTourismMonth() {
      //折线图
      const that = this;
      // (1)准备数据

      const myChart = echarts.init(that.$refs.line_chart);
      const option = {
        color: ["#00f2f1", "#ed3f35"],
        tooltip: {
          trigger: "axis",
        },
        // legend: {
        //   //修改图例上部文字颜色
        //   textStyle: {
        //     color: "#4c9bfd",
        //   },
        //   //修改图例上部文字位置
        //   right: "0%",
        // },
        grid: {
          top: "2%",
          left: "0%",
          right: "0%",
          bottom: "4%",
          show: true, //显示边框

          borderColor: "#012f4a", //边框颜色
          containLabel: true, //包涵刻度文字在内
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false, //去除轴内间距 从0刻度开始
            data: that.tourismMonth._X,
            axisLabel: {
              color: "#4c9bfd",
            },
            //不显示x轴线
            axisLine: {
              show: true,
            },
            // 不显示刻度线
            axisTick: {
              show: false,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              color: "rgba(255,255,255,.6)",
            },

            // 不显示刻度线
            axisTick: {
              show: false,
            },
            //y轴分割线的颜色
            splitLine: {
              lineStyle: {
                color: "#012f4a",
              },
            },
          },
        ],
        series: [
          {
            type: "line",
            smooth: true,
            // areaStyle: {}, //线条下面渐变色
            data: that.tourismMonth._Y,
          },
        ],
      };
      myChart.setOption(option);
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
    /**
     * 游客性别饼状图
     */
    getSex() {
      const that = this;
      const myChart = echarts.init(that.$refs.pie_chart);
      const option = {
        tooltip: {
          trigger: "item", //触发方式  鼠标放在上面  axis坐标轴上触发
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          bottom: "5%",
          //orient: "vertical",竖着显示
          itemWidth: 10, //小方块的宽度
          itemHeight: 10, //小方块的高度
          textStyle: {
            //文字颜色
            color: "rgba(255,255,255,.6)",
            fontSize: "12",
          },
          //series data数据里面的如果有name  这legend的data可以省略
        },
        series: [
          {
            name: "年龄分布",
            type: "pie",
            center: ["50%", "42%"], //修改饼状图的位置
            radius: ["40%", "60%"], //修改饼状图的大小  第一个是内圆的半径  第二个是外圆的半径
            avoidLabelOverlap: false, //是否启用防止标签重叠策略
            color: [
              //饼状图的颜色
              "#f00",
              "#0f0",
            ],
            label: {
              show: false, // 图形上的文字  触发方式  false鼠标经过显示
              position: "center", //显示位置center 中间
            },

            labelLine: {
              show: false, //标签线
            },
            data: that.sexObject,
          },
        ],
      };
      myChart.setOption(option);
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
    /**
     * 游客入住柱状图
     */

    getlinePictureRight() {
      const that = this;
      const myChart = echarts.init(that.$refs.line_chart_right);
      const option = {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          //上部标签样式
          textStyle: {
            shadowColor: "rgba(0, 0, 0, 0.1)",
            fontSize: "12",
          },
        },

        grid: {
          left: "10",
          top: "30",
          right: "10",
          bottom: "10",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false, //去除轴内间距 从0刻度开始
            data: [
              "01",
              "02",
              "03",
              "04",
              "05",
              "06",
              "07",
              "08",
              "09",
              "11",
              "12",
              "13",
              "14",
              "15",
              "16",
              "17",
              "18",
              "19",
              "20",
              "21",
              "22",
              "23",
              "24",
              "25",
              "26",
              "27",
              "28",
              "29",
              "30",
            ],
            //x轴文字颜色以及大小
            axisLabel: {
              textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: 12,
              },
            },
            //x轴颜色
            axisLine: {
              lineStyle: {
                color: "rgba(255,255,255,.6)",
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisTick: { show: false }, //不显示刻度线
            axisLine: {
              lineStyle: {
                color: "rgba(255,255,255,.6)",
              },
            },
            axisLabel: {
              textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: 12,
              },
            },
            //分割线样式
            splitLine: {
              lineStyle: {
                color: "rgba(255,255,255,.1)",
              },
            },
          },
        ],
        series: [
          {
            name: "网络预定",
            type: "line",
            symbol: "circle", //线条拐点的小圆点  默认圆
            symbolSize: 5, //线条拐点的小圆点 大小
            showSymbol: false, //true默认显示  false鼠标经过显示
            smooth: true,
            areaStyle: {
              //线条下面区域填充颜色
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(1, 132, 213, 0.4)",
                    },
                    {
                      offset: 0.8,
                      color: "rgba(1, 132, 213, 0.1)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(0, 0, 0, 0.1)",
              },
            },
            data: [
              369,
              442,
              301,
              402,
              333,
              484,
              313,
              638,
              207,
              406,
              245,
              404,
              353,
              401,
              381,
              433,
              362,
              400,
              338,
              647,
              221,
              442,
              205,
              403,
              303,
              684,
              201,
              405,
              252,
              404,
            ],
            itemStyle: {
              //设置拐点颜色以及边框
              normal: {
                color: "#0184d5",
                borderColor: "rgba(221, 220, 107, .1)",
                borderWidth: 12,
              },
            },
            //单独修改当前线条的颜色
            lineStyle: {
              normal: {
                color: "#0184d5",
                width: 2,
              },
            },
          },
          {
            name: "线下入住",
            type: "line",
            symbol: "circle", //线条拐点的小圆点 默认圆
            symbolSize: 5, //线条拐点的小圆点 大小
            showSymbol: false, //true默认显示  false鼠标经过显示
            smooth: true,
            areaStyle: {
              //线条下面区域填充颜色
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(0, 216, 135, 0.4)",
                    },
                    {
                      offset: 0.8,
                      color: "rgba(0, 216, 135, 0.1)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(0, 0, 0, 0.1)",
              },
            },
            data: [
              479,
              232,
              521,
              212,
              643,
              364,
              623,
              228,
              517,
              226,
              215,
              524,
              223,
              651,
              231,
              513,
              322,
              210,
              438,
              227,
              211,
              302,
              215,
              263,
              423,
              234,
              501,
              205,
              622,
              244,
            ],
            //单独修改当前线条的颜色

            lineStyle: {
              normal: {
                color: "#00d887",
                width: 2,
              },
            },
            //设置拐点颜色以及边框
            itemStyle: {
              normal: {
                color: "#00d887",
                borderColor: "rgba(221, 220, 107, .1)",
                borderWidth: 12,
              },
            },
          },
        ],
      };
      myChart.setOption(option);
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
    /**
     * 玫瑰图
     */
    piePictureRight() {
      const that = this;
      const myChart = echarts.init(that.$refs.pie_chart_right);

      const option = {
        tooltip: {
          trigger: "item",
          formatter: "{a}<br/>{b}(岁) : {c} ({d}%)",
        },
        color: ["#BB82ED", "#EA1FA3", "#09E66C", "#ff9f7f", "#ED4512"],
        legend: {
          bottom: "2%",
          itemWidth: 8, //小方块的宽度
          itemHeight: 8, //小方块的高度
          textStyle: {
            //文字颜色
            color: "rgba(255,255,255,.6)",
            shadowColor: "rgba(250,0,0,.6)",
            fontSize: "12",
          },
        },

        series: [
          {
            name: "位置分布",
            type: "pie",
            radius: ["10%", "70%"], //玫瑰图的大小
            center: ["50%", "42%"],
            //roseType: "area",//面积模式
            roseType: "radius", //半径模式
            // 修饰饼形图文字相关的样式 label对象
            label: {
              fontSize: 10,
            },
            // 修饰引导线样式
            labelLine: {
              // 连接到图形的第一条线长度
              length: 10,
              // 连接到文字的第二条线长度
              length2: 10,
            },
            data: [
              {
                value: 600,
                name: "0-20",
              },
              {
                value: 500,
                name: "21-40",
              },
              {
                value: 400,
                name: "41-60",
              },
              {
                value: 323,
                name: "61-80",
              },
              {
                value: 200,
                name: "81-100",
              },
            ],
          },
        ],
      };
      myChart.setOption(option);
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
    /**
     * 地理图
     */
    chinaPicture() {
      const that = this;
      const myChart = echarts.init(that.$refs.china_chart);

      var geoCoordMap = {
        上海: [121.4648, 31.2891],
        东莞: [113.8953, 22.901],
        东营: [118.7073, 37.5513],
        中山: [113.4229, 22.478],
        临汾: [111.4783, 36.1615],
        临沂: [118.3118, 35.2936],
        丹东: [124.541, 40.4242],
        丽水: [119.5642, 28.1854],
        乌鲁木齐: [87.9236, 43.5883],
        佛山: [112.8955, 23.1097],
        保定: [115.0488, 39.0948],
        兰州: [103.5901, 36.3043],
        包头: [110.3467, 41.4899],
        北京: [116.4551, 40.2539],
        北海: [109.314, 21.6211],
        南京: [118.8062, 31.9208],
        南宁: [108.479, 23.1152],
        南昌: [116.0046, 28.6633],
        南通: [121.1023, 32.1625],
        厦门: [118.1689, 24.6478],
        台州: [121.1353, 28.6688],
        合肥: [117.29, 32.0581],
        呼和浩特: [111.4124, 40.4901],
        咸阳: [108.4131, 34.8706],
        哈尔滨: [127.9688, 45.368],
        唐山: [118.4766, 39.6826],
        嘉兴: [120.9155, 30.6354],
        大同: [113.7854, 39.8035],
        大连: [122.2229, 39.4409],
        天津: [117.4219, 39.4189],
        太原: [112.3352, 37.9413],
        威海: [121.9482, 37.1393],
        宁波: [121.5967, 29.6466],
        宝鸡: [107.1826, 34.3433],
        宿迁: [118.5535, 33.7775],
        常州: [119.4543, 31.5582],
        广州: [113.5107, 23.2196],
        廊坊: [116.521, 39.0509],
        延安: [109.1052, 36.4252],
        张家口: [115.1477, 40.8527],
        徐州: [117.5208, 34.3268],
        德州: [116.6858, 37.2107],
        惠州: [114.6204, 23.1647],
        成都: [103.9526, 30.7617],
        扬州: [119.4653, 32.8162],
        承德: [117.5757, 41.4075],
        拉萨: [91.1865, 30.1465],
        无锡: [120.3442, 31.5527],
        日照: [119.2786, 35.5023],
        昆明: [102.9199, 25.4663],
        杭州: [119.5313, 29.8773],
        枣庄: [117.323, 34.8926],
        柳州: [109.3799, 24.9774],
        株洲: [113.5327, 27.0319],
        武汉: [114.3896, 30.6628],
        汕头: [117.1692, 23.3405],
        江门: [112.6318, 22.1484],
        沈阳: [123.1238, 42.1216],
        沧州: [116.8286, 38.2104],
        河源: [114.917, 23.9722],
        泉州: [118.3228, 25.1147],
        泰安: [117.0264, 36.0516],
        泰州: [120.0586, 32.5525],
        济南: [117.1582, 36.8701],
        济宁: [116.8286, 35.3375],
        海口: [110.3893, 19.8516],
        淄博: [118.0371, 36.6064],
        淮安: [118.927, 33.4039],
        深圳: [114.5435, 22.5439],
        清远: [112.9175, 24.3292],
        温州: [120.498, 27.8119],
        渭南: [109.7864, 35.0299],
        湖州: [119.8608, 30.7782],
        湘潭: [112.5439, 27.7075],
        滨州: [117.8174, 37.4963],
        潍坊: [119.0918, 36.524],
        烟台: [120.7397, 37.5128],
        玉溪: [101.9312, 23.8898],
        珠海: [113.7305, 22.1155],
        盐城: [120.2234, 33.5577],
        盘锦: [121.9482, 41.0449],
        石家庄: [114.4995, 38.1006],
        福州: [119.4543, 25.9222],
        秦皇岛: [119.2126, 40.0232],
        绍兴: [120.564, 29.7565],
        聊城: [115.9167, 36.4032],
        肇庆: [112.1265, 23.5822],
        舟山: [122.2559, 30.2234],
        苏州: [120.6519, 31.3989],
        莱芜: [117.6526, 36.2714],
        菏泽: [115.6201, 35.2057],
        营口: [122.4316, 40.4297],
        葫芦岛: [120.1575, 40.578],
        衡水: [115.8838, 37.7161],
        衢州: [118.6853, 28.8666],
        西宁: [101.4038, 36.8207],
        西安: [109.1162, 34.2004],
        贵阳: [106.6992, 26.7682],
        连云港: [119.1248, 34.552],
        邢台: [114.8071, 37.2821],
        邯郸: [114.4775, 36.535],
        郑州: [113.4668, 34.6234],
        鄂尔多斯: [108.9734, 39.2487],
        重庆: [107.7539, 30.1904],
        金华: [120.0037, 29.1028],
        铜川: [109.0393, 35.1947],
        银川: [106.3586, 38.1775],
        镇江: [119.4763, 31.9702],
        长春: [125.8154, 44.2584],
        长沙: [113.0823, 28.2568],
        长治: [112.8625, 36.4746],
        阳泉: [113.4778, 38.0951],
        青岛: [120.4651, 36.3373],
        韶关: [113.7964, 24.7028],
      };
      //地图数据
      var XAData = [
        [{ name: "西安" }, { name: "青岛", value: 100 }],
        [{ name: "西安" }, { name: "拉萨", value: 100 }],
        [{ name: "西安" }, { name: "郑州", value: 100 }],
        [{ name: "西安" }, { name: "上海", value: 100 }],
        [{ name: "西安" }, { name: "北京", value: 100 }],
      ];

      var XNData = [
        [{ name: "郑州" }, { name: "西安", value: 100 }],
        [{ name: "郑州" }, { name: "青岛", value: 100 }],
        [{ name: "郑州" }, { name: "银川", value: 100 }],
        [{ name: "郑州" }, { name: "西宁", value: 100 }],
        [{ name: "郑州" }, { name: "乌鲁木齐", value: 100 }],
        [{ name: "郑州" }, { name: "舟山", value: 100 }],
        [{ name: "郑州" }, { name: "丽水", value: 100 }],
        [{ name: "郑州" }, { name: "呼和浩特", value: 100 }],
        [{ name: "郑州" }, { name: "秦皇岛", value: 100 }],
        [{ name: "郑州" }, { name: "上海", value: 100 }],
        [{ name: "郑州" }, { name: "拉萨", value: 100 }],
        [{ name: "郑州" }, { name: "沈阳", value: 100 }],
        [{ name: "郑州" }, { name: "北京", value: 100 }],
      ];

      var YCData = [
        [{ name: "沈阳" }, { name: "秦皇岛", value: 100 }],
        [{ name: "沈阳" }, { name: "乌鲁木齐", value: 100 }],
        [{ name: "银川" }, { name: "秦皇岛", value: 100 }],
        [{ name: "银川" }, { name: "乌鲁木齐", value: 100 }],
        [{ name: "西宁" }, { name: "郑州", value: 100 }],
        [{ name: "乌鲁木齐" }, { name: "北京", value: 100 }],
        [{ name: "秦皇岛" }, { name: "北京", value: 100 }],
        [{ name: "拉萨" }, { name: "北京", value: 100 }],
        [{ name: "西安" }, { name: "郑州", value: 100 }],
        [{ name: "西安" }, { name: "北京", value: 100 }],
        [{ name: "拉萨" }, { name: "丽水", value: 100 }],
        [{ name: "拉萨" }, { name: "上海", value: 100 }],
      ];

      var planePath =
        "path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z";
      //var planePath = 'arrow';
      var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var dataItem = data[i];

          var fromCoord = geoCoordMap[dataItem[0].name];
          var toCoord = geoCoordMap[dataItem[1].name];
          if (fromCoord && toCoord) {
            res.push({
              fromName: dataItem[0].name,
              toName: dataItem[1].name,
              coords: [fromCoord, toCoord],
              value: dataItem[1].value,
            });
          }
        }
        return res;
      };
      var color = ["#fff", "#fff", "#fff"]; //航线的颜色
      var series = [];
      [
        ["西安", XAData],
        ["西宁", XNData],
        ["银川", YCData],
      ].forEach(function (item, i) {
        series.push(
          {
            name: item[0] + " Top3",
            type: "lines",
            zlevel: 1,
            effect: {
              show: true,
              period: 6,
              trailLength: 0.7,
              color: "red", //arrow箭头的颜色
              symbolSize: 3,
            },
            lineStyle: {
              normal: {
                color: color[i],
                width: 0,
                curveness: 0.2,
              },
            },
            data: convertData(item[1]),
          },
          {
            name: item[0] + " Top3",
            type: "lines",
            zlevel: 2,
            symbol: ["none", "arrow"],
            symbolSize: 10,
            effect: {
              show: true,
              period: 6,
              trailLength: 0,
              symbol: planePath,
              symbolSize: 15,
            },
            lineStyle: {
              normal: {
                color: color[i],
                width: 1,
                opacity: 0.6,
                curveness: 0.2,
              },
            },
            data: convertData(item[1]),
          },
          {
            name: item[0] + " Top3",
            type: "effectScatter",
            coordinateSystem: "geo",
            zlevel: 2,
            rippleEffect: {
              brushType: "stroke",
            },
            label: {
              normal: {
                show: true,
                position: "right",
                formatter: "{b}",
              },
            },
            symbolSize: function (val) {
              return val[2] / 8;
            },
            itemStyle: {
              normal: {
                color: color[i],
              },
              emphasis: {
                areaColor: "#2B91B7",
              },
            },
            data: item[1].map(function (dataItem) {
              return {
                name: dataItem[1].name,
                value: geoCoordMap[dataItem[1].name].concat([
                  dataItem[1].value,
                ]),
              };
            }),
          }
        );
      });
      var option = {
        tooltip: {
          trigger: "item",
          formatter: function (params, ticket, callback) {
            if (params.seriesType == "effectScatter") {
              return "线路：" + params.data.name + "" + params.data.value[2];
            } else if (params.seriesType == "lines") {
              return (
                params.data.fromName +
                ">" +
                params.data.toName +
                "<br />" +
                params.data.value
              );
            } else {
              return params.name;
            }
          },
        },

        geo: {
          map: "china",
          label: {
            // 修改地图颜色
            emphasis: {
              show: true,
              color: "#fff",
            },
          },
          roam: false,
          //   放大或移动我们的地图
          zoom: 1.2, //倍数
          itemStyle: {
            normal: {
              areaColor: "rgba(43, 196, 243, 0.42)",
              borderColor: "rgba(43, 196, 243, 1)",
              borderWidth: 1,
            },
            emphasis: {
              areaColor: "#2B91B7",
            },
          },
        },
        series: series,
      };
      myChart.setOption(option);
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/home.scss";
</style>
