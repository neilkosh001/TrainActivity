  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCFcPjD2j1ogfZoIrqqA3RZhmrs9SbQdSw",
    authDomain: "traintime-63ebd.firebaseapp.com",
    databaseURL: "https://traintime-63ebd.firebaseio.com",
    projectId: "traintime-63ebd",
    storageBucket: "",
    messagingSenderId: "529501648939"
  };
  firebase.initializeApp(config);

//   reference to our firebase database
  var trainData = firebase.database();

  $("#addTrainBtn").on('click',function(){
    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    // moment.js
    var firstTrain = moment($("#firstTrainInput").val().trim(),"HH:mm").subtract(10,"years").format("X");
    var frequency = $("#frequencyInput").val().trim();

  var newTrain = {
      name: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency,

    }

    trainData.ref().push(newTrain);

    alert("Train Added!");

    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainInput").val("");
    $("#frequencyInput").val("");

    return false;

  })

  // Collect data from firebase and store data

  trainData.ref().on("child_added",function(snapshot){
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var firstTrain = snapshot.val().firstTrain;
    var frequency = snapshot.val().frequency;

    var timeLeft = moment().diff(moment.unix(firstTrain),"minutes")%frequency;
    var minutes = frequency - timeLeft;
    var arrival = moment().add(minutes,"m").format("hh:mm A");

    console.log(timeLeft);
    console.log(minutes);
    console.log(arrival);

    $("#trainTable > tBody").append("<tr><td>"+name+"</td><td>"+destination+"</td><td>"+frequency+"</td><td>"+arrival+"</td><td>"+minutes+"</td><td>");

  })