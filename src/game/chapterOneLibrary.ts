import type { StoryNode } from './types';

const library = { encounter: 'librarian' as const, artwork: '/game/locations/village-library.svg' };
const shelves = { artwork: '/game/locations/village-library.svg' };

const bookChoices = [
  { id: 'book-village', label: 'История деревни', detail: 'Узнать, как появилась площадь', target: 'library-village-book' },
  { id: 'book-fantasy', label: 'Легенды туманных островов', detail: 'Почитать фэнтези', target: 'library-fantasy-book' },
  { id: 'book-rare', label: 'Редкости гор и долин', detail: 'Изучить растения и кристаллы', target: 'library-rare-book' },
];

const backToShelves = [
  { id: 'book-back', label: 'Вернуть книгу на полку', detail: 'Выбрать другую книгу', target: 'library-shelves' },
  { id: 'book-leave', label: 'Выйти на площадь', detail: 'Поблагодарить библиотекаршу', target: 'village-square' },
];

export const chapterOneLibraryNodes: Record<string, StoryNode> = {
  'village-library': {
    id: 'village-library', kind: 'dialogue', speaker: 'Библиотекарша Мира', location: 'Деревенская библиотека', ...library,
    character: { pose: 'dialogue', mood: 'happy' }, title: 'Тишина в центре зала',
    text: 'Мира стоит за круглым столом в центре библиотеки. «Добро пожаловать, Глос. Между полками можно читать сколько захочешь — только возвращай книги на их места».',
    choices: [
      { id: 'library-ask', label: '«Что вы посоветуете?»', detail: 'Поговорить с Мирой', target: 'librarian-talk' },
      { id: 'library-read', label: 'Пройти между полками', detail: 'Самому выбрать книгу', target: 'library-shelves' },
      { id: 'library-exit', label: 'Вернуться на площадь', detail: 'Зайти в другой раз', target: 'village-square' },
    ],
  },
  'librarian-talk': {
    id: 'librarian-talk', kind: 'dialogue', speaker: 'Библиотекарша Мира', location: 'Центр библиотеки', ...library,
    character: { pose: 'dialogue', mood: 'wonder' }, title: 'Совет Миры',
    text: '«Начни с того, что тебе действительно интересно. В книгах о нашей деревне спрятана память, в сказках — смелость, а в справочниках — знания, которые пригодятся в следующей вылазке».',
    choices: [
      ...bookChoices,
    ],
  },
  'library-shelves': {
    id: 'library-shelves', kind: 'scene', location: 'Между книжными полками', ...shelves,
    character: { pose: 'interact', mood: 'focused' }, title: 'Три книги на выбор',
    text: 'Глос проходит глубже между высокими полками. На столике оставлены три книги с тканевыми закладками.',
    choices: bookChoices,
  },
  'library-village-book': {
    id: 'library-village-book', kind: 'dialogue', speaker: 'Книга «Наш дом у горы»', location: 'Между книжными полками', ...shelves,
    character: { pose: 'interact', mood: 'wonder' }, title: 'Как выросла деревня',
    text: 'Первые жители построили дома вокруг общего колодца. Позже появились мост, мастерские и библиотека. Каждый новый дом ставили так, чтобы из окна была видна гора и дорога домой.', choices: backToShelves,
  },
  'library-fantasy-book': {
    id: 'library-fantasy-book', kind: 'dialogue', speaker: 'Книга «Туманные острова»', location: 'Между книжными полками', ...shelves,
    character: { pose: 'interact', mood: 'wonder' }, title: 'Остров, плывущий в небе',
    text: 'Юная картограф Лея находит остров, который каждую ночь меняет место. Чтобы вернуть его на карту, она договаривается с ветром и будит каменного дракона, спящего под маяком.', choices: backToShelves,
  },
  'library-rare-book': {
    id: 'library-rare-book', kind: 'dialogue', speaker: 'Справочник редкостей', location: 'Между книжными полками', ...shelves,
    character: { pose: 'interact', mood: 'focused' }, title: 'Лунный папоротник и эхо-кварц',
    text: 'Лунный папоротник раскрывается только рядом с чистой водой. Эхо-кварц хранит последний громкий звук, а янтарный мох мягко светится там, где под землёй проходит тёплый воздух.', choices: backToShelves,
  },
};
