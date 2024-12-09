<template>
<div class="body">
  <div class="content">     
    <div class="title">
    面向舆情态势感知的跨模态知识推理系统
    </div>
  <div class="login-container">
    <h3 class="login-header">系统登录</h3>
    <el-form :model="form" :rules="rules" ref="form" label-width="70px">
      <el-form-item label="用户名" prop='username'>
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码"  prop='password'>
        <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="sumbit" style="`margin-top:10px;" type="primary">登录</el-button>
        <el-button style="`margin-top:10px; margin-left: 30px" >取消</el-button>
      </el-form-item>
    </el-form>
</div>
  </div>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
// 导入api接口
import { getMenu } from '@/api'

export default {
  name: 'my-login',
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 提交进行身份认证 同时进行权限设置
    sumbit () {
      // 先校验输入的数据是否合法
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 合法的话 到数据库后 进行后端验证 返回给我们一个token
          getMenu(this.form).then(({ data }) => {
            // 成功的回调 获取到服务器返回给的数据 要判断是否请求成功
            if (data.code === 20000) {
              const token = data.data.token
              // 将token放入cookies中 JWT认证机制
              Cookie.set('token', token)
              // 验证成功然后跳转页面
              // 但是跳转的页面 所看到的东西是不同的 但是所能看到的东西 是在数据库存储的不一样的
              // 首先跳转的时候 需要传参
              // 先获取menu 路由的信息
              const menu = data.data.menu
              // 传到store里面 派发一个action 加载荷
              this.$store.dispatch('dealMenu', menu)
              // 但是其实并不需要 修改state
              // 在跳转之前 要动态的注册路由 派发一个action 同时传入一个载荷
              this.$store.dispatch('addMenu', this.$router)
              // 跳转的时候push要响应式的读取menu
              this.$router.push('/home')
            } else {
              // 错误提示
              this.$message({
                showClose: true,
                message: data.data.message,
                type: 'error'
              })
            }
          })
        }
      })
      // //后端提供token信息
      // //用mock随机生成token 存放于cookies
      // const token = Mock.Random.guid();
      // Cookie.set('token',token);
      // //获得信息认证后 就跳转到home
      // this.$router.push('/home');
    }
  }
}
</script>

<style lang='less' scoped>
.body {
  display:flex;
  background-image: url(@/assets/background.jpg);
  background-repeat: repeat;
  height: 100vh;
  width: 100vw;
  background-color: #464646;
  background-size: cover;
}
.title {
  margin-left: 20px;  
  font-family: 'STZhongsong', sans-serif; 
  color: white; 
  font-size: 38px; 
  width: 480px;
  text-align: center;
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
  width: 1000vw;
} 
.login-container {
  border:1px solid #eaeaea;
  margin-top: 20px ;
  border-radius: 15px;
  background-color: #fff;
  box-shadow: 0 0 25px #cac6c6;
  padding: 35px 35px 15px 35px;
  box-sizing: border-box;
  .login-header {
    text-align: center;
    margin-bottom: 40px;
    color: #505458;
  }
  .el-input{
    width: 198px;;
  }
}
</style>
