import { useEffect, useMemo, useState } from 'react';
import '../styles/healthy-food-game.css';

type Food = { emoji: string; name: string; healthy: boolean };

const foods: Food[] = [
  { emoji: '🍎', name: 'яблоко', healthy: true }, { emoji: '🥕', name: 'морковь', healthy: true },
  { emoji: '🥦', name: 'брокколи', healthy: true }, { emoji: '🍓', name: 'ягоды', healthy: true },
  { emoji: '🥒', name: 'огурец', healthy: true }, { emoji: '🍐', name: 'груша', healthy: true },
  { emoji: '🍩', name: 'пончик', healthy: false }, { emoji: '🍭', name: 'леденец', healthy: false },
  { emoji: '🍟', name: 'картофель фри', healthy: false }, { emoji: '🥤', name: 'газировка', healthy: false },
];

const makeRound = (round: number) => foods
  .map((food, index) => ({ ...food, id: `${round}-${index}`, order: Math.random() }))
  .sort((a, b) => a.order - b.order)
  .slice(0, 8);

export function HealthyFoodGame({ onComplete }: { onComplete: () => void }) {
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [picked, setPicked] = useState<string[]>([]);
  const [message, setMessage] = useState('Выбери только полезные продукты.');
  const plate = useMemo(() => makeRound(round), [round]);
  const healthyLeft = plate.filter((food) => food.healthy && !picked.includes(food.id)).length;

  useEffect(() => {
    if (healthyLeft !== 0) return;
    if (score >= 9) {
      setMessage(mistakes === 0 ? 'Без единой ошибки! Отличный выбор.' : 'Полезная корзина собрана!');
      const timer = window.setTimeout(onComplete, 1200);
      return () => window.clearTimeout(timer);
    }
    const timer = window.setTimeout(() => { setRound((value) => value + 1); setPicked([]); }, 650);
    return () => window.clearTimeout(timer);
  }, [healthyLeft, mistakes, onComplete, score]);

  const choose = (food: Food & { id: string }) => {
    if (picked.includes(food.id)) return;
    setPicked((items) => [...items, food.id]);
    if (food.healthy) {
      setScore((value) => value + 1);
      setMessage(`Верно: ${food.name} — полезный выбор.`);
    } else {
      setMistakes((value) => value + 1);
      setMessage(`${food.name} лучше оставить на столе.`);
    }
  };

  return (
    <main className="food-game">
      <div className="food-game__lights" />
      <header><span>Праздничный стол</span><strong>Полезные продукты: {score}/9</strong></header>
      <section className="food-game__table" aria-label="Стол с продуктами">
        <div className="food-game__plate">
          {plate.map((food) => (
            <button className={picked.includes(food.id) ? (food.healthy ? 'is-good' : 'is-wrong') : ''}
              key={food.id} type="button" onClick={() => choose(food)} aria-label={food.name}>
              <span>{food.emoji}</span><small>{food.name}</small>
            </button>
          ))}
        </div>
      </section>
      <div className="food-game__hands"><i /><i /></div>
      <footer><p>{message}</p><small>Не нажимай на сладости, фастфуд и газировку · ошибок: {mistakes}</small></footer>
    </main>
  );
}
