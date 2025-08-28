
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
}

export function RightSidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', content: "Hello! I'm your AI assistant. How can I help you today?", isUser: false },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessageId = Date.now().toString();
    setMessages(prev => [...prev, { id: userMessageId, content: inputMessage, isUser: true }]);
    setInputMessage('');
    
    // Simulate AI response (would be replaced with actual API call)
    setTimeout(() => {
      const aiResponseId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, { 
        id: aiResponseId, 
        content: `I received your message: "${inputMessage}". This is a simulated response.`, 
        isUser: false 
      }]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div 
      className={cn(
        "fixed right-0 top-0 h-full bg-white border-l border-gray-200 transition-all duration-300 z-20",
        isExpanded ? "w-80" : "w-12"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Toggle button */}
        <button 
          className="absolute left-0 top-4 transform -translate-x-1/2 bg-white border border-gray-200 rounded-full shadow-md p-2 hover:bg-gray-50 transition-colors"
          onClick={toggleSidebar}
          aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isExpanded ? <X className="h-4 w-4" /> : <MessageSquare className="h-4 w-4" />}
        </button>
        
        {/* Chat content - only visible when expanded */}
        {isExpanded && (
          <>
            <div className="flex-none p-3 border-b border-gray-200">
              <h2 className="font-semibold text-sm">AI Assistant</h2>
            </div>
            
            <div className="flex-grow overflow-y-auto p-3 space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id}
                  className={cn(
                    "max-w-[85%] rounded-lg p-3 text-sm",
                    message.isUser 
                      ? "bg-generator-green text-white ml-auto" 
                      : "bg-gray-100 text-gray-800"
                  )}
                >
                  {message.content}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="flex-none p-3 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message..."
                  className="flex-grow text-sm border border-gray-300 rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-generator-green"
                  rows={1}
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="p-2 bg-generator-green hover:bg-generator-darkGreen text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
