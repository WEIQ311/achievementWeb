<template>
    <div id="login_page">
        <el-form class="login_form" :label-position="labelPosition" label-width="80px" :model="loginForm">
            <el-form-item label="用户名">
                <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="formLabelAlign.region"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="onLoginOut">登陆</el-button>
                <el-button>注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                labelPosition: 'right',
                loginForm: {
                    name: '',
                    region: ''
                }
            };
        },
        methods:{
            onLoginOut(){
                this.$router.push('/student')
            }
        }
    }
</script>

<style scoped>
#login_page{
    height: 100%;
    width: 100%;
    position: relative
}
.login_form{
    height: 335px;
    width: 300px;
    padding: 40px;
    background-size: cover;
    background: url(../../assets/login_bg.jpg) no-repeat;
    position: absolute;
    top: calc(50% - 126px);
    right: calc(50% - 230px);

}
</style>