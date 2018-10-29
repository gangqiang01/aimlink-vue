import baseApi from "../../assets/js/baseapi";

const vncApi = {
    methods: {
        getVNCPropertysApi(selectedAgentId, vnc_mode, repeaterId){
            return new Promise((resolve, reject) => {
                var getPatamsData={};
                getPatamsData.agentid = selectedAgentId;
                getPatamsData.mode = vnc_mode;
                getPatamsData.repeaterid = repeaterId;
                baseApi.apiPost("rmm/v1/kvm",getPatamsData).then((data) =>{
                    resolve(data);
                }).catch((err) => {
                    resolve(err.response);
                })
            })
        },
    }
}
export default vncApi;
