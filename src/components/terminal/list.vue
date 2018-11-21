<template>
   <div>
        <p class="header-line"><i class="fa fa-terminal c-blue m-r-10" ></i>Device Terminal</p>
        <el-col :span="6">
            <select-group @select-device="getDeviceOption"></select-group>
        </el-col>
        <el-col :span="18" class="m-t-20">
            <div id="terminal" style="margin: 0px; overflow: hidden;">
                <i class="fa fa-times fa-x pointer" id="Terminal_closed" style="display:none" v-show="isShowClosed" @click="disconnectTerminal" ></i>
                <div id="vt100" v-show="isShowContent">
                    <div id="Terminal_enter">
                        <h2 class="Terminal_title">Open Your Device's Terminal</h2>
                        <el-button type="primary" id="open_terminal_button" @click="startTerminal">
                            <i class="fa fa-link"></i> Open
                        </el-button>
                    </div>   
                </div>
                <iframe :src="iframeSrc" frameborder="0" id="terminal_iframe"></iframe>
            </div>
        </el-col>
   </div>
</template>

<script>
    import selectGroup from '../../common/select-group'
    import _terminalWebsocket from "../../../static/shellinabox/terminalSocket"
    import uuid from '../../../static/shellinabox/uuid-random'

    export default{
        name: 'terminalList',
        data(){
            return {
                selectedAgentId: '',
                selectedDeviceId: '',
                iframeSrc: '',
                isShowClosed: false,
                isShowContent: true,
            }
        },
        components:{
            selectGroup
        },
        methods: {
            startTerminal(){
                if(!this.selectedAgentId.length === 0){
                    swal("","Please select your device","info");
                    return;
                }
                var container = document.getElementById("vt100");
                var agentid = this.selectedAgentId;
                var sessionid = uuid();
                var type = "SSO";
                var host = "portal-rmm.wise-paas.com";
                
                this.isShowContent = false;
                this.iframeSrc =  `/static/shellinabox/webshell.html?agentID=${agentid}&sessionID=${sessionid}&host=${host}&type=${type}`;
                this.isShowClosed = true;

            },

            disconnectTerminal(){
                this.isShowContent = true;
                this.isShowClosed = false;
                this.iframeSrc = '';
                if(this.iframeSrc.length ===0) return;
            },

            getDeviceOption(msg){
                this.selectedAgentId = msg.value;
                this.selectedDeviceId = msg.key;
                this.disconnectTerminal();
            }
        },
        created(){

        }

    }
</script>
<style lang='scss' scoped>
#Terminal_enter .Terminal_title, #VNC_enter .VNC_title{
    color:#337ab7;
    margin-bottom:20px;
}

#VNC_enter, #Terminal_enter{
    position: absolute;
    left:50%;
    top:50%;
    transform:translate(-50%, -50%);
    text-align: center;
}
#terminal{
    width:100%;
    border:1px solid #ddd;
    height:45rem;
    position:relative;
    background-color:#eaeaea;
}

#terminal_iframe{
    height:60rem;
    width:100%;
}

#Terminal_closed{
    position: absolute;
    color:#d3104b;
    padding:5px;
    right:2rem;
    top:-4px;
    cursor: pointer;
}
</style>