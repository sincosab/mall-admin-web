<template>
   
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float: right"
          @click="searchCrawlSiteList()"
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
      <el-button class="btn-add" @click="addCrawlSite()" size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table
        ref="crawlSiteTable"
        :data="list"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        v-loading="listLoading"
        border
      >
        <el-table-column
          type="selection"
          width="60"
          align="center"
        ></el-table-column>
        <el-table-column label="网站ID" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="网站名称" align="center">
          <template slot-scope="scope">{{ scope.row.site }}</template>
        </el-table-column>
        <el-table-column label="初始URL" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.initUrl }}</template>
        </el-table-column>
        <el-table-column label="分页URL" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.pageUrl }}</template>
        </el-table-column>
        <el-table-column label="开始页码" align="center">
          <template slot-scope="scope">{{ scope.row.pageStart }}</template>
        </el-table-column>
        <el-table-column label="结束页码" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.pageEnd }}</template>
        </el-table-column>
        <el-table-column label="正则表达式" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.pageUrl }}</template>
        </el-table-column>
        <el-table-column label="匹配URL" align="center">
          <template slot-scope="scope">{{ scope.row.site }}</template>
        </el-table-column>
        <el-table-column label="meta标志" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.initUrl }}</template>
        </el-table-column>
        <el-table-column label="创建时间" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.pageUrl }}</template>
        </el-table-column>
        <el-table-column label="修改时间" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.pageUrl }}</template>
        </el-table-column>

        <el-table-column label="是否有效" width="100" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleShowStatusChange(scope.$index, scope.row)"
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
        :page-sizes="[5, 10, 15]"
        :current-page.sync="listQuery.pageNum"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import {
  listCrawlSite,
  updateCrawlSite,
  createCrawlSite,
  getCrawlSite,
} from "@/api/crawlSite";

export default {
  name: "crawlSiteList",
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
  methods: {
    getList() {
      this.listLoading = true;
      listCrawlSite(this.listQuery).then((response) => {
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
        path: "/site/updateSite",
        query: { id: row.id },
      });
    },
    handleDelete(index, row) {
      this.$confirm("是否要删除该网站", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteCrawlSite(row.id).then((response) => {
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
          if (row.Status === 0) {
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
    searchCrawlSiteList() {
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
      if (this.operateType === "showCrawlSite") {
        showStatus = 1;
      } else if (this.operateType === "hideCrawlSite") {
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
      updateStatus(data).then((response) => {
        this.getList();
        this.$message({
          message: "修改成功",
          type: "success",
          duration: 1000,
        });
      });
    },
    addCrawlSite() {
      this.$router.push({ path: "/search/addSite" });
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>


