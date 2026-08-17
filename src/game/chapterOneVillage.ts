import type { StoryNode } from './types';

const villageArtwork = '/game/locations/village-square.svg';
const grandmaScene = {
  encounter: 'grandma' as const,
  artwork: '/game/locations/grandma-house.svg',
};

export const chapterOneVillageNodes: Record<string, StoryNode> = {
  'village-square': {
    id: 'village-square', kind: 'scene', location: 'Деревенская площадь', artwork: villageArtwork,
    character: { pose: 'stop', mood: 'happy' },
    title: 'Знакомый перекрёсток',
    text: 'Между небольшими домами горят фонари. От площади одна дорожка ведёт к дому бабушки, другая — к ломбарду. Возле старого колодца стоят Тим и Лео.',
    choices: [
      {
        id: 'square-grandma', label: 'Сначала зайти к бабушке', detail: 'Сказать, что Глос вернулся',
        target: 'grandma-home', hideAfterTargetVisited: true,
      },
      { id: 'square-pawnshop', label: 'Сначала пойти в ломбард', detail: 'Показать найденные кристаллы', target: 'pawnshop' },
      { id: 'square-friends', label: 'Подойти к друзьям', detail: 'Немного поговорить у колодца', target: 'friends-meeting' },
      { id: 'square-library', label: 'Зайти в библиотеку', detail: 'Поговорить с библиотекаршей и почитать', target: 'village-library' },
    ],
  },
  'grandma-home': {
    id: 'grandma-home', kind: 'dialogue', speaker: 'Бабушка', location: 'Дом бабушки', ...grandmaScene,
    character: { pose: 'dialogue', mood: 'happy' },
    title: 'Тёплое окно',
    text: '«Вот ты где, Глос. Я уже поставила чайник. По твоей сумке вижу: день был непростой, но вернулся ты не с пустыми руками».',
    choices: [
      { id: 'grandma-honest', label: '«Я немного устал, но всё хорошо»', detail: 'Ответить спокойно и честно', target: 'grandma-talk' },
      { id: 'grandma-findings', label: '«Смотри, что я нашёл!»', detail: 'Сразу показать кристаллы', target: 'grandma-talk' },
      { id: 'grandma-pawnshop', label: '«Сначала отнесу находки в ломбард»', detail: 'Пообещать скоро вернуться', target: 'pawnshop' },
    ],
  },
  'grandma-talk': {
    id: 'grandma-talk', kind: 'dialogue', speaker: 'Бабушка', location: 'Дом бабушки', ...grandmaScene,
    character: { pose: 'stand', mood: 'happy' },
    title: 'Разговор у порога',
    text: '«Мне важнее, что ты вернулся целым. Кристаллы подождут. Если пойдёшь к оценщику, не соглашайся на первую цену и не забудь потом позвать друзей на чай».',
    choices: [
      { id: 'grandma-to-pawnshop', label: 'Пойти в ломбард', detail: 'Послушать совет бабушки', target: 'pawnshop' },
      { id: 'grandma-to-friends', label: 'Позвать друзей на чай', detail: 'Сходить за Тимом и Лео', target: 'tea-at-grandmas' },
      { id: 'grandma-chess', label: 'Сыграть с бабушкой в шахматы', detail: 'Провести обычную партию без награды', target: 'grandma-chess' },
      { id: 'grandma-to-square', label: 'Пройтись по площади', detail: 'Решить, куда идти дальше', target: 'village-square' },
    ],
  },
  pawnshop: {
    id: 'pawnshop', kind: 'dialogue', speaker: 'Оценщик Рен', location: 'Деревенский ломбард', artwork: villageArtwork,
    character: { pose: 'interact', mood: 'focused' },
    title: 'Кристаллы на прилавке',
    text: '«Дымчатый, зелёный или голубой — у каждой находки своя история. Я могу заплатить сейчас или сначала объяснить, почему один камень ценнее другого».',
    choices: [
      { id: 'pawnshop-listen', label: '«Сначала расскажите об оценке»', detail: 'Не торопиться с продажей', target: 'pawnshop-lesson' },
      { id: 'pawnshop-sell', label: '«Я доверяю вам. Продаём»', detail: 'Закончить сделку', target: 'pawnshop-deal' },
      { id: 'pawnshop-later', label: '«Я ещё подумаю»', detail: 'Вернуться на площадь с находками', target: 'village-square' },
    ],
  },
  'pawnshop-lesson': {
    id: 'pawnshop-lesson', kind: 'dialogue', speaker: 'Оценщик Рен', location: 'Деревенский ломбард', artwork: villageArtwork,
    character: { pose: 'dialogue', mood: 'wonder' },
    title: 'Цена и редкость',
    text: '«Смотри на чистоту, трещины и цвет при свете. Самый яркий камень не всегда самый редкий. Сегодняшние находки хорошие — ты работал внимательно».',
    choices: [
      { id: 'lesson-sell', label: 'Продать кристаллы', detail: 'Принять справедливую цену', target: 'pawnshop-deal' },
      { id: 'lesson-keep', label: 'Оставить их до завтра', detail: 'Вернуться на площадь', target: 'village-square' },
    ],
  },
  'pawnshop-deal': {
    id: 'pawnshop-deal', kind: 'dialogue', speaker: 'Оценщик Рен', location: 'Деревенский ломбард', artwork: villageArtwork,
    character: { pose: 'receive', mood: 'happy' },
    title: 'Честная сделка',
    text: 'Рен пересчитывает монеты и заворачивает кристаллы в мягкую ткань. «Для первой серьёзной вылазки — отличный результат».',
    choices: [
      {
        id: 'deal-grandma', label: 'Отнести деньги бабушке', detail: 'Пойти к её дому',
        target: 'grandma-after-pawnshop', hideAfterTargetVisited: true,
      },
      { id: 'deal-friends', label: 'Рассказать друзьям', detail: 'Вернуться к колодцу', target: 'friends-meeting' },
      { id: 'deal-square', label: 'Выйти на площадь', detail: 'Немного осмотреться', target: 'village-square' },
    ],
  },
  'grandma-after-pawnshop': {
    id: 'grandma-after-pawnshop', kind: 'dialogue', speaker: 'Бабушка', location: 'Дом бабушки', ...grandmaScene,
    character: { pose: 'receive', mood: 'happy' },
    title: 'Подарок важнее монет',
    text: '«Спасибо, Глос. Но в следующий раз принеси лучше интересную историю и возвращайся до темноты. А эти деньги мы потратим вместе».',
    choices: [
      { id: 'after-grandma-friends', label: 'Позвать друзей на чай', detail: 'Найти Тима и Лео', target: 'tea-at-grandmas' },
      { id: 'after-grandma-chess', label: 'Сыграть с бабушкой в шахматы', detail: 'Провести спокойную партию', target: 'grandma-chess' },
      { id: 'after-grandma-square', label: 'Вернуться на площадь', detail: 'Продолжить вечер в деревне', target: 'village-square' },
    ],
  },
  'grandma-chess': {
    id: 'grandma-chess', kind: 'scene', location: 'Дом бабушки', ...grandmaScene,
    character: { pose: 'interact', mood: 'focused' }, title: 'Партия с бабушкой',
    text: 'Бабушка ставит на стол старую шахматную доску. Глос играет белыми и делает первый ход.',
    choices: [], specialTarget: 'chess', specialReturnTarget: 'grandma-talk',
  },
  'tea-at-grandmas': {
    id: 'tea-at-grandmas', kind: 'dialogue', speaker: 'Бабушка, Лео и Тим', location: 'Дом бабушки',
    encounter: 'tea', artwork: '/game/locations/grandma-house.svg',
    character: { pose: 'dialogue', mood: 'happy' },
    title: 'Все собрались за чаем',
    text: 'Лео первым вбегает на крыльцо, Тим бережно несёт чашки, а бабушка ставит на стол горячий чай и пирог. Глос рассказывает о вылазке, и друзья слушают, не перебивая друг друга.',
    choices: [
      { id: 'tea-story', label: 'Рассказать про кристаллы', detail: 'Поделиться лучшим моментом вылазки', target: 'tea-story' },
      { id: 'tea-finish', label: 'Остаться пить чай', detail: 'Закончить день дома с близкими', target: 'tea-evening' },
    ],
  },
  'tea-story': {
    id: 'tea-story', kind: 'dialogue', speaker: 'Лео и Тим', location: 'Дом бабушки',
    encounter: 'tea', artwork: '/game/locations/grandma-house.svg',
    character: { pose: 'dialogue', mood: 'wonder' },
    title: 'История у тёплого стола',
    text: 'Лео просит показать самый яркий камень, а Тим внимательно расспрашивает о дороге. Бабушка улыбается: теперь находки Глоса стали общей историей.',
    choices: [
      { id: 'tea-story-finish', label: 'Продолжить чаепитие', detail: 'Отдохнуть после долгого дня', target: 'tea-evening' },
    ],
  },
  'tea-evening': {
    id: 'tea-evening', kind: 'dialogue', speaker: 'Глос', location: 'Дом бабушки',
    encounter: 'tea', artwork: '/game/locations/grandma-house.svg',
    character: { pose: 'stand', mood: 'happy' },
    title: 'Тихий вечер дома',
    text: 'За окном темнеет, но в доме тепло. Бабушка рядом, друзья смеются, а следующую вылазку можно планировать уже завтра.',
    choices: [
      { id: 'tea-goodbye', label: 'Проводить друзей', detail: 'Попрощаться и готовиться ко сну', target: 'tea-goodbye' },
    ],
  },
  'tea-goodbye': {
    id: 'tea-goodbye', kind: 'dialogue', speaker: 'Лео и Тим', location: 'Дом бабушки',
    encounter: 'tea', artwork: '/game/locations/grandma-house.svg',
    character: { pose: 'dialogue', mood: 'happy' }, title: 'До завтра',
    text: 'Лео и Тим надевают куртки и машут с крыльца. Бабушка убирает чашки, а Глос чувствует, как после долгого дня начинают слипаться глаза.',
    choices: [
      { id: 'go-to-sleep', label: 'Лечь спать', detail: 'Завершить долгий день', target: 'sleep-cutscene' },
    ],
  },
  'sleep-cutscene': {
    id: 'sleep-cutscene', kind: 'scene', location: 'Комната Глоса', artwork: '/game/locations/grandma-house.svg',
    character: { pose: 'stand', mood: 'happy' }, title: 'Дом уснул', text: 'Глос ложится спать.', choices: [],
    endingFrames: [
      { text: 'Я очень долго спал после вчерашнего. Всю ночь я слышал странные звуки за окном. Я выспался. Пора вставать.', duration: 5000 },
    ],
    endingTarget: 'festival-wake',
  },
};
