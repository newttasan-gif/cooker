export type AchievementId = 'first-step' | 'angler' | 'healthy-choice' | 'book-hunter' | 'explorer';

export type Achievement = {
  id: AchievementId;
  icon: string;
  title: string;
  description: string;
};

export const achievements: Achievement[] = [
  { id: 'first-step', icon: '✦', title: 'Первый шаг', description: 'Начать путешествие Глоса.' },
  { id: 'angler', icon: '≈', title: 'Тихая вода', description: 'Поймать 15 рыб на фестивале.' },
  { id: 'healthy-choice', icon: '●', title: 'Полезный выбор', description: 'Собрать тарелку полезных продуктов.' },
  { id: 'book-hunter', icon: '▤', title: 'Зелёная тайна', description: 'Найти все семь зелёных книг.' },
  { id: 'explorer', icon: '◇', title: 'Исследователь', description: 'Посетить 20 разных мест.' },
];

const STORAGE_KEY = 'glos-achievements';

export function loadAchievementIds(): AchievementId[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    return Array.isArray(value)
      ? value.filter((id): id is AchievementId => achievements.some((item) => item.id === id))
      : [];
  } catch {
    return [];
  }
}

export function unlockAchievement(id: AchievementId) {
  const unlocked = loadAchievementIds();
  if (unlocked.includes(id)) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...unlocked, id]));
}
