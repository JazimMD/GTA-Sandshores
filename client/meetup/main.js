  let localVideo = document.getElementById("local-video");
  let remoteVideo = document.getElementById("remote-video");
  let quiz = document.getElementById("quiz");
  let timers = document.getElementById("timer");
  let correct = document.getElementById("correct");
  let correctanswer = 0;
  var timer;


 const data = {
    "funnyRiddles": [
      {
        "question": "I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?",
        "options": ["A ghost", "An echo", "A tree", "A cloud"],
        "correct": "An echo"
      },
      {
        "question": "The more you take, the more you leave behind. What am I?",
        "options": ["Footprints", "Money", "Wisdom", "Luggage"],
        "correct": "Footprints"
      },
      {
        "question": "What has keys but can't open locks?",
        "options": ["A keyboard", "A piano", "A treasure chest", "A typewriter"],
        "correct": "A piano"
      },
      {
        "question": "I'm tall when I'm young, and short when I'm old. What am I?",
        "options": ["A giraffe", "A candle", "A sunflower", "A person"],
        "correct": "A candle"
      },
      {
        "question": "What comes once in a minute, twice in a moment, but never in a thousand years?",
        "options": ["The letter 'M'", "A heartbeat", "A thought", "A blink"],
        "correct": "The letter 'M'"
      },
      {
        "question": "Why don't skeletons fight each other?",
        "options": ["They don't have the guts", "They're too scared", "They can't move", "They're peaceful"],
        "correct": "They don't have the guts"
      },
      {
        "question": "What has one eye but can't see?",
        "options": ["A needle", "A cyclops", "A camera", "A potato"],
        "correct": "A needle"
      },
      {
        "question": "What belongs to you but other people use it more than you do?",
        "options": ["Your car", "Your house", "Your name", "Your phone"],
        "correct": "Your name"
      },
      {
        "question": "What starts with 'P' and ends with 'E' and has more than 1000 letters?",
        "options": ["A postcard", "A paragraph", "A postman", "A post office"],
        "correct": "A post office"
      },
      {
        "question": "I can be cracked, made, told, and played. What am I?",
        "options": ["A joke", "A puzzle", "A song", "A secret"],
        "correct": "A joke"
      }
    ]
  }
  


  let peer, localStream;
  let MediaConfiguration = {
    audio: true,
    video: true,
  };


  function init(userId) {
    peer = new Peer(userId);
    peer.on("open", () => {
      console.log(`user connected with userID = ${userId}`);
    });
    listenCall();
  }


  function makeCall(friendId) {
    navigator.mediaDevices.getUserMedia(MediaConfiguration)
      .then((stream) => {
        localVideo.srcObject = stream;
        localStream = stream;
  
        const call = peer.call(friendId, stream);
        call.on("stream", (remoteStream) => {
          remoteVideo.srcObject = remoteStream;
  
          // Code to execute after the call has been established
        });
        const result = separateCharacters(getFragmentIdentifier());
        if (result.alphabet === "a") {
          playaudio(Math.floor(Math.random() * 5) + 1);
        }
        if (result.alphabet === "c") {
          playquiz(0);
          startTimer();
        }
      })
      .catch((error) => {
        console.error("Error getting user media:", error);
      });
  }
  

  function listenCall() {
    peer.on("call", (call) => {
      navigator.mediaDevices.getUserMedia(MediaConfiguration)
        .then((stream) => {
          localVideo.srcObject = stream;
          localStream = stream;

          call.answer(stream);
          call.on("stream", (remoteStream) => {
            remoteVideo.srcObject = remoteStream;
          });
        })
        .catch((error) => {
          console.error("Error getting user media:", error);
        });
    });
    const result = separateCharacters(getFragmentIdentifier());
  if(result.alphabet == "a"){
    console.log("calling partner")
    makeCall((parseInt(result.numeric) + 1).toString());
  }
  else if(result.alphabet == "c"){
    console.log("calling partner")
    makeCall((parseInt(result.numeric) +2).toString());
  }
  else if(result.alphabet == "e"){
    console.log("calling partner")
    makeCall((parseInt(result.numeric) +3).toString());
  }
}


  init(getUID());

  function getUID() {
    const result = separateCharacters(getFragmentIdentifier());
    console.log(result.numeric);
    return result.numeric;
    // return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    //   var r = (Math.random() * 16) | 0,
    //     v = c === "x" ? r : (r & 0x3) | 0x8;
    //   return v.toString(16);
    // });
    // return(getFragmentIdentifier());
  }


  function getFragmentIdentifier() {
    return window.location.hash.substring(1); 
  }

  function separateCharacters(input) {
    const alphabetPart = input.replace(/\d/g, ''); // Remove digits
    const numericPart = input.replace(/\D/g, ''); // Remove non-digits

    return { alphabet: alphabetPart, numeric: numericPart };
  }
  function playaudio(id) {
    console.log('Playing audio with ID:', id);
    var audio = new Audio('audio' + id + '.mp3');
    // var audio = new Audio('audio1.mp3');
    console.log('Audio object:', audio);
    audio.play();
    document.getElementById('audio').play();

  }

  function playquiz(id) {
    var cardHtml = `
      <div>
        <h2 id="question">${data.funnyRiddles[id].question}</h2>
        <div id="options">
          <button id="option1" onclick="checkAnswer(this)">${data.funnyRiddles[id].options[0]}</button>
          <button id="option2" onclick="checkAnswer(this)">${data.funnyRiddles[id].options[1]}</button>
          <button id="option3" onclick="checkAnswer(this)">${data.funnyRiddles[id].options[2]}</button>
          <button id="option4" onclick="checkAnswer(this)">${data.funnyRiddles[id].options[3]}</button>
        </div>
      </div>`;
    quiz.innerHTML = cardHtml;
  
    var correctHtml = `
      <div>
        <h2 id="question">correct answer: ${correctanswer}</h2>
      </div>`;
    correct.innerHTML = correctHtml;
  }
  
  function checkAnswer(option) {
    console.log("hi");
    console.log(option.innerText);
    if (option.innerText == data.funnyRiddles[correctanswer].correct) {
      console.log("correct answer");
      correctanswer++;
      timer += 10; 
      if (correctanswer < 10) {
        playquiz(correctanswer);
      } else {
        quiz.innerHTML = "<h2>Quiz completed</h2>";
      }
    } else {
      console.log("wrong answer");
    }
  }
  
  
  function startTimer() {
    timer = 10; 
    const timerInterval = setInterval(() => {
      console.log(timer + " seconds remaining...");
  
      if (timer <= 0) {
        clearInterval(timerInterval);
        console.log("Timer expired!");
        var timeHtml = `
          <div>
            <h2 id="question">Time's up</h2>
          </div>`;
        timers.innerHTML = timeHtml;
      } else {
        var timeHtml = `
          <div>
            <h2 id="question">${timer}</h2>
          </div>`;
        timers.innerHTML = timeHtml;
  
        timer--;
      }
    }, 1000);
  }
  