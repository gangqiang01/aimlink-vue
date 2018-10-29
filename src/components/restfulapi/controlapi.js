import baseApi from "../../assets/js/baseapi";

const controlApi = {
    methods: {
        getSensorStatusApi(did, sensorId, agentId, plugin){
            return new Promise((resolve, reject) => {
                let GetSensorsData={};
                GetSensorsData.agentId = agentId;
                GetSensorsData.plugin = plugin;
                GetSensorsData.sensorId = sensorId;
                GetSensorsData._ = Date.parse(new Date());
                let myurl = "rmm/v1/devicectrl/"+did+"/data";
                baseApi.apiGet(myurl, GetSensorsData).then((obj) => {
                    resolve(data);
                }).catch((error) => {
                    resolve(err.response);
                })
            })
        },

        setSensorStatusApi(setSensorId, setsensorval, selectedAgentId, plugin){
            return new Promise((resolve, reject) => {
                let setsensordata = {};
                setsensorid = AppFuncSensor[cid]; 
                setsensordata.agentId = selectedAgentId;
                setsensordata.plugin = plugin;
                setsensordata.sensorIds = [];
                setsensordata.sensorIds[0]={"n":setSensorId, "sv":setsensorval};
                baseApi.apiPost("rmm/v1/devicectrl/data",setsensordata).then((data) => {
                    resolve(data);
                }).catch((error) => {
                    resolve(err.response);
                })
            })
        },

        startDeviceMonitorApi(DeviceId, selectedAgentId, plugin, that){
            return new Promise((resolve, reject) => {
                let intervalTime = 1,timeoutTime = 60
                let intervalReportData = {};
                intervalReportData.agentid = selectedAgentId;
                intervalReportData.plugin = controlProperty.systemMonitorPlugin;
                intervalReportData.interval = intervalTime;
                intervalReportData.timeout = timeoutTime;
                baseApi.apiPut("rmm/v1/devicectrl/intermittent_report", intervalReportData).then((data) => {
                    that.handleResponse(data, (res) =>{
                        if(res.result){
                            baseApi.deviceMonitorTimer = window.setInterval(function(){
                                let GetSystemMonitorData = {};
                                GetSystemMonitorData.agentId = selectedAgentId;
                                GetSystemMonitorData.plugin = plugin;
                                GetSystemMonitorData._ = new Date().getTime();
                                DeviceId = SelectedDeviceId;
                                let myurl = "rmm/v1/data/devices/"+DeviceId+"/latestdata";
                                baseApi.apiGet(myurl, GetSystemMonitorData).then((data) =>{
                                    resolve(data);
                                }).catch((error) => {
                                    resolve(err.response);
                                }, 3000)
                            })
                        }
                        
                    })  
                }).catch((error) => {
                    resolve(err.response);
                })
            })
        },
    }
}
export default controlApi;
