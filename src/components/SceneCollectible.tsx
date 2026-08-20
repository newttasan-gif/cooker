import type { StoryChoice } from '../game/types';

const positions: Record<string, { left: string; top: string; tone: 'crystal' | 'brass' }> = {
  stream: { left: '25%', top: '73%', tone: 'crystal' },
  pines: { left: '37%', top: '72%', tone: 'crystal' },
  stones: { left: '61%', top: '69%', tone: 'crystal' },
  'old-library-note': { left: '67%', top: '58%', tone: 'brass' },
  'camp-key-booth': { left: '63%', top: '67%', tone: 'brass' },
};

export const hasSceneCollectible = (nodeId: string) => Boolean(positions[nodeId]);

type SceneCollectibleProps = { nodeId: string; choice?: StoryChoice; onCollect: (choice: StoryChoice) => void };

export function SceneCollectible({ nodeId, choice, onCollect }: SceneCollectibleProps) {
  const position = positions[nodeId];
  if (!position || !choice) return null;
  return <button type="button" className={`scene-collectible scene-collectible--${position.tone}`}
    style={{ left: position.left, top: position.top }} onClick={() => onCollect(choice)}
    aria-label={choice.label} title="Осмотреть"><i /><span>осмотреть</span></button>;
}
