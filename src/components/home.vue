<template>
    <div>
        <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;"> -->
        <el-header class="nav-content">
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
                    
                    <i class="fa fa-user-circle-o"></i>
                </li>
                <li>
                    <el-badge :value=msgcount>
                        <i class="fa fa-bell-o fa-x" aria-hidden="true"></i>
                    </el-badge>
                    
                </li>
                
            </ul>
        </el-header>
       
            
        <!-- </el-radio-group> -->
        <el-row>
            <el-col :span="3">
                <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
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
            </el-col>
            <el-col :span="21">
                <transition name="fade" mode="out-in">
                    <router-view></router-view>
                </transition>
            </el-col>
        </el-row>
        
    </div>
    
</template>



<style lang='scss' scoped>
    $nav-icon-color : #337ab7;  
    .fade-enter-actice, .fade-leave-active{
        transition: opacity .5s
    } 
    .fade-enter, .fade-leave-active{
        opacity: 0;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        min-height: 400px;
    }
    .nav-content{
        .nav-left{
            padding:0;
            margin:0;
            li{ 
                i{
                    color : $nav-icon-color;
                }
                float:left;
                margin-right: 1rem;
                font-size:1.5rem
            }
            li:nth-child(2){
                margin-top:0.1rem
            }
           
        }
        .nav-right{
            padding:0;
            margin:0;
            li{  
                float:right;
                margin-left: 2rem;
                width:1rem;
                font-size:1.8rem;
               
                color:$nav-icon-color;
            }
        }
    }
</style>

<script>
  export default {
    data() {
        return {
            isCollapse: false,
            img:"",
            msgcount:''
        };
    },
    methods: {
        collapse(){
            this.isCollapse = this.isCollapse? false: true;
        }
    }
  }
</script>