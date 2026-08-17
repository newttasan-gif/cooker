import type { StoryNode } from './types';

const crystalIds = new Set(['quartz', 'fluorite', 'crystal']);

export function adaptStoryNode(node: StoryNode, itemIds: string[]): StoryNode {
  const crystalCount = itemIds.filter((id) => crystalIds.has(id)).length;
  if (crystalCount > 0) return node;

  if (node.id === 'village-square') {
    return {
      ...node,
      choices: node.choices.map((choice) => choice.id === 'square-pawnshop' ? {
        ...choice, label: 'Зайти к оценщику', detail: 'Спросить совета для следующей вылазки',
      } : choice),
    };
  }

  if (node.id === 'grandma-home') {
    return {
      ...node,
      text: '«Вот ты где, Глос. Я уже поставила чайник. Неважно, удалось ли что-нибудь найти — главное, что ты вернулся целым».',
      choices: node.choices.filter((choice) => choice.id !== 'grandma-findings').map((choice) => (
        choice.id === 'grandma-pawnshop'
          ? { ...choice, label: '«Зайду к оценщику за советом»', detail: 'Спросить о будущих поисках' }
          : choice
      )),
    };
  }

  if (node.id === 'grandma-talk') {
    return {
      ...node,
      text: '«Мне важнее, что ты вернулся целым. Не каждая вылазка заканчивается находкой. Отдохни, позови друзей на чай, а к горе вернёшься в другой день».',
      choices: node.choices.filter((choice) => choice.id !== 'grandma-to-pawnshop'),
    };
  }

  if (node.id === 'pawnshop') {
    return {
      ...node,
      title: 'Совет оценщика',
      text: 'Рен видит пустую сумку и не удивляется. «Так бывает. В следующий раз не спеши: осматривай трещины через очки и не рискуй ради одного камня».',
      choices: [{
        id: 'pawnshop-empty-back', label: 'Поблагодарить за совет',
        detail: 'Вернуться на площадь', target: 'village-square',
      }],
    };
  }

  if (node.id === 'tea-at-grandmas') {
    return {
      ...node,
      text: 'За чаем Глос рассказывает не о находках, а о тропах, которые успел увидеть. Друзья слушают и вместе планируют следующую вылазку.',
      choices: node.choices.filter((choice) => choice.id !== 'tea-story'),
    };
  }

  return node;
}
