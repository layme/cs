<template>
  <div v-loading="loading" element-loading-text="后台拼命处理中...">
    <el-row style="margin: 15px">
      <el-button type="success" round icon="el-icon-circle-plus" @click="dialogAddGoodsType = true">新增商品类别</el-button>
      <el-button type="primary" round icon="el-icon-search" @click="showAllGoodsType">查看现有类别</el-button>
    </el-row>
    <hr/>

    <el-form :model="goods" ref="addGoodsForm" class="demo-form-inline" label-width="160px" style="width: 80%; margin-top: 25px;">
      <el-form-item label="商品ID" prop="gid">
        <el-input v-model="goods.gid" placeholder="系统自动生成商品编号，无需填写" disabled></el-input>
      </el-form-item>
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="goods.name" placeholder="请在此输入商品名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="商品类别" prop="tid">
        <el-select v-model="goods.tid" @focus="selectGoodsType">
          <el-option
            v-for="item in options"
            :key="item.tid"
            :label="item.name"
            :value="item.tid">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="单价" prop="price">
        <el-input v-model="goods.price" placeholder="请在此输入单价" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addGoods">保 存</el-button>
        <el-button @click="resetForm('addGoodsForm')">重 置</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="新增商品类别" :visible.sync="dialogAddGoodsType" width="30%">
      <el-form ref="addUserForm" class="demo-form-inline" label-width="100px" style="width: 90%">
        <el-form-item label="类别名称" prop="typeName">
          <el-input v-model="typeName" placeholder="请在此输入类别名称" clearable></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="addGoodsType">保 存</el-button>
          <el-button @click="dialogAddGoodsType = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="所有商品类别" :visible.sync="dialogCheckGoodsType">
      <el-table :data="allGoodsTypeData" loading="loading2" element-loading-text="拼命加载中..." height="250">
        <el-table-column property="tid" label="类别编号"></el-table-column>
        <el-table-column property="name" label="类别名称"></el-table-column>
        <el-table-column property="uid" label="创建人编号"></el-table-column>
        <el-table-column property="regTime" label="创建时间"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loading: false,
        loading2: false,
        dialogAddGoodsType: false,
        dialogCheckGoodsType: false,

        typeName: '',

        allGoodsTypeData: [],

        goods: {
          gid: '',
          name: '',
          tid: '',
          price: ''
        },

        options: []
      }
    },
    methods: {
      addGoodsType() {
        this.dialogAddGoodsType = false;
        this.loading = true;
        this.$http.get('http://localhost:8088/api/goodstype/add', {params: {typeName: this.typeName}, timeout: 3000})
          .then(response => {
            console.log(response);
            this.loading = false;
            if (response.data.result == true) {
              this.message("保存成功", "success");
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

      showAllGoodsType() {
        this.dialogCheckGoodsType = true;
        this.loading2 = true;
        this.$http.get('http://localhost:8088/api/goodstype/search', {timeout: 3000})
          .then(response => {
            console.log(response);
            this.allGoodsTypeData = response.data.data;
            this.loading2 = false;
            if (response.data.result == false) {
              this.errorNotice(response.data.message);
            }
          })
          .catch(error => {
            console.log(error);
            this.loading2 = false;
            this.errorNotice("无法连接到服务器");
          });
      },

      selectGoodsType() {
        this.$http.get('http://localhost:8088/api/goodstype/search', {timeout: 3000})
          .then(response => {
            console.log(response);
            this.options = response.data.data;
            if (response.data.result == false) {
              this.errorNotice(response.data.message);
            }
          })
          .catch(error => {
            console.log(error);
            this.errorNotice("无法连接到服务器");
          });
      },

      addGoods() {
        this.loading = true;
        this.$http.get('http://localhost:8088/api/goods/add', {params: {name: this.goods.name,
          tid: this.goods.tid,
          price: this.goods.price}, timeout: 3000})
          .then(response => {
            console.log(response);
            this.loading = false;
            if (response.data.result == true) {
              this.goods = response.data.data;
              this.message("保存成功", "success");
            } else {
              this.errorNotice(response.data.message);
            }
          })
          .catch(error => {
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
