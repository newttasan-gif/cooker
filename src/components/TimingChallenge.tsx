import { useEffect, useRef, useState } from 'react';
import '../styles/adventure-games.css';

type TimingChallengeProps = { mode: 'climb' | 'balance'; onComplete: () => void };

export function TimingChallenge({ mode, onComplete }: TimingChallengeProps) {
  const [position, setPosition] = useState(8);
  const direction = useRef(1);
  const [progress, setProgress] = useState(0);
  const [feedback, setFeedback] = useState('Лови ритм');
  const goal = mode === 'climb' ? 5 : 6;

  useEffect(() => {
    const speed = mode === 'climb' ? 4 : 3;
    const timer = window.setInterval(() => setPosition((value) => {
      const next = value + direction.current * speed;
      if (next >= 94) { direction.current = -1; return 94; }
      if (next <= 6) { direction.current = 1; return 6; }
      return next;
    }), 55);
    return () => window.clearInterval(timer);
  }, [mode]);

  const act = () => {
    const success = position >= 39 && position <= 61;
    const next = success ? progress + 1 : Math.max(0, progress - 1);
    setProgress(next);
    setFeedback(success ? 'Надёжно!' : 'Камень сорвался — попробуй ещё');
    if (next >= goal) window.setTimeout(onComplete, 350);
  };

  return <main className={`adventure-game adventure-game--${mode}`}>
    <header><span>{mode === 'climb' ? 'Крутой склон' : 'Каменный мостик'}</span><strong>{progress}/{goal}</strong></header>
    <section className="timing-scene"><div className="mountain-shapes"><i /><i /><i /></div>
      <div className="timing-meter"><span className="timing-meter__ticks" /><span className="timing-zone" /><b style={{ left: `${position}%` }} /></div>
      <p className="timing-feedback">{feedback}</p>
      <button type="button" onClick={act}>{mode === 'climb' ? 'Схватиться' : 'Сделать шаг'}</button>
    </section>
    <footer><p>Нажимай, когда метка проходит через спокойную светлую область.</p><small>Ошибка лишь отнимает один шаг — начать заново не придётся.</small></footer>
  </main>;
}
