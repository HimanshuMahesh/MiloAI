import React from 'react';

const TypingAnimation: React.FC = () => {
  return (
    <div className="flex items-center space-x-2 mb-2">
      <div className="w-8 h-8 rounded-full flex items-center justify-center">
        <span className="text-2xl">🙀</span>
      </div>
      <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-white/50 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default TypingAnimation;

