<template>
    <div>
        <p class="header-line"><i class="fa fa-line-chart c-blue m-r-10" ></i>Device Monitor</p>
        <el-col :span="6">
            <select-group @select-device="getDeviceOption"></select-group>
        </el-col>
        <el-col :span="18" class="m-t-20">
            <el-col :md="11" :sm="12">
                <canvas id="cpuchart" height="200" role="img"></canvas>
            </el-col>
            <el-col :md="11" :sm="12" :offset="1">
                <canvas id="memorychart" height="200" role="img"></canvas>
            </el-col>
        </el-col>
    </div>
</template>

<script>
    import {startIntermittentApi, getDeviceStatusApi} from '../restfulapi/monitorapi'
    import selectGroup from '../../common/select-group'
    import {systemMonitorPlugin} from '@/assets/js/controlproperty'
    import Chart from 'chart.js'
    import handleResponse from '../restfulapi/handleresponse'

    export default{
        name: 'controlMonitor',
        data(){
            return {
                deviceMonitorTimer: null,
                deviceId:'',
                selectedAgentId:'',
                cpudata: new Array(7),
                memorydata: new Array(7),
                memoryNowPercentage: 0,
                cpuNowPercentage: 0
            }
        },
        components:{
            selectGroup
        },
        methods:{
            getTimeOptions(){
                let options=[];
                let date = new Date();
                let time = "";
                let Hours =  date.getHours();if(Hours<10) Hours = "0"+Hours;
                let Min = date.getMinutes();if(Min<10) Min = "0"+Min;
                let Sec =  date.getSeconds();if(Sec<10) Sec = "0"+Sec;
                for (let i=0;i<=6;i++){
                    time =  Hours+":"+Min+":"+Sec;
                    options.unshift(time)
                    Sec = Sec - 3;
                    if(Sec<10&&0<=Sec){
                        Sec = "0"+Sec;
                    }else if(Sec<0){
                        Sec=60+Sec;
                        Min--;
                        if(Min<10){
                            Min = "0"+Min;
                        }
                    }
                }
                return options;
            },
            startDeviceMonitor(selectedAgentId, deviceId){
                if(this.deviceMonitorTimer == null){
                    startIntermittentApi(selectedAgentId, systemMonitorPlugin).then((data) => {
                        handleResponse(data, (res) =>{
                            if(res.result = true){
                                console.log(this);
                                this.deviceMonitor(selectedAgentId, deviceId);
                                this.deviceMonitorTimer = window.setInterval(() => {
                                    this.deviceMonitor(selectedAgentId, deviceId)
                                },3000)
                            }else{
                                console.log("inetervalreport error")
                            }
                        })
                        
                    })
                }
            },
            deviceMonitor(selectedAgentId, deviceId){
                let cpuNowPercentage, memoryNowPercentage;
                getDeviceStatusApi(deviceId, selectedAgentId, systemMonitorPlugin).then((data) =>{
                    handleResponse(data, (res)=>{
                        if(res.connected == false){
                            swal("","this Device has been offline","info").then(function(){
                                window.clearInterval(this.deviceMonitorTimer);
                                return;
                            });

                        }else if(res.ProcessMonitor == undefined){
                            swal("","your data miss","info").then(
                                function(){
                                    window.clearInterval(this.deviceMonitorTimer)
                                    return;
                                }
                            ); 
                        }
                        cpuNowPercentage = res.ProcessMonitor["System Monitor Info"]["e"][0].v;
                        let ToMemoryData = res.ProcessMonitor["System Monitor Info"]["e"][1].v
                        let NewMemoryData = res.ProcessMonitor["System Monitor Info"]["e"][2].v;
                        this.memoryNowPercentage = parseInt(NewMemoryData/ToMemoryData*100);
                        this.cpudata.push(cpuNowPercentage);
                        this.cpudata.shift();
                        this.memorydata.push(this.memoryNowPercentage);
                        this.memorydata.shift();
                        this.drawCpuChart()
                        this.drawMemoryChart()
                    })
                    
                   
                })
            },

            drawCpuChart(){
                let labelOptions = this.getTimeOptions();
                let ctx = document.getElementById("cpuchart").getContext('2d');
                let chart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        datasets: [{
                            label: 'CPU Usage('+this.cpuNowPercentage+'%)',
                            data: this.cpudata,
                            backgroundColor: "transparent",
                            borderColor : "rgba(51,122,183,0.5)",
                        }],
                        labels: labelOptions
                    },
                    options: {
                        animation: {
                            duration: 0
                        },
                        title: {
                            display: true,
                            text: 'CPU Monitor',
                            fontColor: "#428bca",
                            lineHeight: "1.2",
                            fontSize: "17"
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    suggestedMin: 0,
                                    suggestedMax: 100,
                                    stepSize: 10
                                }
                            }]
                        }
                    }
                });
            },

            drawMemoryChart(){

                let labelOptions = this.getTimeOptions();
                let ctx = document.getElementById("memorychart").getContext('2d');
                let chart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        datasets: [{
                            label: 'Memory Usage('+ this.memoryNowPercentage+'%)',
                            data: this.memorydata,
                            backgroundColor: "transparent",
                            borderColor : "rgba(45,213,179,0.5)",
                        }],
                        labels: labelOptions
                    },

                    options: {
                        animation: {
                            duration: 0
                        },
                        title: {
                            display: true,
                            text: 'Memory Monitor',
                            fontColor: "#337ab7",
                            lineHeight: "1.2",
                            fontSize: "17"
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    suggestedMin: 0,
                                    suggestedMax: 100,
                                    stepSize: 10
                                }
                            }]
                        }
                    }
                });
            },

            getDeviceOption(msg){
                this.startDeviceMonitor( msg.value, msg.key);
            }
        },

        mounted(){
            this.drawCpuChart(this.cpudata)
            this.drawMemoryChart(this.memorydata)
        },

        beforeDestroy() {
            window.clearInterval(this.deviceMonitorTimer);        
            this.deviceMonitorTimer = null;
        }
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