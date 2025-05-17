const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const voiceBtn = document.getElementById("voice-btn");

function appendMessage(sender, message) {
  const div = document.createElement("div");
  div.classList.add("message", sender);
  div.textContent = message;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function getBotResponse(input) {
  try {
    const res = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input })
    });
    const data = await res.json();
    appendMessage("bot", data.response);
  } catch (err) {
    console.error(err);
    appendMessage("bot", "Error contacting ChatGPT.");
  }
}

sendBtn.onclick = () => {
  const text = userInput.value.trim();
  if (text === "") return;
  appendMessage("user", text);
  userInput.value = "";
  getBotResponse(text);
};

voiceBtn.onclick = () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return alert("Speech recognition not supported.");

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;

  recognition.start();

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    appendMessage("user", transcript);
    getBotResponse(transcript);
  };

  recognition.onerror = (event) => {
    appendMessage("bot", "Voice input failed.");
  };
};
