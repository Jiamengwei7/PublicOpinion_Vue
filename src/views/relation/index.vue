<template xmlns="http://www.w3.org/1999/html">
    <div class="container">
        <div class="input-section">
            <div class="top-section">
                <el-card shadow="always">
                  <span> <i class="el-icon-edit"></i>  加载第一条事件文本:  </span><br/>
                    <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 5}" placeholder="输入文本"
                        v-model="inputText1" style="margin-top: 20px;"  >
                    </el-input>
                </el-card>
            </div>
            <div class="bottom-section" style="margin-top: 60px;">
                <el-card shadow="always">
                    <span><i class="el-icon-edit"></i>  加载第二条事件文本:</span>
                    <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 5}" placeholder="输入文本"
                        v-model="inputText2" style="margin-top: 20px;">
                    </el-input>
                </el-card>
            </div>
                  <div class="button-container" style="margin-top: 40px;">
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
        </div>
        <div class="Echarts" id="echarts" >
            <div id="result" style="width: 800px;height:420px;" ></div>
        </div>
    </div>
</template>

<script>
// import axios from 'axios'
// const Fpath = 'https://172.20.137.248:5081'
import { sendTextRelation } from '@/utils/interface'
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
      sendTextRelation({ text1: this.inputText1, text2: this.inputText2, result: this.result, radio: this.radio })
      // axios.post(Fpath + '/api/process', { text1: this.inputText1, text2: this.inputText2, result: this.result, radio: this.radio })
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
      console.log(this)
      console.log(this.$echarts)
      // console.log(this.prototype.$echarts)
      const myChart = this.$echarts.init(document.getElementById('result'))
      const option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          x: 'right' // 可设定图例在左、右、居中
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
    .container {
      display: flex;
    }
    .input-section {
       width: 50vw;
    }
    .Echarts {
      flex: 1;
      margin-left: 20px;
      display: flex;
      align-items: center;
    }

    .button-container {
        display: flex;
        justify-content: center;
    }

    .button-section {
        display: flex;
    }

    ::-webkit-scrollbar {
        width: 12px; /*滚动条宽度*/
        height: 12px; /*滚动条高度*/
    }
    .el-textarea__inner::-webkit-scrollbar-thumb {
        background-color: rgba(168, 168, 168,.4);/*滚动条默认显示的颜色*/
    }
    .el-textarea__inner::-webkit-scrollbar {
         width: 12px;
         height: 12px;
         background-color: white;/*滚动条背景色显示的颜色*/
    }
    .el-textarea__inner{
      background-color: #f2f2f2;
      border: 1px solid #1296db;
    }

</style>
