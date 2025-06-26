const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userText = input.value.trim();
  if (!userText) return;

  appendMessage('user', userText);
  input.value = '';

  appendMessage('bot', 'Mengetik...');

  try {
    const response = await fetch('https://pinzy-proxy-gpt.vercel.app/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userText })
    });
    const data = await response.json();
    updateLastBotMessage(data.reply || '❌ Gagal membalas.');
  } catch (error) {
    updateLastBotMessage('❌ Server proxy tidak merespons.');
    console.error(error);
  }
});

function appendMessage(sender, text) {
  const div = document.createElement('div');
  div.className = sender;
  div.textContent = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function updateLastBotMessage(newText) {
  const messages = chatBox.getElementsByClassName('bot');
  if (messages.length > 0) {
    messages[messages.length - 1].textContent = newText;
  }
}
