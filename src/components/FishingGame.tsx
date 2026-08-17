import { useCallback, useEffect, useRef, useState } from 'react';
import '../styles/fishing-game.css';

const GOAL = 15;
const randomDelay = () => 1400 + Math.random() * 2400;

export function FishingGame({ onComplete }: { onComplete: () => void }) {
  const [caught, setCaught] = useState(0);
  const [fishSpot, setFishSpot] = useState<{ x: number; y: number } | null>(null);
  const [message, setMessage] = useState('Следи за водой и жди пузырьков…');
  const fishIsActive = useRef(false);
  const spawnTimer = useRef<number>();
  const escapeTimer = useRef<number>();

  const scheduleFish = useCallback(() => {
    window.clearTimeout(spawnTimer.current);
    spawnTimer.current = window.setTimeout(() => {
      fishIsActive.current = true;
      setFishSpot({ x: 24 + Math.random() * 52, y: 30 + Math.random() * 35 });
      setMessage('Пузырьки! Быстрее подсекай!');
      escapeTimer.current = window.setTimeout(() => {
        fishIsActive.current = false;
        setFishSpot(null);
        setMessage('Рыба уплыла. Подожди следующую…');
        scheduleFish();
      }, 1700);
    }, randomDelay());
  }, []);

  useEffect(() => {
    scheduleFish();
    return () => {
      window.clearTimeout(spawnTimer.current);
      window.clearTimeout(escapeTimer.current);
    };
  }, [scheduleFish]);

  const reelIn = () => {
    if (!fishIsActive.current) {
      setMessage('Пока тихо. Дождись пузырьков.');
      return;
    }
    fishIsActive.current = false;
    window.clearTimeout(escapeTimer.current);
    setFishSpot(null);
    const nextCaught = caught + 1;
    setCaught(nextCaught);
    setMessage(nextCaught === GOAL ? 'Отличный улов! Пора возвращаться.' : 'Есть! Рыба поймана.');
    if (nextCaught === GOAL) {
      window.clearTimeout(spawnTimer.current);
      window.setTimeout(onComplete, 1300);
    } else {
      scheduleFish();
    }
  };

  return (
    <main className="fishing-game">
      <div className="fishing-game__sky"><i /><i /><i /></div>
      <div className="fishing-game__shore" />
      <button className="fishing-game__water" type="button" onClick={reelIn} aria-label="Подсечь удочку">
        <span className="fishing-game__ripples" />
        {fishSpot && <span className="fish-bubbles" style={{ left: `${fishSpot.x}%`, top: `${fishSpot.y}%` }}><i /><i /><i /></span>}
      </button>
      <div className="fishing-game__hands"><i /><b /></div>
      <div className="fishing-game__rod" />
      <header className="fishing-game__header"><span>Фестивальный берег</span><strong>Рыба: {caught}/{GOAL}</strong></header>
      <section className="fishing-game__status"><p>{message}</p><button type="button" onClick={reelIn}>Подсечь</button></section>
    </main>
  );
}
