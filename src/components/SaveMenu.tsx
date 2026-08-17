import type { GameSave } from '../game/saves';

type SaveMenuProps = {
  saves: GameSave[];
  onLoad: (save: GameSave) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
};

export function SaveMenu({ saves, onLoad, onDelete, onClose }: SaveMenuProps) {
  return (
    <div className="save-menu" role="dialog" aria-modal="true" aria-label="Сохранения">
      <section className="save-menu__panel">
        <header><div><p>Продолжить историю</p><h2>Сохранения</h2></div><button type="button" onClick={onClose}>Закрыть</button></header>
        {saves.length === 0 ? <p className="save-menu__empty">Сохранений пока нет.</p> : (
          <div className="save-menu__list">
            {saves.map((save) => (
              <article key={save.id}>
                <button className="save-menu__load" type="button" onClick={() => onLoad(save)}>
                  <strong>{save.title}</strong>
                  <small>{new Date(save.savedAt).toLocaleString('ru-RU')}</small>
                </button>
                <button className="save-menu__delete" type="button" onClick={() => onDelete(save.id)} aria-label={`Удалить ${save.title}`}>×</button>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
