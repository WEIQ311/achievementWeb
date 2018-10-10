<template>
    <div id="teacherMan_page">
        <div class="headSearch">
            <el-form class="search_form"   label-width="50px" :model="searchForm" :inline="true">
                <el-form-item label="姓名" :label-width="formLabelWidth" >
                    <el-input v-model="searchForm.teacherName" autocomplete="off" size="mini"></el-input>
                </el-form-item>   
                <el-form-item label="教师编号" :label-width="formLabelWidth" >
                    <el-input v-model="searchForm.teacherNum" autocomplete="off" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="教师职责" :label-width="formLabelWidth" >
                    <el-select v-model="searchForm.teacherDuty" size="mini">
                        <el-option label="全部" value="" ></el-option>
                        <el-option label="管理员" value="0" ></el-option>
                        <el-option label="班主任" value="1" ></el-option>
                        <el-option label="教师" value="2" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="科目" :label-width="formLabelWidth" >
                    <el-select v-model="searchForm.subjectId" size="mini">
                        <el-option :label="item.subjectName" :value="item.subjectId" :key="item.subjectId" v-for="item in subjectArr"></el-option>
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
                        prop="teacherName"
                        label="姓名">
                </el-table-column>
                <el-table-column
                        prop="teacherNum"
                        label="教师编号">
                </el-table-column>
                <el-table-column
                        prop="teacherDuty"
                        :formatter="teacherDutyFormatter"
                        label="教师职责">
                </el-table-column>
                <el-table-column
                        prop="subjectId"
                        :formatter="subjectIdFormatter"
                        label="科目">
                </el-table-column>
                <el-table-column
                        prop="telPhone"
                        label="联系方式">
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
        <el-dialog :title='addFlag?"新增":"修改"' :visible.sync="dialogAddVisible" @close="addTeacherClose">
            <el-form :model="addForm">
                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="addForm.teacherName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="教师编号" :label-width="formLabelWidth">
                    <el-input v-model="addForm.teacherNum" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="教师职责" :label-width="formLabelWidth">
                    <el-select v-model="addForm.teacherDuty">
                        <el-option label="管理员" value="0" ></el-option>
                        <el-option label="班主任" value="1" ></el-option>
                        <el-option label="教师" value="2" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="科目" :label-width="formLabelWidth">
                    <el-select v-model="addForm.subjectId">
                        <el-option :label="item.subjectName" :value="item.subjectId" :key="item.subjectId" v-for="item in subjectArr"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="联系方式" :label-width="formLabelWidth">
                    <el-input v-model="addForm.telPhone" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addTeacherClose">取 消</el-button>
                <el-button type="primary" @click="onSubmit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "teacher-management",
        data(){
            return{
                formLabelWidth:'80px',
                searchForm:{
                    teacherName:'',
                    teacherDuty:'',
                    subjectId:'',
                    teacherNum:''
                },
                addForm:{
                    teacherName: '',
                    teacherNum: '',
                    subjectId: '',
                    teacherDuty: '2',
                    telPhone: ''
                },
                tableData: [{
                    teacherName: '李老师',
                    userRole: '管理员',
                    subjectId: '化学',
                    telPhone: '17600000000'
                },{
                    teacherName: '张老师',
                    userRole: '班主任',
                    subjectId: '物理',
                    telPhone: '17600000001'
                },{
                    teacherName: '王老师',
                    userRole: '老师',
                    subjectId: '语文',
                    telPhone: '17600000000'
                }],
                subjectArr:[],
                subjectArrObj:{},
                dialogAddVisible:false,
                addFlag:true
            }
        },
        mounted(){
            this.queryTeacherData();
            this.querySubjectData();
        },
        methods:{
            //教师教师翻译
            teacherDutyFormatter(val){
                let newVal='';
                switch (val.teacherDuty){
                    case  '1':
                        newVal= '班主任';
                        break;
                    case '2':
                        newVal='教师';
                        break;
                    case '0':
                        newVal='管理员';
                        break;
                    default :
                        newVal = "其他";
                        break;

                }
                return newVal;
            },
            //科目翻译
            subjectIdFormatter(val){
                return this.subjectArrObj[val.subjectId]
            },
            //获取科目列表
            querySubjectData(){
                this.subjectArr=[];
                this.$axiosF('subjectInfo/list','get',{},res=>{
                    if(res.data.success){
                        this.subjectArr=res.data.data;
                        let  obj={};
                        res.data.data.forEach(item=>{
                            obj[item.subjectId]=item.subjectName
                        });
                        this.subjectArrObj=obj;
                    }else{
                        this.$alert(res.data.message, '错误提示', {
                            confirmButtonText: '确定'})
                    }
                },err=>{
                    this.$alert(err.data.message, '错误提示', {
                        confirmButtonText: '确定'})
                })
            },
            //获取教师列表
            queryTeacherData(record){
                this.tableData=[];
                this.$axiosF('teacherInfo/list','get',{teacherName:record.teacherName||'',teacherDuty:record.teacherDuty||'',teacherNum:record.teacherNum||''},res=>{
                    if(res.data.success){
                        this.tableData=res.data.data
                    }else{
                        this.$alert(res.data.message, '错误提示', {
                            confirmButtonText: '确定'})
                    }
                },err=>{
                    this.$alert(err.data.message, '错误提示', {
                        confirmButtonText: '确定'})
                })
            },
            onSubmit(){
                let url='';
                if(this.addFlag){
                    url='teacherInfo/insert'
                }else{
                    url='teacherInfo/update'
                }
                this.$axiosF(url,'post',this.addForm,res=>{
                    if(res.data.success){
                        // this.tableData=res.data.data
                        this.$message({
                            showClose: true,
                            message: res.data.message,
                            type: 'success'
                        });
                        this.queryTeacherData();
                        this.dialogAddVisible = false
                    }else{
                        this.$alert(res.data.message, '错误提示', {
                            confirmButtonText: '确定'})
                    }

                },err=>{
                    this.$alert(err.data.message, '错误提示', {
                        confirmButtonText: '确定'})
                });
            },
            onSearch(){
                this.queryTeacherData(this.searchForm.teacherName,this.searchForm.teacherDuty,this.searchForm.teacherNum)

            },
            onAdd(){
                this.dialogAddVisible=true;
                this.addFlag=true
            },
            addTeacherClose(){
                this.dialogAddVisible = false;
                this.addFlag=true;
                this.addForm={
                    teacherName: '',
                    teacherNum: '',
                    teacherDuty: '',
                    teacherId: '',
                    subjectId: '',
                    telPhone: ''
                };

            },
            handleDelete(index,row){
                this.$axiosF('teacherInfo/deleteByIds','post',{ids:[row.teacherId]},res=>{
                    if(res.data.success){
                        this.$message({
                            showClose: true,
                            message: res.data.message,
                            type: 'success'
                        });
                        this.queryTeacherData()
                    }else{
                        this.$alert(res.data.message, '错误提示', {
                            confirmButtonText: '确定'})
                    }
                },err=>{
                    this.$alert(err.data.message, '错误提示', {
                        confirmButtonText: '确定'})
                })
            },
            handleEdit(index,row){
                this.addFlag=false;
                this.dialogAddVisible=true;
                this.addForm={
                    teacherName: row.teacherName,
                        teacherNum: row.teacherNum,
                        teacherDuty: row.teacherDuty,
                        teacherId: row.teacherId,
                        subjectId: row.subjectId,
                        telPhone: row.telPhone
                };
            }
        }
    }
</script>

<style scoped>
    #teacherMan_page{
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

</style>