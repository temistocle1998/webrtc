// const socket = io("/");
// const videoGrid = document.getElementById("video-grid");
// const myVideo = document.createElement("video");
// const showChat = document.querySelector("#showChat");
// const backBtn = document.querySelector(".header__back");
// const startButton = document.getElementById('startButton');
// const raiseHandButton = document.getElementById('raiseHandButton');
// myVideo.muted = true;

// backBtn.addEventListener("click", () => {
//   document.querySelector(".main__left").style.display = "flex";
//   document.querySelector(".main__left").style.flex = "1";
//   document.querySelector(".main__right").style.display = "none";
//   document.querySelector(".header__back").style.display = "none";
// });

// showChat.addEventListener("click", () => {
//   document.querySelector(".main__right").style.display = "flex";
//   document.querySelector(".main__right").style.flex = "1";
//   document.querySelector(".main__left").style.display = "none";
//   document.querySelector(".header__back").style.display = "block";
// });

// const user = prompt("Enter your name");

// var peer = new Peer({
//   // host: '192.168.1.18',
//   host: 'localhost',
//   port: 3030,
//   path: '/peerjs',
//   config: {
//     'iceServers': [
//       { url: 'stun:stun01.sipphone.com' },
//       { url: 'stun:stun.ekiga.net' },
//       { url: 'stun:stunserver.org' },
//       { url: 'stun:stun.softjoys.com' },
//       { url: 'stun:stun.voiparound.com' },
//       { url: 'stun:stun.voipbuster.com' },
//       { url: 'stun:stun.voipstunt.com' },
//       { url: 'stun:stun.voxgratia.org' },
//       { url: 'stun:stun.xten.com' },
//       {
//         url: 'turn:192.158.29.39:3478?transport=udp',
//         credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
//         username: '28224511:1379330808'
//       },
//       {
//         url: 'turn:192.158.29.39:3478?transport=tcp',
//         credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
//         username: '28224511:1379330808'
//       }
//     ]
//   },

//   debug: 3
// });

// let myVideoStream;
// navigator.mediaDevices
//   .getUserMedia({
//     audio: true,
//     video: true,
//   })
//   .then((stream) => {
//     myVideoStream = stream;
//     addVideoStream(myVideo, stream);

//     peer.on("call", (call) => {
//       console.log('someone call me');
//       call.answer(stream);
//       const video = document.createElement("video");
//       call.on("stream", (userVideoStream) => {
//         addVideoStream(video, userVideoStream);
//       });
//     });

//     socket.on("user-connected", (userId) => {
//       connectToNewUser(userId, stream);
//     });
//   });

// const connectToNewUser = (userId, stream) => {
//   console.log('I call someone' + userId);
//   const call = peer.call(userId, stream);
//   const video = document.createElement("video");
//   call.on("stream", (userVideoStream) => {
//     addVideoStream(video, userVideoStream);
//   });
// };

// peer.on("open", (id) => {
//   console.log('my id is' + id);
//   socket.emit("join-room", ROOM_ID, id, user);
// });

// const addVideoStream = (video, stream) => {
//   video.srcObject = stream;
//   video.addEventListener("loadedmetadata", () => {
//     video.play();
//     videoGrid.append(video);
//     video.controls = true;
//   });
// };

// let text = document.querySelector("#chat_message");
// let send = document.getElementById("send");
// let messages = document.querySelector(".messages");

// send.addEventListener("click", (e) => {
//   if (text.value.length !== 0) {
//     socket.emit("message", text.value);
//     text.value = "";
//   }
// });

// text.addEventListener("keydown", (e) => {
//   if (e.key === "Enter" && text.value.length !== 0) {
//     socket.emit("message", text.value);
//     text.value = "";
//   }
// });

// const inviteButton = document.querySelector("#inviteButton");
// const muteButton = document.querySelector("#muteButton");
// const stopVideo = document.querySelector("#stopVideo");
// muteButton.addEventListener("click", () => {
//   const enabled = myVideoStream.getAudioTracks()[0].enabled;
//   if (enabled) {
//     myVideoStream.getAudioTracks()[0].enabled = false;
//     html = `<i class="fas fa-microphone-slash"></i>`;
//     muteButton.classList.toggle("background__red");
//     muteButton.innerHTML = html;
//   } else {
//     myVideoStream.getAudioTracks()[0].enabled = true;
//     html = `<i class="fas fa-microphone"></i>`;
//     muteButton.classList.toggle("background__red");
//     muteButton.innerHTML = html;
//   }
// });

