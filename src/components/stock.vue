<template>
  <div>
    <el-form :inline="true" :model="stockDto" class="demo-form-inline">
      <el-form-item label="商品编号">
        <el-input v-model="stockDto.gid" placeholder="请在此输入商品编号" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <hr/>
    <el-table stripe v-loading="loading" element-loading-text="拼命加载中"
              :data="stockData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
              style="width: 100%"
              height="500" size="mini">
      <el-table-column
        prop="gid"
        label="商品编号">
      </el-table-column>
      <el-table-column
        prop="name"
        label="商品名称">
      </el-table-column>
      <el-table-column
        prop="price"
        label="单价">
      </el-table-column>
      <el-table-column
        prop="typeName"
        label="类别">
      </el-table-column>
      <el-table-column
        prop="regName"
        label="注册人">
      </el-table-column>
      <el-table-column
        prop="regTime"
        label="注册时间">
      </el-table-column>
      <el-table-column
        fixed="right" color="green"
        prop="number"
        label="库存数量">
      </el-table-column>
    </el-table>
    <el-pagination style="text-align: right"
                   @current-change="handleCurrentChange"
                   :page-size="pageSize"
                   :current-page="currentPage"
                   layout="prev, pager, next, total"
                   :total="stockData.length">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loading: false,
        pageSize: 10,
        currentPage: 1,
        stockDto: {
          gid: '',
          name: ''
        },
        stockData: []
      }
    },
    methods: {
      onSubmit() {
        this.loading = true;
        this.$http.get('http://localhost:8088/api/stock/search', {params: {gid: this.stockDto.gid}, timeout: 3000})
          .then(response => {
            console.log(response);
            this.stockData = response.data.data;
            this.loading = false;
            if (response.data.result == false) {
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
      }
    }
  }
</script>
