<template>
    <div id="teacher_page">
        <head-nav></head-nav>
        <div class="teacher_container">
            <div class="teacher_aside">
                <el-menu
                        default-active="gradeManagement"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @select="handleSelect"
                        @close="handleClose"
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b">
                    <el-submenu index="studentGrade">
                        <template slot="title">
                            <i class="el-icon-search"></i>
                            <span>成绩查看</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="studentGrade">学生成绩</el-menu-item>
                            <el-menu-item index="classGrade">班级成绩</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item index="studentManagement">
                        <i class="el-icon-menu"></i>
                        <span slot="title">学生管理</span>
                    </el-menu-item>
                    <el-submenu index="classManagement">
                        <template slot="title">
                            <i class="el-icon-setting"></i>
                            <span>系统管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="classManagement">班级管理</el-menu-item>
                            <el-menu-item index="teacherManagement">教师管理</el-menu-item>
                            <el-menu-item index="semesterManagement">考试轮次</el-menu-item>
                            <el-menu-item index="subjectManagement">科目查看</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
                <!--<span v-for="item in menusArr" :class="spanClassArr[activeItem===item.value?1:0]" @click="menuClick(item.value)">{{item.name}}</span>-->
            </div>
            <div class="teacher_main">
            <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import headNav from '../comment/head'
    export default {
        name: "teacher",
        components:{'head-nav':headNav},
        data(){
            return{
                menusArr:[
                    {name:'成绩管理',value:'gradeManagement'},
                    {name:'学生管理',value:'studentManagement'},
                    {name:'用户管理',value:'userManagement'}
                ],
                spanClassArr:['','spanActive'],
                activeItem:'gradeSearch'
            }
        },
        mounted(){
            // this.onload()
        },
        methods:{
            onload(){
              this.$axiosF('scoreInfo','get',{},res=>{
                  // debugger
              },err=>{

              })
            },
            menuClick(record){
                this.activeItem=record;
                this.$router.push('/teacher/'+record)
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleSelect(key, keyPath) {
                this.$router.push('/teacher/'+key);
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        },


    }
</script>

<style scoped>
#teacher_page{
    height: 100%;
}
.teacher_container{
    height: calc(100% - 50px);
}
.teacher_aside{
    height: calc(100% - 10px);
    width: 240px;
    display: inline-block;
    background: rgb(84, 92, 100);
}
.teacher_aside span{
    display: inline-block;
    height: 35px;
    line-height: 35px;
    width:calc(100% - 15px);
    padding-left: 15px;
    cursor: pointer;
    color: #FFF;
}
.teacher_aside span:hover{
    color: #ffA500;
}
.spanActive{
    background: #2274c9;
}
.teacher_main{
    height: calc(100% - 10px);
    width: calc(100% - 242px);
    float: right;
}
</style>