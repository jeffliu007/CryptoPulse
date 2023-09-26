import { useState, useEffect } from "react";
import openai from "../services/openAI.js";

const Chat = () => {
	const [messages, setMessages] = useState([]);
	const [inputMessage, setInputMessage] = useState("");

	const sendMessage = async () => {
		if (inputMessage.trim() === "") return;

		// Add the user's message to the list of messages
		setMessages([...messages, { role: "user", content: inputMessage }]);

		try {
			const chatCompletion = await openai.chat.completions.create({
				model: "gpt-3.5-turbo",
				messages: [...messages, { role: "user", content: inputMessage }],
			});

			// Extract the content from the API response and add it to the list of messages
			const assistantReply = chatCompletion.choices[0].message.content;
			setMessages([
				...messages,
				{ role: "assistant", content: assistantReply },
			]);
		} catch (error) {
			console.error("Error fetching data:", error);
		}

		// Clear the input field after sending the message
		setInputMessage("");
	};

	useEffect(() => {
		// Initialize the chat with a welcome message
		setMessages([
			{ role: "system", content: "Welcome to the chat!" },
			...messages,
		]);
	}, []); // This effect runs once when the component mounts

	return (
		<div>
			<h1>Chat Room</h1>
			<div className="chat-container">
				{messages.map((message, index) => (
					<div key={index} className={`message ${message.role}`}>
						{message.content}
					</div>
				))}
			</div>
			<div className="input-container">
				<input
					type="text"
					value={inputMessage}
					onChange={(e) => setInputMessage(e.target.value)}
					placeholder="Type your message..."
				/>
				<button onClick={sendMessage}>Send</button>
			</div>
		</div>
	);
};

export default Chat;
