import type { GameProgress } from './types';

const STORAGE_KEY = 'glos-story-saves';

export type GameSave = {
  id: string;
  title: string;
  savedAt: string;
  progress: GameProgress;
};

export function getSaveTitle(nodeId: string, location: string) {
  if (nodeId.startsWith('traveler-') || nodeId === 'ancient-gate') return 'Встреча со странником';
  if (nodeId.startsWith('festival-library')) return 'Фестиваль: библиотека';
  if (nodeId.startsWith('festival-friends')) return 'Фестиваль: прогулка с друзьями';
  if (nodeId.startsWith('festival')) return 'Фестивальный вечер';
  if (nodeId.includes('library')) return 'Деревенская библиотека';
  if (nodeId.includes('grandma') || nodeId.startsWith('tea-')) return 'Дом бабушки';
  if (nodeId.includes('village') || nodeId.includes('pawnshop')) return 'Деревня';
  return location;
}

export function loadSaves(): GameSave[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((save): save is GameSave => (
      typeof save === 'object' && save !== null && 'id' in save && 'progress' in save
    ));
  } catch {
    return [];
  }
}

export function createSave(title: string, progress: GameProgress) {
  const save: GameSave = {
    id: crypto.randomUUID(), title, savedAt: new Date().toISOString(), progress,
  };
  const saves = [save, ...loadSaves()].slice(0, 20);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saves));
  return saves;
}

export function deleteSave(id: string) {
  const saves = loadSaves().filter((save) => save.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saves));
  return saves;
}
