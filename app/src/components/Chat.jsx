import { useState, useEffect } from "react";
import { openai, error } from "../services/openAI.js";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

  const sendMessage = async () => {
    if (inputMessage.trim() === "") return;

    const userMessage = { role: "user", content: inputMessage };
    const updatedMessages = [...messages, userMessage]; // Store user message

    try {
      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: updatedMessages, // Include user message in the conversation
      });

      const assistantReply = chatCompletion.choices[0].message.content;
      const assistantMessage = { role: "assistant", content: assistantReply };
      updatedMessages.push(assistantMessage); // Store assistant message
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    setMessages(updatedMessages); // Update messages with both user and assistant messages
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
      {error ? (
        <div>
          <h2 className="chat-error">{error}</h2>
          {/* You can add additional UI or component here for handling the missing API key case */}
        </div>
      ) : (
        <>
          <div className="chat-container">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message-list ${
                  message.role === "user"
                    ? "user-message"
                    : message.role === "assistant"
                    ? "assistant-message"
                    : "system-message"
                }`}
              >
                {message.role === "user"
                  ? "You: "
                  : message.role === "assistant"
                  ? "GPT AI: "
                  : ""}
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
        </>
      )}
    </div>
  );
};

export default Chat;
