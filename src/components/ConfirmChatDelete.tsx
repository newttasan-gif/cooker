type ConfirmChatDeleteProps = {
  chatTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmChatDelete({ chatTitle, onConfirm, onCancel }: ConfirmChatDeleteProps) {
  return (
    <div className="chat-confirm__backdrop" role="presentation">
      <section className="chat-confirm" role="dialog" aria-modal="true" aria-labelledby="delete-chat-title">
        <p className="story-card__view">Удаление чата</p>
        <h2 id="delete-chat-title">Вы уверены?</h2>
        <p>Чат «{chatTitle}» нельзя будет восстановить.</p>
        <div><button type="button" onClick={onConfirm}>Да, удалить</button><button type="button" onClick={onCancel}>Нет</button></div>
      </section>
    </div>
  );
}
