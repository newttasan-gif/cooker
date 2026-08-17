import { useEffect, useRef } from 'react';
import type { OracleMessage } from '../game/oracleChats';

type OracleConversationProps = {
  introduction: string;
  messages: OracleMessage[];
  isThinking: boolean;
};

export function OracleConversation({ introduction, messages, isThinking }: OracleConversationProps) {
  const conversationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const conversation = conversationRef.current;
    if (conversation) conversation.scrollTop = conversation.scrollHeight;
  }, [isThinking, messages]);

  return (
    <div className="oracle-conversation" aria-live="polite" ref={conversationRef}>
      <article className="oracle-message oracle-message--oracle">
        <strong>Малое Солнце</strong>
        <p>{introduction}</p>
      </article>
      {messages.map((message) => (
        <article key={message.id} className={`oracle-message oracle-message--${message.role}`}>
          <strong>{message.role === 'player' ? 'Глос' : 'Малое Солнце'}</strong>
          <p>{message.text}</p>
        </article>
      ))}
      {isThinking && (
        <article className="oracle-message oracle-message--oracle oracle-message--thinking">
          <strong>Малое Солнце</strong><p>Свет собирается в слова…</p>
        </article>
      )}
    </div>
  );
}
