export type OracleMessage = {
  id: string;
  role: 'player' | 'oracle';
  text: string;
};

export type SavedOracleChat = {
  id: string;
  title: string;
  savedAt: string;
  messages: OracleMessage[];
};

const STORAGE_KEY = 'glos-oracle-chats';
export const MAX_ORACLE_CHATS = 10;

function isOracleMessage(value: unknown): value is OracleMessage {
  return typeof value === 'object' && value !== null
    && 'id' in value && typeof value.id === 'string'
    && 'role' in value && (value.role === 'player' || value.role === 'oracle')
    && 'text' in value && typeof value.text === 'string';
}

export function loadOracleChats(): SavedOracleChat[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    if (!Array.isArray(value)) return [];
    return value.filter((chat): chat is SavedOracleChat => (
      typeof chat === 'object' && chat !== null
      && 'id' in chat && typeof chat.id === 'string'
      && 'title' in chat && typeof chat.title === 'string'
      && 'savedAt' in chat && typeof chat.savedAt === 'string'
      && 'messages' in chat && Array.isArray(chat.messages) && chat.messages.every(isOracleMessage)
    ));
  } catch {
    return [];
  }
}

export function saveOracleChat(messages: OracleMessage[], chatId?: string) {
  const chats = loadOracleChats();
  const existing = chatId ? chats.find((chat) => chat.id === chatId) : undefined;
  if (!existing && chats.length >= MAX_ORACLE_CHATS) return null;

  const firstMessage = messages.find((message) => message.role === 'player')?.text ?? 'Новый разговор';
  const saved: SavedOracleChat = {
    id: existing?.id ?? crypto.randomUUID(),
    title: firstMessage.length > 34 ? `${firstMessage.slice(0, 34)}…` : firstMessage,
    savedAt: new Date().toISOString(), messages,
  };
  const updated = [saved, ...chats.filter((chat) => chat.id !== saved.id)];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return { chats: updated, savedId: saved.id };
}

export function deleteOracleChat(chatId: string) {
  const chats = loadOracleChats().filter((chat) => chat.id !== chatId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
  return chats;
}
