let localVideo = document.getElementById("local-video");
let remoteVideo = document.getElementById("remote-video");

// Video and audio are enabled for this call.

let peer, localStream;
let MediaConfiguration = {
  audio: true,
  video: true,
};

// Initialize peer object with userId

function init(userId) {
  peer = new Peer(userId);
  peer.on("open", () => {
    console.log(`user connected with userID = ${userId}`);
  });
  listenCall();
}

// Get the user media (camera and microphone) for the call.

function makeCall(friendId) {
  navigator.mediaDevices.getUserMedia(MediaConfiguration)
    .then((stream) => {
      localVideo.srcObject = stream;
      localStream = stream;

      const call = peer.call(friendId, stream);
      call.on("stream", (remoteStream) => {
        remoteVideo.srcObject = remoteStream;
      });
    })
    .catch((error) => {
      console.error("Error getting user media:", error);
    });
}

// Call navigator.mediaDevices.getUserMedia to get user media

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
}

// Call init with random UUID
init(getUID());

// Generate a random UUID string.
function getUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}