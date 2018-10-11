<template>
    <div id="classMan_page">
        <div class="headSearch">
            <el-form class="search_form"   label-width="50px" :model="searchForm" :inline="true">
                <el-form-item label="年级" >
                    <el-select v-model="searchForm.gradeId" size="mini">
                        <el-option value="" key="0" label="全部"></el-option>
                        <el-option value="1" key="1" label="高一"></el-option>
                        <el-option value="2" key="2" label="高二"></el-option>
                        <el-option value="3" key="3" label="高三"></el-option>
                    </el-select>
                </el-form-item>
                <div style="display: inline-block;height: 40px;line-height: 40px">
                    <el-button @click="onSearch"  size="mini">查询</el-button>
                    <el-button @click="onAdd"  size="mini">新增</el-button>
                </div>
            </el-form>
        </div>
        <div class="searchMain">
            <el-table
                    :data="tableData"
                    stripe
                    border
                    height="100%"
                    style="width: 100%">
                <el-table-column
                        type="index"
                        width="50"
                        label="序号">
                </el-table-column>
                <el-table-column
                        prop="gradeName"
                        label="年级">
                </el-table-column>
                <el-table-column
                        prop="yearInfo.yearName"
                        label="学期">
                </el-table-column>
                <el-table-column
                        prop="examTime"
                        label="考试时间">
                </el-table-column>
                <el-table-column
                        prop="semesterName"
                        label="考试轮次">
                </el-table-column>
                <el-table-column
                        prop="scoreBeginDeadline"
                        label="录入成绩开始时间">
                </el-table-column>
                <el-table-column
                        prop="scoreEndDeadline"
                        label="录入成绩结束时间">
                </el-table-column>
                <el-table-column
                        width="150"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog :title="addFlag?'新增':'修改'" :visible.sync="dialogAddVisible" @close="onCancle">
            <el-form :model="addForm" label-width="150px">
                <el-form-item label="年级" >
                    <el-select v-model="addForm.gradeId">
                        <el-option value="1" key="1" label="高一"></el-option>
                        <el-option value="2" key="2" label="高二"></el-option>
                        <el-option value="3" key="3" label="高三"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="学期" >
                    <el-select v-model="addForm.yearId">
                        <el-option value="1" key="1" label="上半学期"></el-option>
                        <el-option value="2" key="2" label="下半学期"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="考试日期" >
                    <el-date-picker
                            v-model="addForm.examTime"
                            type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="成绩录入开始时间" >
                    <el-date-picker
                            v-model="addForm.scoreBeginDeadline"
                            type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="成绩录入结束时间" >
                    <el-date-picker
                            v-model="addForm.scoreEndDeadline"
                            type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="考试轮次" >
                    <el-input v-model="addForm.semesterName"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="onCancle">取 消</el-button>
                <el-button type="primary" @click="onSubmit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "semester-management",
        data(){
            return{
                formLabelWidth:'80px',
                searchForm:{
                    gradeId:''
                },
                addForm:{
                    gradeId: '',
                    semesterName:'',
                    scoreBeginDeadline:'',
                    scoreEndDeadline:'',
                    semesterId:'',
                    yearId:'',
                    examTime:''
                },
                tableData: [],
                teacherArr: [],
                dialogAddVisible:false,
                addFlag:true,
            }
        },
        mounted(){
            this.querySemesterInfo({});
        },
        methods:{
            //获取轮次列表数据
            querySemesterInfo(record){
                this.tableData=[];
                this.$axiosF('semesterInfo/list','get',{gradeId:record.gradeId||''},res=>{
                    if(res.data.success){
                        this.tableData=res.data.data
                    }else{
                        this.$alert(res.data.message, '错误提示', {
                            confirmButtonText: '确定'})
                    }
                },err=>{
                    this.$alert(err.message, '错误提示', {
                        confirmButtonText: '确定'})
                })

            },
            onSearch(){
                this.querySemesterInfo(this.searchForm)
            },
            onAdd(){
                this.addFlag=true;
                this.dialogAddVisible=true;
            },
            onSubmit(){
                let url='';
                if(this.addFlag){
                    url='semesterInfo/insert'
                }else{
                    url='semesterInfo/update'
                }
                this.$axiosF(url,'post',this.addForm,res=>{
                    if(res.data.success){
                        this.dialogAddVisible = false;
                        // this.tableData=res.data.data
                        this.querySemesterInfo({});
                    }else{
                        this.$alert(res.data.message, '错误提示', {
                            confirmButtonText: '确定'})
                    }

                },err=>{
                    this.$alert(err.message, '错误提示', {
                        confirmButtonText: '确定'})
                });
            },
            onCancle(){
                this.addForm={
                    gradeId: '',
                    yearId: '',
                    semesterName:'',
                    semesterId:'',
                    scoreBeginDeadline:'',
                    scoreEndDeadline:'',
                    examTime:''
                };
                this.dialogAddVisible = false
            },
            onImport(){

            },
            onDownLoad(){

            },
            handleDelete(index,row){
                this.$axiosF('semesterInfo/deleteByIds','post',{ids:[row.semesterId]},res=>{
                    if(res.data.success){
                        this.querySemesterInfo({})
                    }else{
                        this.$alert(res.data.message, '错误提示', {
                            confirmButtonText: '确定'})
                    }
                },err=>{
                    this.$alert(err.message, '错误提示', {
                        confirmButtonText: '确定'})
                })
            },
            handleEdit(index,row){
                this.addFlag=false;
                this.dialogAddVisible=true;
                this.addForm={
                    gradeId: row.gradeId,
                    yearId: row.yearId,
                    semesterId: row.semesterId,
                    semesterName: row.semesterName,
                    scoreBeginDeadline: row.scoreBeginDeadline,
                    scoreEndDeadline: row.scoreEndDeadline,
                    examTime: row.examTime
                };
            }
        }
    }
</script>

<style scoped>
    #classMan_page{
        height: 100%;
    }
    .headSearch{
        height: 41px;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .searchMain{
        height: calc(100% - 62px);
        background: green;
    }

</style>
<style>
    #classMan_page .el-form-item__content{
        width: 80%!important;
    }
    #classMan_page select{
        width: 80%!important;
    }
</style>