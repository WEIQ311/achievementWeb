<template>
    <div id="head_page">
        <span class="logo_head">成绩查询</span>
        <span>欢迎{{userName}}</span>
        <span>退出 <i class="el-icon-setting"></i></span>
    </div>
</template>

<script>
    export default {
        name: "login_head",
        data(){
            return{
                userName:'admin'
            }
        }
    }
</script>

<style scoped>
#head_page{
    height: 50px;
    line-height: 50px;
    background: #409EFF;
    color: #fff;
    font-size: 18px;
    text-align: right;
    padding-right: 20px;
}
    .logo_head{
        float: left;
        margin-left: 20px;
    }
</style>