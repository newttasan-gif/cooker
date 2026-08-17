import type { StoryNode } from './types';

const feast = {
  artwork: '/game/locations/village-square.svg', chapter: 'Глава II', festival: true,
  encounter: 'tea' as const, location: 'Праздничный стол',
};

export const festivalFeastNodes: Record<string, StoryNode> = {
  'festival-feast': {
    id: 'festival-feast', kind: 'dialogue', speaker: 'Бабушка, Тим и Лео', ...feast,
    character: { pose: 'dialogue', mood: 'happy' }, title: 'Длинный стол под фонариками',
    text: 'За общим столом собрались жители деревни. Здесь пахнет свежим хлебом, печёными яблоками и травяным чаем. Тим подвигает Глосу свободную тарелку, а Лео уже спорит с бабушкой о самом вкусном пироге.',
    choices: [
      { id: 'feast-help', label: 'Помочь разнести угощения', detail: 'Познакомиться с жителями за столом', target: 'festival-feast-help' },
      { id: 'feast-story', label: 'Сесть рядом с бабушкой', detail: 'Послушать праздничную историю', target: 'festival-feast-story' },
    ],
  },
  'festival-feast-help': {
    id: 'festival-feast-help', kind: 'dialogue', speaker: 'Жители деревни', ...feast,
    character: { pose: 'interact', mood: 'happy' }, title: 'Угощение для каждого',
    text: 'Глос разносит кружки и знакомится с пекарем Ореном, садовницей Нией и старым мастером Рудо. Каждый рассказывает, что принёс на фестиваль, а в конце стола для Глоса оставляют самый тёплый кусок ягодного пирога.',
    choices: [{ id: 'feast-help-sit', label: 'Вернуться к друзьям', detail: 'Попробовать праздничный пирог', target: 'festival-feast-toast' }],
  },
  'festival-feast-story': {
    id: 'festival-feast-story', kind: 'dialogue', speaker: 'Бабушка', ...feast,
    character: { pose: 'dialogue', mood: 'wonder' }, title: 'История первого фонарика',
    text: 'Бабушка рассказывает, что первый деревенский фонарик зажгли для путника, потерявшего дорогу в тумане. С тех пор на фестивале оставляют один огонёк у дороги — для того, кто ещё не успел вернуться домой.',
    choices: [{ id: 'feast-story-toast', label: 'Поднять кружку вместе со всеми', detail: 'Пожелать деревне тёплого года', target: 'festival-feast-toast' }],
  },
  'festival-feast-toast': {
    id: 'festival-feast-toast', kind: 'dialogue', speaker: 'Тим и Лео', ...feast,
    character: { pose: 'dialogue', mood: 'happy' }, title: 'Общий тост',
    text: 'Над столом звенят кружки. Тим желает всем спокойного года, Лео — побольше приключений, а жители смеются и просят Глоса обязательно вернуться к столу ещё раз.',
    choices: [{ id: 'feast-return', label: 'Вернуться на площадь', detail: 'Продолжить прогулку по фестивалю', target: 'festival-grandma' }],
  },
};
