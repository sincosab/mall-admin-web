<template>
   
  <el-card class="form-container" shadow="never">
    <el-form
      :model="crawlSite"
      :rules="rules"
      ref="crawlSiteFrom"
      label-width="150px"
    >
      <el-form-item label="网站id：" prop="name">
        <el-input v-model="crawlSite.id"></el-input>
      </el-form-item>
      <el-form-item label="网站名称：" prop="name">
        <el-input v-model="crawlSite.site"></el-input>
      </el-form-item>
      <el-form-item label="初始URL：">
        <el-input v-model="crawlSite.initUrl"></el-input>
      </el-form-item>
      <el-form-item label="分页URL：" prop="logo">
        <el-input v-model="crawlSite.pageUrl"></el-input>
      </el-form-item>
      <el-form-item label="开始页码：">
        <el-input v-model="crawlSite.pageStart"></el-input>
      </el-form-item>
      <el-form-item label="结束页码：">
        <el-input v-model="crawlSite.pageEnd"></el-input>
      </el-form-item>
      <el-form-item label="正则表达式：">
        <el-input v-model="crawlSite.regex"></el-input>
      </el-form-item>
      <el-form-item label="匹配URL：">
        <el-input v-model="crawlSite.matchUrl"></el-input>
      </el-form-item>
      <el-form-item label="meta 标志：">
        <el-input v-model="crawlSite.metaFlag"></el-input>
      </el-form-item>
      <el-form-item label="创建时间：">
        <el-input v-model="crawlSite.createTime"></el-input>
      </el-form-item>
      <el-form-item label="修改时间：">
        <el-input v-model="crawlSite.updateTime"></el-input>
      </el-form-item>
      <el-form-item label="是否有效：">
        <el-radio-group v-model="crawlSite.status">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('crawlSiteFrom')"
          >提交</el-button
        >
        <el-button v-if="!isEdit" @click="resetForm('crawlSiteFrom')"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import {
  listCrawlSite,
  createCrawlSite,
  getCrawlSite,
  updateCrawlSite,
} from "@/api/crawlSite";
const defaultCrawlSite = {
  id: "",

  site: "",

  initUrl: "",

  pageUrl: "",

  pageStart: "",

  pageEnd: "",

  regex: "",

  matchUrl: "",

  metaFlag: "",

  status: "",

  createTime: "",

  updateTime: "",
};
export default {
  name: "CrawlSiteDetail",
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      crawlSite: Object.assign({}, defaultCrawlSite),
      rules: {
        name: [
          { required: true, message: "请输入网站名称", trigger: "blur" },
          {
            min: 2,
            max: 140,
            message: "长度在 2 到 140 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    if (this.isEdit) {
      getCrawlSite(this.$route.query.id).then((response) => {
        this.crawlSite = response.data;
      });
    } else {
      this.crawlSite = Object.assign({}, defaultCrawlSite);
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
              updateCrawlSite(this.$route.query.id, this.crawlSite).then(
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
              createCrawlSite(this.crawlSite).then((response) => {
                this.$refs[formName].resetFields();
                this.crawlSite = Object.assign({}, defaultCrawlSite);
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
      this.crawlSite = Object.assign({}, defaultCrawlSite);
    },
  },
};
</script>
<style>
</style>


