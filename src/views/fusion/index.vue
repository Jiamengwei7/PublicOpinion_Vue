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
          <el-row v-else-if="filteredImages.length === 0 && input !== '' && search && !loading" style="margin-top: 20px;">
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
      loading: false, // 加载状态
      images: [
        { name: '战争画面、打仗', filePath: 'war_152_1.jpg', value: '0.897' }, { name: '战争画面、打仗', filePath: 'war_152_2.jpg', value: '0.797' }, { name: '战争画面、打仗', filePath: 'war_158_0.jpg', value: '0.879' }, { name: '战争画面、打仗', filePath: 'war_162_2.jpg', value: '0.865' }, { name: '战争画面、打仗', filePath: 'war_165_0.jpg', value: '0.679' }, { name: '战争画面、打仗', filePath: 'war_200_2.jpg', value: '0.865' }, { name: '战争画面、打仗', filePath: 'war_195_1.jpg', value: '0.786' }, { name: '战争画面、打仗', filePath: 'war_197_0.jpg', value: '0.754' }, { name: '战争画面、打仗', filePath: 'war_200_0.jpg', value: '0.897' }, {name: '战争前进的军队、行进中的军队、战士们', filePath: 'war_153_2.jpg', value: '0.797' },
        { name: '战争前进的军队、行进中的军队、战士们', filePath: 'war_158_1.jpg', value: '0.678' }, { name: '战争前进的军队、行进中的军队、战士们', filePath: 'war_165_1.jpg', value: '0.776' }, { name: '战争前进的军队、行进中的军队、战士们', filePath: 'war_178_1.jpg', value: '0.758' }, { name: '战争前进的军队、行进中的军队、战士们', filePath: 'war_185_2.jpg', value: '0.822' }, { name: '战争前进的军队、行进中的军队、战士们', filePath: 'war_190_2.jpg', value: '0.798' }, { name: '战争前进的军队、行进中的军队、战士们', filePath: 'war_193_1.jpg', value: '0.812' }, { name: '战争前进的军队、行进中的军队、战士们', filePath: 'war_194_2.jpg', value: '0.811' }, { name: '战争前进的军队、行进中的军队、战士们', filePath: 'war_195_0.jpg', value: '0.871' },
        { name: '一群人在开会、会议', filePath: 'war_166_0.jpg', value: '0.832' }, { name: '一群人在开会、会议', filePath: 'war_170_1.jpg', value: '0.892' }, { name: '一群人在开会、会议', filePath: 'war_170_2.jpg', value: '0.851' }, { name: '一群人在开会、会议', filePath: 'war_171_0.jpg', value: '0.881' }, { name: '一群人在开会、会议', filePath: 'war_171_1.jpg', value: '0.858' }, { name: '一群人在开会、会议', filePath: 'war_171_2.jpg', value: '0.872' }, { name: '一群人在开会、会议', filePath: 'war_173_1.jpg', value: '0.888' }, { name: '一群人在开会、会议', filePath: 'war_174_1.jpg', value: '0.798' }, { name: '一群人在开会、会议', filePath: 'war_174_2.jpg', value: '0.888' },
        { name: '医药创新研发、医药生产、医药研究', filePath: 'medicine_0.jpg', value: '0.897' }, { name: '医药创新研发、医药生产、医药研究', filePath: 'medicine_1.jpg', value: '0.797' }, { name: '医药创新研发、医药生产、医药研究', filePath: 'medicine_2.jpg', value: '0.879' }, { name: '医药创新研发、医药生产、医药研究', filePath: 'medicine_3.jpg', value: '0.865' }, { name: '医药创新研发、医药生产、医药研究', filePath: 'medicine_4.jpg', value: '0.879' }, { name: '医药创新研发、医药生产、医药研究', filePath: 'medicine_5.jpg', value: '0.865' }, { name: '医药创新研发、医药生产、医药研究', filePath: 'medicine_6.jpg', value: '0.786' }, { name: '医药创新研发、医药生产、医药研究', filePath: 'medicine_7.jpg', value: '0.754' }, { name: '医药创新研发、医药生产、医药研究', filePath: 'medicine_8.jpg', value: '0.897' },
        { name: '注射类药物、液体药物、液体药品', filePath: 'med_water_0.png', value: '0.812' }, { name: '注射类药物、液体药物、液体药品', filePath: 'med_water_1.png', value: '0.797' }, { name: '注射类药物、液体药物、液体药品', filePath: 'med_water_2.png', value: '0.809' }, { name: '注射类药物、液体药物、液体药品', filePath: 'med_water_3.png', value: '0.795' }, { name: '注射类药物、液体药物、液体药品', filePath: 'med_water_4.png', value: '0.779' }, { name: '注射类药物、液体药物、液体药品', filePath: 'med_water_5.png', value: '0.795' }, { name: '注射类药物、液体药物、液体药品', filePath: 'med_water_6.png', value: '0.816' }, { name: '注射类药物、液体药物、液体药品', filePath: 'med_water_7.png', value: '0.824' }, { name: '注射类药物、液体药物、液体药品', filePath: 'med_water_8.png', value: '0.817' },
        { name: '胶囊颗粒药品药物', filePath: 'med_0.png', value: '0.802' }, { name: '胶囊颗粒药品药物', filePath: 'med_1.png', value: '0.787' }, { name: '胶囊颗粒药品药物', filePath: 'med_2.png', value: '0.799' }, { name: '胶囊颗粒药品药物', filePath: 'med_3.png', value: '0.785' }, { name: '胶囊颗粒药品药物', filePath: 'med_4.png', value: '0.769' }, { name: '胶囊颗粒药品药物', filePath: 'med_5.png', value: '0.785' }, { name: '胶囊颗粒药品药物', filePath: 'med_6.png', value: '0.816' }, { name: '胶囊颗粒药品药物', filePath: 'med_7.png', value: '0.814' }, { name: '胶囊颗粒药品药物', filePath: 'med_8.png', value: '0.807' },
        { name: '医疗服务', filePath: 'med_service_0.jpg', value: '0.768' }, { name: '医疗服务', filePath: 'med_service_1.jpg', value: '0.717' }, { name: '医疗服务', filePath: 'med_service_2.jpg', value: '0.809' }, { name: '医疗服务', filePath: 'med_service_3.jpg', value: '0.795' }, { name: '医疗服务', filePath: 'med_service_4.jpg', value: '0.779' }, { name: '医疗服务', filePath: 'med_service_5.jpg', value: '0.795' }, { name: '医疗服务', filePath: 'med_service_6.jpg', value: '0.816' }, { name: '医疗服务', filePath: 'med_service_7.jpg', value: '0.804' }, { name: '医疗服务', filePath: 'med_service_8.jpg', value: '0.817' },
        { name: '合作画面', filePath: 'trade_cooperation_0.jpg', value: '0.768' }, { name: '合作画面', filePath: 'trade_cooperation_1.jpg', value: '0.717' }, { name: '合作画面', filePath: 'trade_cooperation_2.jpg', value: '0.809' }, { name: '合作画面', filePath: 'trade_cooperation_3.jpg', value: '0.795' }, { name: '合作画面', filePath: 'trade_cooperation_4.jpg', value: '0.779' }, { name: '合作画面', filePath: 'trade_cooperation_5.jpg', value: '0.795' }, { name: '合作画面', filePath: 'trade_cooperation_6.jpg', value: '0.816' }, { name: '合作画面', filePath: 'trade_cooperation_7.jpg', value: '0.804' }, { name: '合作画面', filePath: 'trade_cooperation_8.jpg', value: '0.817' },
        { name: '绿色经济', filePath: 'trade_green_0.jpg', value: '0.768' }, { name: '绿色经济', filePath: 'trade_green_1.jpg', value: '0.717' }, { name: '绿色经济', filePath: 'trade_green_2.jpg', value: '0.809' }, { name: '绿色经济', filePath: 'trade_green_3.jpg', value: '0.795' }, { name: '绿色经济', filePath: 'trade_green_4.jpg', value: '0.779' }, { name: '绿色经济', filePath: 'trade_green_5.jpg', value: '0.795' }, { name: '绿色经济', filePath: 'trade_green_6.jpg', value: '0.786' }, { name: '绿色经济', filePath: 'trade_green_7.jpg', value: '0.804' }, { name: '绿色经济', filePath: 'trade_green_8.jpg', value: '0.817' },
        { name: '绿色经济', filePath: 'green_0.jpg', value: '0.818' }, { name: '绿色经济', filePath: 'green_1.jpg', value: '0.807' }, { name: '绿色经济', filePath: 'green_2.jpg', value: '0.789' }, { name: '绿色经济', filePath: 'green_3.jpg', value: '0.795' }, { name: '绿色经济', filePath: 'green_4.jpg', value: '0.799' }, { name: '绿色经济', filePath: 'green_5.jpg', value: '0.805' }, { name: '绿色经济', filePath: 'green_6.jpg', value: '0.776' }, { name: '绿色经济', filePath: 'green_7.jpg', value: '0.754' }, { name: '绿色经济', filePath: 'green_8.jpg', value: '0.787' },
        { name: '工业制造', filePath: 'trade_manufacture_0.jpg', value: '0.768' }, { name: '工业制造', filePath: 'trade_manufacture_1.jpg', value: '0.717' }, { name: '工业制造', filePath: 'trade_manufacture_2.jpg', value: '0.809' }, { name: '工业制造', filePath: 'trade_manufacture_3.jpg', value: '0.795' }, { name: '工业制造', filePath: 'trade_manufacture_4.jpg', value: '0.779' }, { name: '工业制造', filePath: 'trade_manufacture_5.jpg', value: '0.795' }, { name: '工业制造', filePath: 'trade_manufacture_6.jpg', value: '0.816' }, { name: '工业制造', filePath: 'trade_manufacture_7.jpg', value: '0.804' }, { name: '工业制造', filePath: 'trade_manufacture_8.jpg', value: '0.817' },
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
      this.loading = true; // 设置加载状态为 true
      if (this.input === '') {
        alert('请输入搜索内容');
        return;
      }
      this.search = true;
      setTimeout(() => {
        this.filteredImages = this.images.filter(item => item.name.includes(this.input));
        this.filteredImages.sort((a, b) => parseFloat(b.value) - parseFloat(a.value));
        this.loading = false;
      }, 2000);
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
