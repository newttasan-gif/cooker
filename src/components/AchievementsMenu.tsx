import { achievements, loadAchievementIds } from '../game/achievements';

export function AchievementsMenu({ onClose }: { onClose: () => void }) {
  const unlocked = loadAchievementIds();

  return (
    <div className="save-menu" role="dialog" aria-modal="true" aria-label="Достижения">
      <section className="save-menu__panel achievement-menu">
        <header>
          <div><p>Путь Глоса</p><h2>Достижения</h2></div>
          <button type="button" onClick={onClose}>Закрыть</button>
        </header>
        <p className="achievement-menu__progress">Открыто {unlocked.length} из {achievements.length}</p>
        <div className="achievement-menu__list">
          {achievements.map((achievement) => {
            const isUnlocked = unlocked.includes(achievement.id);
            return (
              <article className={isUnlocked ? 'is-unlocked' : ''} key={achievement.id}>
                <span>{isUnlocked ? achievement.icon : '?'}</span>
                <div><strong>{achievement.title}</strong><small>{achievement.description}</small></div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
