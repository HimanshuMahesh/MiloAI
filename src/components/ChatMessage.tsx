import React from 'react';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isAi = message.sender === 'ai';

  return (
    <div className={`flex ${isAi ? 'justify-start' : 'justify-end'} mb-2`}>
      {isAi && (
        <div className="w-8 h-8 rounded-full flex items-center justify-center mr-2">
          <span className="text-2xl">😸</span>
        </div>
      )}
      <div
        className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 ${
          isAi 
            ? 'bg-black/70 text-white backdrop-blur-sm' 
            : 'bg-white text-black'
        } font-lexend prose prose-sm ${isAi ? 'dark:prose-invert' : ''}`}
      >
        <ReactMarkdown>{message.text}</ReactMarkdown>
      </div>
    </div>
  );
};

export default ChatMessage;

