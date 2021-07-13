console.log(roomid)

    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyD7pPoY-6qlBq-17rCG4qsqAnFSe8QUHGQ",
      authDomain: "project783897-99b0b.firebaseapp.com",
      projectId: "project783897-99b0b",
      storageBucket: "project783897-99b0b.appspot.com",
      messagingSenderId: "418096251611",
      appId: "1:418096251611:web:17499b24027dd54ba002fe",
      measurementId: "G-FXPXGBV3VW"
    };
    firebase.initializeApp(config);
    //-------------------------------------
    
    var uploader = document.getElementById('uploader');
    var uploadPercentage = document.getElementById('uploadPercentage');

    var fileButton = document.getElementById('fileButton');
    console.log("firebase");
    fileButton.addEventListener('change', function(e){
    console.log("in change firebase");
    var file = e.target.files[0];
    var storageRef = firebase.storage().ref('img/'+file.name);
    var task = storageRef.put(file);
    task.on('state_changed', function progress(snapshot) {
      var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
      uploadPercentage.innerText = parseInt(percentage)+'%';
      if(percentage < 50){
        uploader.style.color = "#000000";
      }else{
        uploader.style.color = "#ffffff";
      }
      uploader.style.width = percentage+'%';
  
    }, function error(err) {
        console.log("in change firebase  error",err);
  
    },function complete(res) {
        uploader.style.width = 0+'%';
        fileButton.value = "";
        console.log("in change firebase completed",task.snapshot.metadata);
        socket.emit('mediaMessage', task.snapshot.metadata, username, roomid);
    });
  });  