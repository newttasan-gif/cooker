import type { SavedOracleChat } from '../game/oracleChats';

type OracleChatListProps = {
  chats: SavedOracleChat[];
  activeChatId?: string;
  onLoad: (chat: SavedOracleChat) => void;
  onDelete: (chat: SavedOracleChat) => void;
};

export function OracleChatList({ chats, activeChatId, onLoad, onDelete }: OracleChatListProps) {
  return (
    <aside className="oracle-chats">
      <div className="oracle-chats__heading">
        <strong>Сохранённые чаты</strong><span>{chats.length}/10</span>
      </div>
      {chats.length === 0 && <p className="oracle-chats__empty">Здесь появятся сохранённые разговоры.</p>}
      {chats.map((chat) => (
        <div className={`oracle-chat${chat.id === activeChatId ? ' oracle-chat--active' : ''}`} key={chat.id}>
          <button type="button" onClick={() => onLoad(chat)}>
            <strong>{chat.title}</strong>
            <small>{new Date(chat.savedAt).toLocaleDateString('ru-RU')}</small>
          </button>
          <button className="oracle-chat__delete" type="button" aria-label={`Удалить чат «${chat.title}»`} onClick={() => onDelete(chat)}>×</button>
        </div>
      ))}
    </aside>
  );
}
