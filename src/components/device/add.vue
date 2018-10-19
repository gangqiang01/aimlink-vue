<template>
    <div>
        <h3><i class="fa fa-windows"></i> Add Device</h3>
        <p>All Unassigned Devices</p>
        <el-table
            :data="groupTableData"
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
            prop="agentId"
            label="Agent ID"
            min-width="120">
            </el-table-column>
        </el-table>
        <div class="m-t-10 fr">
            <btn-group :selectData="multipleTable"  :isAdd="true" :isDelete="false"></btn-group>
            <!-- <el-pagination
            @current-change="handleCurrentChange"
            layout="prev, pager, next"
            :page-size="limit"
            :current-page="currentPage"
            :total="dataCount"
            v-show="isshow"
            >
            </el-pagination> -->
        </div>
    </div>
</template>

<script>
    import http from '@/assets/js/http'
    import btnGroup from '@/common/btn-group'

    export default{
        data(){
            return {
                groupTableData: [],
                multipleTable: []
            }
        },
        methods:{
            getUnassignedDevices(){
                var devgetdata = {};
                devgetdata.pageSize = 1000;
                devgetdata.no = 1;
                devgetdata.orderType = "did";
                devgetdata.like = '';
                devgetdata._ = new Date().getTime();
                _g.openGlobalLoading();
                this.apiGet('rmm/v1/devices/unassigned', devgetdata).then((data) => {
                    this.handleResponse(data, (res) =>{
                        this.groupTableData = res.devices;
                        console.log(this.groupTableData);
                    })
                })

            },

            handleSelectionChange(val){
                this.multipleTable = val;
            },

            // handleCurrentChange(currentPage){
            //     this.currentPage = currentPage;
            //     this.deviceTableData = this.deviceTableData.slice((currentPage-1)*limit,currentPage*limit)
            // }
        },

        components:{
            btnGroup
        },

        created(){
            this.getUnassignedDevices();
        },

        mixins:[http]
    }
</script>