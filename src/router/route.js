import login from '../components/account/login';
import batchList from '../components/batch/list';
import controlList from '../components/control/list';
import deviceList from '../components/device/list';
import deviceAdd from '../components/device/add';
import devicegroupList from '../components/devicegroup/list';
import refresh from '../components/refresh'
import  vncList from '../components/vnc/list';
import  terminalList from '../components/terminal/list';
import main from '@/components/home'
import auth from '../assets/js/auth'
let childRoute = [
    {
        path: '/refresh',
        component: refresh,
        name: "refresh"
    },
    {
        path: 'batch/list',
        component: batchList,
        name: 'batchList'
    },
    {
        path: 'control/list',
        component: controlList,
        name: 'controlList'
    },
    {
        path: 'device/list',
        component: deviceList,
        name: 'deivceList'
    },
    {
        path: 'device/add',
        component: deviceAdd,
        name: 'deviceAdd'
    },
    {
        path: 'devicegroup/list',
        component: devicegroupList,
        name: 'devicegroupList'
    },
    {
        path: 'vnc/list',
        component: vncList,
        name: 'vncList'
    },
    {
        path: 'terminal/list',
        component: terminalList,
        name: 'terminal'
    },
    {
        path: '*',
        redirect:'device/list'
    }
]
let route = [
    {
        path: '/',
        component: login,
        name: 'login',
    },
    {
        path: '/main',
        name: 'main',
        component: main,
        beforeEnter: (to, from, next) => {
            redirectByAuth().then((path) => {       
                if(path === "/main"){
                    next()
                }else{
                    swal('','login expires','error').then(() =>{
                        next(path) 
                    })
                }
   
            });
            
        },
        children: childRoute,
        redirect:'/main/device/list'    
    },
    {
        path: '*',
        redirect:'/'
    }
    
]

function redirectByAuth(){
    console.log('route',auth.loginstatus());
    return auth.loginstatus().then(function(data){
        console.log(data);
        
        if(data){
            return '/main';
        }else{
            return '/';
        }
    })  
}

export default route