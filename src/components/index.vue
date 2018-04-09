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
          <div class="setting">
            <el-dropdown @command="handleCommand">
              <i class="el-icon-setting" style="margin-right: 5px; color: #fff;"> 设 置</i>
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
          <el-menu-item index="/stock"><i class="el-icon-search"> 库存查询</i></el-menu-item>
          <el-menu-item index="/input"><i class="el-icon-download"> 商品入库</i></el-menu-item>
          <el-menu-item index="/output"><i class="el-icon-upload2"> 商品出库</i></el-menu-item>
          <el-menu-item index="/registry"><i class="el-icon-edit-outline"> 商品注册</i></el-menu-item>
          <el-menu-item index="/record"><i class="el-icon-tickets"> 出入记录</i></el-menu-item>
          <el-menu-item index="/user"><i class="el-icon-menu"> 用户管理</i></el-menu-item>

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

  .setting {
    position: relative;
    top: 8px;
    text-align: end;

  }
</style>

<script>
  export default {
    methods: {
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
      }
    }
  }
</script>
