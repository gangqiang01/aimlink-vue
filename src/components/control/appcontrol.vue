<template>
    <div class="subWrapper">
        <p class="header-line"><i class="fa fa-android c-blue m-r-10" ></i>App Control</p>
        <el-col :span="6">
            <select-group @select-device="getDeviceOption"></select-group>
        </el-col>
        <el-col :span="18" class="m-t-20" >
            <el-tabs v-model="activeName">
                <el-tab-pane label="App Action" name="appaction">
                    <el-form  label-width="150px" class="m-t-20 m-l-30">
                         <el-form-item label="Launch App:" >
                            <el-select v-model="startapp" placeholder="Please select app" class="w-300" size="small">
                                <el-option
                                    v-for="item in appOptions"
                                    :key="item.packageName"
                                    :label="item.appName"
                                    :value="item.packageName">
                                </el-option>    
                            </el-select>
                            <el-button 
                            type="primary"
                            size="small"
                            @click="setAppSensor('startapp', startapp)"
                            class="m-l-10"
                            v-loading="loadingstartapp">
                                Launch
                            </el-button>
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
                            <el-button 
                            type="primary"
                            size="small"
                            @click="setAppSensor('stopapp', stopapp)"
                            class="m-l-10"
                            v-loading="loadingstopapp">
                                Stop
                            </el-button>
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
                            <el-button 
                            type="primary" 
                            size="small" 
                            @click="setAppSensor('enableapp', enableapp)" 
                            class="m-l-10" 
                            v-loading="loadingenableapp">
                                Enable
                            </el-button>
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
                            <el-button 
                            type="primary" 
                            size="small" 
                            @click="setAppSensor('disableapp', disableapp)" 
                            class="m-l-10"
                            v-loading="loadingdisableapp">
                                Disable
                            </el-button>
                        </el-form-item>

                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="App Market" name="appmarket">
                    <el-table
                        :data="appTableData"
                        tooltip-effect="dark"
                        style="width: 100%">
                        <el-table-column
                        label=""
                        min-width="120"
                        >
                            <template slot-scope="scope">
                                <div>
                                    <img src="@/assets/imgs/icon_apk.png" alt="no img">
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="appname"
                        label="App Name"
                        min-width="120">
                        </el-table-column>

                        <el-table-column
                        prop="package"
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
                                            <el-button 
                                            size="small" 
                                            type="danger" 
                                            @click="appAction('removeapp', scope.row)"
                                            v-if="scope.row.type === 'uninstallapp' || scope.row.type === 'upgradeapp'"
                                            :disabled="disableAppArray.indexOf(scope.row.package)>=0"
                                            v-loading="loadingremoveapp"
                                            >
                                                uninstall
                                             </el-button>
                                            <el-button 
                                            size="small" 
                                            type="warning" 
                                            @click="appAction('upgradeapp', scope.row)" 
                                            v-if="scope.row.type === 'upgradeapp' "
                                            :disabled="disableAppArray.indexOf(scope.row.package)>0"
                                            v-loading="loadingupgradeapp"
                                            >
                                                update
                                            </el-button>
                                            <el-button 
                                            size="small" 
                                            type="primary" 
                                            @click="appAction('installapp', scope.row)" 
                                            v-if="scope.row.type === 'installapp'"
                                            :disabled="disableAppArray.indexOf(scope.row.package)>0"
                                            v-loading="loadinginstallapp"
                                            >
                                                install
                                            </el-button>
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
    import {aimSdkPlugin, getAppInfoSensor, getRepoAppUrl, getRepoTokenUrl, appFuncSensor, droidRoot, repoAppBaseDownloadUrl, disableAppArray} from '@/assets/js/controlproperty'
    import handleResponse from '../restfulapi/handleresponse'

    export default{
        name: 'controlAppcontrol',
        data(){
            return {
                activeName: "appaction",
                startapp: '',
                stopapp: '',
                enableapp: '',
                disableapp: '',
                appTableData: [],
                appOptions: [],
                selectedAgentId: '',
                selectedDeviceId: '',
                disableAppArray: disableAppArray,
                loadingstartapp: false,
                loadingstopapp: false,
                loadingenableapp: false,
                loadingdisableapp: false,
                loadingupgradeapp: false,
                loadinginstallapp: false,
                loadingremoveapp: false
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
                        let sensorArray = res.sensorIds[0];
                        let apppackageinfo = JSON.parse(sensorArray.sv);
                        this.appOptions = apppackageinfo.data;
                        [
                            this.startapp, 
                            this.stopapp, 
                            this.enableapp, 
                            this.disableapp
                        ] = [
                            this.appOptions[0].packageName,
                            this.appOptions[0].packageName,
                            this.appOptions[0].packageName,
                            this.appOptions[0].packageName,
                        ]
                        this.appOptions.forEach((val) => {
                            let unInstallAppObj = {
                                type: 'uninstallapp',
                                appname: val.appName,
                                package: val.packageName,
                                versioncode: val.versionCode,
                                version: val.versionName
                            };
                            AppManagementInfoArray.push(unInstallAppObj);
                            deviceAppArray.push(unInstallAppObj);
                        })
                        
                        this.getRepoApps(AppManagementInfoArray, deviceAppArray);  
                          
                    })   
                })
            },
            // Deletes an object of a particular value in array
            removeObjInArray(OriginData, rem_apk_val){
                OriginData.forEach((obj_val, index) => {
                    if(obj_val.package === rem_apk_val){
                        OriginData.splice(index ,1)
                    }
                })
            },
            //get repo apps
            getRepoApps(AppManagementInfoArray, deviceAppArray){
                let token;
                let InstallAppManagementInfo = {};
                let UpgradeAppManagementInfo = {};
                let AppInfoUrl = getRepoAppUrl;
                let repourl = getRepoTokenUrl;

                let formData = {username:"jinxin",passwd:"jinxin"};
                let info_data;
                getRepoAppsApi(getRepoTokenUrl,getRepoAppUrl).then((data) => {
                    handleResponse(data, (res) => {
                        if(res.data){
                            let installappopt = "";
                            let upgradeappopt = "";
                            let lastVersionCode = [];
                            res.data.forEach((val) => {
                                let version = val.versionName != null ? val.versionName:"";
                                InstallAppManagementInfo = {
                                    type : "installapp", 
                                    appname: val.filename, 
                                    package: val.pkgname, 
                                    versioncode: val.versioncode, 
                                    version: val.versionname};
                                AppManagementInfoArray.push(InstallAppManagementInfo);
                                deviceAppArray.forEach((deviceapp_val) => {
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
        
                    
                })
            },
	

            setAppSensor(cid, setSensorVal){
                if(cid === "removeapp" || cid === "disableapp" || cid === "installapp" || cid === "upgradeapp"){
                    _g.swalWarnDo(cid).then((willfunc) => {
                        if (willfunc) {
                            _g.openGlobalLoading();
                            setSensorStatusApi(appFuncSensor[cid], setSensorVal, this.selectedAgentId, aimSdkPlugin).then((data) => {
                                handleResponse(data, (res) => {
                                    if(res.items[0].statusCode == "200"){
                                        swal("","success","success").then(() => {
                                            if(cid === "disableapp"){
                                                return;
                                            }this.getSensorStatus();
                                        })
                                    }
                                })
                                
                            })
                        }
                    })
                }else{
                    let plugin = cid === "stopapp" ? droidRoot : aimSdkPlugin;
                    _g.openGlobalLoading();
                    setSensorStatusApi(appFuncSensor[cid], setSensorVal, this.selectedAgentId, plugin).then((data) => {
                        handleResponse(data, (res) => {
                            if(res.items[0].statusCode == "200"){
                                swal("","success","success")
                            }
                        })
                        
                    })
                }
            },

            appAction(cid, selectedAppData){
                let setsensorval;
                if(cid === "installapp"){
                    var appname= selectedAppData.appname;
                    var pkgname= selectedAppData.package;
                    var versionname = selectedAppData.version;
                    var reponame = "95cbbb6613127668fdd633b2cc006d47";
                    setsensorval = repoAppBaseDownloadUrl + "/"+ reponame +"/" + pkgname +　"/" + versionname + "/" + appname;
                }else if(cid === "upgradeapp"){
                    var appname= selectedAppData.upgradeapk;
                    var pkgname= selectedAppData.package;
                    var versionname = selectedAppData.latestversion;
                    var reponame = "95cbbb6613127668fdd633b2cc006d47";
                    setsensorval = repoAppBaseDownloadUrl + "/"+ reponame +"/" + pkgname +　"/" + versionname + "/" + appname;
                }else{
                    setsensorval = selectedAppData.package;
                }  
                this.setAppSensor(cid, setsensorval);
            },

             getDeviceOption(msg){
                this.selectedAgentId = msg.value;
                this.selectedDeviceId = msg.key;
                this.getSensorStatus();
            },
        },

        mounted(){

        },

    }
</script>

<style lang='scss' scoped>
    // height: 100%;
    // .contentView{
    //     height: 100%;
    //     overflow-y: scroll;
    //     overflow-x: hidden;

    // }

   
    // .contentView::-webkit-scrollbar{
    //     display: none;
    // }
</style>