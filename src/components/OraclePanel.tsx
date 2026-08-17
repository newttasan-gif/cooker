import { FormEvent, useMemo, useState } from 'react';
import type { GameItem } from '../game/types';
import {
  deleteOracleChat, loadOracleChats, MAX_ORACLE_CHATS, saveOracleChat,
  type OracleMessage, type SavedOracleChat,
} from '../game/oracleChats';
import { createOracleSystem } from '../game/oracleKnowledge';
import { askOracle } from '../lib/oracle';
import { ConfirmChatDelete } from './ConfirmChatDelete';
import { OracleChatList } from './OracleChatList';
import { OracleConversation } from './OracleConversation';
import '../styles/oracle-panel.css';

type OraclePanelProps = {
  items: GameItem[];
  introduction: string;
  messages: OracleMessage[];
  activeChatId?: string;
  onMessagesChange: (messages: OracleMessage[]) => void;
  onActiveChatChange: (chatId?: string) => void;
  onLeave: () => void;
};

export function OraclePanel(props: OraclePanelProps) {
  const { items, introduction, messages, activeChatId, onMessagesChange, onActiveChatChange, onLeave } = props;
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState(loadOracleChats);
  const [deleteTarget, setDeleteTarget] = useState<SavedOracleChat>();
  const [notice, setNotice] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const system = useMemo(() => createOracleSystem(items), [items]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = message.trim();
    if (!trimmed || isThinking) return;
    const playerMessage: OracleMessage = { id: crypto.randomUUID(), role: 'player', text: trimmed };
    const nextMessages = [...messages, playerMessage];
    onMessagesChange(nextMessages);
    setMessage('');
    setNotice('');
    setIsThinking(true);
    try {
      const context = nextMessages.map(
        (entry) => `${entry.role === 'player' ? 'Игрок' : 'Малое Солнце'}: ${entry.text}`,
      ).join('\n');
      const response = await askOracle(`Полный текущий разговор:\n${context}`, system);
      onMessagesChange([...nextMessages, { id: crypto.randomUUID(), role: 'oracle', text: response }]);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Свет померк. Попробуй ещё раз.');
    } finally {
      setIsThinking(false);
    }
  };

  const saveChat = () => {
    if (!messages.some((entry) => entry.role === 'player')) return;
    const result = saveOracleChat(messages, activeChatId);
    if (!result) {
      setNotice(`Можно хранить не больше ${MAX_ORACLE_CHATS} чатов. Удали один из старых.`);
      return;
    }
    setChats(result.chats);
    onActiveChatChange(result.savedId);
    setNotice('Чат сохранён');
  };

  const startNewChat = () => {
    onMessagesChange([]);
    onActiveChatChange(undefined);
    setMessage('');
    setNotice('Начат новый чат');
  };

  const loadChat = (chat: SavedOracleChat) => {
    onMessagesChange(chat.messages);
    onActiveChatChange(chat.id);
    setNotice('Чат загружен — Малое Солнце снова помнит разговор');
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    setChats(deleteOracleChat(deleteTarget.id));
    if (activeChatId === deleteTarget.id) onActiveChatChange(undefined);
    setDeleteTarget(undefined);
    setNotice('Сохранённый чат удалён');
  };

  return (
    <section className="oracle-panel">
      <div className="oracle-panel__title">
        <div><p className="story-card__view">Малое Солнце</p><h1>Разговор</h1></div>
        <div className="oracle-panel__actions">
          <button type="button" onClick={saveChat} disabled={!messages.some((entry) => entry.role === 'player')}>Сохранить чат</button>
          <button type="button" onClick={startNewChat}>Начать новый чат</button>
        </div>
      </div>
      <div className="oracle-panel__layout">
        <OracleChatList chats={chats} activeChatId={activeChatId} onLoad={loadChat} onDelete={setDeleteTarget} />
        <div className="oracle-panel__dialogue">
          <OracleConversation introduction={introduction} messages={messages} isThinking={isThinking} />
          {notice && <p className="oracle-panel__notice" role="status">{notice}</p>}
          <form onSubmit={submit}>
            <label htmlFor="oracle-message">Сообщение Глоса</label>
            <textarea id="oracle-message" value={message} maxLength={600} rows={3}
              placeholder="Спроси об игре, учёбе, реальном мире или просто поговори…"
              onChange={(event) => setMessage(event.target.value)} />
            <button type="submit" disabled={!message.trim() || isThinking}>
              {isThinking ? 'Отвечает…' : 'Отправить'}
            </button>
          </form>
        </div>
      </div>
      <button className="oracle-panel__leave" type="button" onClick={onLeave} disabled={isThinking}>Вернуться к страннику</button>
      {deleteTarget && <ConfirmChatDelete chatTitle={deleteTarget.title} onConfirm={confirmDelete} onCancel={() => setDeleteTarget(undefined)} />}
    </section>
  );
}
