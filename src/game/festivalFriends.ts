import type { StoryNode } from './types';

const friends = {
  artwork: '/game/locations/village-square.svg', chapter: 'Глава II', festival: true,
  encounter: 'friends' as const, location: 'Фестивальная площадь',
};

export const festivalFriendNodes: Record<string, StoryNode> = {
  'festival-friends': {
    id: 'festival-friends', kind: 'dialogue', speaker: 'Лео и Тим', ...friends,
    character: { pose: 'dialogue', mood: 'happy' }, title: 'Встреча под гирляндами',
    text: '«Глос! Мы как раз хотели обойти все украшенные дома. Пойдём с нами — покажем фонарики, которые вешали ночью».',
    choices: [{ id: 'friends-go', label: '«Показывайте дорогу»', detail: 'Пройти по праздничной улице', target: 'festival-friends-lanterns' }],
  },
  'festival-friends-lanterns': {
    id: 'festival-friends-lanterns', kind: 'dialogue', speaker: 'Лео', ...friends,
    character: { pose: 'dialogue', mood: 'wonder' }, title: 'Бумажные фонарики',
    text: '«Видишь красный фонарик над крышей? Я сделал его сам. Он немного кривой, зато его видно с другого конца площади!»',
    choices: [
      { id: 'lantern-kind', label: '«Он самый заметный из всех»', detail: 'Поддержать Лео', target: 'festival-friends-stall' },
      { id: 'lantern-joke', label: '«Главное, чтобы не улетел»', detail: 'Немного пошутить', target: 'festival-friends-stall' },
    ],
  },
  'festival-friends-stall': {
    id: 'festival-friends-stall', kind: 'dialogue', speaker: 'Тим', ...friends,
    character: { pose: 'dialogue', mood: 'happy' }, title: 'У прилавка со сладостями',
    text: '«Я помогал расставлять угощения. Оставил для вас яблоки в карамели — иначе Лео съел бы всё ещё до начала фестиваля».',
    choices: [{ id: 'friends-treat', label: '«Давайте съедим их у колодца»', detail: 'Отдохнуть вместе вдали от толпы', target: 'festival-friends-well' }],
  },
  'festival-friends-well': {
    id: 'festival-friends-well', kind: 'dialogue', speaker: 'Лео и Тим', ...friends,
    character: { pose: 'dialogue', mood: 'happy' }, title: 'Разговор у колодца',
    text: 'Друзья смотрят на огни между домами. «Хорошо, что ты вернулся к фестивалю, Глос. Без тебя этот вечер был бы совсем другим».',
    choices: [{ id: 'friends-memory', label: '«В следующий раз украсим площадь вместе»', detail: 'Договориться о следующем фестивале', target: 'festival-friends-goodbye' }],
  },
  'festival-friends-goodbye': {
    id: 'festival-friends-goodbye', kind: 'dialogue', speaker: 'Лео и Тим', ...friends,
    character: { pose: 'dialogue', mood: 'happy' }, title: 'До встречи на площади',
    text: '«Договорились! А сейчас возвращайся к бабушке — она наверняка ждёт рассказов о твоей прогулке».',
    choices: [{ id: 'friends-return', label: '«Увидимся позже»', detail: 'Вернуться к бабушке', target: 'festival-grandma', completesActivity: 'friends' }],
  },
};
