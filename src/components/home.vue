<template>
    <div class="wrapper">
        <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;"> -->
        <el-header class="nav-header">
            <ul class="nav-left pointer" @click="collapse()">
                <li>
                    <i class="fa fa-bars" aria-hidden="true"></i>
                </li>
                <li>
                    <img src="@/assets/imgs/logo.png">
                </li>
            </ul>
            <ul class="nav-right">
                <li>
                    <el-dropdown trigger="click" >
                        <el-badge :value=msgcount class="el-dropdown-link">
                            <i class="fa fa-bell-o fa-x header-bell" aria-hidden="true"></i>
                        </el-badge> 
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item></el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </li>
                
                <li> 
                     <el-dropdown trigger="click" >
                        <span class="el-dropdown-link">
                            <i class="fa fa-user-circle-o header-user"></i> 
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item >
                                <ul class="home_userinfo">
                                    <li class="drapdown-user">
                                        
                                        <img src="@/assets/imgs/face_black.png" alt="">
                                        <p> {{useremail}}</p>
                                    </li>
                                    <li>
                                        <p>
                                            <b>Last Accessed:</b>{{logintime}}
                                        </p>
                                        <p>
                                            <b>Device Bound:</b>{{devicecount}}
                                        </p>
                                    </li>
                                    <li class="drapdown-loginaction">
                                        <el-button type="primary" class="fr" @click="loginout()">
                                            {{loginstate}}
                                        </el-button>
                                    </li>
                                </ul>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>  
                </li>
            </ul>
        </el-header>
       
            
        <!-- </el-radio-group> -->
        <div class="body">
                <el-menu default-active="1-4-1" class="el-menu-vertical-demo"  :collapse="isCollapse">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="fa fa-tasks" aria-hidden="true"></i>
                            <span slot="title">Device management</span>
                        </template>
                        <el-menu-item-group>
                            <router-link to="/main/device/list">
                                <el-menu-item index="1-1">
                                        Device List
                                </el-menu-item>
                            </router-link>
                            <router-link to="/main/devicegroup/list">
                                <el-menu-item index="1-2"> 
                                        Device Group
                                </el-menu-item>
                            </router-link>
                        </el-menu-item-group>
                    </el-submenu>
                    <router-link to="/main/control/list">
                        <el-menu-item index="2">
                            <i class="fa fa-window-maximize" aria-hidden="true"></i>
                            <span slot="title">Remote Control</span>
                        </el-menu-item>
                    </router-link> 
                    <router-link to="/main/batch/list">
                        <el-menu-item index="3">
                                <i class="fa fa-window-restore" aria-hidden="true"></i>
                                <span slot="title">Batch Control</span>
                        </el-menu-item>
                    </router-link>  
                    <router-link to="/main/kvm/list">
                        <el-menu-item index="4">
                                <i class="fa fa-desktop" aria-hidden="true"></i>
                                <span slot="title">KVM</span>
                        </el-menu-item>
                    </router-link>
                    <router-link to="/main/terminal/list">
                        <el-menu-item index="5">
                            <i class="fa fa-terminal" aria-hidden="true"></i>
                            <span slot="title">Terminal</span>
                        </el-menu-item>
                    </router-link>
                </el-menu>

            <main class="content">
                <transition name="fade" mode="out-in">
                    <router-view></router-view>
                </transition>
            </main>
        </div>   
    </div>
</template>



<style lang='scss' scoped>

    $nav-icon-color : #337ab7; 
    $header-height : 60px;
    $aside-width : 200px;
    .wrapper{
        display: -webkit-flex;
        display:flex;
        flex-flow: column nowrap;
        .nav-header{
            display: -webkit-flex;
            display: flex;
            flex-flow: row nowrap;
            flex-basis: $header-height;
            flex-shrink: 0;
            align-items: center;
            .nav-left{
                padding:0;
                margin:0;
                display: flex;
                justify-content: flex-start;
                li{ 
                    i{
                        color : $nav-icon-color;
                        font-size:1.5rem
                    }
                    margin-right: 1rem;
                    
                }
                li:nth-child(2){
                    margin-top:0.1rem
                }
            
            }
            .nav-right{
                padding:0;
                margin:0;
                flex-grow:1;
                display: flex;
                justify-content: flex-end;
                li{  
                    i{
                        color : $nav-icon-color;
                        font-size:1.5rem;
                    }
                    margin-left: 2rem;
                    width:1rem;
                    
                
                    color:$nav-icon-color;
                }
                .home_userinfo{
                    li:first-child{
                        text-align: center;
                    }
                    li:nth-child(2){
                        text-align: left;
                    }
            
                }
            }
        }
    
        .body{
            display: -webkit-flex;
            display:flex;
            flex-flow: row nowrap;
        }

        .el-menu-vertical-demo:not(.el-menu--collapse) {
            width: $aside-width;
            min-height: 400px;
            box-sizing: border-box;
            
        }

        .content{
            display: -webkit-flex;
            display: flex;
            flex-shrink: 1;
            .fade-enter-actice, .fade-leave-active{
                transition: opacity .5s
            } 
            .fade-enter, .fade-leave-active{
                opacity: 0;
            }
        }

    }
    
    
    
    
    
</style>

<script>
import http from '../assets/js/http'

  export default {
    data() {
        return {
            isCollapse: false,
            img:"",
            msgcount:'',
            loginstate:'Login Out',
            useremail:'',
            logintime:'',
            devicecount:'',
        };
    },
    methods: {
        collapse(){
            this.isCollapse = this.isCollapse? false: true;
        },
        getuserinfo(){
            var data = {};
            data._now =  new Date().getTime();
            var that = this
            this.apiGet("rmm/v1/accounts/myself",data).then(function(data){
                that.useremail =  data["accounts"][0].name
                that.logintime = _g.unixToTime(data["accounts"][0].login_unix_ts);
            })
            var dvdata = {};
            dvdata._ = new Date().getTime();
            this.apiGet("rmm/v1/devices/own/status/number", dvdata).then(
                function(data){
                    that.devicecount = data.connected;
                }
            )
            
        },
        loginout(){
            Cookies.setCookie("sessionId", '', 0);
            Cookies.setCookie('EIToken',"",0);
            this.$router.replace('/');
        }
    },
    created(){
        this.getuserinfo()
    },
    mixins: [http]
  }
</script>