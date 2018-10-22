<template>
    <div>
        <div class="m-t-10 ">
            <p class="header-line"><i class="fa fa-server c-blue m-r-10" aria-hidden="true"></i> Device List </p>
        </div>
        <div class="m-t-20">
            <div class="panel-header">
                Device Group:
                <el-select v-model="selectValue">
                    <el-option
                    v-for="item in groupOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            
            <el-table
                :data="deviceList"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">

                <el-table-column
                type="selection"
                min-width="55">
                </el-table-column>

                <el-table-column
                prop="name"
                label="Device Name"
                min-width="120">
                </el-table-column>

                <el-table-column
                prop="agentid"
                label="Agent ID"
                min-width="120">
                </el-table-column>
                <el-table-column
                prop="version"
                label="Agent Version"
                min-width="120">
                </el-table-column>
                <el-table-column
                label="Status"
                min-width="120">
                    <template slot-scope="scope">
                        <i v-bind:class="[isconnect? online: offline]"></i>
                        <span v-if="isconnect">online</span>
                        <span v-else>offline</span>
                    </template>
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
                <el-pagination
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
            <div class="m-t-10 fr">
                <el-button v-loading="addLoading" size="small" @click="addDevice()" type="primary">Add</el-button>
                <el-button v-loading="deleteLoading" size="small" @click="DeleteDevice()" type="primary">Delete</el-button>
                
            </div>
           
        </div>
    </div>  
</template>

<script>
    import http from '@/assets/js/http'
    export default{
        data(){
            return{
                groupOptions:[],
                selectValue:'',
                deviceTableData:[],
                deviceList:[],
                isconnect: false,
                online: "fa fa-child c-green",
                offline: 'fa fa-minus-circle c-red',
                multipleTable:[],
                limit: 10,
                dataCount: null,
                currentPage: 1,
                isshow: false,
                addLoading: false,
                deleteLoading: false
            }
        },


        methods:{
            getDeviceGroup(){
                
                let devGetData = {};
                devGetData.pageSize = 1000;
                devGetData.no = 1;
                devGetData.orderType = "aid";
                devGetData.like = "";
                devGetData._ = new Date().getTime();
                this.apiGet('rmm/v1/accounts', devGetData).then((data) => {
                    this.handleResponse(data, (res) => {
                        var accountId = res.accounts[0].aid
                        var groupGetData = {};
                        groupGetData._ = new Date().getTime();
                        this.apiGet("rmm/v1/accounts/"+accountId+"/groups", groupGetData).then((data) => {
                            this.handleResponse(data, (res) => {
                                var groupData = res.accounts[0].groups
                                console.log(groupData)
                                if(groupData.length != 0){
                                    var groupOptionsData = [];
                                   groupData.forEach(function(val){
                                       groupOptionsData.push({value: val.gid, label:val.name})
                                   }) 
                                   this.selectValue = groupData[0].gid;
                                   this.groupOptions = groupOptionsData
                                   this.getAllDevices();
                                }
                            })
                        })
                    })
                    
                })
            },

            getAllDevices(){
                let groupid = this.selectValue;
                let devicegetdata = {};
                devicegetdata.pageSize = 10000;
                devicegetdata.no = 1;
                devicegetdata.orderType = "did";
                devicegetdata.like = "";
                devicegetdata._ = new Date().getTime();
                this.apiGet("rmm/v1/devicegroups/"+groupid+"/devices", devicegetdata).then((data) => {
                    this.handleResponse(data, (res) => {
                        this.deviceTableData = res.groups[0].devices;
                        this.dataCount = this.deviceTableData.length;
                        this.deviceList = this.deviceTableData.slice(0,this.limit)
                        this.isshow = this.dataCount > this.limit;
                        console.log(this.deviceList);
                    })
                })
            },

            confirmDelete(row){ 
                console.log("rowdata:",row);
                var dddata = {};
                dddata.devices = [];
                dddata.devices[0] = {"did": row.did, 'groupIds': []};
                swal({
                    title:'Are you sure?',
                    text:'delete this device',
                    icon:'warning',
                    buttons:true,
                    dangerMode:true,
                }).then((willDelete) => {
                    if(willDelete){
                        this.apiPut('rmm/v1/devices', dddata).then((data) => {
                            this.handleResponse(data, (res) => {
                                if(res.result){
                                    swal("","Delete device successfully",'success').then(function(){
                                        this.getAllDevices();
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
                this.deviceList = this.deviceTableData.slice((currentPage-1)*this.limit,currentPage*this.limit)
            },

            DeleteDevice(){
                if(!this.multipleTable){
                    swal("","Please selected data","info")
                    return;
                }
                this.deleteLoading = !this.deleteLoading;
           
                swal({
                    title:'Are you sure?',
                    text:'delete this device',
                    icon:'warning',
                    buttons:true,
                    dangerMode:true,
                }).then((willDelete) => {
                    this.deleteLoading = !this.deleteLoading;
                    if(willDelete){
                        var dddata = {};
                        dddata.devices = [];

                        this.multipleTable.forEach((value, i) => {
                            dddata.devices[i] = {"did": value.did, "groupIds":[]};   
                        })
                        this.apiPut("rmm/v1/devices",  dddata).then((data) => {
                            this.handleResponse(data, (res)=>{
                                if(res.result){
                                    swal("", "Delete successfully", "success").then(() => {
                                        this.getAllDevices();
                                    })
                                }
                            })
                            
                        })
                     }
                    
                })
                
            },

            addDevice(){
                router.replace({name: "deviceAdd", params:{groupOptions:this.groupOptions}})
            }


        },
        created(){
            this.getDeviceGroup();
        },
        mixins:[http]
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
</style>