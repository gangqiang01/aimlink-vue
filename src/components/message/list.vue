<template>
    <div>
        <div class="m-t-10 ">
            <p class="header-line"><i class="fa fa-info c-primary m-r-10" aria-hidden="true"></i>Message </p>
        </div>
        <div class="m-t-20">
            <div class="panel-header">
                Severity:
                <el-select v-model="severityValue" size="small" @change="getEventMessages">
                    <el-option
                    v-for="item in severityOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                Category:
                <el-select v-model="categoryValue" size="small" @change="getEventMessages">
                    <el-option
                    v-for="item in categoryOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                 Device Group:
                <el-select v-model="groupValue" size="small" @change="getEventMessages">
                    <el-option
                    v-for="item in groupOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                
                <!-- <div class="fr m-r-10"> 
                    <el-input size="small" class="w-300 m-l-10 m-b-5" v-model="groupKeyword" placeholder="Please input keyword of device">
                        <el-button slot="append" icon="el-icon-search"  @click="getDeviceGroup" ></el-button>
                    </el-input>
                </div> -->
            </div>
            
            <el-table
                :data="messageList"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                >

                <el-table-column
                label="Time Stamp"
                prop="name"
                min-width="120"
                sortable>
                     <template slot-scope="scope">
                        <div>
                            {{scope.row.unix_ts|time}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                label="Device Name"
                prop="agent_name"
                min-width="120"
                sortable>
                </el-table-column>
                <el-table-column
                label="Severify"
                min-width="120">
                    <template slot-scope="scope">
                        <div>
                            <span style="padding: 5px; border-radius: 3px; border-radius: 5px" :class="[scope.row.severity =='Error'? 'bg-red': scope.row.severity == 'Warning'? 'bg-yellow' :'bg-green']">
                                {{scope.row.severity}}
                            </span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                label="Subtype"
                min-width="120"
                sortable>
                    <template slot-scope="scope">
                        <div>
                            {{scope.row.subtype.toLowerCase()}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                label="Event Message"
                prop="message"
                min-width="120"
                sortable>
                </el-table-column>
                <el-table-column
                label="Action"
                min-width="120">
                    <template slot-scope="scope">
                        <div>
                            <span>
                                <el-button size="small" type="danger" @click="confirmDelete(scope.row)">Delete</el-button>
                            </span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="m-t-10 cf">
                <el-pagination class="fr"
                @current-change="handleCurrentChange"
                layout="prev, pager, next"
                :page-size="limit"
                :current-page="currentPage"
                :total="dataCount"
                v-show="isshow"
                background
                >
                </el-pagination>
                
            </div>

        </div>
    </div>  
</template>

<script>
    import {getDeviceGroupApi} from '../restfulapi/devicegroupapi'
    import {getDeviceCategoryApi, getEventMsgApi, deleteMsgApi} from '../restfulapi/msgapi'
    import handleResponse from '../restfulapi/handleresponse'
    import btnGroup from '@/common/btn-group'
    export default{
        name: 'messageList',
        data(){
            return{
                messageList:[],
                msgTableData:[],
                multipleTable:[],
                limit: 10,
                categoryValue:'',
                isshow: false,
                groupValue: '',
                severityValue: 'All',
                dataCount: null,
                currentPage: 1,
                groupOptions: [],
                categoryOptions: [],
                severityOptions: [
                    {value: "All", label: "All"},
                    {value: "Information", label: "Information"},
                    {value: "Warning", label: "Warning"},
                    {value: "Error", label: "Error"}
                ],

            }
        },
   

        methods:{
            getDeviceGroup(){
                getDeviceGroupApi().then((data) => {
                    handleResponse(data, (res) => {
                        let groupData = res.accounts[0].groups
                        console.log(groupData)
                        if(groupData.length != 0){
                            let groupOptionsData = [];
                            groupData.forEach(function(val){
                                groupOptionsData.push({value: val.gid, label:val.name})
                            }) 
                            this.groupValue = groupData[0].gid;
                            this.groupOptions = groupOptionsData
                        }else{
                            this.groupOptions = [];
                        }
                        this.$nextTick(function () {
                            this.getEventMessages();
                        })
                    })
                })
            },

            getDeviceCategory(){
                getDeviceCategoryApi().then((data) => {
                    handleResponse(data, (res)=> {
                        if(!data.result){
                            let catopts=[];
                            res.result.forEach(function(catObj){
                                catopts.push({value: catObj.tag.toLowerCase(), label: catObj.Description}) 
                            })
                            this.categoryValue = res.result[0].tag.toLowerCase();
                            this.categoryOptions = catopts;
                        }else{
                            this.categoryOptions = [];
                        }
                        this.$nextTick(function () {
                            this.getEventMessages();
                        })
                    })
                   
                })
            },

            confirmDelete(row){ 
                _g.swalWarningDo("delete this message").then((willDelete) => {
                    if(willDelete){
                       DeleteMsgApi(row.id).then((data) => {
                            handleResponse(data, (res) => {
                                if(res.result){
                                    swal("","Delete Message successfully",'success').then(() => {
                                        getEventMessages();
                                    })
                                }
                            })
                        })
                    }
                })
                
                
            },

            handleSelectionChange(val){
                this.multipleTable = val;
            },

            handleCurrentChange(currentPage){
                this.currentPage = currentPage;
                this.messageList = this.msgTableData.slice((currentPage-1)*this.limit,currentPage*this.limit)
            },

            getEventMessages(){
                if(this.severityValue == '' || this.groupValue == '' || this.categoryValue == ''){
                    return;
                }
                _g.openGlobalLoading();
                getEventMsgApi(this.severityValue, this.groupValue, this.categoryValue).then((data) => {
                    handleResponse(data, (res) =>{
                        this.msgTableData = res.events;
                        this.dataCount = this.msgTableData.length;
                        this.messageList = this.msgTableData.slice(0,this.limit)
                        this.isshow = this.dataCount > this.limit;
                    })
                   
                })
                
            },
        },
        created(){
            this.getDeviceGroup();
            this.getDeviceCategory();
        },
    }
</script>
<style lang='scss' scoped>
    .btn-group{
        color:#428bca;
    }
    .text {
    font-size: 14px;
    }

    .item {
    margin-bottom: 18px;
    }
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>