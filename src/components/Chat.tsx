import React, { useRef, useEffect } from 'react';
import { Message } from '../app/data';

type ChatProps = {
  messages: Message[];
  onSend: (text: string) => void;
};

export default function Chat({ messages, onSend }: ChatProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const value = inputRef.current?.value.trim();
    if (value) {
      onSend(value);
      if (inputRef.current) inputRef.current.value = '';
    }
  }

  return (
    <section className="flex flex-col h-full w-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50 dark:bg-gray-900">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-[70%] px-4 py-2 rounded-lg text-sm shadow-sm mb-1 ${msg.sentByMe ? 'ml-auto bg-blue-500 text-white' : 'mr-auto bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'}`}
          >
            {msg.text}
            <div className="text-xs text-gray-400 mt-1 text-right">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <form onSubmit={handleSend} className="flex p-2 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <input
          ref={inputRef}
          type="text"
          className="flex-1 px-4 py-2 rounded-l-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-r-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors"
        >
          Send
        </button>
      </form>
    </section>
  );
}
