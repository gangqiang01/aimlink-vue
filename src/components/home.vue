<template>
    <div class="wrapper" >
        <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;"> -->
        <home-header></home-header>
        <!-- </el-radio-group> -->
        <div class="body">
            <div class="menu">
                <el-menu 
                    :default-active="activeItem" 
                    background-color="#222d32"
                    text-color="#ddd"
                    active-text-color="#ffbf00"
                    class="el-menu-vertical"  
                    :unique-opened="isUnique"
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
                    <!-- <router-link to="/main/batch/list">
                        <el-menu-item index="batchList">
                            <i class="fa fa-window-restore" aria-hidden="true"></i>
                            <span slot="title">Batch Control</span>
                        </el-menu-item>
                    </router-link>   -->
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
            </div>
            <div class="content"  v-loading="showLoading">
                <transition name="fade" mode="out-in">
                    <!-- <keep-alive> -->
                    <router-view></router-view>
                    <!-- </keep-alive> -->
                </transition>
            </div>
        </div> 
        <home-footer></home-footer>  
    </div>

</template>



<style lang='scss' scoped>
    @import "../assets/css/colors";
    $nav-icon-color : $primary-color; 
    $header-height : 70px;
    $aside-width : 240px;

    .wrapper{
        display: -webkit-flex;
        display: flex;
        height: 100vh;
        flex-flow: column nowrap;
        overflow: hidden;    
        .body{
            display: -webkit-flex;
            flex: 1;
            height: 100%;
            display: flex;
            flex-flow: row nowrap;
            .menu{
                height: 100%; 
                overflow-y: auto;
                overflow-x: hidden;
                width: $aside-width;
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
            }
            .content{
                flex:1;
                margin:10px;
                margin-right: 0;
                height: 100%;
                overflow-y: auto;
                overflow-x: hidden;
                .fade-enter-actice, .fade-leave-active{
                    transition: opacity .5s
                } 
                .fade-enter, .fade-leave-active{
                    opacity: 0;
                }
            }
        }

        
    }

    
</style>

<script>
    import {mapState} from 'vuex'
    import homeHeader from './main/header'
    import homeFooter from './main/footer'

    export default {
        name: 'home',
        data() {
            return {
                isCollapse: false,
                activeItem: 'device-devicelist',
                isUnique: true,
            };
        },
        methods: {
            collapse(){
                this.isCollapse = this.isCollapse? false: true;
            },
            handleScroll(){

            }
        },

        created(){
            this.activeItem = this.$route.meta.menuName;
        },

        mounted () {
            window.addEventListener('scroll', this.handleScroll)
        },

        computed: {
            ...mapState({
                showLoading: "globalLoading"
            }),        
        },

        watch: {
            $route(to, from){
                this.activeItem = to.meta.menuName;
            },
        },
        components:{
            homeHeader,
            homeFooter
        },
    }
</script>