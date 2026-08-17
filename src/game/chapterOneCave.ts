import type { StoryNode } from './types';

const caveArtwork = '/game/locations/cave-mouth.svg';

export const chapterOneCaveNodes: Record<string, StoryNode> = {
  cave: {
    id: 'cave', kind: 'scene', location: 'Вход в пещеру', artwork: caveArtwork,
    character: { pose: 'stand', mood: 'wonder' },
    title: 'Первый шаг под землю',
    text: 'У входа прохладно, но не страшно. За каменным порогом путь делится: слева слышны капли, справа поблёскивают стены, а прямо тянется узкий след.',
    choices: [
      { id: 'cave-drops', label: 'Пойти на звук воды', detail: 'Исследовать левый тоннель', target: 'underground-stream' },
      { id: 'cave-glimmer', label: 'Проверить блестящие стены', detail: 'Свернуть в правую галерею', target: 'crystal-gallery' },
      { id: 'cave-tracks', label: 'Идти по следу', detail: 'Углубиться по центральному проходу', target: 'echo-tunnel' },
      { id: 'cave-back', label: 'Вернуться на склон', detail: 'Пока не заходить глубже', target: 'slope' },
    ],
  },
  'underground-stream': {
    id: 'underground-stream', kind: 'scene', location: 'Подземный ручей', artwork: caveArtwork,
    character: { pose: 'interact', mood: 'focused' },
    title: 'Вода под камнями',
    text: 'Тонкая струя исчезает под плитой. На другом берегу видна старая верёвка, а вдоль воды тянется низкий проход.',
    choices: [
      { id: 'stream-rope', label: 'Перейти к старой верёвке', detail: 'Осмотреть дальний берег', target: 'rope-crossing' },
      { id: 'stream-low', label: 'Пробраться вдоль воды', detail: 'Проверить низкий проход', target: 'hidden-grotto' },
      { id: 'stream-cave', label: 'Вернуться к развилке', detail: 'Выбрать другой тоннель', target: 'cave' },
    ],
  },
  'crystal-gallery': {
    id: 'crystal-gallery', kind: 'scene', location: 'Блестящая галерея', artwork: caveArtwork,
    character: { pose: 'interact', mood: 'wonder' },
    title: 'Тысячи отражений',
    text: 'Стены усыпаны мелкими кристаллами. Большинство крошатся от прикосновения, но в глубине видны две устойчивые тропы.',
    choices: [
      { id: 'gallery-ledge', label: 'Подняться по уступам', detail: 'Идти туда, где камни светлее', target: 'high-ledge' },
      { id: 'gallery-echo', label: 'Спуститься к эху', detail: 'Соединиться с центральным тоннелем', target: 'echo-tunnel' },
      { id: 'gallery-cave', label: 'Вернуться ко входу', detail: 'Не трогать хрупкие стены', target: 'cave' },
    ],
  },
  'echo-tunnel': {
    id: 'echo-tunnel', kind: 'dialogue', speaker: 'Далёкое эхо', location: 'Тоннель эха', artwork: caveArtwork,
    character: { pose: 'dialogue', mood: 'alert' },
    title: 'Шаги впереди',
    text: 'Каждый шаг возвращается двойным эхом. Затем среди отражений слышится ещё один звук — будто кто-то стукнул по камню три раза.',
    choices: [
      { id: 'echo-answer', label: 'Ответить тремя стуками', detail: 'Проверить, ответит ли незнакомец', target: 'traveler-meeting' },
      { id: 'echo-quiet', label: 'Тихо пройти дальше', detail: 'Не выдавать своё положение', target: 'narrow-passage' },
      { id: 'echo-gallery', label: 'Свернуть к блеску', detail: 'Перейти в кристальную галерею', target: 'crystal-gallery' },
    ],
  },
  'rope-crossing': {
    id: 'rope-crossing', kind: 'scene', location: 'Каменный мостик', artwork: caveArtwork,
    character: { pose: 'stop', mood: 'focused' },
    title: 'Над чёрной расщелиной',
    text: 'Верёвка привязана к каменному выступу и помогает пройти по узкому мостику. За ним сходятся следы из нескольких тоннелей.',
    choices: [
      { id: 'rope-marks', label: 'Осмотреть следы', detail: 'Идти к знакам на стене', target: 'marked-chamber' },
      { id: 'rope-grotto', label: 'Спуститься ниже', detail: 'Найти источник холодного воздуха', target: 'hidden-grotto' },
      { id: 'rope-stream', label: 'Вернуться через ручей', detail: 'Оставить мостик позади', target: 'underground-stream' },
    ],
  },
  'high-ledge': {
    id: 'high-ledge', kind: 'scene', location: 'Верхний уступ', artwork: caveArtwork,
    character: { pose: 'stop', mood: 'wonder' },
    title: 'Вид на глубину',
    text: 'С уступа видно почти всю пещеру. Внизу мерцает вода, а за колонной скрывается круглый зал со знаками на стенах.',
    choices: [
      { id: 'ledge-chamber', label: 'Спуститься к знакам', detail: 'Исследовать круглый зал', target: 'marked-chamber' },
      { id: 'ledge-passage', label: 'Перейти по карнизу', detail: 'Добраться до узкого прохода', target: 'narrow-passage' },
      { id: 'ledge-gallery', label: 'Спуститься обратно', detail: 'Вернуться к блестящим стенам', target: 'crystal-gallery' },
      { id: 'ledge-ridge', label: 'Выйти в трещину над уступом', detail: 'Проверить путь к горному гребню', target: 'wind-rift' },
    ],
  },
  'hidden-grotto': {
    id: 'hidden-grotto', kind: 'scene', location: 'Скрытый грот', artwork: caveArtwork,
    character: { pose: 'receive', mood: 'wonder' },
    title: 'Тихое голубое свечение',
    text: 'За низкой аркой открывается маленький грот. Свет здесь идёт не от кристалла, а из щели, ведущей ещё глубже в гору.',
    choices: [
      { id: 'grotto-passage', label: 'Протиснуться в щель', detail: 'Продолжить путь в глубину', target: 'narrow-passage' },
      { id: 'grotto-rope', label: 'Подняться к мостику', detail: 'Вернуться на верхний путь', target: 'rope-crossing' },
      { id: 'grotto-stream', label: 'Идти вслед за водой', detail: 'Вернуться к подземному ручью', target: 'underground-stream' },
      { id: 'grotto-depths', label: 'Спуститься к голубому свету', detail: 'Исследовать самый глубокий проход', target: 'blue-depths' },
    ],
  },
  'narrow-passage': {
    id: 'narrow-passage', kind: 'scene', location: 'Узкий проход', artwork: caveArtwork,
    character: { pose: 'walk', mood: 'focused' },
    title: 'За каменной щелью',
    text: 'Проход становится тесным, затем резко расширяется. Впереди видна тёплая полоска дневного света, но сбоку находится круглый зал.',
    choices: [
      { id: 'passage-chamber', label: 'Заглянуть в круглый зал', detail: 'Разобраться со знаками перед уходом', target: 'marked-chamber' },
      { id: 'passage-exit', label: 'Идти к дневному свету', detail: 'Найти дальний выход из пещеры', target: 'far-exit' },
      { id: 'passage-echo', label: 'Вернуться к эху', detail: 'Проверить центральный тоннель', target: 'echo-tunnel' },
    ],
  },
  'marked-chamber': {
    id: 'marked-chamber', kind: 'scene', location: 'Круглый зал', artwork: caveArtwork,
    character: { pose: 'interact', mood: 'alert' },
    title: 'Знак старого искателя',
    text: 'На стене вырезана карта подножья и тот же знак из трёх камней. Рядом стрелка указывает на дальний выход — кто-то прошёл здесь совсем недавно.',
    choices: [
      { id: 'chamber-exit', label: 'Последовать по стрелке', detail: 'Проверить дальний выход', target: 'far-exit' },
      { id: 'chamber-ledge', label: 'Подняться к уступу', detail: 'Осмотреть зал сверху', target: 'high-ledge' },
      { id: 'chamber-rope', label: 'Пойти по следам к воде', detail: 'Вернуться к каменному мостику', target: 'rope-crossing' },
    ],
  },
};
