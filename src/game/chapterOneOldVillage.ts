import type { StoryNode } from './types';

const ruins = '/game/locations/abandoned-village.svg';
const house = '/game/locations/abandoned-house.svg';

const returnToSquare = [
  { id: 'ruin-return', label: 'Вернуться на заросшую площадь', detail: 'Осмотреть другие дома', target: 'old-village-square' },
];

export const chapterOneOldVillageNodes: Record<string, StoryNode> = {
  'old-village-road': {
    id: 'old-village-road', kind: 'scene', location: 'Забытая дорога', artwork: ruins,
    character: { pose: 'walk', mood: 'alert' }, title: 'За старыми знаками',
    text: 'Знаки выводят из горы к дороге, почти исчезнувшей под травой. Впереди стоят покосившиеся дома: крыши провалились, окна выбиты, а мокрые доски потемнели от времени.',
    choices: [
      { id: 'old-enter', label: 'Спуститься к домам', detail: 'Исследовать заброшенную деревню', target: 'old-village-square' },
      { id: 'old-gate-back', label: 'Вернуться к воротам', detail: 'Остаться со странником', target: 'ancient-gate' },
    ],
  },
  'old-village-square': {
    id: 'old-village-square', kind: 'scene', location: 'Старая деревня', artwork: ruins,
    character: { pose: 'stop', mood: 'wonder' }, title: 'Площадь без голосов',
    text: 'Лозы обвили колодец, кусты проросли сквозь дорогу. Двери нескольких домов ещё открываются: у реки жил рыбак, рядом стояла библиотека, а на краю площади — дом с детской комнатой.',
    choices: [
      { id: 'old-river-house', label: 'Зайти в дом рыбака', detail: 'На столе виднеется записка', target: 'river-house-note' },
      { id: 'old-library', label: 'Осмотреть старую библиотеку', detail: 'Пройти между упавшими полками', target: 'old-library-note' },
      { id: 'old-family-house', label: 'Зайти в крайний дом', detail: 'Проверить детскую комнату', target: 'family-house-note' },
      { id: 'old-road-back', label: 'Вернуться к горной дороге', detail: 'Снова встретиться со странником', target: 'old-village-road' },
      { id: 'old-leave', label: 'Вернуться через гору', detail: 'Отправиться в свою деревню', target: 'homecoming-ending' },
    ],
  },
  'river-house-note': {
    id: 'river-house-note', kind: 'dialogue', speaker: 'Записка рыбака', location: 'Заброшенный дом', artwork: house,
    character: { pose: 'interact', mood: 'focused' }, title: 'Утро у речки',
    text: '«На рассвете мы всей улицей ходили к речке. Взрослые ставили сети, дети собирали гладкие камни, а после полудня мы делили улов у колодца. Река кормила нас и всегда показывала дорогу домой».',
    choices: returnToSquare,
  },
  'old-library-note': {
    id: 'old-library-note', kind: 'dialogue', speaker: 'Запись библиотекаря', location: 'Старая библиотека', artwork: house,
    character: { pose: 'interact', mood: 'wonder' }, title: 'День между книгами',
    text: '«После работы люди заходили читать новости и сказки. По пятницам мы ставили стулья между полками и читали детям вслух». За корешком журнала спрятан латунный фрагмент с изображением солнца.',
    choices: [
      {
        id: 'old-library-key', label: 'Взять часть ключа', detail: 'Сохранить странную находку',
        target: 'old-village-square', grantsItem: 'sun-key-library', hideIfItem: 'sun-key-library',
      },
      ...returnToSquare,
    ],
  },
  'family-house-note': {
    id: 'family-house-note', kind: 'dialogue', speaker: 'Листок из тетради', location: 'Дом у старого сада', artwork: house,
    character: { pose: 'receive', mood: 'focused' }, title: 'Последний праздник',
    text: '«Сегодня украсили площадь ветками речной ивы. Мама пекла хлеб, соседи принесли музыку, а мы бегали от библиотеки до моста. Когда-нибудь я нарисую нашу деревню, чтобы ничего не забыть».',
    choices: returnToSquare,
  },
};