// stopVideo.addEventListener("click", () => {
//   const enabled = myVideoStream.getVideoTracks()[0].enabled;
//   if (enabled) {
//     myVideoStream.getVideoTracks()[0].enabled = false;
//     html = `<i class="fas fa-video-slash"></i>`;
//     stopVideo.classList.toggle("background__red");
//     stopVideo.innerHTML = html;
//   } else {
//     myVideoStream.getVideoTracks()[0].enabled = true;
//     html = `<i class="fas fa-video"></i>`;
//     stopVideo.classList.toggle("background__red");
//     stopVideo.innerHTML = html;
//   }
// });

// inviteButton.addEventListener("click", (e) => {
//   prompt(
//     "Copy this link and send it to people you want to meet with",
//     window.location.href
//   );
// });

// socket.on("createMessage", (message, userName) => {
//   messages.innerHTML =
//     messages.innerHTML +
//     `<div class="message">
//         <b><i class="far fa-user-circle"></i> <span> ${userName === user ? "me" : userName
//     }</span> </b>
//         <span>${message}</span>
//     </div>`;
// });

// function handleSuccess(stream) {
//   startButton.disabled = true;
//   const video = document.createElement("video");
//   video.srcObject = stream;
//   video.addEventListener("loadedmetadata", () => {
//     video.play();
//     videoGrid.append(video);
//   });

//   // Demonstrates how to detect that the user has stopped sharing the screen via the browser UI.
//   stream.getVideoTracks()[0].addEventListener('ended', () => {
//     errorMsg('The user has ended sharing the screen');
//     startButton.disabled = false;
//   });

//   // Replaces the current video stream with the screen share stream
//   const call = peer.call(ROOM_ID, stream);
//   call.on("stream", (userVideoStream) => {
//     const video = document.createElement("video");
//     addVideoStream(video, userVideoStream);
//   });
// }

// function handleError(error) {
//   errorMsg(`getDisplayMedia error: ${error.name}`, error);
// }

// function errorMsg(msg, error) {
//   const errorElement = document.createElement("div");
//   errorElement.innerHTML = `<p>${msg}</p>`;
//   document.body.append(errorElement);
//   if (typeof error !== 'undefined') {
//     console.error(error);
//   }
// }

// startButton.addEventListener('click', () => {
//   navigator.mediaDevices.getDisplayMedia({
//     video: true,
//     audio: true
//   }).then(handleSuccess, handleError);
// });

// if (navigator.mediaDevices && 'getDisplayMedia' in navigator.mediaDevices) {
//   startButton.disabled = false;
// } else {
//   errorMsg('getDisplayMedia is not supported');
// }

// // Raise hand functionality
// raiseHandButton.addEventListener('click', () => {
//     socket.emit('raise-hand', user);
//   });
  
//   socket.on('user-raised-hand', (user) => {
//     const messages = document.querySelector('.messages');
//     const msg = document.createElement('div');
//     msg.classList.add('message');
//     msg.innerHTML = `<b>${user}</b> has raised their hand.🖐`;
//     messages.append(msg);
//     messages.scrollTop = messages.scrollHeight;
//   });

const socket = io("/");
const videoGrid = document.getElementById("video-grid");
const myVideo = document.createElement("video");
const showChat = document.querySelector("#showChat");
const backBtn = document.querySelector(".header__back");
const startButton = document.getElementById("startButton");
const raiseHandButton = document.getElementById("raiseHandButton");
const inviteButton = document.querySelector("#inviteButton");
const muteButton = document.querySelector("#muteButton");
const stopVideo = document.querySelector("#stopVideo");
const messages = document.querySelector(".messages");

myVideo.muted = true; // Avoid audio feedback

let myVideoStream;
let user = prompt("Enter your name") || "Anonymous";

// Initialize PeerJS with configuration
const peer = new Peer({
  host: "localhost", // Change to 'localhost' if testing on the same machine
  port: 3030,
  path: "/peerjs",
  config: {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" }, // Reliable public STUN server
      {
        urls: "turn:turn.anyfirewall.com:443?transport=tcp",
        username: "webrtc",
        credential: "webrtc",
      },
    ],
  },
  debug: 3, // Enable detailed logs for troubleshooting
});

