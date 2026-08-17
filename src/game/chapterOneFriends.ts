import type { StoryNode } from './types';

const villageArtwork = '/game/locations/village-square.svg';
const friends = { encounter: 'friends' as const, artwork: villageArtwork };

const nextChoices = [
  {
    id: 'friends-grandma', label: 'Позвать друзей к бабушке', detail: 'Пойти пить чай вместе',
    target: 'tea-at-grandmas', hideAfterTargetVisited: true,
  },
  { id: 'friends-pawnshop', label: 'Сходить вместе в ломбард', detail: 'Показать друзьям оценку камней', target: 'pawnshop' },
  { id: 'friends-square', label: 'Ещё немного пройтись', detail: 'Вернуться к центру площади', target: 'village-square' },
];

export const chapterOneFriendNodes: Record<string, StoryNode> = {
  'friends-meeting': {
    id: 'friends-meeting', kind: 'dialogue', speaker: 'Тим и Лео', location: 'Старый колодец', ...friends,
    character: { pose: 'dialogue', mood: 'happy' },
    title: 'Друзья на площади',
    text: 'Девятилетний Лео в полосатой футболке поправляет пластырь на щеке и едва удерживается, чтобы не перебить. Рядом улыбается одиннадцатилетний Тим — он носит похожее на моё пальто, но говорит открыто и легко.',
    choices: [
      { id: 'friends-warm', label: '«Я рад вас видеть»', detail: 'Ответить тепло и прямо', target: 'friends-warm' },
      { id: 'friends-quiet', label: '«Давайте просто немного посидим»', detail: 'Выбрать спокойный разговор', target: 'friends-quiet' },
      { id: 'friends-joke', label: '«Гора пыталась оставить меня себе»', detail: 'Разрядить встречу шуткой', target: 'friends-joke' },
      { id: 'friends-day', label: '«Сначала расскажите, как ваш день»', detail: 'Спросить о друзьях', target: 'friends-day' },
    ],
  },
  'friends-warm': {
    id: 'friends-warm', kind: 'dialogue', speaker: 'Тим', location: 'Старый колодец', ...friends,
    character: { pose: 'dialogue', mood: 'happy' },
    title: 'Можно говорить прямо',
    text: '«Мы тоже рады. Лео три раза ходил к дороге проверять, не возвращаешься ли ты. Я сказал ему не волноваться, но сам смотрел туда ещё чаще». Лео кивает, не споря.',
    choices: nextChoices,
  },
  'friends-quiet': {
    id: 'friends-quiet', kind: 'dialogue', speaker: 'Лео', location: 'Старый колодец', ...friends,
    character: { pose: 'stand', mood: 'neutral' },
    title: 'Тихая компания',
    text: '«Хорошо. Не обязательно сразу всё рассказывать». Лео садится на край невысокого забора и болтает ногами чуть медленнее обычного. Тим молча оставляет рядом место для Глоса.',
    choices: nextChoices,
  },
  'friends-joke': {
    id: 'friends-joke', kind: 'dialogue', speaker: 'Лео', location: 'Старый колодец', ...friends,
    character: { pose: 'dialogue', mood: 'happy' },
    title: 'История становится лучше',
    text: '«Но ты оказался упрямее горы!» — Лео смеётся. Тим предлагает записать эту фразу, а потом спокойно спрашивает, не было ли внутри по-настоящему страшно.',
    choices: nextChoices,
  },
  'friends-day': {
    id: 'friends-day', kind: 'dialogue', speaker: 'Тим', location: 'Старый колодец', ...friends,
    character: { pose: 'dialogue', mood: 'wonder' },
    title: 'Пока Глоса не было',
    text: '«Мы помогали чинить забор у площади. Лео нашёл способ закончить быстрее, хотя пластырь получил именно из-за этого способа». Лео уверяет, что всё было рассчитано почти правильно.',
    choices: nextChoices,
  },
};
