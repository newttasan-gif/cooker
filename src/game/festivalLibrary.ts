import type { StoryNode } from './types';

const library = {
  artwork: '/game/locations/village-library.svg', chapter: 'Глава II', festival: true,
  encounter: 'librarian' as const, location: 'Фестивальная библиотека',
};

export const festivalLibraryNodes: Record<string, StoryNode> = {
  'festival-library': {
    id: 'festival-library', kind: 'dialogue', speaker: 'Библиотекарша Мира', ...library,
    character: { pose: 'dialogue', mood: 'happy' }, title: 'Тайник библиотекарши',
    text: '«Бабушка раскрыла тебе мою загадку? Тогда осмотри три пары стеллажей. Зелёные корешки почти сливаются с тенями, но внимательный читатель найдёт все семь».',
    choices: [{ id: 'library-search-start', label: 'Подойти к первой паре стеллажей', detail: 'Искать книги от первого лица', target: 'festival-library-search' }],
  },
  'festival-library-search': {
    id: 'festival-library-search', kind: 'scene', ...library, location: 'Между стеллажами',
    character: { pose: 'interact', mood: 'focused' }, title: 'Семь зелёных книг',
    text: 'Нужно внимательно осмотреть корешки на полках.', choices: [], specialTarget: 'library-search',
  },
  'festival-library-clouds': {
    id: 'festival-library-clouds', kind: 'dialogue', speaker: 'Книга «Город над облаками»', ...library,
    character: { pose: 'interact', mood: 'wonder' }, title: 'Город, который боялся земли',
    text: 'Юная механик Ада узнаёт, что летающий город медленно теряет высоту. Вместо побега она спускается под башни и чинит древние крылья вместе с существом из грозового облака.',
    choices: [{ id: 'clouds-next', label: 'Перевернуть последнюю страницу', detail: 'Найти закладку со второй книгой', target: 'festival-library-moon' }],
  },
  'festival-library-moon': {
    id: 'festival-library-moon', kind: 'dialogue', speaker: 'Книга «Лунный лес»', ...library,
    character: { pose: 'interact', mood: 'focused' }, title: 'Тропа серебряного зверя',
    text: 'Каждое полнолуние лес меняет тропы. Пастух Неро следует за серебряным зверем и узнаёт: тот не заманивает путников, а выводит потерявшихся домой до восхода солнца.',
    choices: [{ id: 'moon-next', label: 'Прочитать записку на обложке', detail: 'Перейти к третьей истории', target: 'festival-library-dragon' }],
  },
  'festival-library-dragon': {
    id: 'festival-library-dragon', kind: 'dialogue', speaker: 'Книга «Последний сад дракона»', ...library,
    character: { pose: 'interact', mood: 'wonder' }, title: 'Семена вместо сокровищ',
    text: 'В старой горе дети находят дракона, который хранит не золото, а семена исчезнувших растений. Вместе они выращивают сад, способный вернуть дождь в засохшую долину.',
    choices: [{ id: 'dragon-finish', label: 'Закрыть третью книгу', detail: 'Обсудить истории с Мирой', target: 'festival-library-goodbye' }],
  },
  'festival-library-goodbye': {
    id: 'festival-library-goodbye', kind: 'dialogue', speaker: 'Библиотекарша Мира', ...library,
    character: { pose: 'dialogue', mood: 'happy' }, title: 'Три разных дороги',
    text: '«Во всех трёх историях герои спасли свой дом не силой, а вниманием к тому, что другие не замечали. Запомни это, Глос».',
    choices: [{ id: 'library-return', label: '«Спасибо. Вернусь к бабушке»', detail: 'Завершить вечернее чтение', target: 'festival-grandma', completesActivity: 'library' }],
  },
};
