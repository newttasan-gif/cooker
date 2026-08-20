import { useState } from 'react';
import '../styles/adventure-games.css';

const supplies = [
  { id: 'glasses', name: 'Очки' }, { id: 'rope', name: 'Верёвка' },
  { id: 'lamp', name: 'Фонарь' }, { id: 'food', name: 'Еда' },
  { id: 'book', name: 'Книга' },
];

function SupplyDrawing({ id }: { id: string }) {
  return <span className={`supply-drawing supply-drawing--${id}`} aria-hidden="true">
    <i /><i /><i /><i />
  </span>;
}

export function PackingGame({ onComplete }: { onComplete: () => void }) {
  const [packed, setPacked] = useState<string[]>([]);
  const toggle = (id: string) => setPacked((items) => items.includes(id)
    ? items.filter((item) => item !== id) : items.length < 3 ? [...items, id] : items);

  return <main className="adventure-game adventure-game--packing">
    <header><span>Перед первой вылазкой</span><strong>Место в сумке: {packed.length}/3</strong></header>
    <section className="packing-table" aria-label="Предметы для похода">
      <div className="packing-room" aria-hidden="true"><i /><i /><i /><span /><span /></div>
      <div className="packing-bag"><div className="packing-bag__strap" /><div className="packing-bag__flap" />
        <i className="packing-bag__clasp" /><span className="packing-bag__seam" /><p>Сумка Глоса</p></div>
      <div className="packing-items">{supplies.map((item) => <button key={item.id} type="button"
        className={packed.includes(item.id) ? 'is-packed' : ''} onClick={() => toggle(item.id)}>
        <SupplyDrawing id={item.id} /><span>{item.name}</span>
      </button>)}</div>
    </section>
    <footer><p>{packed.length < 3 ? 'Выбери три вещи. Здесь нет неправильного ответа.' : 'Всё готово. Пора к горе.'}</p>
      <button type="button" disabled={packed.length < 3} onClick={onComplete}>Закрыть сумку</button></footer>
  </main>;
}
