import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from './components/ChatMessage';
import TypingAnimation from './components/TypingAnimation';
import { getGeminiResponse } from './gemini';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
}

const WELCOME_MESSAGE: Message = {
  id: 0,
  text: "Hello! I'm Milo, your friendly AI assistant. I'm here to help you with a wide range of tasks, from answering questions to helping with creative projects. Feel free to ask me anything, and I'll do my best to assist you!",
  sender: 'ai'
};

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');
      
    
      video.style.pointerEvents = 'none';
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { id: Date.now(), text: input, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const history = messages.map(m => `${m.sender === 'user' ? 'User' : 'Assistant'}: ${m.text}`).join('\n');
      const aiResponse = await getGeminiResponse(input, history);
      const aiMessage: Message = {
        id: Date.now(),
        text: aiResponse,
        sender: 'ai',
      };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: Message = {
        id: Date.now(),
        text: "I'm sorry, I encountered an error. Please try again.",
        sender: 'ai',
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        className="fixed inset-0 w-full h-full object-cover"
      >
        <source src="/chatbotbg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="flex-1 overflow-hidden flex flex-col justify-end p-4 relative z-10">
        <div className="overflow-y-auto mb-4 flex flex-col items-center custom-scrollbar">
          <div className="w-full max-w-2xl">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isTyping && <TypingAnimation />}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex justify-center">
          <div className="w-full max-w-2xl flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-2 rounded-l-lg border-2 border-white/20 focus:outline-none focus:border-white/40 bg-black/50 text-white placeholder-white/50"
              placeholder="Type your message..."
            />
            <button
              type="submit"
              className="bg-white/10 text-white p-2 rounded-r-lg hover:bg-white/20 transition duration-200"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
