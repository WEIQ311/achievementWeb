<template>
    <div id="studentMan_page">
        <div class="headSearch">
            <el-form class="search_form"   label-width="50px" :model="searchForm" :inline="true">
                <el-form-item label="姓名" >
                    <el-input v-model="searchForm.studentName" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="学号" >
                    <el-input v-model="searchForm.studentNum"  size="mini"></el-input>
                </el-form-item>
                <el-form-item label="班级" >
                    <el-select v-model="searchForm.classId"  size="mini" >
                        <el-option :value="item.classId" :key="item.classId" :label="item.gradeClassName" v-for="item in classArrData"></el-option>
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
                        prop="studentName"
                        label="姓名">
                </el-table-column>
                <el-table-column
                        prop="studentNum"
                        label="学号">
                </el-table-column>
                <el-table-column
                        prop="classId"
                        :formatter="classNameFormatter"
                        label="班级">
                </el-table-column>
                <el-table-column
                        width="260"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleConnet(scope.$index, scope.row)">联系人</el-button>
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
        <el-dialog :title='addFlag?"新增":"修改"' :visible.sync="dialogAddVisible" @close="addStudentClose">
            <el-form :model="addForm">
                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="addForm.studentName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="学号" :label-width="formLabelWidth">
                    <el-input v-model="addForm.studentNum" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="班级" :label-width="formLabelWidth">
                    <el-select v-model="addForm.classId" >
                        <el-option :value="item.classId" :key="item.classId" :label="item.gradeClassName" v-for="item in classArrData"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="">取 消</el-button>
                <el-button type="primary" @click="onSubmit">确 定</el-button>
            </div>
        </el-dialog>
     <!--   <el-dialog title="联系人" :visible.sync="dialogAddVisible" @close="addStudentClose">
            <el-form :model="contactsForm">
                <el-form-item label="父亲" :label-width="formLabelWidth">
                    <el-input v-model="contactsForm.studentName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="母亲" :label-width="formLabelWidth">
                    <el-input v-model="contactsForm.studentNum" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="父亲联系方式" :label-width="formLabelWidth">
                </el-form-item>
                <el-form-item label="母亲联系方式" :label-width="formLabelWidth">
                </el-form-item>

                <el-form-item label="家庭地址" :label-width="formLabelWidth">
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="">取 消</el-button>
                <el-button type="primary" @click="onSubmit">确 定</el-button>
            </div>
        </el-dialog>-->
    </div>
</template>

<script>
    export default {
        name: "student-management",
        data(){
            return{
                formLabelWidth:'80px',
                searchForm:{
                    studentName:'',
                    studentNum:'',
                    classId:''
                },
                addForm:{
                    studentName: '',
                    studentNum: '',
                    studentId: '',
                    classId: ''
                },
                contactsForm:{

                },
                tableData: [],
                classArrData: [],
                classArrDataObj:{},
                dialogAddVisible:false,
                addFlag:true
            }
        },
        mounted(){
            this.queryStudentData();
            this.queryClassData();
        },
        methods:{
            //翻译班级
            classNameFormatter(val){
                return this.classArrDataObj[val.classId]||'';
            },
            //获取学生列表
            queryStudentData(studentName,studentNum){
                this.tableData=[];
                this.$axiosF('studentInfo/list','get',{studentName:studentName||'',studentNum:studentNum||''},res=>{
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
            //获取班级
            queryClassData(){
                this.classArrData=[];
                this.$axiosF('classInfo/list','get',{},res=>{
                    if(res.data.success){
                        this.classArrData=res.data.data;
                        let obj={};
                        res.data.data.forEach(item=>{
                            obj[item.classId]=item.gradeClassName;
                        });
                        this.classArrDataObj=obj;
                    }else{
                        this.$alert(res.data.message, '错误提示', {
                            confirmButtonText: '确定'})
                    }
                },err=>{
                    this.$alert(err.message, '错误提示', {
                        confirmButtonText: '确定'})
                })
            },
            //关闭
            addStudentClose(){
                this.dialogFormVisible = false;
                this.addFlag = true;
                this. addForm={
                    studentName: '',
                    studentNum: '',
                    studentId: '',
                    classId: ''
                }
            },
            onSubmit(){
                let url='';
                if(this.addFlag){
                    url='studentInfo/insert'
                }else{
                    url='studentInfo/update'
                }
                this.$axiosF(url,'post',this.addForm,res=>{
                    if(res.data.success){
                        // this.tableData=res.data.data
                        this.$message({
                            showClose: true,
                            message: res.data.message,
                            type: 'success'
                        });
                        this.queryStudentData();
                        this.dialogAddVisible = false
                    }else{
                        this.$alert(res.data.message, '错误提示', {
                            confirmButtonText: '确定'})
                    }

                },err=>{
                    this.$alert(err.message, '错误提示', {
                        confirmButtonText: '确定'})
                });
            },
            onSearch(){
                this.queryStudentData(this.searchForm.studentName,this.searchForm.studentNum)

            },
            onAdd(){
                this.dialogAddVisible=true;
                this.addFlag=true
            },
            handleDelete(index,row){
                this.$axiosF('studentInfo/deleteByIds','post',{ids:[row.studentId]},res=>{
                    if(res.data.success){
                        this.$message({
                            showClose: true,
                            message: res.data.message,
                            type: 'success'
                        });
                        this.queryStudentData()
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
                this. addForm={
                    studentName: row.studentName,
                    studentNum: row.studentNum,
                    studentId: row.studentId,
                    classId: row.classId,
                    telPhone: row.telPhone
                };
            },
            // 学生联系人
            handleConnet(index,row){

            }
        }
    }
</script>

<style scoped>
    #studentMan_page{
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