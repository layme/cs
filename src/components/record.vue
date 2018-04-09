<template>
  <div>
    <el-form :inline="true" :model="stockDto" class="demo-form-inline">
      <el-form-item label="商品编号">
        <el-input v-model="stockDto.gid" placeholder="请在此输入商品编号" clearable style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="stockDto.checkDate"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyyMMdd"
          value-format="yyyyMMdd">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <hr/>
    <el-table stripe v-loading="loading" element-loading-text="拼命加载中"
              :data="stockData"
              style="width: 100%"
              height="500" size="mini">
      <el-table-column
        prop="rid"
        label="流水号">
      </el-table-column>
      <el-table-column
        prop="gid"
        label="商品编号">
      </el-table-column>
      <el-table-column
        prop="modification"
        label="操作">
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注">
      </el-table-column>
      <el-table-column
        prop="uid"
        label="操作人">
      </el-table-column>
      <el-table-column
        prop="modTime"
        label="操作时间">
      </el-table-column>
    </el-table>
    <el-pagination style="text-align: right"
                   layout="prev, pager, next, total"
                   :total="total">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loading: false,
        total: 0,

        stockDto: {
          gid: '',
          checkDate: ''
        },

        stockData: []
      }
    },
    methods: {
      onSubmit() {
        this.loading = true;
        this.$http.get('http://localhost:8088/api/record/search', {params: {
          gid: this.stockDto.gid,
          startDate: this.stockDto.checkDate[0],
          endDate: this.stockDto.checkDate[1]
        }, timeout: 3000})
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
