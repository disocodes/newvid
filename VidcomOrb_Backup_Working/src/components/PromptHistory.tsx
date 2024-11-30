import React from 'react';
import { Bot, User } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface PromptHistoryProps {
  messages: Message[];
}

export default function PromptHistory({ messages }: PromptHistoryProps) {
  if (messages.length === 0) {
    return (
      <div className="text-center text-gray-500 text-sm py-4">
        No messages yet. Start by entering a prompt.
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-[200px] overflow-y-auto">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex gap-3 ${
            message.type === 'user' ? 'flex-row-reverse' : ''
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              message.type === 'user'
                ? 'bg-blue-100 text-blue-600'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {message.type === 'user' ? (
              <User className="w-4 h-4" />
            ) : (
              <Bot className="w-4 h-4" />
            )}
          </div>
          <div
            className={`flex-1 p-4 rounded-lg ${
              message.type === 'user'
                ? 'bg-blue-50 text-blue-900'
                : 'bg-gray-50 text-gray-900'
            }`}
          >
            <p className="text-sm">{message.content}</p>
            <span className="text-xs text-gray-500 mt-1 block">
              {new Date(message.timestamp).toLocaleTimeString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}