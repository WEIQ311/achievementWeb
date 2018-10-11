<template>
    <div id="studentMan_page">
        <div class="headSearch">
            <el-form class="search_form"   label-width="80px" :model="searchForm" :inline="true">
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
                <el-form-item label="轮次" >
                    <el-select v-model="searchForm.semesterId" size="mini">
                        <el-option :label="item.semesterName" :value="item.semesterId" v-for="item in dateNameArr"></el-option>
                    </el-select>
                </el-form-item>
                <div style="display: inline-block;height: 40px;line-height: 40px">
                    <el-button @click="onSearch"  size="mini">查询</el-button>
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
                        prop="examTime"
                        label="日期">
                </el-table-column>
                <el-table-column
                        prop="semesterName"
                        label="轮次">
                </el-table-column>
                <el-table-column
                        prop="gradeClassName"
                        width="100"
                        label="班级">
                </el-table-column>
                <el-table-column
                        prop="avgLanguage"
                        label="语文">
                </el-table-column>
                <el-table-column
                        prop="avgMathematics"
                        label="数学">
                </el-table-column>
                <el-table-column
                        prop="avgEnglish"
                        label="英语">
                </el-table-column>
                <el-table-column
                        prop="avgPhysical"
                        label="物理">
                </el-table-column>
                <el-table-column
                        prop="avgChemistry"
                        label="化学">
                </el-table-column>
                <el-table-column
                        prop="avgBiological"
                        label="生物">
                </el-table-column>
                <el-table-column
                        v-if="classType==='2'"
                        prop="avgPolitical"
                        label="政治">
                </el-table-column>
                <el-table-column
                        v-if="classType==='2'"
                        prop="avgHistory"
                        label="历史">
                </el-table-column>
                <el-table-column
                        v-if="classType==='2'"
                        prop="avgGeography"
                        label="地理">
                </el-table-column>
                <el-table-column
                        prop="avgScoreSum"
                        label="总分">
                </el-table-column>
                <el-table-column
                        prop="classRanking"
                        label="排名">
                </el-table-column>
                <el-table-column
                        width="150"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleInfo(scope.$index, scope.row)">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
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
                        prop="examTime"
                        label="日期">
                </el-table-column>
                <el-table-column
                        prop="semesterName"
                        label="轮次">
                </el-table-column>
                <el-table-column
                        prop="gradeClassName"
                        width="100"
                        label="班级">
                </el-table-column>
                <el-table-column
                        prop="avgLanguage"
                        label="语文">
                </el-table-column>
                <el-table-column
                        prop="avgMathematics"
                        label="数学">
                </el-table-column>
                <el-table-column
                        prop="avgEnglish"
                        label="英语">
                </el-table-column>
                <el-table-column
                        prop="avgPhysical"
                        label="物理">
                </el-table-column>
                <el-table-column
                        prop="avgChemistry"
                        label="化学">
                </el-table-column>
                <el-table-column
                        prop="avgBiological"
                        label="生物">
                </el-table-column>
                <el-table-column
                        v-if="classType==='2'"
                        prop="avgPolitical"
                        label="政治">
                </el-table-column>
                <el-table-column
                        v-if="classType==='2'"
                        prop="avgHistory"
                        label="历史">
                </el-table-column>
                <el-table-column
                        v-if="classType==='2'"
                        prop="avgGeography"
                        label="地理">
                </el-table-column>
                <el-table-column
                        prop="avgScoreSum"
                        label="总分">
                </el-table-column>
                <el-table-column
                        prop="classRanking"
                        label="排名">
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
        name: "grade-add",
        data(){
            return{
                searchForm:{
                    gradeId:'',
                    semesterId:'',
                    classType:''
                },
                classType:'1',
                dateNameArr:[],
                formLabelWidth:'80px',
                tableData:[],
                tableDataAll:[],
                dialogAllVisible:false
            }
        },
        mounted(){
            this.querySemesterData();
            this.queryClassScoreData({})
        },
        methods:{
            onSearch(){
                this.queryClassScoreData(this.searchForm);
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
            //获取班级成绩数据
            queryClassScoreData(record){
                this.tableData=[];
                this.$axiosF('scoreInfo/listByClass','get',{gradeId:record.gradeId||'1',semesterId:record.semesterId||'',classType:record.classType||''},res=>{
                    if(res.data.success){
                        this.tableData=res.data.data;
                    }else{
                        this.$alert(res.data.message, '错误提示', {
                            confirmButtonText: '确定'})
                    }
                },err=>{
                    this.$alert(err.message, '错误提示', {
                        confirmButtonText: '确定'})
                })

            },
            handleInfo(){
                this.dialogAllVisible=true
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
    .classType{
        display: inline-block;
    }
</style>