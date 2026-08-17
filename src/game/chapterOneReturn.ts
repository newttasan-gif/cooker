import type { StoryNode } from './types';

export const chapterOneReturnNodes: Record<string, StoryNode> = {
  'mountain-descent': {
    id: 'mountain-descent', kind: 'scene', location: 'Спуск с подножья', artwork: '/game/locations/foothill.svg',
    character: { pose: 'walk', mood: 'happy' },
    title: 'Пора возвращаться',
    text: 'Глос решает завершить вылазку. До заката ещё есть время, но горные тропы быстро темнеют. К деревне ведут две дороги.',
    choices: [
      { id: 'descent-short', label: 'Пойти по короткой тропе', detail: 'Спускаться между каменными уступами', target: 'lower-trail' },
      { id: 'descent-forest', label: 'Вернуться через сосны', detail: 'Выбрать длинную знакомую дорогу', target: 'forest-return' },
      { id: 'descent-stay', label: 'Остаться у горы', detail: 'Продолжить сегодняшнее исследование', target: 'foothill' },
    ],
  },
  'lower-trail': {
    id: 'lower-trail', kind: 'scene', location: 'Нижняя тропа', artwork: '/game/locations/dry-stream.svg',
    character: { pose: 'stop', mood: 'focused' },
    title: 'Последняя развилка',
    text: 'Тропа пересекает высохшее русло. Слева начинается дорога к деревне, а позади всё ещё видны каменные рёбра горы.',
    choices: [
      { id: 'trail-village', label: 'Продолжить спуск', detail: 'Направиться к деревенской дороге', target: 'village-road' },
      { id: 'trail-stream', label: 'Ещё раз проверить русло', detail: 'Вернуться к месту первой находки', target: 'stream' },
      { id: 'trail-back', label: 'Подняться обратно', detail: 'Вернуться к подножью', target: 'foothill' },
    ],
  },
  'forest-return': {
    id: 'forest-return', kind: 'scene', location: 'Тропа среди сосен', artwork: '/game/locations/pine-hollow.svg',
    character: { pose: 'walk', mood: 'neutral' },
    title: 'Знакомая дорога',
    text: 'Между деревьями уже ложатся длинные тени. Впереди виден старый указатель на деревню, а сбоку — навес неизвестного путешественника.',
    choices: [
      { id: 'forest-village', label: 'Идти по указателю', detail: 'Не задерживаться до темноты', target: 'village-road' },
      { id: 'forest-camp', label: 'Заглянуть под навес', detail: 'Проверить старое место отдыха', target: 'camp' },
      { id: 'forest-back', label: 'Вернуться к подножью', detail: 'Продолжить поиски кристаллов', target: 'foothill' },
    ],
  },
  'village-road': {
    id: 'village-road', kind: 'scene', location: 'Дорога в деревню', artwork: '/game/locations/sunny-slope.svg',
    character: { pose: 'stand', mood: 'happy' },
    title: 'Гора остаётся позади',
    text: 'Крыши деревни видны совсем близко. Можно закончить вылазку или всё-таки вернуться к горе, пока солнце ещё не село.',
    choices: [
      { id: 'road-home', label: 'Отправиться в деревню', detail: 'Закончить первую вылазку', target: 'village-outro' },
      { id: 'road-return', label: 'Вернуться к горе', detail: 'Исследовать оставшиеся пути', target: 'foothill' },
    ],
  },
  'village-outro': {
    id: 'village-outro', kind: 'scene', location: 'Деревня', artwork: '/game/locations/village-square.svg',
    character: { pose: 'walk', mood: 'happy' },
    title: 'Возвращение в деревню',
    text: 'Глос возвращается в деревню после первой вылазки.',
    choices: [],
    endingFrames: [
      { text: 'Я спустился с подножья горы и отправился в деревню.', duration: 2600 },
    ],
    endingTarget: 'village-square',
  },
};
