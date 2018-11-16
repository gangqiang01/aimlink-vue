<template>
    <div>
        <p class="header-line"><i class="fa fa-android c-blue m-r-10" ></i>App Control</p>
        <el-col :span="6">
            <select-group @select-device="getDeviceOption"></select-group>
        </el-col>
        <el-col :span="18" class="m-t-20">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="App Action" name="appaction">
                    <el-form ref="form" :model="form" label-width="150px" class="m-t-20 m-l-30">
                         <el-form-item label="Launch App:" >
                            <el-select v-model="launchapp" placeholder="Please select app" class="w-300" size="small">
                                <el-option
                                    v-for="item in appOptions"
                                    :key="item.packageName"
                                    :label="item.label"
                                    :value="item.packageName">
                                </el-option>    
                            </el-select>
                            <el-button type="primary" size="small" @click="setAppSensor('launchapp')" class="m-l-10">Launch</el-button>
                        </el-form-item>
                        <el-form-item label="Stop App:">
                            <el-select v-model="stopapp" placeholder="Please select app" class="w-300" size="small">
                                <el-option
                                    v-for="item in appOptions"
                                    :key="item.packageName"
                                    :label="item.appName"
                                    :value="item.packageName">
                                </el-option>    
                            </el-select>
                            <el-button type="primary" size="small" @click="setAppSensor('stopapp')" class="m-l-10">Stop</el-button>
                        </el-form-item>
                        <el-form-item label="Enable App:">
                            <el-select v-model="enableapp" placeholder="Please select app" class="w-300" size="small">
                                <el-option
                                    v-for="item in appOptions"
                                    :key="item.packageName"
                                    :label="item.appName"
                                    :value="item.packageName">
                                </el-option>    
                            </el-select>
                            <el-button type="primary" size="small" @click="setAppSensor('enableapp')" class="m-l-10">Enable</el-button>
                        </el-form-item>
                        <el-form-item label="Disable App:">
                            <el-select v-model="disableapp" placeholder="Please select app" class="w-300" size="small">
                                <el-option
                                    v-for="item in appOptions"
                                    :key="item.packageName"
                                    :label="item.appName"
                                    :value="item.packageName">
                                </el-option>    
                            </el-select>
                            <el-button type="primary" size="small" @click="setAppSensor('disableapp')" class="m-l-10">Disable</el-button>
                        </el-form-item>

                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="App Market" name="appmarket">
                    <el-table
                        :data="appTableData"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">

                        <el-table-column
                        prop="name"
                        label="App Name"
                        min-width="120">
                        </el-table-column>

                        <el-table-column
                        prop="agentid"
                        label="Package Name"
                        min-width="120">
                        </el-table-column>
                        <el-table-column
                        prop="version"
                        label="App Version"
                        min-width="120">
                        </el-table-column>
                        <el-table-column
                        label="App Action"
                        min-width="120">
                            <template slot-scope="scope">
                                <div>
                                    <span>
                                        <el-button-group>
                                            <el-button size="small" type="danger" @click="appAction('uninstallapp', scope.row)" v-if="scope.row[3] === 'uninstallapp' || scope.row[3] === 'upgradeapp'">uninstall</el-button>
                                            <el-button size="small" type="info" @click="appAction('upgradeapp', scope.row)" v-if="scope.row[3] === 'upgradeapp' ">update</el-button>
                                            <el-button size="small" type="primary" @click="appAction('installapp', scope.row)" v-if="scope.row[3] === 'installapp'">install</el-button>
                                        </el-button-group>
                                        
                                    </span>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </el-col>
    </div>
</template>

