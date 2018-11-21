<template>
    <div>
        <p class="header-line"><i class="fa fa-hand-lizard-o c-blue m-r-10" ></i>Remote Control</p>
        <el-col :span="6">
            <select-group @select-device="getDeviceOption"></select-group>
        </el-col>
        <el-col :span="18" class="m-t-20">
            <el-row>
                <el-col :md="8" :sm="12"  class="pd-5">
                    <div class="info-box">
                        <span class="info-box-icon bg-aqua">
                            <i class="fa fa-wifi info-box-icon-white"></i>
                            <p class="info-box-icon-title">Wifi</p>
                        </span>
                        <el-switch
                        v-model="wifi"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        @change="switchChange(wifi, 'wifi')"
                        >
                        </el-switch>
                    </div>
                </el-col>
                <el-col :md="8" :sm="12"  class="pd-5">
                    <div class="info-box">
                        <span class="info-box-icon bg-yellow">
                            <i class="fa fa-bluetooth-b info-box-icon-white"></i>
                            <p class="info-box-icon-title">Bluetooth</p>
                        </span>
                        <el-switch
                        v-model="bluetooth"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        @change="switchChange(bluetooth, 'bluetooth')"
                        >
                        </el-switch>
                    </div>
                </el-col>
                <el-col :md="8" :sm="12"  class="pd-5">
                    <div class="info-box">
                        <span class="info-box-icon bg-DimGray" >
                            <i class="fa fa-map-marker info-box-icon-white"></i>
                            <p class="info-box-icon-title">GPS</p>
                        </span>
                        <el-switch
                        v-model="gps"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        @change="switchChange(gps, 'gps')"
                        >
                        </el-switch>
                        
                    </div>
                </el-col>

                <el-col :md="8" :sm="12"  class="pd-5">
                    <div class="info-box">
                        <span class="info-box-icon bg-DarkRed">
                            <i class="fa fa-lock info-box-icon-white"></i>
                            <p class="info-box-icon-title">Lock Screen</p>
                        </span>
                        <el-switch
                        v-model="lockscreen"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        @change="switchChange(lockscreen, 'lockscreen')"
                        >
                        </el-switch>
                    </div>
                </el-col>
                <el-col :md="8" :sm="12"  class="pd-5">
                    <div class="info-box">
                        <span class="info-box-icon bg-DarkViolet" >
                            <i class="fa fa-home info-box-icon-white"></i>
                            <p class="info-box-icon-title">Home Key</p>
                        </span>
                        <el-switch
                        v-model="homekey"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        @change="switchChange(homekey, 'homekey')"
                        >
                        </el-switch>
                    </div>
                </el-col>
                <el-col :md="8" :sm="12"  class="pd-5">
                    <div class="info-box">
                        <span class="info-box-icon bg-green">
                            <i class="fa fa-caret-left info-box-icon-white"></i>
                            <p class="info-box-icon-title">Back Key</p>
                        </span>
                        <el-switch
                        v-model="backkey"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        @change="switchChange(backkey, 'backkey')"
                        >
                        </el-switch>
                    </div>
                </el-col>

                <el-col :md="8" :sm="12"  class="pd-5">
                    <div class="info-box">
                        <span class="info-box-icon bg-Indigo">
                            <i class="fa fa-power-off info-box-icon-white"></i>
                            <p class="info-box-icon-title">shutdown</p>
                        </span>
                        <el-button type="primary" size="small" @click="powerAction('shutdown')">shutdown</el-button>
                        
                    </div>
                </el-col>
                <el-col :md="8" :sm="12" class="pd-5">
                    <div class="info-box">
                        <span class="info-box-icon bg-SteelBlue">
                            <i class="fa fa-recycle info-box-icon-white"></i>
                            <p class="info-box-icon-title">Reboot</p>
                        </span>
                            <el-button type="primary" size="small" @click="powerAction('restart')">Reboot</el-button>
                        
                    </div>
                </el-col>
            </el-row>
        </el-col>
    </div>
        
</template>