// Handle media devices and video stream
navigator.mediaDevices
  .getUserMedia({ audio: true, video: true })
  .then((stream) => {
    myVideoStream = stream;
    addVideoStream(myVideo, stream);

    // Answer incoming calls
    peer.on("call", (call) => {
      console.log("Incoming call...");
      call.answer(stream); // Answer the call with our stream
      const video = document.createElement("video");

      call.on("stream", (userVideoStream) => {
        addVideoStream(video, userVideoStream);
      });
    });

    // Handle new user connections
    socket.on("user-connected", (userId) => {
      console.log(`User connected: ${userId}`);
      connectToNewUser(userId, stream);
    });
  })
  .catch((error) => {
    console.error("Error accessing media devices:", error);
  });

// Add video stream to grid
function addVideoStream(video, stream) {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
    videoGrid.append(video);
    video.controls = true;
  });
}

// Connect to new users
function connectToNewUser(userId, stream) {
  console.log(`Calling user: ${userId}`);
  const call = peer.call(userId, stream);
  const video = document.createElement("video");

  call.on("stream", (userVideoStream) => {
    addVideoStream(video, userVideoStream);
  });

  call.on("close", () => {
    video.remove(); // Clean up video on call close
  });
}

// Join room on peer open
peer.on("open", (id) => {
  console.log(`Peer connected with ID: ${id}`);
  socket.emit("join-room", ROOM_ID, id, user);
});

// Toggle chat visibility
showChat.addEventListener("click", () => {
  toggleChat(true);
});

backBtn.addEventListener("click", () => {
  toggleChat(false);
});

function toggleChat(show) {
  document.querySelector(".main__right").style.display = show ? "flex" : "none";
  document.querySelector(".main__left").style.display = show ? "none" : "flex";
  backBtn.style.display = show ? "block" : "none";
}

// Mute/unmute audio
muteButton.addEventListener("click", () => {
  const audioTrack = myVideoStream.getAudioTracks()[0];
  audioTrack.enabled = !audioTrack.enabled;
  muteButton.innerHTML = audioTrack.enabled
    ? `<i class="fas fa-microphone"></i>`
    : `<i class="fas fa-microphone-slash"></i>`;
  muteButton.classList.toggle("background__red");
});

// Enable/disable video
stopVideo.addEventListener("click", () => {
  const videoTrack = myVideoStream.getVideoTracks()[0];
  videoTrack.enabled = !videoTrack.enabled;
  stopVideo.innerHTML = videoTrack.enabled
    ? `<i class="fas fa-video"></i>`
    : `<i class="fas fa-video-slash"></i>`;
  stopVideo.classList.toggle("background__red");
});

// Send messages in chat
document.getElementById("send").addEventListener("click", sendMessage);
document.querySelector("#chat_message").addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const text = document.querySelector("#chat_message").value;
  if (text.trim().length) {
    socket.emit("message", text);
    document.querySelector("#chat_message").value = "";
  }
}

// Receive messages from other users
socket.on("createMessage", (message, userName) => {
  const msg = `<div class="message">
      <b><i class="far fa-user-circle"></i> <span>${userName === user ? "me" : userName}</span></b>
      <span>${message}</span>
    </div>`;
  messages.innerHTML += msg;
  messages.scrollTop = messages.scrollHeight; // Scroll to the latest message
});

// Invite users by sharing the link
inviteButton.addEventListener("click", () => {
  prompt("Copy this link to invite others:", window.location.href);
});

// Screen sharing functionality
startButton.addEventListener("click", () => {
  navigator.mediaDevices
    .getDisplayMedia({ video: true, audio: true })
    .then(handleScreenShare)
    .catch(handleError);
});

function handleScreenShare(stream) {
  startButton.disabled = true;
  const video = document.createElement("video");
  video.srcObject = stream;

  video.addEventListener("loadedmetadata", () => {
    video.play();
    videoGrid.append(video);
  });

  stream.getVideoTracks()[0].addEventListener("ended", () => {
    console.log("Screen sharing ended");
    startButton.disabled = false;
  });

  // Call the room with the screen share stream
  const call = peer.call(ROOM_ID, stream);
  call.on("stream", (userVideoStream) => {
    const video = document.createElement("video");
    addVideoStream(video, userVideoStream);
  });
}

function handleError(error) {
  console.error("Error sharing screen:", error);
}

// Raise hand feature
raiseHandButton.addEventListener("click", () => {
  socket.emit("raise-hand", user);
});

socket.on("user-raised-hand", (userName) => {
  const msg = document.createElement("div");
  msg.classList.add("message");
  msg.innerHTML = `<b>${userName}</b> has raised their hand. 🖐`;
  messages.append(msg);
  messages.scrollTop = messages.scrollHeight;
});
