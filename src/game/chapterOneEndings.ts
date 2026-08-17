import type { StoryNode } from './types';

const caveArtwork = '/game/locations/cave-mouth.svg';

export const chapterOneEndingNodes: Record<string, StoryNode> = {
  'far-exit': {
    id: 'far-exit', kind: 'scene', location: 'Дальний выход', artwork: caveArtwork,
    character: { pose: 'stand', mood: 'wonder' },
    title: 'Другая сторона горы',
    text: 'Дневной свет выводит на незнакомый склон. Отсюда можно спуститься к деревне или задержаться у старой наблюдательной площадки.',
    choices: [
      { id: 'exit-home', label: 'Вернуться в деревню', detail: 'Рассказать бабушке о дороге', target: 'homecoming-ending' },
      { id: 'exit-watch', label: 'Подняться на площадку', detail: 'Запомнить все входы в гору', target: 'watchtower-ending' },
      { id: 'exit-cave', label: 'Вернуться в пещеру', detail: 'Продолжить исследование', target: 'narrow-passage' },
    ],
  },
  'wind-rift': {
    id: 'wind-rift', kind: 'scene', location: 'Ветровая трещина', artwork: caveArtwork,
    character: { pose: 'walk', mood: 'alert' },
    title: 'Тропа над облаками',
    text: 'Трещина выводит на узкий горный гребень. Продолжить опасный подъём или вернуться к знакомому уступу?',
    choices: [
      { id: 'rift-climb', label: 'Подняться на гребень', detail: 'Закончить день над облаками', target: 'ridge-ending' },
      { id: 'rift-back', label: 'Вернуться в пещеру', detail: 'Спуститься к верхнему уступу', target: 'high-ledge' },
    ],
  },
  'blue-depths': {
    id: 'blue-depths', kind: 'scene', location: 'Голубая глубина', artwork: caveArtwork,
    character: { pose: 'receive', mood: 'wonder' },
    title: 'Подземное озеро',
    text: 'Спуск заканчивается у огромного тихого озера. Вдалеке светится каменный остров, но обратная дорога ещё открыта.',
    choices: [
      { id: 'depths-island', label: 'Остаться у озера', detail: 'Начать подготовку к переправе', target: 'lake-ending' },
      { id: 'depths-back', label: 'Подняться в грот', detail: 'Вернуться к знакомым проходам', target: 'hidden-grotto' },
    ],
  },
  'homecoming-ending': {
    id: 'homecoming-ending', kind: 'scene', location: 'Дорога домой', artwork: caveArtwork,
    character: { pose: 'stand', mood: 'happy' }, title: 'История для бабушки',
    text: 'Глос возвращается до темноты. Даже без находок у него есть важный рассказ о дороге сквозь гору.', choices: [], isEnding: true,
  },
  'watchtower-ending': {
    id: 'watchtower-ending', kind: 'scene', location: 'Старая площадка', artwork: caveArtwork,
    character: { pose: 'stand', mood: 'wonder' }, title: 'Карта новых дорог',
    text: 'С высоты Глос замечает ещё три входа и зарисовывает их. Следующая вылазка начнётся с настоящей карты.', choices: [], isEnding: true,
  },
  'ridge-ending': {
    id: 'ridge-ending', kind: 'scene', location: 'Горный гребень', artwork: caveArtwork,
    character: { pose: 'stand', mood: 'happy' }, title: 'Выше облаков',
    text: 'Глос достигает гребня на закате. Впереди видна соседняя долина и башня, которой нет ни на одной карте.', choices: [], isEnding: true,
  },
  'lake-ending': {
    id: 'lake-ending', kind: 'scene', location: 'Подземное озеро', artwork: caveArtwork,
    character: { pose: 'stop', mood: 'wonder' }, title: 'Остров под горой',
    text: 'Глос отмечает безопасное место для лагеря. Светящийся остров останется целью следующего путешествия.', choices: [], isEnding: true,
  },
  'village-message-ending': {
    id: 'village-message-ending', kind: 'scene', location: 'Обратная тропа', artwork: caveArtwork,
    character: { pose: 'walk', mood: 'happy' }, title: 'Важная новость',
    text: 'Глос спешит в деревню рассказать о путешественнике и старой дороге. В следующий раз он вернётся не один.', choices: [], isEnding: true,
  },
};
