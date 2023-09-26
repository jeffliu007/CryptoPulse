import { useState, useEffect } from "react";
import openai from "../services/openAI.js";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const sendMessage = async () => {
    if (inputMessage.trim() === "") return;

    setMessages([...messages, { role: "user", content: inputMessage }]);

    try {
      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [...messages, { role: "user", content: inputMessage }],
      });

      const assistantReply = chatCompletion.choices[0].message.content;
      setMessages([
        ...messages,
        { role: "assistant", content: assistantReply },
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    setInputMessage("");
  };
  const handleKeyDown = (e) => {
    if (e.code === "Enter") {
      sendMessage(e.target.value);
      setInputMessage("");
    }
  };

  useEffect(() => {
    setMessages([{ role: "system", content: "" }, ...messages]);
  }, []);

  return (
    <div className="chat-wrapper">
      <h1>Ask GPT Any Questions!</h1>
      <div className="chat-container">
        {messages.map((message, index) => (
          <div key={index} className="message-list">
            {message.content}
          </div>
        ))}
      </div>
      <div className="input-container">
        <textarea
          type="text"
          value={inputMessage}
          onKeyDown={handleKeyDown}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button className="chat-button" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
