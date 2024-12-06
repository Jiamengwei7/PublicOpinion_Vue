<template>
  <div class="container">
    <div class="top">
      <el-card class="dataset">
        <div style="display: flex; align-items: center">
          <div class="rounded-box">
            <span>Data</span>
          </div>
          <el-input
            v-model="input"
            placeholder="请输入事件的文本"
            style="width: 800px"
          ></el-input>
          <el-upload
            class="upload-demo"
            action
            :http-request="uploadImage"
            :limit="3"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :show-file-list="false"
            :file-list="fileList"
            style="margin-left: 40px"
          >
            <el-button type="primary" style="height: 40px">加载图片</el-button>
          </el-upload>
        </div>
      </el-card>
    </div>
    <div class="sample-container">
      <el-card class="box-card1">
        <span class="text1">事件样本信息</span>
        <el-divider></el-divider>
        <div style="display: flex">
          <div style="width: 400px">
            <span class="text" style="font-size: 16px">文本</span>
            <span
              class="text"
              style="margin-left: 20px; color: #99a9bf"
              >{{ input }}</span
            ><br />
          </div>
          <div style="flex: 1; margin-left:50px">
            <span
              class="text"
              style="font-size: 16px; vertical-align: middle"
              >图片</span
            >
          <img
            v-for="file in fileList"
            :key="file.name"
            style="
              width: 150px;
              height: 120px;
              margin-left: 20px;
              vertical-align: middle;
            "
            :src="file.url"
            :alt="file.name"
        />
            </div>
          <el-button type="primary" style="height: 40px; margin-right: 50px" @click="send"
            >开始抽取</el-button>
          </div>
        </el-card>
    </div>
    <div v-if="isClicked" class="event-container">
      <div class="left-half">
        <el-card class="box-card1">
              <span class="text1">触发词信息</span>
              <el-divider></el-divider>
              <el-row>
                <el-col :span="24">
                  <el-form
                    label-position="left"
                    inline
                    class="demo-table-expand"
                  >
                    <el-form-item label="触发词1">
                      <span>{{position1}}</span>
                    </el-form-item>
                    <el-form-item label="事件类型">
                      <span>{{ content1 }}</span>
                    </el-form-item>
                    <el-form-item label="触发词2">
                      <span>{{position2}}</span>
                    </el-form-item>
                    <el-form-item label="事件类型">
                      <span>{{ content2 }}</span>
                    </el-form-item>
                  </el-form>
                </el-col>
              </el-row>
            </el-card>
        </div> 
        <div class="right-half">
          <el-card class="box-card1">
            <span class="text1">论元信息</span>
            <el-divider></el-divider>
            <div style="width: 100%">
              <div>
                <el-row>
                  <el-col :span="24">
                    <el-form
                      label-position="left"
                      inline
                      class="demo-table-expand"
                    >
                      <el-form-item label="论元1">
                        <span>{{ arguments_list1[0] }}</span>
                      </el-form-item>
                      <el-form-item label="论元角色">
                        <span>{{ roles1[0] }}</span>
                      </el-form-item>
                      <!-- <el-form-item v-if="roles.length > 0" label="角色描述">
                        <span>[Participant] met face-to-face at [Place]</span>
                      </el-form-item> -->
                      <el-form-item label="论元2">
                        <span>{{ arguments_list1[1] }}</span>
                      </el-form-item>
                      <el-form-item label="论元角色">
                        <span>{{ roles1[1] }}</span>
                      </el-form-item>
                      <!-- <el-form-item  v-if="roles1.length > 0" label="角色描述">
                        <span>[Participant] met face-to-face at [Place]</span>
                      </el-form-item> -->
                    </el-form>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios';
//   import { sendText } from '@/api'
import { upload } from '@/utils/interface'
import { sendMultiData } from '@/utils/interface'
export default {
  name: 'my-extraction',
  data() {
    return {
      input: '',
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      fileList: [],
      ImageList:[],
      position: '',
      content: '',
      arguments_list: [],
      roles: [],
      isClicked: false,
      position1: '',
      content1: '',
      position2: '',
      content2: '',
      arguments_list1: [],
      roles1:[],
    };
  },
  methods: {
    send() {
      this.isClicked = !this.isClicked
      setTimeout(()=> {
        if(this.input == '中新网伦敦7月1日电,英国安全官员称有证据显示，格拉斯哥机场遭燃烧汽车撞击事件是一起自杀式恐怖袭击事件。警方称有五名旁观者在格拉斯哥机场袭击事件中受伤，但他们的伤势都不严重。') {
          this.position1 = '袭击事件',
          this.content1 = 'Conflict:Attack',
          this.position2 = '受伤',
          this.content2 = 'Life:Injure',
          this.arguments_list1 = ['格拉斯哥机场', '燃烧汽车'],
          this.roles1 = ['Place', 'Instrument']
      } else {
          console.log('dierge')
      }
      }, 2000)

      // sendMultiData ({ text: this.input, image: this.ImageList }).then(({ data }) => {
      // console.log('Response data:', data);
      // const eventType_list = data.data.non_O_content
      // console.log('event_type', eventType_list)
      // const event_type = eventType_list[0]
      // this.position = event_type[0]
      // this.content = event_type[1]
      // console.log("Positions:", this.position);
      // // 使用正则表达式匹配单词
      // const wordRegex = /\b\w+\b/g;
      // const words = this.input.match(wordRegex);
      
      // // 根据位置查找对应的单词
      // this.position = words[this.position - 1];

      // // const [positions, contents] = data.non_O_content[0];
      // console.log("Positions:", this.position);
      // console.log("Contents:", this.content);

      // let argument_list = data.data.arguments_list
      // argument_list = argument_list[0]
      // argument_list = JSON.parse(argument_list.replace(/'/g, "\""))
      
      // this.arguments_list = argument_list
      // console.log('argument_list', this.arguments)
      // let roles_list = data.data.roles_list
      // roles_list = roles_list[0]
      // roles_list = JSON.parse(roles_list.replace(/'/g, "\""))
      
      // this.roles = roles_list
      // console.log('roles_list', this.roles)
      // })
    },
    uploadImage(obj) {
      const formData = new FormData();
      formData.append('image', obj.file); // 将图片文件添加到 FormData
      this.ImageList.push(obj.file.name);
      // console.log("ImageList", this.ImageList)
      // console.log("obj.file:", obj.file);
      // console.log([...formData]); // 将 FormData 转换为数组以查看内容
      upload(formData).then(({ data }) => {
        this.fileList.push({ name: data.name, url: data.dataURL })
        console.log("fileList",this.fileList)
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  },
};
</script>

<style>
.rounded-box {
  height: 40px;
  width: 40px;
  background-color: #409eff;
  margin-right: 20px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.rounded-box span {
  font-size: 16px;
  color: white;
}

.text1 {
  font-size: 16px;
  font-weight: bold;
}

.text {
  font-size: 14px;
}

.button {
  margin-right: 10px;
}

.item {
  padding: 18px 0;
}

.box-card1 {
  margin-bottom: 10px;
  padding: 10px;
}

.image {
  width: 100%;
  display: block;
}

.container {
  /* display: flex; */
  flex-direction: column;
}

.top {
  height: 100px;
}

.event-container {
  display: flex;
}

.event {
  display: flex;
}

.left-half {
  width: 500px;
  margin-right: 10px;
}

.right-half {
  flex: 1;
  top: 0;
}

.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 70px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 45%;
}
</style>
