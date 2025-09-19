import { useRef, useEffect, useState } from 'react';
import { useMessageStore } from '../store/useMessageStore';

interface InlineChatProps {
  contextId: string;
  contextLabel: string;
  sender: 'client' | 'company';
}

export function InlineChat({
  contextId,
  contextLabel,
  sender,
}: InlineChatProps) {
  const sendMessage = useMessageStore((s) => s.sendMessage);
  // This will force re-render when the relevant messages array changes
  const chatMessages = useMessageStore((s) => s.messages[contextId] || []);

  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, open]);

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(contextId, sender, input);
    setInput('');
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-xl focus:outline-none transition"
          aria-label="Open chat"
        >
          💬
        </button>
      )}

      {open && (
        <div className="w-80 max-w-full bg-[#181f36] rounded-xl shadow-2xl flex flex-col h-96 border border-blue-800">
          <div className="flex items-center justify-between px-4 py-2 bg-[#141a2c] border-b border-blue-900">
            <span className="font-semibold text-white">{contextLabel}</span>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-red-400 text-lg px-2 py-1 focus:outline-none"
              aria-label="Close chat"
              title="Close"
            >
              ×
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {chatMessages.length === 0 && (
              <div className="text-gray-400 text-center mt-12">
                No messages yet.
              </div>
            )}
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === sender ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-lg max-w-xs text-sm shadow ${
                    msg.sender === sender
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-100'
                  }`}
                >
                  {msg.text}
                  <div className="text-xs text-gray-300 mt-1 text-right">
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <form
            onSubmit={handleSend}
            className="flex border-t border-gray-700 bg-[#151c2c]"
          >
            <input
              className="flex-1 p-3 bg-transparent text-white outline-none"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              className="px-5 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
