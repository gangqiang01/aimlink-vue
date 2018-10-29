<template>
    <div class="wrapper">
        <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;"> -->
        <el-header class="nav-header">
            <ul class="nav-left pointer" >
                <!-- <li @click="collapse()">
                    <i :class="[isCollapse? allowright: allowleft]"class="c-blue" aria-hidden="true"></i>
                </li> -->
                <li>
                    <img src="@/assets/imgs/logo.png">
                </li>
            </ul>
            <ul class="nav-right">
                <li>
                    <el-dropdown trigger="click" >
                        <el-badge :value="msgCount" class="el-dropdown-link" >
                            <i class="fa fa-bell-o fa-x header-bell" aria-hidden="true"></i>
                        </el-badge> 
                        <el-dropdown-menu slot="dropdown" >
                             <el-dropdown-item v-show='!msgIsShow' class="text-center fz-18 c-primary">
                                <span>
                                    <i class="fa fa-bell-slash-o m-r-10" aria-hidden="true"></i>No new notifications
                                </span>
                            </el-dropdown-item>
                            <el-dropdown-item v-show='msgIsShow' class="text-center fz-18">
                                you have {{msgCount}} new notifications
                            </el-dropdown-item>
                            <el-dropdown-item v-for="(item, index) in msgData" :key="index">
                                <el-tooltip placement="top">
                                    <div slot="content">
                                        <ul>
                                            <li>
                                                <span>device: </span>{{item.agent_name}}
                                            </li>
                                            <li>
                                                <span>type:</span>{{item.type}}
                                            </li>
                                            <li>
                                                <span>Date:</span>{{item.ts.$date|time}}
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="m-l-5" v-if="item.severity == 'ERROR'">
                                        <i class="fa fa-times-circle fa-x c-danger p-r-5"></i>
                                        {{item.subtype.toLowerCase()}}
                                    </div>
                                     <div class="m-l-5" v-if="item.severity == 'WARNING'">
                                        <i class="fa fa-exclamation-triangle fa-x c-warn p-r-5"></i>
                                        {{item.subtype.toLowerCase()}}
                                    </div>
                                     <div class="m-l-5" v-else>
                                        <i class="fa fa-info-circle fa-x c-success p-r-5" ></i>
                                        {{item.subtype.toLowerCase()}}
                                    </div>
                                </el-tooltip>   
                            </el-dropdown-item>
                            <el-dropdown-item v-show="msgIsShow">
                                <el-button type="primary" size="small" class="fl" @click="viewAll">
                                    <i class="fa fa-eye m-r-5"></i>View all event
                                </el-button>
                                <el-button type="primary" size="small" class="fr" @click="markAll">
                                    <i class="fa fa-eye-slash m-r-5"></i>Mark All as read
                                </el-button>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </li>
                
                <li> 
                     <el-dropdown trigger="click" >
                        <span class="el-dropdown-link">
                            <i class="fa fa-user-circle-o header-user"></i> 
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item class="text-center" >
                                <img src="@/assets/imgs/face_black.png" alt="">
                                <p> {{useremail}}</p>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <b>Last Accessed:</b>{{logintime}}
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <b>Device Bound:</b>{{devicecount}}
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-button type="primary" size="small" class="fr" @click="loginout()">
                                    {{loginstate}}
                                </el-button>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>  
                </li>
            </ul>
        </el-header>
       
            
        <!-- </el-radio-group> -->
        <div class="body">
            <el-menu 
            :default-active="activeItem" 
            background-color="#222d32"
            text-color="#ddd"
            active-text-color="#ffbf00"
            class="el-menu-vertical"  
            unique-opened=true
            :collapse="isCollapse">
                <el-submenu index="device">
                    <template slot="title">
                        <i class="fa fa-tasks" aria-hidden="true"></i>
                        <span slot="title">Device management</span>
                    </template>
                    <el-menu-item-group >
                        <router-link to="/main/device/list">
                            <el-menu-item index="device-devicelist">
                                    Device List
                            </el-menu-item>
                        </router-link>
                        <router-link to="/main/devicegroup/list">
                            <el-menu-item index="device-grouplist"> 
                                    Device Group
                            </el-menu-item>
                        </router-link>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="control" >
                    <template slot="title">
                        <i class="fa fa-hand-pointer-o" aria-hidden="true"></i>
                        <span slot="title">Device Control</span>
                    </template>
                    <el-menu-item-group>
                        <router-link to="/main/control/monitor">
                            <el-menu-item index="control-monitor">
                                Device monitor
                            </el-menu-item>
                        </router-link>
                        <router-link to="/main/control/remotecontrol">
                            <el-menu-item index="control-remotecontrol"> 
                                Remote Control                                   
                            </el-menu-item>
                        </router-link>
                        <router-link to="/main/control/appcontrol">
                            <el-menu-item index="control-appcontrol"> 
                                App Control
                            </el-menu-item>
                        </router-link>
                    </el-menu-item-group>
                </el-submenu>
                <router-link to="/main/batch/list">
                    <el-menu-item index="batchList">
                        <i class="fa fa-window-restore" aria-hidden="true"></i>
                        <span slot="title">Batch Control</span>
                    </el-menu-item>
                </router-link>  
                <router-link to="/main/vnc/list">
                    <el-menu-item index="vncList">
                        <i class="fa fa-desktop" aria-hidden="true"></i>
                        <span slot="title">KVM</span>
                    </el-menu-item>
                </router-link>
                <router-link to="/main/terminal/list">
                    <el-menu-item index="terminalList">
                        <i class="fa fa-terminal" aria-hidden="true"></i>
                        <span slot="title">Terminal</span>
                    </el-menu-item>
                </router-link>
            </el-menu>

            <main class="content">
                <transition name="fade" mode="out-in">
                    <keep-alive>
                        <router-view v-loading="showLoading"></router-view>
                    </keep-alive>
                </transition>
            </main>
        </div>   
    </div>
