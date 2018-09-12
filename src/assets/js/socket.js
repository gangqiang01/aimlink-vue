function connectWebsocket(){
    if(window.WebSocket){
        var ws = new WebSocket("wss://portal-rmm.wise-paas.com/event/-1");
        ws.onopen = function(evt) { 
            console.log("Connection open ..."); 
        };

        return ws;
        
        ws.onmessage = function(eventJson) {
            console.log(eventJson);
            var msgData = JSON.parse(eventJson.data);
            localEventMsgJson = window.localStorage["eventMsg"] == undefined ? JSON.stringify([]): window.localStorage['eventMsg'];
            localEventMsg = JSON.parse(localEventMsgJson);
            eventData = localEventMsg.concat(msgData.events);
            window.localStorage["eventMsg"] = JSON.stringify(eventData);
            SetNotificationBell(eventData);
            // var inviteContent = SetSubscribeNotification(eventData);
            // document.getElementById("notification_content").innerHTML = inviteContent
        };
    
        ws.onclose = function(evt) {
            console.log("Connection closed.");
            ws = undefined;
        };
    }else{
        swal("","Your browser is not support WebSocket","error")
    }   
}