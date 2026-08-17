import type { StoryNode } from './types';
import { festivalFriendNodes } from './festivalFriends';
import { festivalLibraryNodes } from './festivalLibrary';
import { festivalFeastNodes } from './festivalFeast';

const room = { artwork: '/game/locations/grandma-house.svg', chapter: 'Глава II' };
const festival = { artwork: '/game/locations/village-square.svg', chapter: 'Глава II', festival: true };
const grandma = { ...festival, encounter: 'grandma' as const };

export const festivalDayNodes: Record<string, StoryNode> = {
  'festival-wake': {
    id: 'festival-wake', kind: 'dialogue', speaker: 'Глос', location: 'Комната Глоса', ...room,
    character: { pose: 'stand', mood: 'neutral' }, title: 'Новое утро',
    text: '«Я открыл глаза, сел на кровати и прислушался. За дверью уже слышны шаги бабушки. Пора вставать».',
    choices: [{ id: 'wake-up', label: '«Доброе утро, бабушка»', detail: 'Встать с кровати и выйти из комнаты', target: 'festival-grandma-intro' }],
  },
  'festival-grandma-intro': {
    id: 'festival-grandma-intro', kind: 'dialogue', speaker: 'Бабушка', location: 'Дом бабушки', ...grandma,
    character: { pose: 'dialogue', mood: 'happy' }, title: 'Причина ночного шума',
    text: '«Доброе утро, Глос. Ночью жители украшали деревню к фестивалю — вот почему за окном всё время стучали и переговаривались. Уже почти вечер, а праздник только начинается».',
    choices: [{ id: 'ask-festival', label: '«Чем мне заняться на фестивале?»', detail: 'Спросить бабушку о праздничных делах', target: 'festival-grandma' }],
  },
  'festival-grandma': {
    id: 'festival-grandma', kind: 'dialogue', speaker: 'Бабушка', location: 'Фестивальная деревня', ...grandma,
    character: { pose: 'dialogue', mood: 'happy' }, title: 'Вечер только начинается',
    text: '«Выбирай сам, Глос. У воды хорошо клюёт, Тим и Лео гуляют среди гирлянд, а библиотека открыта до конца фестиваля. Возвращайся после любого дела».',
    choices: [
      { id: 'festival-fishing', label: '«Я пойду на рыбалку»', detail: 'Выловить 15 рыб у вечернего берега', target: 'festival-fishing', activity: 'fishing' },
      { id: 'festival-friends', label: '«Пойду погуляю с друзьями»', detail: 'Найти Тима и Лео на площади', target: 'festival-friends', activity: 'friends' },
      { id: 'festival-library', label: '«Зайду в библиотеку»', detail: 'Прочитать три фэнтези-истории', target: 'festival-library', activity: 'library' },
      { id: 'festival-chess', label: '«Бабуль, сыграем в шахматы?»', detail: 'Провести обычную партию без награды', target: 'festival-grandma-chess' },
      { id: 'festival-feast', label: '«Зайду к праздничному столу»', detail: 'Поужинать и поговорить с жителями деревни', target: 'festival-feast' },
      {
        id: 'festival-home', label: '«На сегодня хватит. Пойдём домой»', detail: 'Завершить фестивальный вечер',
        target: 'festival-rest-ending', targetIfVisited: { nodeId: 'old-village-square', target: 'festival-home-cutscene' },
      },
    ],
  },
  'festival-fishing': {
    id: 'festival-fishing', kind: 'scene', location: 'Фестивальный берег', ...festival,
    character: { pose: 'interact', mood: 'focused' }, title: 'Тихая вода',
    text: 'Удочка уже готова. На поверхности воды нужно дождаться пузырьков.', choices: [], specialTarget: 'fishing',
  },
  'festival-grandma-chess': {
    id: 'festival-grandma-chess', kind: 'scene', location: 'Фестивальная деревня', ...grandma,
    character: { pose: 'interact', mood: 'focused' }, title: 'Шахматы под гирляндами',
    text: 'Бабушка достаёт знакомую доску. Глос играет белыми, а вокруг продолжается фестиваль.',
    choices: [], specialTarget: 'chess', specialReturnTarget: 'festival-grandma',
  },
  'festival-home-cutscene': {
    id: 'festival-home-cutscene', kind: 'scene', location: 'Дом бабушки', ...room,
    character: { pose: 'stand', mood: 'wonder' }, title: 'Разговор перед сном', text: 'Глос и бабушка вернулись домой.', choices: [],
    endingFrames: [
      { text: 'Бабуль, ты что-то знаешь о заброшенной деревне?', duration: 2800 },
      { text: 'Бабушка: Да, я родилась и жила там.', duration: 2500 },
      { text: 'Бабушка: Смутно помню детство, но помню похожий фестиваль. Моя подруга пекла хлеб, дети бегали, а я, будучи молодой, лишь читала книги в библиотеке.', duration: 5200 },
      { text: 'Бабушка: Ты ложись спать, Глос. На сегодня уже всё.', duration: 3000 },
    ],
    endingTarget: 'old-memories-ending',
  },
  'festival-rest-ending': {
    id: 'festival-rest-ending', kind: 'scene', location: 'Дом бабушки', ...room,
    character: { pose: 'stand', mood: 'happy' }, title: 'Отдых после фестиваля',
    text: 'Глос и бабушка возвращаются домой. Глос ещё не бывал в заброшенной деревне, поэтому разговор о ней не начинается. День заканчивается тёплым чаем и спокойным отдыхом.',
    choices: [], isEnding: true,
  },
  'old-memories-ending': {
    id: 'old-memories-ending', kind: 'scene', location: 'Дом бабушки', ...room,
    character: { pose: 'stand', mood: 'wonder' }, title: 'Старые воспоминания',
    text: 'Фестивальный вечер завершился, но рассказ бабушки связал его с давно заброшенной деревней.', choices: [], isEnding: true,
  },
  ...festivalFriendNodes,
  ...festivalLibraryNodes,
  ...festivalFeastNodes,
};
