const RESULTS_KEY = 'glos-fishing-results';
const OLD_BEST_TIME_KEY = 'glos-fishing-best-time';

export function loadFishingResults(): number[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(RESULTS_KEY) ?? '[]');
    if (Array.isArray(parsed)) {
      const results = parsed.filter((value): value is number => (
        typeof value === 'number' && Number.isFinite(value) && value > 0
      ));
      if (results.length > 0) return results.sort((first, second) => first - second);
    }
  } catch {
    // Повреждённая старая запись не должна ломать игру.
  }

  const oldBestTime = Number(localStorage.getItem(OLD_BEST_TIME_KEY));
  return Number.isFinite(oldBestTime) && oldBestTime > 0 ? [oldBestTime] : [];
}

export function saveFishingResult(seconds: number) {
  const results = [...loadFishingResults(), seconds].sort((first, second) => first - second);
  localStorage.setItem(RESULTS_KEY, JSON.stringify(results));
  localStorage.removeItem(OLD_BEST_TIME_KEY);
  return results;
}

export function formatFishingTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${minutes}:${rest.toString().padStart(2, '0')}`;
}
