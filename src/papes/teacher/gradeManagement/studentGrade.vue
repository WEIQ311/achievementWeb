<template>
    <div id="gradeSearch_page">
        <div class="headSearch">
            <el-form class="search_form"   label-width="50px" :model="searchForm" :inline="true">
                <el-form-item label="姓名" >
                    <el-input v-model="searchForm.studentName" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="学号" >
                    <el-input v-model="searchForm.studentNum"  size="mini"></el-input>
                </el-form-item>
                <el-form-item label="轮次" >
                    <el-select v-model="searchForm.semesterId" size="mini">
                        <el-option :label="item.semesterName" :value="item.semesterId" v-for="item in dateNameArr"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="班级" >
                    <el-select v-model="searchForm.classId" size="mini">
                        <el-option :label="item.gradeClassName" :value="item.classId" v-for="item in classNameArr"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="科目"  v-if="false">
                    <el-select v-model="searchForm.subjectId" size="mini">
                        <el-option :label="item.subjectName" :value="item.subjectId" v-for="item in subjectArr"></el-option>
                    </el-select>
                </el-form-item>
                <div style="display: inline-block;height: 40px;line-height: 40px">
                    <el-button @click="onSearch"  size="mini">查询</el-button>
                    <el-button @click="onAdd"  size="mini">新增</el-button>
                    <el-button @click="onImport"  size="mini">导入</el-button>
                    <el-button @click="onDownLoad"  size="mini">模板下载</el-button>
                </div>
            </el-form>
        </div>
        <div class="searchMain">
            <el-table
                    :data="tableData"
                    stripe
                    border
                    height="calc(100% - 50px)"
                    style="width: 100%">
               <!-- show-summary
                :summary-method="getSummaries"-->
                <el-table-column
                        type="index"
                        width="50"
                        label="序号">
                </el-table-column>
                <el-table-column
                        prop="examTime"
                        label="日期">
                </el-table-column>
                <el-table-column
                        prop="semesterName"
                        label="轮次">
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
                        prop="gradeClassName"
                        width="100"
                        label="班级">
                </el-table-column>
                <el-table-column
                        prop="subLanguage"
                        label="语文">
                </el-table-column>
                <el-table-column
                        prop="subMathematics"
                        label="数学">
                </el-table-column>
                <el-table-column
                        prop="subEnglish"
                        label="英语">
                </el-table-column>
                <el-table-column
                        prop="subPhysical"
                        label="物理">
                </el-table-column>
                <el-table-column
                        prop="subChemistry"
                        label="化学">
                </el-table-column>
                <el-table-column
                        prop="subBiological"
                        label="生物">
                </el-table-column>
                <el-table-column
                        v-if="classType==='2'"
                        prop="subPolitical"
                        label="政治">
                </el-table-column>
                <el-table-column
                        v-if="classType==='2'"
                        prop="subHistory"
                        label="历史">
                </el-table-column>
                <el-table-column
                        v-if="classType==='2'"
                        prop="subGeography"
                        label="地理">
                </el-table-column>
                <el-table-column
                        prop="subScoreSum"
                        label="总分">
                </el-table-column>
                <el-table-column
                        prop="classRanking"
                        label="班级排名">
                </el-table-column>
                <el-table-column
                        prop="gradeRanking"
                        label="年级排名">
                </el-table-column>
                <el-table-column
                        width="150"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleInfo(scope.$index, scope.row)">详情</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[30, 50, 100, 200]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalSize">
            </el-pagination>
        </div>
        <el-dialog :title="addFlag?'新增':'修改'" :visible.sync="dialogAddVisible" @close="addFormClose">
            <el-form :model="addForm">
                <el-form-item label="考试轮次" :label-width="formLabelWidth">
                    <el-select v-model="addForm.semesterId" >
                        <el-option :label="item.semesterName" :value="item.semesterId" v-for="item in dateNameArr"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="班级分类" :label-width="formLabelWidth"  >
                    <el-select v-model="addForm.classType" placeholder="" @change="classTypeSelect">
                        <el-option label="理科" value="1"></el-option>
                        <el-option label="文科" value="2"></el-option>
                        <el-option label="未分科" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="班级" :label-width="formLabelWidth" >
                    <el-select v-model="addForm.classId"  @change="classIdSelect" >
                        <el-option :label="item.gradeClassName" :value="item.classId" v-for="item in classNameArrAll"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="考生姓名" :label-width="formLabelWidth">
                    <el-select v-model="addForm.studentId" placeholder="">
                        <el-option :label="item.studentName" :value="item.studentId" :key="item.studentId"
                                   v-for=" item in studentArr"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="语文" :label-width="formLabelWidth">
                    <el-input v-model="addForm.subLanguage" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="数学" :label-width="formLabelWidth">
                    <el-input v-model="addForm.subMathematics" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="英语" :label-width="formLabelWidth">
                    <el-input v-model="addForm.subEnglish" autocomplete="off"></el-input>
                </el-form-item>
                <div v-if="addForm.classType=='1'||addForm.classType=='3'">
                    <el-form-item label="物理" :label-width="formLabelWidth">
                        <el-input v-model="addForm.subPhysical" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="化学" :label-width="formLabelWidth">
                        <el-input v-model="addForm.subChemistry" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="生物" :label-width="formLabelWidth">
                        <el-input v-model="addForm.subBiological" autocomplete="off"></el-input>
                    </el-form-item>
                </div>
                <div v-if="addForm.classType=='2'||addForm.classType=='3'">
                    <el-form-item label="政治" :label-width="formLabelWidth">
                        <el-input v-model="addForm.subPolitical" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="历史" :label-width="formLabelWidth">
                        <el-input v-model="addForm.subHistory" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="地理" :label-width="formLabelWidth">
                        <el-input v-model="addForm.subGeography" autocomplete="off"></el-input>
                    </el-form-item>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addFormClose">取 消</el-button>
                <el-button type="primary" @click="onSubmit">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="导入" :visible.sync="dialogImportVisible" @close="importFromClose">
            <el-form :model="importForm">
                <el-form-item label="考试轮次" :label-width="formLabelWidth">
                    <el-select v-model="importForm.semesterId" >
                        <el-option :label="item.semesterName" :value="item.semesterId" v-for="item in dateNameArr"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="学生分类" :label-width="formLabelWidth">
                    <el-select v-model="importForm.classType" placeholder="">
                        <el-option label="理科" value="1"></el-option>
                        <el-option label="文科" value="2"></el-option>
                        <el-option label="未分科" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="班级" :label-width="formLabelWidth">
                    <el-select v-model="importForm.classId">
                        <el-option :label="item.gradeClassName" :key="item.classId"  :value="item.classId" v-for="item in classNameArr"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="上传成绩" :label-width="formLabelWidth">
                    <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :before-upload="beforeUpload">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="importFromClose">取 消</el-button>
                <el-button type="primary" @click="onImportSubmit">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="详情" :visible.sync="dialogAllVisible" class="dialogInfo" >
            <el-table
                    :data="tableDataAll"
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
                        prop="examTime"
                        label="日期">
                </el-table-column>
                <el-table-column
                        prop="semesterId"
                        label="轮次">
                </el-table-column>
                <el-table-column
                        prop="gradeClassName"
                        label="班级">
                </el-table-column>
                <el-table-column
                        prop="subLanguage"
                        label="语文">
                </el-table-column>
                <el-table-column
                        prop="subMathematics"
                        label="数学">
                </el-table-column>
                <el-table-column
                        prop="subEnglish"
                        label="英语">
                </el-table-column>
                <el-table-column
                        prop="subPhysical"
                        label="物理">
                </el-table-column>
                <el-table-column
                        prop="subChemistry"
                        label="化学">
                </el-table-column>
                <el-table-column
                        prop="subBiological"
                        label="生物">
                </el-table-column>
                <el-table-column
                        prop="subPolitical"
                        label="政治">
                </el-table-column>
                <el-table-column
                        prop="subHistory"
                        label="历史">
                </el-table-column>
                <el-table-column
                        prop="subGeography"
                        label="地理">
                </el-table-column>
                <el-table-column
                        prop="subScoreSum"
                        label="总分">
                </el-table-column>
                <el-table-column
                        prop="classRanking"
                        label="班级排名">
                </el-table-column>
                <el-table-column
                        prop="gradeRanking"
                        label="年级排名">
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogAllVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogAllVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "grade-search",
        data(){
            return{
                searchForm:{
                    studentName:'',
                    studentNum:'',
                    semesterId:'',
                    classId:'',
                    subjectId:'',
                },
                classType:'1',
                dateNameArr:[],
                classNameArr:[],
                classNameArrAdd:[],
                classStudentArr:[],
                subjectArr:[],
                subjectArrAdd:[],
                tableData: [],
                studentArr: [],
                tableDataAll: [],
                classNameArrAll: [],
                dialogAllVisible:false,
                dialogAddVisible:false,
                formLabelWidth:'80px',
                addFlag:true,
                addForm:{
                    examTime:'',
                    semesterId:'',
                    classType:'1',
                    classId:'',
                    studentNum:'',
                    studentId:'',
                    subLanguage:'',
                    subMathematics:'',
                    subEnglish:'',
                    subPhysical:'',
                    subChemistry:'',
                    subBiological:'',
                    subPolitical:'',
                    subHistory:'',
                    subGeography:''
                },
                importForm:{
                    examTime:'',
                    semesterId:'',
                    classType:'1',
                    classId:''
                },
                currentPage:1,
                totalSize:0,
                pageSize:50,
                dialogImportVisible:false,
                paramFile:new FormData()

            }
        },
        mounted(){
           this.queryScoreInfo({});
           this.querySubjectData();
           this.queryClassData();
           this.querySemesterData()
        },
        methods:{
            handleSizeChange(val){
                this.pageSize=val;
            },
            handleCurrentChange(val){
                this.currentPage=val;
            },
            onSearch(){
                this.queryScoreInfo(this.searchForm)
            },
            // 切换班级分类
            classTypeSelect(val){
                this.classNameArrAll=[];
                this.$axiosF('classInfo/list','get',{gradeId:'1',classType:val},res=>{
                    if(res.data.success){
                        this.classNameArrAll=res.data.data;
                    }else{
                        this.$alert(res.data.message, '错误提示', {
                            confirmButtonText: '确定'})
                    }
                },err=>{
                    this.$alert(err.message, '错误提示', {
                        confirmButtonText: '确定'})
                })
                // this.queryStudentData(val);

            },
            // 切换班级
            classIdSelect(val){
                this.studentArr=[];
                this.$axiosF('studentInfo/list','get',{classId:val||''},res=>{
                    if(res.data.success){
                        this.studentArr=res.data.data
                    }else{
                        this.$alert(res.data.message, '错误提示', {
                            confirmButtonText: '确定'})
                    }
                },err=>{
                    this.$alert(err.message, '错误提示', {
                        confirmButtonText: '确定'})
                })
                // this.queryStudentData(val);

            },
            //上传文件
            beforeUpload(file){
                this.paramFile.delete('scoreFile');
                const isExcel = file.name.split('.')[file.name.split('.').length-1] === 'xlsx'|| file.name.split('.')[file.name.split('.').length-1] === 'xls';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isExcel) {
                    this.$message.error('上传头像文件只能是xls/xlsx 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像文件大小不能超过 2MB!');
                }
                if(isExcel&&isLt2M){
                    this.paramFile.append('scoreFile',file)
                }
                return false;
            },
            //上传文件确定按钮
            onImportSubmit(){
                this.paramFile.append('formData',JSON.stringify(this.importForm));
                this.$axiosF('scoreInfo/importScore','post',this.paramFile,res=>{
                    if(res.data.success){
                        this.dialogImportVisible = false;
                        this.$message({
                            showClose: true,
                            message: res.data.message,
                            type: 'success'
                        });
                        this.queryScoreInfo({})
                    }else{
                        this.$alert(res.data.message, '错误提示', {
                            confirmButtonText: '确定'})
                    }
                },err=>{
                    this.$alert(err.message, '错误提示', {
                        confirmButtonText: '确定'})
                });
            },
            //获取学生分数
            queryScoreInfo(record){
                this.tableData=[];
                this.$axiosF('scoreInfo/listByPage','get',{classId:record.classId||'',studentName:record.studentName||"",studentNum:record.studentNum||"",subjectId:record.subjectId||'',semesterId:record.semesterId||"",pageNum:this.currentPage,pageSize:this.pageSize},res=>{
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
            //获取班级信息
            queryClassData(){
                this.classNameArr=[];
                this.$axiosF('classInfo/list','get',{gradeId:'1',classType:'1'},res=>{
                    if(res.data.success){
                        this.classNameArr=res.data.data;
                    }else{
                        this.$alert(res.data.message, '错误提示', {
                            confirmButtonText: '确定'})
                    }
                },err=>{
                    this.$alert(err.message, '错误提示', {
                        confirmButtonText: '确定'})
                })

            },
            //获取学生列表
            queryStudentData(record){
                this.studentArr=[];
                this.$axiosF('studentInfo/list','get',{studentName:record.studentName||'',studentNum:record.studentNum||'',classId:record.classId||''},res=>{
                    if(res.data.success){
                        this.studentArr=res.data.data
                    }else{
                        this.$alert(res.data.message, '错误提示', {
                            confirmButtonText: '确定'})
                    }
                },err=>{
                    this.$alert(err.message, '错误提示', {
                        confirmButtonText: '确定'})
                })
            },
            //获取班级内学生信息信息
            queryClassStudentData(){
                this.classStudentArr=[];
                this.$axiosF('studentInfo/list','get',{classId:classId||''},res=>{
                    if(res.data.success){
                        this.classStudentArr=res.data.data;
                    }else{
                        this.$alert(res.data.message, '错误提示', {
                            confirmButtonText: '确定'})
                    }
                },err=>{
                    this.$alert(err.message, '错误提示', {
                        confirmButtonText: '确定'})
                })

            },
            //获取轮次信息
            querySemesterData(){
                this.dateNameArr=[];
                this.$axiosF('semesterInfo/list','get',{gradeId:'1'},res=>{
                    if(res.data.success){
                        this.dateNameArr=res.data.data;
                    }else{
                        this.$alert(res.data.message, '错误提示', {
                            confirmButtonText: '确定'})
                    }
                },err=>{
                    this.$alert(err.message, '错误提示', {
                        confirmButtonText: '确定'})
                })

            },
            //获取科目信息
            querySubjectData(){
                this.subjectArr=[];
                this.$axiosF('subjectInfo/list','get',{},res=>{
                    if(res.data.success){
                        this.subjectArr=res.data.data
                    }else{
                        this.$alert(res.data.message, '错误提示', {
                            confirmButtonText: '确定'})
                    }
                },err=>{
                    this.$alert(err.message, '错误提示', {
                        confirmButtonText: '确定'})
                })

            },
            onAdd(){
                this.addFlag=true;
                this.dialogAddVisible=true;
                this.classTypeSelect('1');
            },
            addFormClose(){
                this.addFlag=true;
                this.dialogAddVisible=false;
                this.addForm={
                    examTime:'',
                        semesterId:'',
                        classType:'1',
                        classId:'',
                        studentNum:'',
                        studentId:'',
                        subLanguage:'',
                        subMathematics:'',
                        subEnglish:'',
                        subPhysical:'',
                        subChemistry:'',
                        subBiological:'',
                        subPolitical:'',
                        subHistory:'',
                        subGeography:''
                }
            },
            addClassClose(){
                this.addFlag=true;
                this.addForm={
                    gradeId: '',
                    className: '',
                    teacherId: '1',
                    classType:'1',
                    classId:'',
                    studentNum:'',
                    studentId:'',
                    subLanguage:'',
                    subMathematics:'',
                    subEnglish:'',
                    subPhysical:'',
                    subChemistry:'',
                    subBiological:'',
                    subPolitical:'',
                    subHistory:'',
                    subGeography:''
                };

            },
            onSubmit(){
                let url='';
                if(this.addFlag){
                    url='scoreInfo/insert'
                }else{
                    url='scoreInfo/update'
                }
                this.$axiosF(url,'post',this.addForm,res=>{
                    if(res.data.success){
                        this.dialogAddVisible = false;
                        // this.tableData=res.data.data
                        this.$message({
                            showClose: true,
                            message: res.data.message,
                            type: 'success'
                        });
                        this.queryScoreInfo({});
                    }else{
                        this.$alert(res.data.message, '错误提示', {
                            confirmButtonText: '确定'})
                    }

                },err=>{
                    this.$alert(err.message, '错误提示', {
                        confirmButtonText: '确定'})
                });
            },
            handleEdit(index,row){
                this.classTypeSelect('1');
                this.addFlag=true;
                this.dialogAddVisible=true;
                this.addForm={
                    gradeId: row.gradeId,
                    examTime: row.examTime,
                    semesterId: row.semesterId,
                    classType: row.classType,
                    classId: row.classId,
                    studentNum: row.studentNum,
                    studentId: row.studentId,
                    subLanguage: row.subLanguage,
                    subMathematics: row.subMathematics,
                    subEnglish: row.subEnglish,
                    subPhysical: row.subPhysical,
                    subChemistry: row.subChemistry,
                    subBiological: row.subBiological,
                    subPolitical: row.subPolitical,
                    subHistory: row.subHistory,
                    subGeography: row.subGeography
                };

            },
            getSummaries(param){
                const { columns, data } = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '平均分';
                        return;
                    }
                    const values = data.map(item => Number(item[column.property]));
                    if (!values.every(value => isNaN(value))) {
                        sums[index] = values.reduce((prev, curr) => {
                            const value = Number(curr);
                            if (!isNaN(value)) {
                                return prev + curr;
                            } else {
                                return prev;
                            }
                        }, 0);
                        sums[index] += '分';
                    } else {
                        sums[index] = '无';
                    }
                });

                return sums;
            },
            onImport(){
                this.dialogImportVisible=true

            },
            importFromClose(){
               this.dialogAddVisible = false;
                this.paramFile.delete('scoreFile');
                this.paramFile.delete('formData');
               this.importForm={
                    examTime:'',
                    semesterId:'',
                    classType:'1',
                    classId:''
                }
            },
            onDownLoad(){
                window.open(window.baseURL+'scoreInfo/exportScoreTemplate?classId=1','_self');
            },
            handleInfo(){
                this.dialogAllVisible=true;
            }
        }
    }
</script>

<style scoped>
#gradeSearch_page{
    height: 100%;
}
.headSearch{
    height: 41px;
    margin-top: 10px;
    margin-bottom: 10px;
}
.searchMain{
    height: calc(100% - 62px);
}
</style>
<style>
    .el-select{
        width: 100%;
    }
    body .el-table th.gutter {
        display: table-cell !important;
    }
     tr td,th{
        text-align: center!important;
    }
    .el-date-editor{
        width: 100%!important;
    }
    .headSearch .el-form-item__content{
        width: 130px!important;
    }
    .dialogInfo .el-dialog{
        width: 92%!important;
    }
    #gradeSearch_page .el-pagination{
        padding: 12px 5px;
    }
</style>