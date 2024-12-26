import React, { useState } from 'react';
import { Send, Bot } from 'lucide-react';
import { useScheduleStore } from '../../stores/scheduleStore';

const ChatInterface = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
  }>>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: crypto.randomUUID(),
      text: message,
      sender: 'user' as const,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');

    // TODO: Process message with OpenAI and update schedule
  };

  return (
    <div className="bg-white rounded-lg shadow-lg h-[600px] flex flex-col">
      <div className="p-4 border-b bg-indigo-50">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-indigo-600" />
          <h2 className="font-medium">Schedule Assistant</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;