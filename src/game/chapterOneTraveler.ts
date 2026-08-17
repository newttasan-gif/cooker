import type { StoryNode } from './types';

const caveArtwork = '/game/locations/cave-mouth.svg';
const traveler = { encounter: 'traveler' as const, artwork: caveArtwork };

export const chapterOneTravelerNodes: Record<string, StoryNode> = {
  'traveler-meeting': {
    id: 'traveler-meeting', kind: 'dialogue', speaker: 'Путешественник', location: 'Тоннель эха', ...traveler,
    character: { pose: 'dialogue', mood: 'alert' },
    title: 'Свет за поворотом',
    text: '«Не бойся. Это я стучал по камню. Здесь эхо обманывает слух, поэтому я предупреждаю путников заранее». Из темноты выходит фигура в бежево-коричневой мантии. Лица под капюшоном не видно; наружу протянута только рука с посохом, на кончике которого горит лампа.',
    choices: [
      { id: 'meeting-who', label: '«Кто вы?»', detail: 'Спросить о незнакомце', target: 'traveler-name' },
      { id: 'meeting-thanks', label: '«Спасибо за предупреждение»', detail: 'Показать, что Глос не боится', target: 'traveler-kindness' },
      { id: 'meeting-path', label: '«Вы знаете путь наружу?»', detail: 'Сразу спросить дорогу', target: 'traveler-map' },
    ],
  },
  'traveler-name': {
    id: 'traveler-name', kind: 'dialogue', speaker: 'Путешественник', location: 'Тоннель эха', ...traveler,
    character: { pose: 'dialogue', mood: 'focused' },
    title: 'Хранитель троп',
    text: '«Имя пока не важно. Я отмечаю безопасные проходы и чиню старые верёвки. Ты уже видел ручей, хрупкую галерею и мостик над расщелиной — все они соединяются дальше».',
    choices: [
      { id: 'name-lamp', label: '«Что за свет в вашей лампе?»', detail: 'Рассмотреть посох внимательнее', target: 'traveler-lamp' },
      { id: 'name-help', label: '«Вам нужна помощь?»', detail: 'Предложить помощь путешественнику', target: 'traveler-kindness' },
      { id: 'name-map', label: '«Расскажите о проходах»', detail: 'Узнать устройство пещеры', target: 'traveler-map' },
    ],
  },
  'traveler-kindness': {
    id: 'traveler-kindness', kind: 'dialogue', speaker: 'Путешественник', location: 'Тоннель эха', ...traveler,
    character: { pose: 'dialogue', mood: 'wonder' },
    title: 'Добрый незнакомец',
    text: '«Хороший ответ. Большинство думает только о кристаллах. Я ищу путь к старым воротам и не хочу, чтобы кто-нибудь потерялся в этих комнатах».',
    choices: [
      { id: 'kind-go', label: '«Я пойду с вами»', detail: 'Продолжить путь вместе', target: 'traveler-crossroads' },
      { id: 'kind-why', label: '«Что находится за воротами?»', detail: 'Узнать цель путешественника', target: 'traveler-gate-story' },
      { id: 'kind-alone', label: '«Я продолжу один»', detail: 'Вежливо попрощаться', target: 'far-exit' },
    ],
  },
  'traveler-map': {
    id: 'traveler-map', kind: 'dialogue', speaker: 'Путешественник', location: 'Тоннель эха', ...traveler,
    character: { pose: 'dialogue', mood: 'focused' },
    title: 'Комнаты одной горы',
    text: '«Галерея ведёт к верхнему уступу, ручей — к скрытому гроту, а следы у мостика сходятся в круглом зале. К дальнему выходу безопаснее идти через зал со знаками».',
    choices: [
      { id: 'map-together', label: '«Покажите безопасный путь»', detail: 'Довериться путешественнику', target: 'traveler-crossroads' },
      { id: 'map-gate', label: '«Куда ведут старые знаки?»', detail: 'Спросить о тайной двери', target: 'traveler-gate-story' },
      { id: 'map-bye', label: '«Теперь я разберусь сам»', detail: 'Направиться к дальнему выходу', target: 'far-exit' },
    ],
  },
  'traveler-lamp': {
    id: 'traveler-lamp', kind: 'dialogue', speaker: 'Путешественник', location: 'Тоннель эха', ...traveler,
    character: { pose: 'dialogue', mood: 'wonder' },
    title: 'Лампа на посохе',
    text: '«Внутри светящаяся пыль с верхнего уступа. Она тускнеет возле непрочных стен и ярко горит рядом со свежим воздухом. Поэтому я ещё ни разу не заблудился».',
    choices: [
      { id: 'lamp-follow', label: '«Тогда пойдём за светом»', detail: 'Отправиться вместе', target: 'traveler-crossroads' },
      { id: 'lamp-gate', label: '«Она поможет открыть ворота?»', detail: 'Спросить о глубине пещеры', target: 'traveler-gate-story' },
      { id: 'lamp-exit', label: '«Мне пора возвращаться»', detail: 'Выбрать обычный выход', target: 'far-exit' },
    ],
  },
  'traveler-gate-story': {
    id: 'traveler-gate-story', kind: 'dialogue', speaker: 'Путешественник', location: 'Зал старых знаков', ...traveler,
    character: { pose: 'dialogue', mood: 'alert' },
    title: 'Ворота под горой',
    text: '«За ними не сокровище, а забытая дорога между деревнями. Если открыть её, людям больше не придётся обходить гору зимой. Одному мне не сдвинуть каменный механизм».',
    choices: [
      { id: 'gate-help', label: '«Я помогу открыть дорогу»', detail: 'Принять важное решение', target: 'traveler-crossroads' },
      { id: 'gate-return', label: '«Сначала нужно предупредить деревню»', detail: 'Вернуться с новостями', target: 'village-message-ending' },
      { id: 'gate-no', label: '«Сегодня я не готов»', detail: 'Уйти через дальний выход', target: 'far-exit' },
    ],
  },
  'traveler-crossroads': {
    id: 'traveler-crossroads', kind: 'dialogue', speaker: 'Путешественник', location: 'Подземная развилка', ...traveler,
    character: { pose: 'walk', mood: 'focused' },
    title: 'Два огня впереди',
    text: '«Слева горит дневной свет дальнего выхода. Справа моя лампа освещает проход к воротам. Я не стану решать за тебя, Глос».',
    choices: [
      { id: 'crossroads-gate', label: '«Идём к воротам вместе»', detail: 'Выбрать новую дорогу', target: 'ancient-gate' },
      { id: 'crossroads-home', label: '«Я вернусь домой»', detail: 'Выйти к дневному свету', target: 'far-exit' },
      { id: 'crossroads-signs', label: '«Я ещё осмотрю круглый зал»', detail: 'Вернуться к карте на стене', target: 'marked-chamber' },
    ],
  },
  'ancient-gate': {
    id: 'ancient-gate', kind: 'dialogue', speaker: 'Путешественник', location: 'Старые ворота', ...traveler,
    character: { pose: 'interact', mood: 'happy' },
    title: 'Дорога для двоих',
    text: '«Нажимай на нижний камень!» Механизм вздрагивает, и между створками появляется полоска света. За воротами видна старая дорога, а на камнях повторяются знаки исчезнувших деревень.',
    choices: [
      { id: 'gate-old-village', label: 'Пойти по старым знакам', detail: 'Исследовать забытую деревню', target: 'old-village-road' },
      { id: 'gate-keys', label: 'Расспросить о частях ключа', detail: 'Показать страннику найденные фрагменты', target: 'traveler-key-talk' },
      { id: 'gate-stay', label: 'Ещё поговорить со странником', detail: 'Вернуться к развилке', target: 'traveler-crossroads' },
    ],
  },
};
