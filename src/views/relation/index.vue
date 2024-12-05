<template xmlns="http://www.w3.org/1999/html">
    <div class="container">
        <div class="input-section">
            <div class="left-section" style="margin-right: 10px;">
                <el-card>
                  <span> <i class="el-icon-edit"></i>  加载第一条事件文本:  </span><br/>
                    <!-- <textarea v-model="inputText1" placeholder="输入文本" style="width: 400px; height: 200px;" rows="100%"></textarea> -->
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 2}" placeholder="输入文本"
                        v-model="inputText1" style="margin-top: 20px;"  >
                    </el-input>
                </el-card>
            </div>
            <div class="right-section">
                <el-card>
                    <span><i class="el-icon-edit"></i>  加载第二条事件文本:</span>
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 2}" placeholder="输入文本"
                        v-model="inputText2" style="margin-top: 20px;">
                    </el-input>
                </el-card>
            </div>
        </div>
        <div class="button-container" style="margin-top: 20px;">
            <div class="button-section" style="margin-right: 20px;">
                <el-button type="primary" round @click="sendText" v-loading="loading"
    element-loading-text="后台加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">发送<i class="el-icon-upload2 el-icon--right"></i></el-button>
            </div>
            <div class="button-section">
                <el-button type="primary" round @click="runMethod">运行<i class="el-icon-download el-icon--right"></i></el-button>
            </div>
        </div>
<!--        <div class="result-section" style="margin-top: 20px; height: 200px;">-->
<!--            <el-card style="height: 100%;">-->
<!--                <span>两个事件之间的关系为:</span> <br/> <br/>-->
<!--                <el-radio-group v-model="radio">-->
<!--                  <el-radio :label="0"><b><el-tag>因果关系 CAUSAL</el-tag></b></el-radio>-->
<!--                  <el-radio :label="1"><b><el-tag type="success">时序/父子关系 FOLLOW</el-tag></b></el-radio>-->
<!--                  <el-radio :label="2"><b><el-tag type="info">无关关系 NORELATION</el-tag></b></el-radio>-->
<!--                </el-radio-group>-->
<!--&lt;!&ndash;                <p>{{ result }}</p>&ndash;&gt;-->
<!--            </el-card>-->
<!--        </div>-->
        <div class="Echarts" >
          <div class="result-left" style="margin-left: 20px;margin-top: 30px" align="center" >
            <div id="result" style="width: 700px;height:400px;"></div>
          </div>
<!--          <div class="result-right">-->
<!--            <div id="result-text" style="width: 600px;height:400px;"></div>-->
<!--          </div>-->
        </div>
    </div>
</template>

