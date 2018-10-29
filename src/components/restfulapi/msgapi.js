import baseApi from "../../assets/js/baseapi";

const msgApi = {
    methods: {
        getDeviceCategoryApi(){
            return new Promise((resolve, reject) => {
                var categoryData = {};
                categoryData.type = "Device";
                categoryData._ = new Date().getTime();
                baseApi.apiGet("rmm/v1/notifymgmt/category", categoryData).then((data) => {
                    resolve(data);
                }).catch((err) => {
                    resolve(err.response);
                })
            }) 
        },

        DeleteMsgApi(row){ 
            return new Promise((resolve, reject) => {
                baseApi.apiDelete('rmm/v1/devicegroups/'+row.gid).then((data) => {
                    resolve(data);
                }).catch((err) => {
                    resolve(err.response);
                })
            }) 
        },

        getEventMsgApi(severityValue, groupValue, categoryValue){
            return new Promise((resolve, reject) => {
                var eventMsgData = {};
                eventMsgData.severity = severityValue;
                eventMsgData.groupId = groupValue;
                eventMsgData.beginTs = _g.getFromNowTimes(7, 0);
                eventMsgData.endTs =  _g.getFromNowTimes(0, 0);
                eventMsgData.orderType = "desc";
                if(categoryValue != "all"){
                    eventMsgData.category =  categoryValue;
                }
                eventMsgData.amount = 20;
                eventMsgData._ = new Date().getTime();
                baseApi.apiGet("rmm/v1/events/devices", eventMsgData).then((data) => {
                    resolve(data);
                }).catch((err) => {
                    resolve(err.response);
                })
            })
        },
    }
}
export default msgApi;
