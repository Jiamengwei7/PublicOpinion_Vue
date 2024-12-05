<template>
  <div>
    <el-container>
      <div class="t2i-container">
        <div class="search-container">
          <div class="search">
            <el-input v-model="input" @input="resetSearch" placeholder="请输入搜索内容" maxlength="20"
              style="width:350px;margin-right:10px;"></el-input>
            <el-button type="primary" @click="matchImages">搜索</el-button>
          </div>
        </div>
        <div>
          <el-row v-if="filteredImages.length > 0" :style="{ 'margin-top': '20px' }">
            <el-col :span="8" v-for="(item, index) in filteredImages" :key="index">
              <el-card :body-style="{ padding: '0px' }">
                <div class="image-container">
                  <img :src="'./resources/Result/' + item.filePath" class="image">
                  <!-- <span style="font-weight: 700">图片名称：</span> -->
                  <!-- <br> -->
                  <div class="text-container">
                    <span class="text">相似度：{{ item.value }}</span>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-row v-else-if="filteredImages.length === 0 && input !== '' && search" style="margin-top: 20px;">
            <div style="display: flex; flex-direction: column; align-items: center;">
              <div><img :src="'./resources/Result/nothing.png'" class="image"></div>
              <div style="margin-top: 10px;">未匹配到合适图片，请扩充图数据库！</div>
            </div>
          </el-row>
        </div>
        <!-- 其余的模板代码 -->
      </div>
    </el-container>
  </div>
</template>

<script>
// import axios from 'axios';
import { searchPicture } from '@/utils/interface'
export default {
  data() {
    return {
      input: '',
      search: false,
      images: [
        { name: '战争画面', filePath: 'war_152_1.jpg', value: '0.897' }, { name: '战争画面', filePath: 'war_152_2.jpg', value: '0.797' }, { name: '战争画面', filePath: 'war_158_0.jpg', value: '0.879' }, { name: '战争画面', filePath: 'war_162_2.jpg', value: '0.865' }, { name: '战争画面', filePath: 'war_165_0.jpg', value: '0.679' }, { name: '战争画面', filePath: 'war_200_2.jpg', value: '0.865' }, { name: '战争画面', filePath: 'war_195_1.jpg', value: '0.786' }, { name: '战争画面', filePath: 'war_197_0.jpg', value: '0.754' }, { name: '战争画面', filePath: 'war_200_0.jpg', value: '0.897' },
        { name: '前进的军队', filePath: 'war_153_2.jpg', value: '0.797' }, { name: '前进的军队', filePath: 'war_158_1.jpg', value: '0.678' }, { name: '前进的军队', filePath: 'war_165_1.jpg', value: '0.776' }, { name: '前进的军队', filePath: 'war_178_1.jpg', value: '0.758' }, { name: '前进的军队', filePath: 'war_185_2.jpg', value: '0.822' }, { name: '前进的军队', filePath: 'war_190_2.jpg', value: '0.798' }, { name: '前进的军队', filePath: 'war_193_1.jpg', value: '0.812' }, { name: '前进的军队', filePath: 'war_194_2.jpg', value: '0.811' }, { name: '前进的军队', filePath: 'war_195_0.jpg', value: '0.871' },
        { name: '一群人在开会', filePath: 'war_166_0.jpg', value: '0.832' }, { name: '一群人在开会', filePath: 'war_170_1.jpg', value: '0.892' }, { name: '一群人在开会', filePath: 'war_170_2.jpg', value: '0.851' }, { name: '一群人在开会', filePath: 'war_171_0.jpg', value: '0.881' }, { name: '一群人在开会', filePath: 'war_171_1.jpg', value: '0.858' }, { name: '一群人在开会', filePath: 'war_171_2.jpg', value: '0.872' }, { name: '一群人在开会', filePath: 'war_173_1.jpg', value: '0.888' }, { name: '一群人在开会', filePath: 'war_174_1.jpg', value: '0.798' }, { name: '一群人在开会', filePath: 'war_174_2.jpg', value: '0.888' },
      ],
      filteredImages: [],
      result: []
    };
  },
  methods: {
    search() {
      if (this.input === '') {
        alert('请输入搜索内容');
        return;
      }
      if (this.result) this.result = []; // 添加此行创建空数组
      var vm = this; // 保存组件实例的引用
      searchPicture({ query: this.input })
      // axios.post('http://127.0.0.1:5000/api/search', { query: this.input })
        .then(response => {
          // 处理响应结果
          // console.log(response.data);
          Object.keys(response.data).forEach(function (key) {
            var value = response.data[key];
            // 在这里处理每个属性的值
            console.log(key, value);
            // "resources/Result/LOCAL1658392121409AQZKGAWE7K.jpg 0.14738580584526062
            // resources/Result/LOCAL16596980070065Q0QBGRQKS.jpg 0.1394435465335846
            // resources/Result/LOCAL202206011637000393774478684.jpg 0.1284731924533844
            // resources/Result/LOCAL166003616637070TMKYURNH.jpg 0.03178783878684044
            // resources/Result/12899887654473581762.jpg 0.022384094074368477
            // "
            var lines = value.split('\n');
            var result = lines
              .filter(function (line) {
                var parts = line.split(' ');
                return parts.length === 2;
              })
              .map(function (line) {
                var parts = line.split(' ');
                return {
                  filePath: parts[0],
                  value: parseFloat(parts[1])
                };
              });
            vm.result.push(...result); // 将对象数组推送到this.result中
            console.log(vm.result);
          });
        })
        .catch(error => {
          console.error(error);
        });
    },
    matchImages() {
      if (this.input === '') {
        alert('请输入搜索内容');
        return;
      }
      this.search = true;
      this.filteredImages = this.images.filter(item => item.name.includes(this.input));
      this.filteredImages.sort((a, b) => parseFloat(b.value) - parseFloat(a.value)); 
    },
    resetSearch() {
      this.search = false;
      this.filteredImages = [];
    }
  }
};
</script>

<style scoped>
.t2i-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.search-container {
  display: flex;
  flex-direction: column;
}

.search {
  position: relative;
}

.image-container {
  position: relative;

}

.image {
  width: 350px;
  /* 设置图片宽度 */
  height: 220px;
  /* 设置图片高度 */
}

.text-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  /* background-color: rgba(0, 0, 0, 0.5); */
  background-color: #000;
  text-align: center;
}

.text {
  color: #fff;
  padding: 10px;
  font-size: large;
}

.el-row {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
}

.el-col {
  justify-content: space-evenly
}

.el-card {
  display: flex;
  min-height: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
}
</style>
