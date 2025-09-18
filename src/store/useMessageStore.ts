import { create } from 'zustand';

export type Message = {
  id: number;
  sender: 'client' | 'company';
  text: string;
  timestamp: string;
};

interface MessageState {
  messages: Record<string, Message[]>; // contextId -> messages
  sendMessage: (
    contextId: string,
    sender: 'client' | 'company',
    text: string,
  ) => void;
  loadMessages: (contextId: string) => Message[];
}

const LOCAL_STORAGE_KEY = 'messages';

function saveToStorage(messages: Record<string, Message[]>) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages));
}

function loadFromStorage(): Record<string, Message[]> {
  const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
  return saved ? JSON.parse(saved) : {};
}

export const useMessageStore = create<MessageState>((set, get) => ({
  messages: loadFromStorage(),

  sendMessage: (contextId, sender, text) => {
    const current = get().messages[contextId] || [];
    const newMsg: Message = {
      id: Date.now(),
      sender,
      text,
      timestamp: new Date().toLocaleTimeString(),
    };
    const updated = {
      ...get().messages,
      [contextId]: [...current, newMsg],
    };
    set({ messages: updated });
    saveToStorage(updated);
  },

  loadMessages: (contextId) => {
    return get().messages[contextId] || [];
  },
}));
