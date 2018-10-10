<template>
    <div id="studentMan_page">
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
                        v-if="false"
                        prop="date"
                        label="日期">
                </el-table-column>
                <el-table-column
                        prop="dateName"
                        label="轮次">
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
                        prop="date"
                        label="日期">
                </el-table-column>
                <el-table-column
                        prop="dateName"
                        label="轮次">
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
        name: "grade-add",
        data(){
            return{
                formLabelWidth:'80px',
                tableData:[ {
                    date: '2016-05-02',
                    dateName: '第二次月考',
                    className : '高二1班',
                    Chinese : '100',
                    mathematics : '88',
                    English:'108',
                    physical : '88',
                    Chemistry : '33',
                    biological : '66',
                    allSum : '366',
                    allIndex:98
                }],
                tableDataAll:[
                    {
                        date: '2016-05-02',
                        dateName: '第一次月考',
                        className : '高二1班',
                        Chinese : '100',
                        mathematics : '88',
                        English:'108',
                        physical : '88',
                        Chemistry : '33',
                        biological : '66',
                        allSum : '366',
                        allIndex:48
                    },{
                        date: '2016-05-02',
                        dateName: '第二次月考',
                        className : '高二1班',
                        Chinese : '100',
                        mathematics : '88',
                        English:'108',
                        physical : '88',
                        Chemistry : '33',
                        biological : '66',
                        allSum : '366',
                        allIndex:98
                    },{
                        date: '2016-05-02',
                        dateName: '第三次月考',
                        className : '高二1班',
                        Chinese : '100',
                        mathematics : '88',
                        English:'108',
                        physical : '88',
                        Chemistry : '33',
                        biological : '66',
                        allSum : '366',
                        allIndex:88
                    }
                ],
                dialogAllVisible:false
            }
        },
        methods:{
            onSearch(){

            },
            handleInfo(){
                this.dialogAllVisible=true
            },
            onImport(){

            },
            onDownLoad(){

            },
            handleDelete(){
            },
            handleEdit(){

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