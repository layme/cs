<template>
  <div class="signin">
    <el-row>
      <el-col :span="6">
        <div class="grid-content"></div>
      </el-col>
      <el-col :span="7">
        <div class="grid-content">
          <div class="logopanel">
            <h1>[ 趁时 ]</h1>
          </div>
          <h4>欢迎使用 <strong>杂货店库存管理系统</strong></h4>
          <ul>
            <li>专 业</li>
            <li>便 捷</li>
            <li>舒 适</li>
            <li>清 晰</li>
            <li>放 心</li>
          </ul>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="grid-content">
          <h4 style="font-size: 20px">登录：</h4>
          <p>登录到趁时杂货店库存管理系统</p>

          <el-form v-model="login" ref="login" :model="form" label-width="80px">

            <div class="demo-input-suffix">
              <el-input class="mb" placeholder="请在此输入账号" suffix-icon="el-icon" v-model="login.uid"/>
            </div>
            <div class="demo-input-suffix">
              <el-input type="password" class="mb" placeholder="请在此输入密码" suffix-icon="el-icon" v-model="login.password"/>
            </div>

            <el-button class="mb" type="primary" @click="onSubmit">登 录</el-button>

          </el-form>


        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content"></div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="6">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="12">
        <div class="line">&copy; 2018 All Rights By CS.</div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        login: {
          uid: '',
          password: ''
        },

        result: ''
      }
    },
    methods: {
      onSubmit() {
        console.log(this.login);
        this.$http.get('http://localhost:8088/api/system/login', {params: {uid: this.login.uid, password: this.login.password}, timeout: 3000})
          .then(response => {
            this.result = response.data.result;
            this.loading = false;
            if (this.result == true) {
              this.$router.push({name: 'index'});
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
      }
    }
  }
</script>

<style scoped>
  .signin {
    position: absolute;
    top: 0px;
    left: 0px;
    display: block;
    background: #18c8f6;
    height: 100%;
    width: 100%;
    background: url("../assets/login-background.jpg") no-repeat center center;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    color: rgba(255, 255, 255, .95);
  }

  .el-row {
    top: 150px;
  }

  .mb {
    margin-top: 8px;
    margin-bottom: 8px;
    padding: -6px;
  }

  .el-button {
    width: 100%;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    height: 300px;
    text-align: left;
  }

  .logopanel {
    float: none;
    width: auto;
    padding: 0;
    background: none;
  }

  ul {
    list-style: none;
    padding: 0;
    padding: 10px;
    margin-left: 15px;
  }

  ul li {
    margin: 10px;
  }

  .line {
    border-top: 1px solid;
    padding: 10px;
    text-align: left;
  }
</style>
