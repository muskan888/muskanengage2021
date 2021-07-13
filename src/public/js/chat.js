const socket = io();
const myvideo = document.querySelector("#vd1");
const roomid = params.get("room");
let username;
const chatRoom = document.querySelector('.chat-cont');
const sendButton = document.querySelector('.chat-send');
const messageField = document.querySelector('.chat-input');
const videoContainer = document.querySelector('#vcont');
const overlayContainer = document.querySelector('#overlay')
const continueButt = document.querySelector('.continue-name');
const nameField = document.querySelector('#name-field');
const videoButt = document.querySelector('.novideo');
const audioButt = document.querySelector('.audio');

let videoAllowed = 1;
let audioAllowed = 1;

let micInfo = {};
let videoInfo = {};

const configuration = { iceServers: [{ urls: "stun:stun.stunprotocol.org" }] }

const mediaConstraints = { video: true, audio: true };

let connections = {};
let cName = {};
let audioTrackSent = {};
let videoTrackSent = {};

let mystream, myscreenshare;

socket.on('user count', count => {
   
})

let peerConnection;


function reportError(e) {
    console.log(e);
    return;
}





function handleNewIceCandidate(candidate, sid) {
    console.log('new candidate recieved')
    var newcandidate = new RTCIceCandidate(candidate);

    connections[sid].addIceCandidate(newcandidate)
        .catch(reportError);
}

function handleVideoAnswer(answer, sid) {
    console.log('answered the offer')
    const ans = new RTCSessionDescription(answer);
    connections[sid].setRemoteDescription(ans);
}


socket.on('new icecandidate', handleNewIceCandidate);


socket.on('join room', async (conc, cnames, micinfo, videoinfo) => {
    socket.emit('getCanvas');
    let filterJSON = {
        "where":{
            "roomId":roomid
        }
    }
    let filter = encodeURIComponent(JSON.stringify(filterJSON));
    fetch("/chat_chat?filter="+filter, {
        method: 'GET'
    })
  .then(res =>res.json())
  .then(ress=>{
        console.log(ress);
        ress.map((message)=>{
            if(message.isMedia){
                chatRoom.innerHTML += `<div class="message">
                <div class="info">
                    <div class="username">${message.senderName}</div>
                    <div class="time">${message.time}</div>
                </div>
                <div class="content">
                    <a target="_blank" href=${message.mediaDetails.downloadURLs[0]}>
                    ${message.mediaDetails.name}
                    </a>
                    ${message.mediaDetails.type}
                </div>
            </div>`
            }else{
                chatRoom.innerHTML += `<div class="message">
                <div class="info">
                    <div class="username">${message.senderName}</div>
                    <div class="time">${message.time}</div>
                </div>
                <div class="content">
                    ${message.message}
                </div>
            </div>`
            }
        })
    chatRoom.scrollTop = chatRoom.scrollHeight;
    })
    if (cnames)
        cName = cnames;

    if (micinfo)
        micInfo = micinfo;

    if (videoinfo)
        videoInfo = videoinfo;


    console.log(cName);
})

socket.on('remove peer', sid => {
    if (document.getElementById(sid)) {
        document.getElementById(sid).remove();
    }

    delete connections[sid];
})

sendButton.addEventListener('click', () => {
    const msg = messageField.value;
    messageField.value = '';
    socket.emit('message', msg, username, roomid);
})

messageField.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        sendButton.click();
    }
});

socket.on('message', (msg, sendername, time) => {
    chatRoom.scrollTop = chatRoom.scrollHeight;
    chatRoom.innerHTML += `<div class="message">
    <div class="info">
        <div class="username">${sendername}</div>
        <div class="time">${time}</div>
    </div>
    <div class="content">
        ${msg}
    </div>
</div>`
});

socket.on('mediaMessage', (msg, sendername, time) => {
    chatRoom.innerHTML += `<div class="message">
    <div class="info">
        <div class="username">${sendername}</div>
        <div class="time">${time}</div>
    </div>
    <div class="content">
        <a href=${msg.downloadURLs[0]}>
        ${msg.name}
        </a>
        ${msg.type}
    </div>
</div>`
chatRoom.scrollTop = chatRoom.scrollHeight;

});


socket.on('action', (msg, sid) => {
    if (msg == 'mute') {
        console.log(sid + ' muted themself');
        document.querySelector(`#mute${sid}`).style.visibility = 'visible';
        micInfo[sid] = 'off';
    }
    else if (msg == 'unmute') {
        console.log(sid + ' unmuted themself');
        document.querySelector(`#mute${sid}`).style.visibility = 'hidden';
        micInfo[sid] = 'on';
    }
    else if (msg == 'videooff') {
        console.log(sid + 'turned video off');
        document.querySelector(`#vidoff${sid}`).style.visibility = 'visible';
        videoInfo[sid] = 'off';
    }
    else if (msg == 'videoon') {
        console.log(sid + 'turned video on');
        document.querySelector(`#vidoff${sid}`).style.visibility = 'hidden';
        videoInfo[sid] = 'on';
    }
})

continueButt.addEventListener('click', () => {
    if (nameField.value == '') return;
    username = nameField.value;
    overlayContainer.style.visibility = 'hidden';
    socket.emit("join room", roomid, username);

})

nameField.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        continueButt.click();
    }
});



function openNav() {
  document.getElementById("right-cont").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("right-cont").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
}