</template>



<style lang='scss' scoped>
    @import "../assets/css/colors";
    $nav-icon-color : $primary-color; 
    $header-height : 70px;
    $aside-width : 220px;

    .wrapper{
        display: -webkit-flex;
        display:flex;
        height: 100vh;
        flex-flow: column nowrap;
        .nav-header{
            background: $lightgray-color;
            border-bottom: 3px solid $purple-color;
            display: -webkit-flex;
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            justify-content: space-between;
            .nav-left{
                padding:0;
                margin:0;
                display: flex;
                li{ 
                    img{
                        height: 17px;
                    }
                    i{
                        color : $nav-icon-color;
                        font-size:1.5rem
                    }
                    margin-right: 1rem;
                    &:nth-child(2){
                        margin-top: 0.1rem;
                    } 
                }
            }
            .nav-right{
                padding:0;
                margin:0;
                display: flex;
                li{  
                    i{
                        color : $nav-icon-color;
                        font-size:1.5rem;
                    }
                    margin-left: 2rem;
                    width:1rem;
                    color:$nav-icon-color;
                }
                
            }
        }
    
        .body{
            display: -webkit-flex;
            flex:1;
            display:flex;
            flex-flow: row nowrap;
        }

        .el-menu-vertical:not(.el-menu--collapse) {
            flex: 0 0 $aside-width;
            height: 100%;
            box-sizing: border-box;
            i {
                margin-right: 5px;
            }

            .el-menu-item-group, .el-menu-item-group li{
                background-color: #181f23 !important;
            }
            .is-active{
                background-color: rgb(27,36,40) !important;
            }
        }

        .content{
            flex:1;
            margin:10px;
            .fade-enter-actice, .fade-leave-active{
                transition: opacity .5s
            } 
            .fade-enter, .fade-leave-active{
                opacity: 0;
            }
        }
    }
    .home_userinfo{
        display: flex;
        flex-direction: column;
        min-width:3rem;
        li{
            display: flex;
            flex-direction: column;
            align-items: center;
            &:nth-child(2){
                align-items: flex-start;
                align-items: flex-start;
            }
            &:nth-child(3){
                align-self: flex-end;
            }
        }
    } 
    
</style>

<script>
    import http from '@/assets/js/http'
    import websockconnect from '@/assets/js/socket'
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
                isCollapse: false,
                img:"",
                msgCount:'',
                loginstate:'Login Out',
                useremail:'',
                logintime:'',
                devicecount:'',
                msgData: [],
                msgIsShow: false,
                allowleft: "fa fa-long-arrow-left",
                allowright: "fa fa-bars",
                activeItem: 'device-devicelist',
            };
        },
        methods: {
            collapse(){
                this.isCollapse = this.isCollapse? false: true;
            },
            getuserinfo(){
                var data = {};
                data._now =  new Date().getTime();
                this.apiGet("rmm/v1/accounts/myself",data).then((res) => {
                    this.handleResponse(res, (res) => {
                        console.log(res);
                        this.useremail =  res["accounts"][0].name
                        this.logintime = moment(res["accounts"][0].login_unix_ts).format("YYYY-MM-DD HH:mm:ss")
                    })
                })
                var dvdata = {};
                dvdata._ = new Date().getTime();
                this.apiGet("rmm/v1/devices/own/status/number", dvdata).then((res) => {
                    this.handleResponse(res, (res) => {
                        this.devicecount = res.connected;
                    })
                })
            },
            loginout(){
                Cookies.setCookie("sessionId", '', 0);
                Cookies.setCookie('EIToken', "", 0);
                this.$router.replace('/');
            },
            websocket(){
                let that = this
                let ws = websockconnect();
                ws.onopen = (evt) => { 
                    console.log("Connection open ..."); 
                };
                ws.onmessage = (eventJson) => {
                    console.log("msgenter");
                    let msgOrgData = JSON.parse(eventJson.data).events;
                    if(msgOrgData.length != 0){
                        msgOrgData = msgOrgData.map((val)=> {
                            return JSON.parse(val);
                        });
                        that.msgData = that.msgData.concat(msgOrgData);
                        window.localStorage.setItem("msgData", JSON.stringify(that.msgData));
                        that.msgCount = that.msgData.length;
                        that.msgIsShow = true;
                    }
                };
                ws.onclose = (evt) => {
                    console.log("Connection closed.");
                    ws = null;
                };
            },

            markAll(){
                this.msgCount = '';
                this.msgData = [];
                this.msgIsShow = false;
                window.localStorage.removeItem("msgData");   
            },

            viewAll(){
                this.markAll();
                router.replace('/main/message/list')
            },

            showMsg(){
                if(window.localStorage.getItem("msgData") != null){
                    
                    let msgLocalData = localStorage.getItem('msgData');
                    msgLocalData = JSON.parse(msgLocalData);
                    this.msgData = msgLocalData;
                    this.msgCount = this.msgData.length;
                    this.msgIsShow = true;
                }
                
            }
            
        },
        mounted(){
            this.websocket();
        },

        created(){
            this.activeItem = this.$route.meta.menuName;
            this.showMsg()
            this.getuserinfo();   
        },

        // computed: {
        //     showLoading(){
        //         return store.state.globalLoading;
        //     }
        // },
        computed: {
            ...mapState({
                showLoading: "globalLoading"
            })

        },

        watch: {
            $route(to, from){
                this.activeItem = to.meta.menuName;
            }
        },
        mixins: [http]
    }
</script>