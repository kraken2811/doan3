import React, { useState } from "react";
import axios from "axios";
import "./chatbot.css";

const API_KEY = "AIzaSyBhCfQc-h4RZ6aeYMIqAj9uQc0ZH5MbKeI"; // API Key Gemini
const API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent";


export default function Chatbot({ onClose }) {
    const [messages, setMessages] = useState([{ text: "Xin chào! Tôi có thể giúp gì cho bạn?", fromBot: true }]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;
    
        const userMessage = { text: input, fromBot: false };
        setMessages([...messages, userMessage]);
        setInput("");
        setLoading(true);
    
        try {
            const response = await axios.post(
                `${API_URL}?key=${API_KEY}`,
                {
                    contents: [{ parts: [{ text: input }] }]
                },
                {
                    headers: { "Content-Type": "application/json" }
                }
            );
    
            const botResponse = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "Xin lỗi, tôi không hiểu.";
            setMessages((prev) => [...prev, { text: botResponse, fromBot: true }]);
        } catch (error) {
            console.error("Lỗi gọi API:", error);
            setMessages((prev) => [...prev, { text: "Xin lỗi, có lỗi xảy ra. Vui lòng thử lại!", fromBot: true }]);
        }
    
        setLoading(false);
    };
    
    return (
        <div className="chatbot-container">
            <button className="close-chatbot" onClick={onClose}>❌</button>
            <div className="chatbox">
                {messages.map((msg, index) => (
                    <div key={index} className={msg.fromBot ? "bot-message" : "user-message"}>
                        {msg.text}
                    </div>
                ))}
                {loading && <div className="bot-message">Đang trả lời...</div>}
            </div>
            
            <div className="chat-input">
                <input 
                    type="text" 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                    placeholder="Nhập tin nhắn..." 
                    disabled={loading}
                />
                <button onClick={handleSend} disabled={loading}>Gửi</button>
            </div>
        </div>
    );
}
