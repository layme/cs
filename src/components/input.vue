<template>
  <div v-loading="loading" element-loading-text="后台拼命处理中...">
    <el-form :model="goodsInputDto" ref="goodsInputForm" :rules="rules" class="demo-form-inline" label-width="160px"
             style="width: 80%; margin-top: 25px;">
      <el-form-item label="商品ID" prop="gid">
        <el-input v-model="goodsInputDto.gid" placeholder="请在此输入商品编号" aria-required="true" clearable></el-input>
      </el-form-item>
      <el-form-item label="出库数量" prop="number">
        <el-input v-model.number="goodsInputDto.number" placeholder="请在此输入入库数量" clearable></el-input>
      </el-form-item>
      <el-form-item label="备注信息" prop="remark">
        <el-input v-model="goodsInputDto.remark" type="textarea" placeholder="请在此输入备注信息" clearable></el-input>
      </el-form-item>
      <el-form-item align="center">
        <el-button style="width: 150px;" type="success" icon="el-icon-download" @click="submitForm('goodsInputForm')">入 库</el-button>
        <el-button @click="resetForm('goodsInputForm')">重 置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        loading: false,

        goodsInputDto: {
          gid: '',
          number: '',
          remark: ''
        },

        rules: {
          gid: [{required: true, message: '请输入商品编号', trigger: 'blur'}],
          number: [{required: true, message: '出库数量不能为空', trigger: 'blur'},
            {type: 'number', message: '出库数量必须为数字值', trigger: 'blur'}],
          remark: [{required: true, message: '请输备注信息', trigger: 'blur'}]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.input();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      input() {
        this.loading = true;
        this.$http.get('http://localhost:8088/api/stock/in', {params: {gid: this.goodsInputDto.gid,
        number: this.goodsInputDto.number, remark: this.goodsInputDto.remark}, timeout: 3000})
          .then(response => {
            console.log(response);
            this.loading = false;
            if (response.data.result == true) {
              this.message("入库成功", "success");
            } else {
              this.errorNotice(response.data.message);
            }
          })
          .catch(error => {
            console.log(error);
            this.loading = false;
            this.errorNotice("无法连接到服务器");
          });
      },

      errorNotice(val) {
        this.$notify.error({
          title: '错误',
          message: val,
          duration: 0
        });
      },

      message(text, type) {
        this.$message({
          message: text,
          type: type
        });
      },

      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
