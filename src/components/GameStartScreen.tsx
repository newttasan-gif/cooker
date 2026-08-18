import '../styles/game-start.css';
import type { GameSave } from '../game/saves';
import { SaveMenu } from './SaveMenu';
import { useState } from 'react';
import { AchievementsMenu } from './AchievementsMenu';

type GameStartScreenProps = {
  onStart: () => void;
  saves: GameSave[];
  onLoad: (save: GameSave) => void;
  onDeleteSave: (id: string) => void;
};

export function GameStartScreen({ onStart, saves, onLoad, onDeleteSave }: GameStartScreenProps) {
  const [showSaves, setShowSaves] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  return (
    <main className="game-start">
      <div className="game-start__shade" />
      <div className="game-start__corner-actions">
        <button type="button" onClick={() => setShowAchievements(true)}>Достижения</button>
        <button type="button" onClick={() => setShowSaves(true)}>Сохранения</button>
      </div>
      <section className="game-start__content">
        <p className="eyebrow">Глава 01 · Поиск кристаллов</p>
        <h1>У подножья</h1>
        <p>История начнётся только после нажатия кнопки.</p>
        <button type="button" onClick={onStart}>Начать игру</button>
      </section>
      {showSaves && <SaveMenu saves={saves} onLoad={onLoad} onDelete={onDeleteSave} onClose={() => setShowSaves(false)} />}
      {showAchievements && <AchievementsMenu onClose={() => setShowAchievements(false)} />}
    </main>
  );
}
