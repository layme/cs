<template>
  <div v-loading="loading" element-loading-text="后台拼命处理中...">

    <el-row>
      <el-col :span="21">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="用户编号">
            <el-input v-model="uid" placeholder="请在此输入用户编号" clearable style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="3">
        <el-button type="success" round icon="el-icon-circle-plus" @click="addFormVisible = true">新增用户
        </el-button>
      </el-col>
    </el-row>

    <hr/>

    <el-table stripe
              :data="userData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
              style="width: 100%"
              height="485" size="mini">
      <el-table-column
        prop="uid"
        label="用户编号">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别">
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="role"
        label="系统角色">
      </el-table-column>
      <el-table-column
        prop="regTime"
        label="添加时间">
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
            <el-button @click="deleteClick(scope.row)" type="text" icon="el-icon-delete" size="small"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination style="text-align: right"
                   @current-change="handleCurrentChange"
                   :page-size="pageSize"
                   :current-page="currentPage"
                   layout="prev, pager, next, total"
                   :total="userData.length">
    </el-pagination>

    <el-dialog title="新增用户" :visible.sync="addFormVisible">
      <el-form :model="userVO" ref="addUserForm" class="demo-form-inline" label-width="100px" style="width: 90%">
        <el-form-item label="用户ID" prop="uId">
          <el-input v-model="userVO.uId" placeholder="系统自动生成用户编号，无需填写" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="userVO.name" placeholder="姓名" clearable></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="userVO.sex">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="年龄" prop="age">
              <el-input v-model="userVO.age" placeholder="年龄" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="userVO.phone" placeholder="手机号" clearable></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="userVO.role">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="userVO.password" placeholder="密码" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addUser">提交</el-button>
          <el-button @click="resetForm('addUserForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="编辑用户" :visible.sync="editFormVisible">
      <el-form :model="userVO" ref="editUserForm" class="demo-form-inline" label-width="100px" style="width: 90%">
        <el-form-item label="用户ID" prop="uId">
          <el-input v-model="userVO.uId" placeholder="" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="userVO.name" placeholder="姓名" clearable></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="userVO.sex">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="年龄" prop="age">
              <el-input v-model="userVO.age" placeholder="年龄" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="userVO.phone" placeholder="手机号" clearable></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="userVO.role">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="editUser">提交</el-button>
          <el-button @click="resetForm('editUserForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>

  import ElRow from "element-ui/packages/row/src/row";

  export default {
    components: {ElRow},
    data() {
      return {
        loading: false,
        addFormVisible: false,
        editFormVisible: false,

        pageSize: 10,
        currentPage: 1,

        uid: '',

        value3: '',

        userData: [],

        userVO: {
          uId: '',
          name: '',
          sex: '男',
          age: '',
          phone: '',
          role: 'ghost',
          regTime: '',
          password: ''
        },

        options: [{
          value: 'ghost',
          label: '普通用户'
        }, {
          value: 'admin',
          label: '管理员'
        }]
      }
    },

    methods: {
      search() {
        this.loading = true;
        this.$http.get('http://localhost:8088/api/user/search',
          {
            params: {uId: this.uid, pageSize: this.pageSize, currentPage: this.currentPage},
            timeout: 3000
          })
          .then(response => {
            console.log(response);
            this.loading = false;
            if (response.data.result == true) {
              this.userData = response.data.data;
            } else {
              this.errorNotice(response.data.message);
            }
          })
          .catch(error => {
            this.loading = false;
            this.errorNotice("无法连接到服务器");
          });
      },

      addUser() {
        this.loading = true;
        this.$http.get('http://localhost:8088/api/user/add', {
          params: {
            name: this.userVO.name,
            sex: this.userVO.sex,
            age: this.userVO.age,
            phone: this.userVO.phone,
            role: this.userVO.role,
            password: this.userVO.password
          }, timeout: 3000
        })
          .then(response => {
            console.log(response);
            this.loading = false;
            if (response.data.result == true) {
              this.userVO.uId = response.data.data.uid;
              this.message("保存成功，请记下用户编号", "success");
            } else {
              this.errorNotice(response.data.message);
            }
          })
          .catch(error => {
            this.loading = false;
            this.errorNotice("无法连接到服务器");
          });
      },

      editUser() {
        this.loading = true;
        this.$http.get('http://localhost:8088/api/user/update', {
          params: {
            uId: this.userVO.uId,
            name: this.userVO.name,
            sex: this.userVO.sex,
            age: this.userVO.age,
            phone: this.userVO.phone,
            role: this.userVO.role,
            regTime: this.userVO.regTime
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

      editClick(row) {
        this.userVO.uId = row.uid;
        this.userVO.name = row.name;
        this.userVO.sex = row.sex;
        this.userVO.age = row.age;
        this.userVO.phone = row.phone;
        this.userVO.role = row.role;
        this.userVO.regTime = row.regTime;
        this.editFormVisible = true;
      },

      deleteClick(row) {
        this.loading = true;
        this.$http.get('http://localhost:8088/api/user/delete', {params: {uId: row.uid}, timeout: 3000})
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
