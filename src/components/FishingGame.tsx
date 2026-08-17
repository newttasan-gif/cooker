import { useCallback, useEffect, useRef, useState } from 'react';
import { formatFishingTime, loadFishingResults, saveFishingResult } from '../game/fishingRecords';
import '../styles/fishing-game.css';

const GOAL = 15;
const randomDelay = () => 1300 + Math.random() * 2200;

export function FishingGame({ onComplete }: { onComplete: () => void }) {
  const [caught, setCaught] = useState(0);
  const [fishSpot, setFishSpot] = useState<{ x: number; y: number } | null>(null);
  const [message, setMessage] = useState('Следи за водой и жди бульканья…');
  const [isReeling, setIsReeling] = useState(false);
  const [scorePulse, setScorePulse] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [results, setResults] = useState(loadFishingResults);
  const fishIsActive = useRef(false);
  const hasCompleted = useRef(false);
  const spawnTimer = useRef<number>();
  const escapeTimer = useRef<number>();

  const scheduleFish = useCallback(() => {
    window.clearTimeout(spawnTimer.current);
    spawnTimer.current = window.setTimeout(() => {
      fishIsActive.current = true;
      setFishSpot({ x: 18 + Math.random() * 64, y: 25 + Math.random() * 42 });
      setMessage('Бульк! Нажми прямо на пузырьки!');
      escapeTimer.current = window.setTimeout(() => {
        fishIsActive.current = false;
        setFishSpot(null);
        setMessage('Рыбка уплыла. Смотри внимательнее…');
        scheduleFish();
      }, 1800);
    }, randomDelay());
  }, []);

  useEffect(() => {
    scheduleFish();
    const clock = window.setInterval(() => setElapsedSeconds((seconds) => seconds + 1), 1000);
    return () => {
      window.clearInterval(clock);
      window.clearTimeout(spawnTimer.current);
      window.clearTimeout(escapeTimer.current);
    };
  }, [scheduleFish]);

  const catchFish = () => {
    if (!fishIsActive.current) return;

    fishIsActive.current = false;
    window.clearTimeout(escapeTimer.current);
    setFishSpot(null);
    setIsReeling(true);
    setScorePulse(true);

    const next = caught + 1;
    setCaught(next);
    setMessage(next === GOAL ? 'Отличный улов! Пора возвращаться.' : 'Есть! Рыбка поймана.');

    if (next === GOAL && !hasCompleted.current) {
      hasCompleted.current = true;
      window.clearTimeout(spawnTimer.current);
      setResults(saveFishingResult(elapsedSeconds));
      window.setTimeout(onComplete, 1300);
    } else if (next < GOAL) {
      scheduleFish();
    }

    window.setTimeout(() => setIsReeling(false), 450);
    window.setTimeout(() => setScorePulse(false), 500);
  };

  return (
    <main className={`fishing-game${isReeling ? ' fishing-game--reeling' : ''}`}>
      <div className="fishing-game__sky"><i /><i /><i /><span /></div>
      <div className="fishing-game__shore" />
      <div className="fishing-game__water" aria-label="Вода">
        <span className="fishing-game__ripples" />
        {fishSpot && (
          <button
            className="fish-bubbles"
            style={{ left: `${fishSpot.x}%`, top: `${fishSpot.y}%` }}
            type="button"
            onClick={catchFish}
            aria-label="Поймать рыбу по пузырькам"
          >
            <i /><i /><i />
          </button>
        )}
      </div>
      <div className="fishing-game__hands"><i /><b /></div>
      <div className="fishing-game__rod" />
      <header className="fishing-game__header">
        <span>Фестивальный берег</span>
        <strong className={scorePulse ? 'is-pulsing' : ''}>Рыба: {caught}/{GOAL}</strong>
      </header>
      <aside className="fishing-game__records" aria-label="Таблица результатов рыбалки">
        <span>Лучшие уловы</span>
        <small>15 рыб · за всё время</small>
        {results.length === 0 ? (
          <p className="fishing-game__empty">Пока нет завершённых игр</p>
        ) : (
          <ol>
            {results.map((result, index) => (
              <li key={`${result}-${index}`}><b>#{index + 1}</b><strong>{formatFishingTime(result)}</strong></li>
            ))}
          </ol>
        )}
        <p className="fishing-game__current">Сейчас {formatFishingTime(elapsedSeconds)}</p>
      </aside>
      <section className="fishing-game__status"><p>{message}</p><small>Нажимай только на бульканье</small></section>
    </main>
  );
}
