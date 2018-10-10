<template>
    <div id="gradeSearch_page">
        <div class="headSearch">
            <el-form class="search_form"   label-width="50px" :model="searchForm" :inline="true">
                <el-form-item label="姓名" >
                    <el-input v-model="searchForm.studentName" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="学号" >
                    <el-input v-model="searchForm.studentID"  size="mini"></el-input>
                </el-form-item>
                <el-form-item label="轮次" >
                    <el-select v-model="searchForm.dateName" size="mini">
                        <el-option :label="item" :value="item" v-for="item in dateNameArr"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="班级" >
                    <el-select v-model="searchForm.className" size="mini">
                        <el-option :label="item" :value="item" v-for="item in classNameArr"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="科目" >
                    <el-select v-model="searchForm.subject" size="mini">
                        <el-option :label="item" :value="item" v-for="item in subjectArr"></el-option>
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
                    show-summary
                    :summary-method="getSummaries"
                    style="width: 100%">
                <el-table-column
                        type="index"
                        width="50"
                        label="序号">
                </el-table-column>
                <el-table-column
                        v-if="false"
                        prop="date"
                        label="日期">
                </el-table-column>
                <el-table-column
                        prop="dateName"
                        label="轮次">
                </el-table-column>
                <el-table-column
                        prop="studentName"
                        label="姓名">
                </el-table-column>
                <el-table-column
                        prop="studentID"
                        label="学号">
                </el-table-column>
                <el-table-column
                        prop="className"
                        label="班级">
                </el-table-column>
                <el-table-column
                        prop="Chinese"
                        label="语文">
                </el-table-column>
                <el-table-column
                        prop="mathematics"
                        label="数学">
                </el-table-column>
                <el-table-column
                        prop="English"
                        label="英语">
                </el-table-column>
                <el-table-column
                        prop="physical"
                        label="物理">
                </el-table-column>
                <el-table-column
                        prop="Chemistry"
                        label="化学">
                </el-table-column>
                <el-table-column
                        prop="biological"
                        label="生物">
                </el-table-column>
                <el-table-column
                        prop="allSum"
                        label="总分">
                </el-table-column>
                <el-table-column
                        prop="classIndex"
                        label="班级排名">
                </el-table-column>
                <el-table-column
                        prop="allIndex"
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
                    :current-page="currentPage4"
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="400">
            </el-pagination>
        </div>
        <el-dialog :title="addFlag?'新增':'修改'" :visible.sync="dialogAddVisible">
            <el-form :model="gradeForm">
                <el-form-item label="考试日期" :label-width="formLabelWidth">
                    <el-input v-model="importForm.date" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="考试轮次" :label-width="formLabelWidth">
                    <el-input v-model="importForm.dateName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="考生分类" :label-width="formLabelWidth">
                    <el-select v-model="importForm.studentType" placeholder="">
                        <el-option label="理科" value="1"></el-option>
                        <el-option label="文科" value="2"></el-option>
                        <el-option label="未分科" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="班级" :label-width="formLabelWidth">
                    <el-input v-model="importForm.className" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="学号" :label-width="formLabelWidth">
                    <el-input v-model="importForm.studentID" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="考生姓名" :label-width="formLabelWidth">
                    <el-input v-model="importForm.studentName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="语文" :label-width="formLabelWidth">
                    <el-input v-model="importForm.Chinese" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="数学" :label-width="formLabelWidth">
                    <el-input v-model="importForm.mathematics" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="英语" :label-width="formLabelWidth">
                    <el-input v-model="importForm.English" autocomplete="off"></el-input>
                </el-form-item>
                <div v-if="importForm.studentType=='1'||importForm.studentType=='3'">
                    <el-form-item label="物理" :label-width="formLabelWidth">
                        <el-input v-model="importForm.physical" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="化学" :label-width="formLabelWidth">
                        <el-input v-model="importForm.Chemistry" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="生物" :label-width="formLabelWidth">
                        <el-input v-model="importForm.biological" autocomplete="off"></el-input>
                    </el-form-item>
                </div>
                <div v-if="importForm.studentType=='2'||importForm.studentType=='3'">
                    <el-form-item label="政治" :label-width="formLabelWidth">
                        <el-input v-model="importForm.political" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="历史" :label-width="formLabelWidth">
                        <el-input v-model="importForm.history" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="地理" :label-width="formLabelWidth">
                        <el-input v-model="importForm.geography" autocomplete="off"></el-input>
                    </el-form-item>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogAddVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogAddVisible = false">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="导入" :visible.sync="dialogImportVisible">
            <el-form :model="importForm">
                <el-form-item label="考试日期" :label-width="formLabelWidth">
                    <el-input v-model="gradeForm.date" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="考试轮次" :label-width="formLabelWidth">
                    <el-input v-model="gradeForm.dateName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="学生分类" :label-width="formLabelWidth">
                    <el-select v-model="gradeForm.studentType" placeholder="">
                        <el-option label="理科" value="1"></el-option>
                        <el-option label="文科" value="2"></el-option>
                        <el-option label="未分科" value="3"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogAddVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogAddVisible = false">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="详情" :visible.sync="dialogAllVisible" class="dialogInfo">
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
                        prop="date"
                        label="日期">
                </el-table-column>
                <el-table-column
                        prop="dateName"
                        label="轮次">
                </el-table-column>
                <el-table-column
                        prop="studentName"
                        label="姓名">
                </el-table-column>
                <el-table-column
                        prop="studentID"
                        label="学号">
                </el-table-column>
                <el-table-column
                        prop="className"
                        label="班级">
                </el-table-column>
                <el-table-column
                        prop="Chinese"
                        label="语文">
                </el-table-column>
                <el-table-column
                        prop="mathematics"
                        label="数学">
                </el-table-column>
                <el-table-column
                        prop="English"
                        label="英语">
                </el-table-column>
                <el-table-column
                        prop="physical"
                        label="物理">
                </el-table-column>
                <el-table-column
                        prop="Chemistry"
                        label="化学">
                </el-table-column>
                <el-table-column
                        prop="biological"
                        label="生物">
                </el-table-column>
                <el-table-column
                        prop="allSum"
                        label="总分">
                </el-table-column>
                <el-table-column
                        prop="allIndex"
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
                    studentID:'',
                    dateName:'',
                    className:'',
                },
                dateNameArr:['第一次月考','第二次月考','第三次月考'],
                classNameArr:['高二1班','高二2班','高二3班'],
                subjectArr:['语文','数学','英语','物理','化学','生物','政治','历史','地理'],
                tableData: [{
                    date: '2016-05-02',
                    dateName: '第一次月考',
                    studentName: '王小二',
                    studentID: '211109',
                    className : '高二1班',
                    Chinese : '100',
                    mathematics : '88',
                    English:'108',
                    physical : '88',
                    Chemistry : '33',
                    biological : '66',
                    classIndex : '36',
                    allSum : '366',
                    allIndex:88
                }],
                tableDataAll: [{
                    date: '2016-05-02',
                    dateName: '第一次月考',
                    studentName: '王小二',
                    studentID: '211109',
                    className : '高二1班',
                    Chinese : '100',
                    mathematics : '88',
                    English:'108',
                    physical : '88',
                    Chemistry : '33',
                    biological : '66',
                    classIndex : '36',
                    allSum : '366',
                    allIndex:48
                },{
                    date: '2016-05-02',
                    dateName: '第二次月考',
                    studentName: '王小二',
                    studentID: '211109',
                    className : '高二1班',
                    Chinese : '100',
                    mathematics : '88',
                    English:'108',
                    physical : '88',
                    Chemistry : '33',
                    biological : '66',
                    classIndex : '36',
                    allSum : '366',
                    allIndex:98
                },{
                    date: '2016-05-02',
                    dateName: '第三次月考',
                    studentName: '王小二',
                    studentID: '211109',
                    className : '高二1班',
                    Chinese : '100',
                    mathematics : '88',
                    English:'108',
                    physical : '88',
                    Chemistry : '33',
                    biological : '66',
                    classIndex : '36',
                    allSum : '366',
                    allIndex:88
                }],
                dialogAllVisible:false,
                dialogAddVisible:false,
                formLabelWidth:'80px',
                addFlag:true,
                gradeForm:{
                    date:'',
                    dateName:'',
                    studentType:'1',
                    className:'',
                    studentID:'',
                    studentName:'',
                    Chinese:'',
                    mathematics:'',
                    English:'',
                    physical:'',
                    Chemistry:'',
                    biological:'',
                    political:'',
                    history:'',
                    geography:''
                },
                importForm:{
                    date:'',
                    dateName:'',
                    studentType:'1',
                },
                currentPage4:1,
                dialogImportVisible:false,

            }
        },
        mounted(){
           this.queryScoreInfo({})
        },
        methods:{
            handleSizeChange(){

            },
            handleCurrentChange(){

            },
            //获取学生分数
            queryScoreInfo(record){
                this.tableData=[];
                this.$axiosF('scoreInfo/listByPage','get',{classId:record.classId||'',studentId:record.studentId||'',subjectId:record.subjectId||'',semesterId:record.semesterId||"",pageNum:1,pageSize:30},res=>{
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
            //
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
            onDownLoad(){
                window.open();
            },
            handleInfo(){
                this.dialogAllVisible=true;
            },
            handleEdit(index,row){
                this.addFlag=true;
                this.dialogAddVisible=true;
                this.addForm={
                    gradeId: row.gradeId,
                    className: row.className,
                    teacherId: row.teacherId,
                    classId: row.classId,
                    classType: row.classType
                };

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