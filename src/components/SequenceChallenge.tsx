import { useEffect, useState } from 'react';
import '../styles/adventure-games.css';

const sequences = { echo: [0, 2, 1, 0], stones: [1, 3, 0, 2, 1] };
const labels = { echo: ['низкий', 'тихий', 'звонкий'], stones: ['камень 1', 'камень 2', 'камень 3', 'камень 4'] };

export function SequenceChallenge({ mode, onComplete }: { mode: 'echo' | 'stones'; onComplete: () => void }) {
  const sequence = sequences[mode];
  const [shown, setShown] = useState(-1);
  const [input, setInput] = useState<number[]>([]);
  const [watching, setWatching] = useState(true);

  useEffect(() => {
    const timers = sequence.map((_, index) => window.setTimeout(() => setShown(index), 650 + index * 620));
    timers.push(window.setTimeout(() => { setShown(-1); setWatching(false); }, 650 + sequence.length * 620));
    return () => timers.forEach(window.clearTimeout);
  }, [sequence]);

  const choose = (value: number) => {
    if (watching) return;
    const next = [...input, value];
    if (sequence[next.length - 1] !== value) { setInput([]); return; }
    setInput(next);
    if (next.length === sequence.length) window.setTimeout(onComplete, 450);
  };

  return <main className="adventure-game adventure-game--sequence">
    <header><span>{mode === 'echo' ? 'Тоннель эха' : 'Камни после воды'}</span><strong>{watching ? 'Слушай' : `${input.length}/${sequence.length}`}</strong></header>
    <section className="sequence-field">{labels[mode].map((label, index) => <button type="button" key={label}
      className={shown >= 0 && sequence[shown] === index ? 'is-sounding' : ''} onClick={() => choose(index)} aria-label={label}><i /><span>{label}</span></button>)}</section>
    <footer><p>{watching ? 'Запомни порядок.' : 'Повтори последовательность. Ошибка просто сбросит ввод.'}</p></footer>
  </main>;
}
