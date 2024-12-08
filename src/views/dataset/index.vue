<template>
  <div>
    <!-- 数据概览 -->
    <div class="container">
      <div class="item">
        <div class="dropdown-wrapper">
          <span class="label">数据来源：</span>
          <el-select
            v-model="currentType"
            placeholder="请选择数据集"
            @change="switchDataType"
            size="medium"
            style="width: 160px;"
            :popper-class="'custom-select-dropdown'"
          >
            <el-option
              v-for="type in dataTypes"
              :key="type.key"
              :label="type.name"
              :value="type.key"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="item">数据量<br/>{{ tableData.length }}</div>
      <div class="item">事件类别<br/>33种</div>
    </div>
    <el-table
      :data="tableData1"
      stripe
      style="width: 100%">
      <el-table-column
        prop="id"
        label="id"
        width="100">
      </el-table-column>
      <el-table-column
        prop="content"
        label="文本"
        :show-overflow-tooltip="true">
      </el-table-column>
    </el-table>
    <el-card class="footer" v-if="this.tableData.length > 0">
      <!-- 分页插件 -->
      <div>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="totalPage.pageNum"
          :page-size="totalPage.pageSize"
          layout="total, prev, pager, next"
          :total="this.tableData.length"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getDataList, getDataList1, getDataList2 } from '../../utils/interface'
export default {
  name: 'myDataset',
  data () {
    return {
      tableData1: [],
      tableData: [],
      totalPage: {
        pageNum: 1,
        pageSize: 10
      },
      currentType: 'war',
      dataTypes: [
        { key: 'war', name: '俄乌战争' },
        { key: 'medicine', name: '医药' },
        { key: 'trade', name: '数据交易' },
      ]
    }
  },
  created () {
    this.getWarData()
  },
  methods: {
    switchDataType(typeKey) {
      if (typeKey === 'war') {
        this.getWarData();
      } else if (typeKey === 'medicine') {
        this.getSHYYData();
      } else if (typeKey === 'trade') {
        this.getSHSJData();
      }
    },
    fetchData(apiMethod) {
      apiMethod()
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data.message)
            this.tableData = res.data.message;
            this.tableData1 = this.getPageData(1, this.totalPage.pageSize);
          }
        })
        .catch(() => {
          console.error('数据加载失败');
        });
    },
    getWarData() {
      this.fetchData(getDataList);
    },
    getSHYYData() {
      this.fetchData(getDataList1);
    },
    getSHSJData() {
      this.fetchData(getDataList2);
    },
    handleCurrentChange (val) {
      this.totalPage.pageNum = val;
      this.tableData1 = this.getPageData(val, this.totalPage.pageSize)
    },
    // 前端简单实现分页 固定死
    getPageData (val, pageSize) {
      // 输入当前页数
      return this.tableData.slice(pageSize * (val - 1), pageSize * val + 1)
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  margin: 15px 0;
  border-radius: 4px;
  box-shadow: 0 0 10px #e9e9e9;
}

.item {
  flex: 1;
  height: 80px;
  border-right: 1px solid #e9e9e9;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.container > :nth-child(3) {
  border-right: 0;
}

.dropdown-wrapper {
  display: flex;
  align-items: center; /* 垂直居中对齐 */
  justify-content: center;
}

.label {
  margin-right: 10px; /* 与下拉框间距 */
  font-size: 14px;
  color: #333;
}

.footer {
  z-index: 500;
  position: fixed;
  bottom: 0;
  width: 100%;
  line-height: var(--footer-height);
  color: #fff;
}

.custom-select-dropdown {
  background-color: #f9f9f9;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 10px;
}

.custom-select-dropdown .el-select-dropdown__item {
  padding: 10px 15px;
  font-size: 14px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.custom-select-dropdown .el-select-dropdown__item:hover {
  background-color: #f0f0f0;
}
</style>
