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
            <!-- <div class="button-section">
                <el-button type="primary" round @click="runMethod">运行<i class="el-icon-download el-icon--right"></i></el-button>
            </div> -->
        </div>
        </div>
        <div class="Echarts">
            <div id="result" style="width: 800px; height:420px;" ></div>
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
      inputText1: '中新网伦敦7月1日，英国安全官员称有证据显示格拉斯哥机场遭燃烧汽车<trigger>撞击事件</trigger>是一起自杀式恐怖袭击事件',
      inputText2: '警方称有五名旁观者在格拉斯哥机场袭击事件中<trigger>受伤</trigger>，但他们的伤势都不严重',
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
          console.log(this)
          console.log(this.$echarts)
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
          myChart.setOption(option)
            })
        .catch(error => {
          console.log('连接失败')
          console.error(error)
        })
    }
  }
}
</script>

<style scoped>
    .container {
      display: flex;
      flex-direction: row;
      /* width: 90vw; */
      width: 100%;
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
