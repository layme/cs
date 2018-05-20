<template>
  <div>
    <el-form :inline="true" :model="stockDto" class="demo-form-inline">
      <el-form-item label="商品编号">
        <el-input v-model="stockDto.gid" placeholder="请在此输入商品编号" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
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
        prop="tid"
        label="类别ID">
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
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="bottom-start">
            <el-button @click="editClick(scope.row)" type="text" icon="el-icon-edit" size="small"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="bottom-start">
            <el-button @click="isSureDel(scope.row)" type="text" icon="el-icon-delete" size="small"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="text-align: right"
                   @current-change="handleCurrentChange"
                   :page-size="pageSize"
                   :current-page="currentPage"
                   layout="prev, pager, next, total"
                   :total="stockData.length">
    </el-pagination>

    <el-dialog title="编辑商品" :visible.sync="editFormVisible">
      <el-form :model="goodsVo" ref="editGoodsForm" class="demo-form-inline" label-width="100px" style="width: 90%">
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="goodsVo.name" placeholder="商品名称"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="goodsVo.price" placeholder="姓名" clearable></el-input>
        </el-form-item>
        <el-form-item label="类别" prop="tId">
          <el-select v-model="goodsVo.tId">
            <el-option
              v-for="item in options"
              :key="item.tid"
              :label="item.name"
              :value="item.tid">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="editGoods">提交</el-button>
          <el-button @click="editFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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
          gid: ''
        },
        stockData: [],

        editFormVisible: false,

        goodsVo: {
          gId: '',
          name: '',
          tId: '',
          price: ''
        },

        options: []
      }
    },
    methods: {
      search() {
        this.loading = true;
        this.$http.get('http://localhost:8088/api/stock/search', {params: {gid: this.stockDto.gid}, timeout: 3000})
          .then(response => {
            console.log(response);
            this.loading = false;
            if (response.data.result == true) {
              this.stockData = response.data.data;
            } else {
              this.errorNotice(response.data.message);
            }
          })
          .catch(error => {
            this.loading = false;
            this.errorNotice("无法连接到服务器");
          });
      },

      editClick(row) {
        this.selectGoodsType();
        this.goodsVo.gId = row.gid;
        this.goodsVo.name = row.name;
        this.goodsVo.tId = row.tid;
        this.goodsVo.price = row.price;
        this.editFormVisible = true;
      },

      editGoods() {
        this.editFormVisible = false;
        this.loading = true;
        this.$http.get('http://localhost:8088/api/goods/update', {
          params: {
            gId: this.goodsVo.gId,
            name: this.goodsVo.name,
            tId: this.goodsVo.tId,
            price: this.goodsVo.price,
          }, timeout: 3000
        })
          .then(response => {
            console.log(response);
            this.loading = false;
            if (response.data.result == true) {
              this.editFormVisible = false;
              this.message("修改成功", "success");
              this.search();
            } else {
              this.errorNotice(response.data.message);
            }
          })
          .catch(error => {
            this.loading = false;
            this.errorNotice("无法连接到服务器");
          });
      },

      selectGoodsType() {
        this.$http.get('http://localhost:8088/api/goodstype/search', {timeout: 3000})
          .then(response => {
            console.log(response);

            if (response.data.result == true) {
              this.options = response.data.data;
            } else {
              this.errorNotice(response.data.message);
            }
          })
          .catch(error => {
            console.log(error);
            this.errorNotice("无法连接到服务器");
          });
      },

      isSureDel(row) {
        if (row.number > 0) {
          this.$confirm('该商品尚有库存余量，确定删除吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.deleteGoods(row.gid);
          }).catch(() => {

          });
        } else {
          this.deleteGoods(row.gid);
        }
      },

      deleteGoods(gid) {
        this.loading = true;
        this.$http.get('http://localhost:8088/api/goods/delete', {params: {gId: gid}, timeout: 3000})
          .then(response => {
            console.log(response);
            this.loading = false;
            if (response.data.result == true) {
              this.message("删除成功", "success");
              this.search();
            } else {
              this.errorNotice(response.data.message);
            }
          })
          .catch(error => {
            this.loading = false;
            this.errorNotice("无法连接到服务器");
          });
      },

      handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
        console.log(`当前页: ${val}`);
      },

      message(text, type) {
        this.$message({
          message: text,
          type: type
        });
      },

      errorNotice(val) {
        this.$notify.error({
          title: '错误',
          message: val,
          duration: 0
        });
      },

      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
