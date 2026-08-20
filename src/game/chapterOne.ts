import type { Chapter } from './types';
import { chapterOneCaveNodes } from './chapterOneCave';
import { chapterOneEndingNodes } from './chapterOneEndings';
import { chapterOneTravelerNodes } from './chapterOneTraveler';
import { chapterOneReturnNodes } from './chapterOneReturn';
import { chapterOneFriendNodes } from './chapterOneFriends';
import { chapterOneVillageNodes } from './chapterOneVillage';
import { chapterOneLibraryNodes } from './chapterOneLibrary';
import { chapterOneOldVillageNodes } from './chapterOneOldVillage';
import { festivalDayNodes } from './festivalDay';
import { chapterOneSecretNodes } from './chapterOneSecret';

export const chapterOne: Chapter = {
  id: 'first-trip',
  title: 'Первая вылазка',
  startNode: 'packing',
  startingItems: ['bag', 'glasses'],
  intro: [
    { text: 'Меня зовут Глос.', duration: 1100 },
    { text: 'Я поднялся к подножью этой горы, чтобы отыскать ценные кристаллы и продать их в местный ломбард в моей деревне.', duration: 1500 },
    { text: 'Я взял с собой небольшую коричневую сумку для сбора кристаллов и очки.', duration: 1300 },
    { text: 'За мной приглядывает одна бабушка, которая живёт и работает совсем одна.', duration: 1400 },
    { text: 'Я сам решил поднять ей настроение деньгами.', duration: 1200 },
    { text: 'Не знаю, поможет ли это...', duration: 1400 },
    { text: 'В целом, я просто хочу найти немного ценных кристаллов и вернуться домой.', duration: 1800 },
  ],
  items: {
    bag: { id: 'bag', name: 'Коричневая сумка', description: 'Небольшая, но крепкая.' },
    glasses: { id: 'glasses', name: 'Очки', description: 'Помогают рассмотреть трещины в камнях.' },
    quartz: { id: 'quartz', name: 'Дымчатый кварц', description: 'Тёплый на свету небольшой кристалл.' },
    fluorite: { id: 'fluorite', name: 'Зелёный флюорит', description: 'Нашёлся среди корней старой сосны.' },
    crystal: { id: 'crystal', name: 'Голубой кристалл', description: 'Чистый скол из каменной жилы.' },
    'sun-key-library': { id: 'sun-key-library', name: 'Часть ключа: книга', description: 'Латунный фрагмент из заброшенной библиотеки.' },
    'sun-key-traveler': { id: 'sun-key-traveler', name: 'Часть ключа: странник', description: 'Тёплый фрагмент, который хранил странник.' },
    'sun-key-camp': { id: 'sun-key-camp', name: 'Часть ключа: навес', description: 'Фрагмент из будки возле места отдыха.' },
    'green-book-clue': { id: 'green-book-clue', name: 'Совет бабушки', description: 'Семь зелёных книг спрятаны среди обычных корешков.' },
  },
  nodes: {
    packing: {
      id: 'packing', kind: 'scene', location: 'Дом Глоса', artwork: '/game/locations/grandma-house.svg',
      character: { pose: 'interact', mood: 'focused' }, title: 'Собраться в дорогу',
      text: 'Перед выходом нужно уложить самое важное в небольшую походную сумку.',
      choices: [], specialTarget: 'packing', specialReturnTarget: 'foothill',
    },
    foothill: {
      id: 'foothill', kind: 'scene', location: 'Подножье', artwork: '/game/locations/foothill.svg',
      character: { pose: 'stop', mood: 'neutral' },
      title: 'С чего начать?',
      text: 'Между огромными каменными рёбрами расходятся четыре прохода. Слева слышно сухое русло, дальше темнеют сосны. Справа лежит поле камней, а прямая тропа поднимается к склону.',
      choices: [
        { id: 'stream', label: 'Спуститься к руслу', detail: 'Посмотреть между гладкими камнями', target: 'stream' },
        { id: 'pines', label: 'Зайти в сосны', detail: 'Проверить тихую лесную тропу', target: 'pines' },
        { id: 'stones', label: 'Исследовать каменное поле', detail: 'Искать блеск среди обломков', target: 'stones' },
        { id: 'slope', label: 'Подняться по тропе', detail: 'Осмотреть склон повыше', target: 'slope' },
        {
          id: 'return-village', label: 'Вернуться в деревню', detail: 'Можно закончить вылазку с находками или без них',
          target: 'mountain-descent',
        },
      ],
    },
    stream: {
      id: 'stream', kind: 'scene', location: 'Сухое русло', artwork: '/game/locations/dry-stream.svg',
      character: { pose: 'interact', mood: 'focused' },
      title: 'Камни после воды',
      text: 'Когда-то здесь шёл ручей. Под круглым валуном поблёскивает коричневатый кристалл. Он небольшой, зато без трещин.',
      choices: [
        { id: 'take-quartz', label: 'Положить кварц в сумку', detail: 'Забрать найденный камень', target: 'foothill', grantsItem: 'quartz' },
        { id: 'follow-bed', label: 'Пройти вдоль русла', detail: 'Русло выводит к соснам', target: 'pines' },
        { id: 'stream-back', label: 'Вернуться', detail: 'Снова выбрать направление', target: 'foothill' },
      ],
    },
    pines: {
      id: 'pines', kind: 'scene', location: 'Сосновая низина', artwork: '/game/locations/pine-hollow.svg',
      character: { pose: 'interact', mood: 'focused' },
      title: 'Находка у корней',
      text: 'Под ветками тихо и прохладно. Корни одной сосны приподняли пласт земли, и в ней виден мягкий зелёный блеск.',
      choices: [
        { id: 'take-fluorite', label: 'Выкопать кристалл', detail: 'Осторожно убрать землю руками', target: 'foothill', grantsItem: 'fluorite' },
        { id: 'to-camp', label: 'Проверить старый навес', detail: 'За деревьями видна крыша', target: 'camp' },
        { id: 'pines-back', label: 'Выйти из леса', detail: 'Вернуться к подножью', target: 'foothill' },
      ],
    },
    camp: {
      id: 'camp', kind: 'dialogue', speaker: 'Незнакомый голос', location: 'Старый навес', artwork: '/game/locations/old-camp.svg',
      character: { pose: 'dialogue', mood: 'alert' },
      title: 'Чьё-то место для отдыха',
      text: 'Навес выглядит пустым, но с другой стороны вдруг слышится: «Эй, осторожнее на камнях». Я не вижу говорящего. На доске нарисованы три камня и стрелка вправо.',
      choices: [
        { id: 'camp-booth', label: 'Подойти к старой будке', detail: 'Проверить дверцу возле места отдыха', target: 'camp-key-booth' },
        { id: 'camp-stones', label: 'Последовать подсказке', detail: 'Выйти к каменному полю', target: 'stones' },
        { id: 'camp-back', label: 'Вернуться через сосны', detail: 'Не уходить далеко от тропы', target: 'pines' },
      ],
    },
    stones: {
      id: 'stones', kind: 'scene', location: 'Каменное поле', artwork: '/game/locations/stone-field.svg',
      character: { pose: 'receive', mood: 'focused' },
      title: 'Тонкая голубая жила',
      text: 'Без очков это место выглядело бы обычной россыпью. Но на сером камне заметна тонкая голубая линия — её можно аккуратно отделить.',
      choices: [
        { id: 'take-crystal', label: 'Достать голубой кристалл', detail: 'Осмотреть жилу через очки', target: 'slope', grantsItem: 'crystal', requiresItem: 'glasses' },
        { id: 'cross-field', label: 'Пересечь поле', detail: 'Выйти к верхней тропе', target: 'slope' },
        { id: 'stones-back', label: 'Вернуться к началу', detail: 'Оставить камни на потом', target: 'foothill' },
      ],
    },
    slope: {
      id: 'slope', kind: 'scene', location: 'Солнечный склон', artwork: '/game/locations/sunny-slope.svg',
      character: { pose: 'stop', mood: 'wonder' },
      title: 'Чуть выше деревьев',
      text: 'Отсюда уже видно деревню. Впереди тропа ведёт к неглубокой пещере. Я могу продолжить поиски или спуститься и проверить другие места.',
      choices: [
        { id: 'to-cave', label: 'Подняться к пещере', detail: 'Преодолеть крутой участок склона', target: 'slope-climb' },
        { id: 'slope-stones', label: 'Спуститься через камни', detail: 'Проверить правую сторону', target: 'stones' },
        { id: 'slope-back', label: 'Вернуться к развилке', detail: 'Выбрать другой путь', target: 'foothill' },
      ],
    },
    'slope-climb': {
      id: 'slope-climb', kind: 'scene', location: 'Крутой склон', artwork: '/game/locations/sunny-slope.svg',
      character: { pose: 'walk', mood: 'focused' }, title: 'Последние метры подъёма',
      text: 'Камни осыпаются из-под ног. Нужно ловить спокойный ритм и выбирать надёжные выступы.',
      choices: [], specialTarget: 'climb', specialReturnTarget: 'cave',
    },
    ...chapterOneCaveNodes,
    ...chapterOneTravelerNodes,
    ...chapterOneEndingNodes,
    ...chapterOneReturnNodes,
    ...chapterOneVillageNodes,
    ...chapterOneLibraryNodes,
    ...chapterOneOldVillageNodes,
    ...chapterOneFriendNodes,
    ...festivalDayNodes,
    ...chapterOneSecretNodes,
  },
};
