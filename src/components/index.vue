<template>
  <el-container>
    <el-header height="80px">
      <el-row>
        <el-col :span="3">
          <div class="title">
            [ 趁时 ]
          </div>
        </el-col>
        <el-col :span="19">
          <div class="name">杂货店库存管理系统</div>
        </el-col>
        <el-col :span="2">
          <div class="user">
            <el-dropdown @command="handleCommand">
              <i class="el-icon-star-on" style="margin-right: 5px; color: #fff;"> 你好，{{ name }}</i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="0" disabled>修改资料</el-dropdown-item>
                <el-dropdown-item command="1" disabled>修改密码</el-dropdown-item>
                <el-dropdown-item command="2" divided>退出系统</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="160px">
        <el-menu router="true"
                 class="el-menu-vertical-demo">
          <el-menu-item v-for="authority in authorityList" :key="authority.id" :index="authority.path"><i :class="authority.icon"> {{authority.name}}</i></el-menu-item>


        </el-menu>
      </el-aside>

      <el-main>
        <router-view/>
      </el-main>
    </el-container>
    <el-footer height="20px">
      <hr/>
      <div>&copy; 2018 All Rights By CS.</div>
    </el-footer>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        name: '',
        authorityList: []
      }
    },

    created: function () {
      this.getAuthorityList();
      this.getCurrentUserName();
    },

    methods: {
      getAuthorityList() {
        this.$http.get('http://localhost:8088/api/authority/findAllByRole',
          {timeout: 3000})
          .then(response => {
            console.log(response);
            if (response.data.result == true) {
              this.authorityList = response.data.data;
            } else {
              this.errorNotice(response.data.message);
            }
          })
          .catch(error => {
            this.loading = false;
            this.errorNotice("无法连接到服务器");
          });
      },

      getCurrentUserName() {
        this.$http.get('http://localhost:8088/api/user/getCurrentUser',
          {timeout: 3000})
          .then(response => {
            console.log(response);
            if (response.data.result == true) {
              this.name = response.data.data.name;
            } else {
              this.errorNotice(response.data.message);
            }
          })
          .catch(error => {
            this.loading = false;
            this.errorNotice("无法连接到服务器");
          });
      },

      handleCommand(command) {
        if (command == 2) {
          this.isTrue();
        }
      },

      isTrue() {
        this.$confirm('确定退出系统?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.logout();
        }).catch(() => {

        });
      },

      logout() {
        this.$http.get('http://localhost:8088/api/system/logout', {timeout: 3000});
        this.$router.push({name: 'login'});
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

<style scoped>
  .el-header {
    background-color: #145ccd;
    color: #fff;
    text-align: left;
    line-height: 80px;
  }

  .el-aside {
    color: #333;
    padding-top: 30px;
  }

  .el-footer {
    position: absolute;
    width: 100%;
    bottom: 30px;
  }

  .el-menu-item {
    text-align: left;
  }

  .el-main {
    text-align: left;
  }

  .title {
    font-size: 40px;
  }

  .name {
    position: relative;
    top: 8px;
  }

  .user {
    position: relative;
    top: 8px;
    text-align: end;

  }
</style>
