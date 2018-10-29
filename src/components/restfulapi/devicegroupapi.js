import baseApi from "../../assets/js/baseapi";

const deviceGroupApi = {
    methods: {
        getDeviceGroupApi(that){
            return new Promise((resolve, reject) => {
                let devGetData = {};
                devGetData.pageSize = 1000;
                devGetData.no = 1;
                devGetData.orderType = "aid";
                devGetData.like = "";
                devGetData._ = new Date().getTime();
                baseApi.apiGet('rmm/v1/accounts', devGetData).then((data) => {
                    that.handleResponse(data, (res) => {
                        let accountId = res.accounts[0].aid
                        let groupGetData = {};
                        groupGetData._ = new Date().getTime();
                        baseApi.apiGet("rmm/v1/accounts/"+accountId+"/groups", groupGetData).then((data) => {
                            resolve(data);
                        }).catch((err) => {
                            resolve(err.response);
                        })
                    })
                }).catch((error) => {
                    resolve(error.response);
                }) 
            })
        },
        addGroupApi(aid, gid = '', groupName, groupDescription){
            return new Promise((resolve, reject) => {
                let addGroupData = {};        
                addGroupData.deviceGroups = [{aid: aid, gid: gid, name: groupName, description: groupDescription}];
                baseApi.apiPost("rmm/v1/devicegroups", addGroupData).then((data) =>{
                    resolve(data);
                }).catch((err) => {
                    resolve(err.response);
                })
            })
            
        },

        deleteGroupApi(row){ 
            return new Promise((resolve, reject) => {
                baseApi.apiDelete('rmm/v1/devicegroups/'+row.gid).then((data) => {
                    resolve(data);
                }).catch((err) => {
                    resolve(err.response);
                })
            }) 
        },

    }
}
export default deviceGroupApi;
