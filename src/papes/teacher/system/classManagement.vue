<template>
    <div id="classMan_page">
        <div class="headSearch">
            <el-form class="search_form"   label-width="50px" :model="searchForm" :inline="true">
                <el-form-item label="年级" >
                    <el-select v-model="searchForm.gradeId" size="mini">
                        <el-option value="1" key="1" label="高一"></el-option>
                        <el-option value="2" key="2" label="高二"></el-option>
                        <el-option value="3" key="3" label="高三"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="班级分类" >
                    <el-select v-model="searchForm.classType" size="mini">
                        <el-option value="1" key="1" label="理科"></el-option>
                        <el-option value="2" key="2" label="文科"></el-option>
                        <el-option value="3" key="3" label="未分科"></el-option>
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
                        prop="gradeInfo.gradeName"
                        label="年级">
                </el-table-column>
                <el-table-column
                        prop="gradeClassName"
                        label="班级名称">
                </el-table-column>
                <el-table-column
                        prop="teacherName"
                        label="班主任">
                </el-table-column>
                <el-table-column
                        prop="classType"
                        :formatter="classTypeFormatter"
                        label="班级分类">
                </el-table-column>
                <el-table-column
                        prop="studentCount"
                        label="班级人数">
                </el-table-column>
                <el-table-column
                        width="240"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleSelect(scope.$index, scope.row)">教师选配</el-button>
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
        <el-dialog :title='addFlag?"新增":"修改"' :visible.sync="dialogAddVisible" @close="addClassClose">
            <el-form :model="addForm" label-width="80px">
                <el-form-item label="年级" >
                    <el-select v-model="addForm.gradeId" size="mini">
                        <el-option value="1" key="1" label="高一"></el-option>
                        <el-option value="2" key="2" label="高二"></el-option>
                        <el-option value="3" key="3" label="高三"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="班级分类" >
                    <el-select v-model="addForm.classType" size="mini">
                        <el-option value="1" key="1" label="理科"></el-option>
                        <el-option value="2" key="2" label="文科"></el-option>
                        <el-option value="3" key="3" label="未分科"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="班级名称" :label-width="formLabelWidth">
                    <el-input v-model="addForm.className" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="班主任" :label-width="formLabelWidth">
                    <el-select v-model="addForm.teacherId" size="mini">
                        <el-option :value="item.teacherId" :key="item.teacherId" :label="item.teacherName" v-for="item in teacherArr"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="onCancle">取 消</el-button>
                <el-button type="primary" @click="onSubmit">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="教师选配" :visible.sync="dialogAddTeacherVisible">
            <el-form :model="addTeacherForm" label-width="80px">
                <el-form-item label="语文" :label-width="formLabelWidth" >
                    <el-input v-model="addForm.className" autocomplete="off"></el-input>
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
        name: "grade-add",
        data(){
            return{
                formLabelWidth:'80px',
                searchForm:{
                    gradeName:'',
                    classType:''
                },
                addForm:{
                    gradeId: '',
                    className: '',
                    classId: '',
                    teacherId: '',
                    classType: ''
                },
                addTeacherForm:{
                    className:''
                },
                tableData: [],
                teacherArr: [],
                dialogAddVisible:false,
                dialogAddTeacherVisible:false,
                addFlag:true,
            }
        },
        mounted(){
            this.queryClass();
            this.queryTeacherId();
        },
        methods:{
            //班级分类翻译
            classTypeFormatter(val){
                let newVal='';
                switch (val.classType){
                    case  '1':
                        newVal= '理科';
                    break;
                    case '2':
                    newVal='文科';
                    break;
                    default :
                        newVal = "未分科";
                    break;

                }
                return newVal;
            },
            //获取班级列表数据
            queryClass(gradeId,classType){
                this.tableData=[];
                this.$axiosF('classInfo/list','get',{gradeId:gradeId||'',classType:classType||''},res=>{
                    if(res.data.success){
                        this.tableData=res.data.data;
                    }else{
                        this.$alert(res.data.message, '错误提示', {
                            confirmButtonText: '确定'})
                    }
                },err=>{
                    this.$alert(err.data.message, '错误提示', {
                        confirmButtonText: '确定'})
                })

            },
            //获取班主任下拉框数据
            queryTeacherId(){
                this.teacherArr=[];
                this.$axiosF('teacherInfo/list','get',{teacherDuty:'1'},res=>{
                    if(res.data.success){
                        this.teacherArr=res.data.data
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
                    gradeId: row.gradeId,
                    className: row.className,
                    teacherId: row.teacherId,
                    classId: row.classId,
                    classType: row.classType
                };
            },
            onSearch(){
                this.queryClass(this.searchForm.gradeName,this.searchForm.classType)
            },
            onAdd(){
                this.addFlag=true;
                this.dialogAddVisible=true;
            },
            addClassClose(){
                this.addFlag=true;
                this.addForm={
                    gradeId: '',
                    className: '',
                    teacherId: '',
                    classId: '',
                    classType: ''
                };

            },
            onSubmit(){
                let url='';
                if(this.addFlag){
                    url='classInfo/insert'
                }else{
                    url='classInfo/update'
                }
                this.$axiosF(url,'post',this.addForm,res=>{
                    if(res.data.success){
                        // this.tableData=res.data.data
                        this.$message({
                            showClose: true,
                            message: res.data.message,
                            type: 'success'
                        });
                        this.queryClass();
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
            onCancle(){
                this.addForm={
                        gradeId: '',
                        className: '',
                        teacherId: '',
                        classId: '',
                        classType: ''
                };
                dialogAddVisible = false
            },
            handleDelete(index,row){
                this.$axiosF('classInfo/deleteByIds','post',{ids:[row.classId]},res=>{
                    if(res.data.success){
                        this.queryClass();
                        this.$message({
                            showClose: true,
                            message: res.data.message,
                            type: 'success'
                        });
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
                    gradeId: row.gradeId,
                    className: row.className,
                    teacherId: row.teacherId,
                    classId: row.classId,
                    classType: row.classType
                };
            },
            handleSelect(index,row){
                this.dialogAddTeacherVisible=true;
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