<script>
    import {getSensorStatusApi, setSensorStatusApi, powerActionApi } from '../restfulapi/remotecontrol'
    import selectGroup from '../../common/select-group'
    import {aimSdkPlugin, getAppInfoSensor, getRepoAppUrl, getRepoToken, settingsStatusSensor} from '@/assets/js/controlproperty'
    import handleResponse from '../restfulapi/handleresponse'

    export default{
        name: 'controlRemotecontrol',
        data(){
            return {
                wifi: false,
                bluetooth: false,
                gps: false,
                lockscreen: false,
                homekey: false,
                backkey: false,
                selectedAgentId:'',
                selectedDeviceId:'',
            }
        },
        components:{
            selectGroup
        },
        methods:{
            getSensorStatus(){
                let AppManagementInfoArray = [];
                let deviceapparray = [];
                let sensorIds = '';
                for(let key in settingsStatusSensor){
                    sensorIds+=settingsStatusSensor[key]+"|";
                }
                sensorIds = sensorIds.substring(0, sensorIds.length-1);
                console.log(this);
                getSensorStatusApi(this.selectedDeviceId, sensorIds, this.selectedAgentId, aimSdkPlugin).then((obj) => {
                    handleResponse(obj, (res) => {
                        let sensorarray = res.sensorIds;
                        sensorarray.forEach((val) => {
                            let sensorid = val.sensorId;
                            for(let sensor_key in settingsStatusSensor){
                                if(sensorid == aimSdkPlugin+settingsStatusSensor[sensor_key] ){
                                    if(val.bv != undefined){
                                        if(typeof(val.bv) === "Boolean"){
                                            this[sensor_key] = val.bv;
                                        }else{
                                            this[sensor_key] = val.bv == "true"? true: false;
                                        }
                                        
                                    }else{
                                        this[sensor_key] = val.sv;
                                    }
                                
                                }
                            }
                            
                        })  
                    })
                    
                })
            },
           switchChange(setSensorVal, cid){

                let setSensorId = settingsStatusSensor[cid];
                if(this.selectedAgentId == ''){
                    swal("","Please select your device","info").then(() => {
                        this[cid] = !this[cid];
                    })
                    return;
                }
                _g.openGlobalLoading();
                setSensorStatusApi(setSensorId, setSensorVal, this.selectedAgentId, aimSdkPlugin).then((data) => {
                    handleResponse(data, (res) =>{
                        if(res.items[0].statusCode == "200"){
                            swal("","success","success");
                        }else{
                            this[cid] = !setSensorVal;
                        }
                    })
                    
                })
            },
            powerAction(cid){
                if(this.selectedDeviceId == ''){
                    swal("","Please select your device","info")
                    return;
                }
                swal({
                    title: "Are you sure?",
                    text: cid+" this device",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                }).then(function(willfunc){
                    if (willfunc) {
                        _g.openGlobalLoading();
                        powerActionApi(cid, this.selectedDeviceId).then((data) => {
                            handleResponse(data, (res) => {
                                if(data.result == true){
                                    swal("", cid+" success", "success")
                                }
                            })
                           
                        })
                    }
                })  
            },

            getDeviceOption(msg){
                this.selectedAgentId = msg.value;
                this.selectedDeviceId = msg.key;
                this.getSensorStatus();
            }
        },

    }
</script>

<style lang='scss' scoped>
@import "@/assets/css/colors.scss";
.pd-5{
    padding:5px
}
.info-box {
  display: block;
  min-height: 180px;
  background: #fff;
  width: 100%;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  margin: 15px 0px 15px 0px;;
  text-align: center;
  
}
.info-box-icon {
  border-top-left-radius: 2px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 2px;
  display: block;
  /* float: left; */
  height: 120px;
  width: 120px;
 
  line-height: 40px;
  font-size: 45px;
  /* background: rgba(0, 0, 0, 0.2); */
  padding-top: 20px;
  margin:1rem auto;
}
.info-box-icon-white {
  color: #fff;
}
.info-box-icon-title{
	color:#fff;
    font-size:15px;
    margin-bottom: 20px;
}
</style>