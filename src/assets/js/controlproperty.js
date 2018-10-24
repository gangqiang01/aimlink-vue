let systemMonitorPlugin = "ProcessMonitor";
let aimSdkPlugin = "AimSdk";
let droidRoot = "DroidRoot";
let getRepoAppUrl =  "http://172.21.73.109:30001/vuethink/php/index.php/admin/Restrepo/getapkinfo/reponame/aim-market";
let getRepoToken = "http://172.21.73.109:30001/vuethink/php/index.php/admin/Restrepo/gettoken";
let repoAppBaseDownloadUrl = "http://172.21.73.109:30002"
let settingsStatusSensor = {
    wifi: "/devicectrl/ctrl-wifi",
    bluetooth: "/devicectrl/ctrl-bluetooth",
    lockscreen: "/securityctrl/ctrl-lockscreen", 
    systemversion: "/devicectrl/get-system-version",
    systemboard: "/devicectrl/get-system-board",
    systemmodel: "/devicectrl/get-system-model",
    agentversion: "/devicectrl/get-agent-version",
    backkey: "/interfacectrl/ctrl-backbt",
    homekey: "/interfacectrl/ctrl-homebt"
};
let getappinfoSensor="/appctrl/get-all-app-info"
let appFuncSensor = {
    allappinfo: "/appctrl/get-all-app-info",
    disableapp: "/appctrl/disable-some-app",
    enableapp: "/appctrl/enable-some-app",
    installapp: "/appctrl/download-install-some-app",
    upgradeapp: "/appctrl/download-install-some-app",
    removeapp: "/appctrl/remove-some-app",
    startapp: "/appctrl/start-some-app",
    stopapp: "/rootctrl/stop-some-app"
};

let disableAppArray = ["org.flyve.mdm.agent"];

export default {
    systemMonitorPlugin,
    aimSdkPlugin,
    droidRoot,
    getRepoAppUrl,
    getRepoToken,
    repoAppBaseDownloadUrl,
    settingsStatusSensor,
    getappinfoSensor,
    appFuncSensor,
    disableAppArray
}