<script>
    import {getSensorStatusApi, setSensorStatusApi, getRepoAppsApi} from '../restfulapi/remotecontrol'
    import selectGroup from '../../common/select-group'
    import {aimSdkPlugin, getAppInfoSensor, getRepoAppUrl, getRepoTokenUrl, appFuncSensor} from '@/assets/js/controlproperty'
    import handleResponse from '../restfulapi/handleresponse'

    export default{
        name: 'controlAppcontrol',
        data(){
            return {
                activeName: "appaction",
                launchapp: '',
                stopapp: '',
                enableapp: '',
                disableapp: '',
                appTableData: [],
                appOptions:[],
                selectedAgentId: '',
                selectedDeviceId: ''

            }
        },
        components:{
            selectGroup
        },
        methods:{
            getSensorStatus(){
                let AppManagementInfoArray = [];
                let deviceAppArray = [];
                getSensorStatusApi(this.selectedDeviceId, getAppInfoSensor, this.selectedAgentId, aimSdkPlugin).then((obj) => {
                    handleResponse(obj, (res) => {
                        let sensorarray = res.sensorIds;
                        sensorarray.forEach(function(val){
                            if(sensorid === aimSdkPlugin+appFuncSensor.allappinfo){
                                let apppackageinfo = JSON.parse(val.sv);
                                this.appOptions = apppackageinfo.data;
                                this.appOptions.forEach(function(val){
                                    let unInstallAppObj = {
                                        type: 'uninstallapp',
                                        appname: val.appName,
                                        package: val.packageName,
                                        versioncode: val.versionCode,
                                        version: val,versionName
                                    };
                                    AppManagementInfoArray.push(unInstallAppObj);
                                    deviceAppArray.push(unInstallAppObj);
                                })
                                
                                this.getRepoApps(AppManagementInfoArray, deviceAppArray);
                            }  
                        })  
                    })   
                })
            },
            // Deletes an object of a particular value in array
            removeObjInArray(OriginData, rem_apk_val){
                OriginData.forEach(function(obj_val, index){
                    if(obj_val.package === rem_apk_val){
                        OriginData.splice(index ,1)
                    }
                })
            },
            //get repo apps
            getRepoApps(AppManagementInfoArray, deviceapparray){
                let token;
                let InstallAppManagementInfo = {};
                let UpgradeAppManagementInfo = {};
                let AppInfoUrl = getRepoAppUrl;
                let repourl = getRepoToken;

                let formData = {username:"jinxin",passwd:"jinxin"};
                let info_data;
                getRepoAppsApi(getRepoTokenUrl,getRepoAppUrl).then((installappdata) => {
                    if(installappdata.data){
                        let installappopt = "";
                        let upgradeappopt = "";
                        let lastVersionCode = [];
                        installappdata.data.forEach(function(val){
                            let version = val.versionName != null ? val.versionName:"";
                            InstallAppManagementInfo = {
                                type : "installapp", 
                                appname: val.filename, 
                                package: val.pkgname, 
                                versioncode: val.versioncode, 
                                version: val.versionname};
                            AppManagementInfoArray.push(InstallAppManagementInfo);
                            deviceAppArray.forEach(function(deviceapp_val){
                                if(val.pkgname === deviceapp_val.package){
                                    if (val.versioncode > deviceapp_val.versioncode){
                                        // select latest version apk
                                        if(lastVersionCode[val.pkgname] === undefined || val.versioncode > lastVersionCode[val.pkgname]){
                                            lastVersionCode[val.pkgname] = val.versioncode;
                                            // pop latest app info
                                            AppManagementInfoArray.pop(); 
                                            // remove install app push update app 
                                            this.removeObjInArray(AppManagementInfoArray, val.pkgname);
                                            UpgradeAppManagementInfo = {
                                                type : "upgradeapp", 
                                                appname: deviceapp_val.appname,
                                                upgradeapk : val.filename, 
                                                package: val.pkgname, 
                                                versioncode: val.versioncode,
                                                latestversion: val.versionname, 
                                                version: deviceapp_val.version};
                                            AppManagementInfoArray.push(UpgradeAppManagementInfo);     
                                        }
                                    }else{
                                        AppManagementInfoArray.pop(); 
                                    }
                                    
                                }
                            })
                        })
                    }
                    this.appTableData = AppManagementInfoArray;
                    
                })
            },
	

            setAppSensor(cid, setsensorval){
                if(cid === "removeapp" || cid === "disableapp" || cid === "installapp" || cid === "upgradeapp"){
                    swal({
                        title: "Are you sure?",
                        text: cid,
                        icon: "warning",
                        buttons: true,  
                        dangerMode: true,
                    })
                    .then(function(willfunc){
                        if (willfunc) {
                            setSensorStatusApi(cid, AppFuncSensor[cid], this.selectedAgentId, aimSdkPlugin).then((data) => {
                                handleResponse(data, (res) => {
                                    $("#page_loading").hide();
                                    if(data.items[0].statusCode == "200"){
                                        swal("","success","success").then(function(){
                                            getSensorStatus();
                                        })
                                    }
                                })
                                
                            })
                        }
                    })
                }else{
                    let plugin = cid === "stopapp" ? DroidRoot : aimSdkPlugin;
                    setSensorStatusApi(AppFuncSensor[cid], setsensorval, this.selectedAgentId, plugin).then((data) => {
                        handleResponse(data, (res) => {
                            $("#page_loading").hide();
                            if(data.items[0].statusCode == "200"){
                                swal("","success","success")
                            }
                        })
                        
                    })
                }
            },
            appAction(cid, selectedAppData){
                if(cid === "installapp"){
                    var appname= selectedAppData[0];
                    var pkgname= selectedAppData[1];
                    var versionname = selectedAppData[2];
                    var reponame = "95cbbb6613127668fdd633b2cc006d47";
                    setsensorval = RepoAppBaseDownloadUrl + "/"+ reponame +"/" + pkgname +　"/" + versionname + "/" + appname;
                }else if(cid === "upgradeapp"){
                    var appname= selectedAppData[4];
                    var pkgname= selectedAppData[1];
                    var versionname = selectedAppData[5];
                    var reponame = "95cbbb6613127668fdd633b2cc006d47";
                    setsensorval = RepoAppBaseDownloadUrl + "/"+ reponame +"/" + pkgname +　"/" + versionname + "/" + appname;
                }else{
                    setsensorval = selectedAppData[1];
                }  
                setAppSensor(cid, setsensorval);
            },
             getDeviceOption(msg){
                this.selectedAgentId = msg.label;
                this.selectedDeviceId = msg.key;
            }
        },

        mounted(){

        },

    }
</script>

<style lang='scss' scoped>
@import "@/assets/css/colors.scss";
#cpuchart{
    border: 1px solid $gray-color;
}

#memorychart{
    border: 1px solid $primary-color;
}
</style>