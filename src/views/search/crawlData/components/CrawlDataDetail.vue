<template>
   
  <el-card class="form-container" shadow="never">
    <el-form
      :model="crawlData"
      :rules="rules"
      ref="crawlDataFrom"
      label-width="150px"
    >
      <el-form-item label="网站名称：" prop="name">
        <el-input v-model="crawlData.site"></el-input>
      </el-form-item>
      <el-form-item label="网站域名：">
        <el-input v-model="crawlData.domain"></el-input>
      </el-form-item>
      <el-form-item label="标题：">
        <el-input v-model="crawlData.title"></el-input>
      </el-form-item>
      <el-form-item label="url：">
        <el-input v-model="crawlData.url"></el-input>
      </el-form-item>
      <el-form-item label="关键字：">
        <el-input v-model="crawlData.keyword"></el-input>
      </el-form-item>
      <el-form-item label="内容：">
        <el-input v-model="crawlData.content"></el-input>
      </el-form-item>
      <el-form-item label="省份：">
        <el-input v-model="crawlData.province"></el-input>
      </el-form-item>
      <el-form-item label="市：">
        <el-input v-model="crawlData.city"></el-input>
      </el-form-item>
      <el-form-item label="发布日期：">
        <el-input v-model="crawlData.publishTime"></el-input>
      </el-form-item>
      <el-form-item label="是否有效：">
        <el-radio-group v-model="crawlData.status">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('crawlDataFrom')"
          >提交</el-button
        >
        <el-button v-if="!isEdit" @click="resetForm('crawlDataFrom')"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import {
  listCrawlData,
  createCrawlData,
  getCrawlData,
  updateCrawlData,
} from "@/api/crawlData";

const defaultCrawlData = {
  id: "",

  title: "",

  site: "",

  domain: "",

  url: "",

  keyword: "",

  province: "",

  city: "",

  publishTime: "",

  status: "",

  createTime: "",

  updateTime: "",

  content: "",
};
export default {
  name: "CrawlDataDetail",
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      crawlData: Object.assign({}, defaultCrawlData),
      rules: {},
    };
  },

  created() {
    if (this.isEdit) {
      getCrawlData(this.$route.query.id).then((response) => {
        this.crawlData = response.data;
      });
    } else {
      this.crawlData = Object.assign({}, defaultCrawlData);
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm("是否提交数据", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            if (this.isEdit) {
              updateCrawlData(this.$route.query.id, this.crawlData).then(
                (response) => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: "修改成功",
                    type: "success",
                    duration: 1000,
                  });
                  this.$router.back();
                }
              );
            } else {
              createCrawlData(this.crawlData).then((response) => {
                this.$refs[formName].resetFields();
                this.crawlData = Object.assign({}, defaultCrawlData);
                this.$message({
                  message: "提交成功",
                  type: "success",
                  duration: 1000,
                });
              });
            }
          });
        } else {
          this.$message({
            message: "验证失败",
            type: "error",
            duration: 1000,
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.crawlData = Object.assign({}, defaultCrawlData);
    },
  },
};
</script>
<style>
</style>


