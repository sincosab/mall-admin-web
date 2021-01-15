<template>
   
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float: right"
          @click="searchCrawlDataList()"
          type="primary"
          size="small"
        >
          查询结果
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form
          :inline="true"
          :model="listQuery"
          size="small"
          label-width="140px"
        >
          <el-form-item label="输入搜索：">
            <el-input
              style="width: 203px"
              v-model="listQuery.keyword"
              placeholder="网站名称/关键字"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button class="btn-add" @click="addCrawlData()" size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table
        ref="crawlDataTable"
        :data="list"
        :row-style="{ height: '20px' }"
        :cell-style="{ padding: '5px 0px' }"
        @selection-change="handleSelectionChange"
        v-loading="listLoading"
        border
      >
        <el-table-column
          type="selection"
          width="60"
          align="center"
        ></el-table-column>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="网站名称" width="250" align="center">
          <template slot-scope="scope">{{ scope.row.site }}</template>
        </el-table-column>
        <el-table-column label="网站域名" width="200" align="center">
          <template slot-scope="scope">{{ scope.row.domain }}</template>
        </el-table-column>
        <el-table-column label="标题" width="300" align="left">
          <template slot-scope="scope">{{ scope.row.title }}</template>
        </el-table-column>

        <el-table-column label="内容" width="500" align="left">
          <template slot-scope="scope">{{ scope.row.content }}
          </template>
        </el-table-column>
        <el-table-column label="发布日期" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.publishTime }}</template>
        </el-table-column>
        <el-table-column label="关键字" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.keyword }}</template>
        </el-table-column>

        <el-table-column label="省份" align="center">
          <template slot-scope="scope">{{ scope.row.province }}</template>
        </el-table-column>
        <el-table-column label="市" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.city }}</template>
        </el-table-column>
        <el-table-column label="url" align="center" width="200">
          <template slot-scope="scope">{{ scope.row.url }}</template>
        </el-table-column>
        <el-table-column label="创建时间" width="150" align="center">
          <template slot-scope="scope">{{
            scope.row.createTime | formatDateTime
          }}</template>
        </el-table-column>
        <el-table-column label="修改时间" width="150" align="center">
          <template slot-scope="scope">{{
            scope.row.updateTime | formatDateTime
          }}</template>
        </el-table-column>

        <el-table-column label="是否启用" width="140" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleStatusChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.status"
            >
            </el-switch>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleUpdate(scope.$index, scope.row)"
              >编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="batch-operate-container">
      <el-select size="small" v-model="operateType" placeholder="批量操作">
        <el-option
          v-for="item in operates"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button
        style="margin-left: 20px"
        class="search-button"
        @click="handleBatchOperate()"
        type="primary"
        size="small"
      >
        确定
      </el-button>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.pageSize"
        :page-sizes="[10, 50, 100]"
        :current-page.sync="listQuery.pageNum"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import {
  listCrawlData,
  updateCrawlData,
  updateStatus,
  createCrawlData,
  deleteCrawlData,
  getCrawlData,
} from "@/api/crawlData";
import { formatDate } from "@/utils/date";
export default {
  name: "crawlDataList",
  data() {
    return {
      operates: [
        {
          label: "有效",
          value: "1",
        },
        {
          label: "无效",
          value: "0",
        },
      ],
      operateType: null,
      listQuery: {
        keyword: null,
        pageNum: 1,
        pageSize: 10,
      },
      list: null,
      total: null,
      listLoading: true,
      multipleSelection: [],
    };
  },
  created() {
    this.getList();
  },
  filters: {
    formatDateTime(time) {
      if (time == null || time === "") {
        return "N/A";
      }
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
  },
  methods: {
    getList() {
      this.listLoading = true;
      listCrawlData(this.listQuery).then((response) => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
        this.totalPage = response.data.totalPage;
        this.pageSize = response.data.pageSize;
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleUpdate(index, row) {
      this.$router.push({
        path: "/search/updateData",
        query: { id: row.id },
      });
    },
    handleDelete(index, row) {
      this.$confirm("是否要删除该网站", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteCrawlData(row.id).then((response) => {
          this.$message({
            message: "删除成功",
            type: "success",
            duration: 1000,
          });
          this.getList();
        });
      });
    },

    handleStatusChange(index, row) {
      let data = new URLSearchParams();
      data.append("ids", row.id);
      data.append("status", row.status);
      updateStatus(data)
        .then((response) => {
          this.$message({
            message: "修改成功",
            type: "success",
            duration: 1000,
          });
        })
        .catch((error) => {
          if (row.status === 0) {
            row.status = 1;
          } else {
            row.status = 0;
          }
        });
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    searchCrawlDataList() {
      this.listQuery.pageNum = 1;
      this.getList();
    },
    handleBatchOperate() {
      console.log(this.multipleSelection);
      if (this.multipleSelection < 1) {
        this.$message({
          message: "请选择一条记录",
          type: "warning",
          duration: 1000,
        });
        return;
      }
      let showStatus = 0;
      if (this.operateType === "showCrawlData") {
        showStatus = 1;
      } else if (this.operateType === "hideCrawlData") {
        showStatus = 0;
      } else {
        this.$message({
          message: "请选择批量操作类型",
          type: "warning",
          duration: 1000,
        });
        return;
      }
      let ids = [];
      for (let i = 0; i < this.multipleSelection.length; i++) {
        ids.push(this.multipleSelection[i].id);
      }
      let data = new URLSearchParams();
      data.append("ids", ids);
      data.append("status", status);
      updateDataStatus(data).then((response) => {
        this.getList();
        this.$message({
          message: "修改成功",
          type: "success",
          duration: 1000,
        });
      });
    },
    addCrawlData() {
      this.$router.push({ path: "/search/addData" });
    },
  },
};
</script>
<style rel="stylesheet/scss">

.el-table .cell {
  line-height: 26px;
  height: 26px;
}
</style>


