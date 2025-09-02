// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// 你的 Firebase 配置
const firebaseConfig = {
  apiKey: "AIzaSyAwmiAqdGejYqG8IvvoWm-nzqGLyj5TQsE",
  authDomain: "miao-fang.firebaseapp.com",
  databaseURL: "https://miao-fang-default-rtdb.firebaseio.com",
  projectId: "miao-fang",
  storageBucket: "miao-fang.firebasestorage.app",
  messagingSenderId: "117680297121",
  appId: "1:117680297121:web:0c4b8f6e0a4a9c9918cce0"
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

let roomId = null;
let video = document.getElementById("video");

// 创建房间
function createRoom() {
  roomId = document.getElementById("room-id").value;
  if (!roomId) return alert("请输入房间号！");
  document.getElementById("video-area").style.display = "block";
  syncVideo();
  syncChat();
}

// 加入房间
function joinRoom() {
  roomId = document.getElementById("room-id").value;
  if (!roomId) return alert("请输入房间号！");
  document.getElementById("video-area").style.display = "block";
  syncVideo();
  syncChat();
}

// 同步视频
function syncVideo() {
  const videoRef = ref(db, "rooms/" + roomId + "/video");

  // 监听远端状态
  onValue(videoRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      if (Math.abs(video.currentTime - data.time) > 1) {
        video.currentTime = data.time;
      }
      if (data.paused && !video.paused) video.pause();
      if (!data.paused && video.paused) video.play();
    }
  });

  // 本地操作上传到 Firebase
  video.addEventListener("play", () => {
    set(videoRef, { time: video.currentTime, paused: false });
  });
  video.addEventListener("pause", () => {
    set(videoRef, { time: video.currentTime, paused: true });
  });
  video.addEventListener("seeked", () => {
    set(videoRef, { time: video.currentTime, paused: video.paused });
  });
}

// 聊天功能
function syncChat() {
  const chatRef = ref(db, "rooms/" + roomId + "/chat");

  onValue(chatRef, (snapshot) => {
    const data = snapshot.val();
    const messagesDiv = document.getElementById("messages");
    messagesDiv.innerHTML = "";
    if (data) {
      Object.values(data).forEach(msg => {
        let p = document.createElement("p");
        p.textContent = msg;
        messagesDiv.appendChild(p);
      });
    }
  });
}

window.sendMessage = function() {
  const input = document.getElementById("chat-input");
  const msg = input.value.trim();
  if (!msg) return;
  const chatRef = ref(db, "rooms/" + roomId + "/chat/" + Date.now());
  set(chatRef, msg);
  input.value = "";
};

window.createRoom = createRoom;
window.joinRoom = joinRoom;
