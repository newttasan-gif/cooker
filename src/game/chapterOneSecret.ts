import type { StoryNode } from './types';

const cave = '/game/locations/cave-mouth.svg';
const secretRoom = '/game/locations/secret-sun-room.svg';

export const chapterOneSecretNodes: Record<string, StoryNode> = {
  'camp-key-booth': {
    id: 'camp-key-booth', kind: 'scene', location: 'Старый навес', artwork: '/game/locations/old-camp.svg',
    character: { pose: 'interact', mood: 'focused' }, title: 'Будка у места отдыха',
    text: 'За навесом стоит маленькая деревянная будка. Дверца не заперта. Внутри, среди сухих веток, лежит часть латунного ключа со знаком солнца.',
    choices: [
      {
        id: 'take-camp-key', label: 'Взять часть ключа', detail: 'Она подходит к какому-то круглому замку',
        target: 'camp', grantsItem: 'sun-key-camp', hideIfItem: 'sun-key-camp',
      },
      { id: 'leave-camp-key', label: 'Закрыть дверцу', detail: 'Вернуться под навес', target: 'camp' },
    ],
  },
  'traveler-key-talk': {
    id: 'traveler-key-talk', kind: 'dialogue', speaker: 'Путешественник', location: 'Старые ворота',
    encounter: 'traveler', artwork: cave, character: { pose: 'dialogue', mood: 'wonder' },
    title: 'Три луча одного ключа',
    text: 'Странник поднимает лампу: «Я знаю этот знак. Три части открывают дверь глубже в горе. Одну оставили среди памяти заброшенной библиотеки, другую доверили мне, а третью спрятали там, где путники отдыхают».',
    choices: [
      {
        id: 'receive-traveler-key', label: 'Показать библиотечную часть', detail: 'Получить часть, которую хранил странник',
        target: 'traveler-key-received', grantsItem: 'sun-key-traveler', requiresItem: 'sun-key-library',
        hideIfItem: 'sun-key-traveler', lockedDetail: 'Сначала нужна часть из заброшенной библиотеки',
      },
      {
        id: 'open-sun-room', label: 'Соединить три части', detail: 'Попросить странника показать тайную дверь',
        target: 'secret-sun-room', requiresItems: ['sun-key-library', 'sun-key-traveler', 'sun-key-camp'],
        lockedDetail: 'Для двери нужны все три части ключа',
      },
      { id: 'keys-back', label: 'Убрать найденные части', detail: 'Вернуться к старым воротам', target: 'ancient-gate' },
    ],
  },
  'traveler-key-received': {
    id: 'traveler-key-received', kind: 'dialogue', speaker: 'Путешественник', location: 'Старые ворота',
    encounter: 'traveler', artwork: cave, character: { pose: 'receive', mood: 'happy' },
    title: 'Второй фрагмент',
    text: '«Теперь я могу доверить его тебе». Из складки мантии странник достаёт вторую часть. Два латунных края сразу соединяются и начинают светиться тем же жёлтым светом, что и его лампа.',
    choices: [
      { id: 'received-ask', label: 'Снова спросить о ключе', detail: 'Узнать, можно ли открыть дверь', target: 'traveler-key-talk' },
      { id: 'received-back', label: 'Вернуться к воротам', detail: 'Продолжить исследование', target: 'ancient-gate' },
    ],
  },
  'secret-sun-room': {
    id: 'secret-sun-room', kind: 'dialogue', speaker: 'Малое Солнце', location: 'Тайная комната горы',
    encounter: 'oracle', artwork: secretRoom, character: { pose: 'stop', mood: 'wonder' },
    title: 'Свет, который всё помнит', specialTarget: 'oracle',
    text: 'Странник проводит Глоса по тёмному коридору. Три части поворачиваются в круглом замке, и тяжёлая дверь уходит в стену. В комнате почти нет вещей: только тёмный камень и тёплый жёлтый свет. В центре висит самый яркий круг, вокруг него держатся два овальных слоя сияния, а по всей комнате медленно летают светящиеся точки. Это Малое Солнце. Оно знает игру так же хорошо, как её создатель, и готово говорить с Глосом о местах, персонажах, диалогах, коде или новых идеях.',
    choices: [
      { id: 'oracle-leave', label: 'Вернуться к страннику', detail: 'Выйти из тайной комнаты', target: 'ancient-gate' },
    ],
  },
};
