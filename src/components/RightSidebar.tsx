
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, ChevronLeft } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
}

export function RightSidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
    
    // If expanding and no messages yet, add welcome message
    if (!isExpanded && messages.length === 0) {
      setMessages([
        { id: '1', content: "Hello! I'm your AI assistant. How can I help you today?", isUser: false }
      ]);
    }
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
        "fixed right-0 top-0 h-full bg-gray-900 border-l border-gray-700 transition-all duration-300 z-20",
        isExpanded ? "w-80" : "w-12"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Toggle button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute left-0 top-4 transform -translate-x-1/2 bg-gray-800 border border-gray-700 rounded-full shadow-md text-white"
          onClick={toggleSidebar}
          aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isExpanded ? <X className="h-4 w-4" /> : <MessageSquare className="h-4 w-4" />}
        </Button>
        
        {/* Chat content - only visible when expanded */}
        {isExpanded && (
          <>
            <div className="flex-none p-4 border-b border-gray-700 flex items-center">
              <ChevronLeft className="h-4 w-4 text-gray-400 mr-2 cursor-pointer" 
                onClick={toggleSidebar} 
              />
              <h2 className="font-medium text-white">Chat Assistant</h2>
            </div>
            
            {messages.length > 0 ? (
              <div className="flex-grow overflow-y-auto p-3 space-y-4">
                {messages.map((message) => (
                  <div 
                    key={message.id}
                    className={cn(
                      "max-w-[85%] rounded-lg p-3 text-sm",
                      message.isUser 
                        ? "bg-blue-600 text-white ml-auto" 
                        : "bg-gray-800 text-white"
                    )}
                  >
                    {message.content}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            ) : (
              <div className="flex-grow flex items-center justify-center p-4 text-center">
                <p className="text-gray-400">Start a conversation</p>
              </div>
            )}
            
            <div className="flex-none p-3 border-t border-gray-700">
              <div className="flex items-center gap-2">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Describe your goal..."
                  className="flex-grow text-sm border border-gray-700 bg-gray-800 rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  rows={1}
                />
                <Button 
                  size="icon" 
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
