<template>
    <div id="classMan_page">
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
                    prop="subjectName"
                    label="科目">
            </el-table-column>
            <el-table-column
                    prop="subjectType"
                    :formatter="subjectTypeFormatter"
                    label="科目类型">
            </el-table-column>
            <el-table-column
                    prop="subjectOrd"
                    label="科目权重 ">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "grade-add",
        data(){
            return{
                tableData:[]
            }
        },
        mounted(){
            this.querySubjectData()
        },
        methods:{
            //班级分类翻译
            subjectTypeFormatter(val){
                let newVal='';
                switch (val.subjectType+""){
                    case  '0':
                        newVal= '通用';
                        break;
                    case  '1':
                        newVal= '文科';
                        break;
                    case  '2':
                        newVal= '理科';
                        break;
                    case '3':
                        newVal='艺术';
                        break;
                    default :
                        break;

                }
                return newVal;
            },
            //查询科目
            querySubjectData(){
                this.tableData=[];
                this.$axiosF('subjectInfo/list','get',{},res=>{
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
            }
        }
    }
</script>

<style scoped>
    #classMan_page{
        height: 100%;
        padding: 5px;
    }
</style>
<style>

</style>