<script>
import axios from 'axios'
const Fpath = 'http://localhost:5000'
export default {
  name: 'my-relation',
  data () {
    return {
      inputText1: '据联合国统计，今年有43000多名移民从利比亚<trigger>抵达</trigger>欧洲海岸，其中大多数来自撒哈拉以南非洲地区，预计今年春季和夏季移民过境人数将激增。',
      inputText2: '国际移民组织估计，去年有超过25万移民<trigger>越过</trigger>利比亚-尼日尔边境。',
      result: [],
      radio: '3',
      loading: false
    }
  },
  methods: {
    sendText () {
      // console.log(this.inputText1, this.inputText2)
      if (!this.inputText1 || !this.inputText2) {
        alert('请输入完整的文本内容')
        return // 阻止继续执行后续逻辑
      }
      this.loading = true
      axios.post(Fpath + '/process', { text1: this.inputText1, text2: this.inputText2, result: this.result, radio: this.radio })
        .then(response => {
          console.log(response.data)
          this.result = response.data.relation
          console.log(this.result)
          this.loading = false
          this.radio = parseInt(response.data.radio)
        })
        .catch(error => {
          console.log('连接失败')
          console.error(error)
        })
    },
    runMethod () {
      // axios.get(Fpath + '/result').then(response => {
      //   this.result = response.data.relation
      //   this.radio = parseInt(response.data.radio)
      //   console.log(typeof this.result)
      // })
      //   .catch(error => {
      //     console.error(error)
      //   })
      const myChart = this.$echarts.init(document.getElementById('result'))
      const option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          x: 'left', // 可设定图例在左、右、居中
          y: 'center' // 可设定图例在上、下、居中
        },
        series: [
          {
            name: '事件关系概率分布',
            type: 'pie',
            label: {
              show: true,
              // position: "putside",
              formatter: '{b} {d}%',
              fontSize: 16
            },
            emphasis: null,
            labelLine: {
              show: true,
              length: 40
            },
            data: this.result
          },
          {
            name: '事件关系概率分布',
            type: 'pie',
            label: {
              show: true,
              // position: 'inside',
              formatter: '{d}%'
            },
            labelLine: {
              show: false
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 16,
                fontWeight: 'bold'
              }
            },
            data: this.result
          }
        ]
      }
      // const resultGraph = this.$echarts.init(document.getElementById('result-text'))
      // const graphOption = {
      //   series: [{
      //     type: 'graph', // 类型:关系图
      //     layout: 'force', // 图的布局，类型为力导图
      //     symbolSize: 40, // 调整节点的大小
      //     roam: true, // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移,可以设置成 'scale' 或者 'move'。设置成 true 为都开启
      //     edgeSymbol: ['circle', 'arrow'],
      //     edgeSymbolSize: [2, 10],
      //     // edgeLabel: {
      //     //   normal: {
      //     //     textStyle: {
      //     //       fontSize: 20
      //     //     }
      //     //   }
      //     // },
      //     force: {
      //       repulsion: 2500,
      //       edgeLength: [10, 50]
      //     },
      //     draggable: true,
      //     lineStyle: {
      //       normal: {
      //         width: 2,
      //         color: '#4b565b'
      //       }
      //     },
      //     edgeLabel: {
      //       normal: {
      //         show: true,
      //         formatter: function (x) {
      //           return x.data.name
      //         }
      //       }
      //     },
      //     label: {
      //       normal: {
      //         show: true,
      //         textStyle: {}
      //       }
      //     },
      //
      //     // 数据
      //     data: [{
      //       name: 'node01',
      //       des: 'nodedes01',
      //       symbolSize: 50
      //     }, {
      //       name: 'node02',
      //       des: 'nodedes02',
      //       symbolSize: 50
      //     }],
      //     links: [{
      //       source: 'node01',
      //       target: 'node02',
      //       name: '因果',
      //       des: 'link01des'
      //     }]
      //   }]
      // }
      //
      // resultGraph.setOption(graphOption)
      myChart.setOption(option)
    }
  }
}
</script>

<style>
    .input-section {
       display: flex;
    }

    .left-section {
        flex: 1;
    }

    .right-section {
        flex: 1;
    }

    .result-left{
      flex: 1;
    }

    /*.result-right{*/
    /*  flex: 1;*/
    /*}*/

    .button-container {
        display: flex;
        justify-content: center;
    }

    .button-section {
        display: flex;
    }
    /*.Echarts{*/
    /*    display: flex;*/
    /*}*/

      .el-radio__input.is-checked .el-radio__inner {
        border-color: #424346;
        background-color: #424346;
      }
      .el-radio__input.is-checked + .el-radio__label {
        color: #424346;
      }
      .el-radio__input.is-checked .el-radio__inner:after {
        transform: rotate(45deg) scaleY(1);
      }
      .el-radio__label {
        color: #80838a;
      }
      .el-radio__inner::after {
        box-sizing: content-box;
        content: "";
        border: 1px solid #fff;
        border-left: 0;
        border-top: 0;
        height: 7px;
        left: 4px;
        position: absolute;
        top: 1px;
        transform: rotate(45deg) scaleY(0);
        width: 3px;
        transition: transform 0.15s ease-in 0.05s;
        transform-origin: center;
        border-radius: unset;
        background-color: transparent;
      }

</style>
