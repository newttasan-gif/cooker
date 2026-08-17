import type { GameItem } from '../game/types';

type InventoryBarProps = { items: GameItem[]; visitedCount: number };

export function InventoryBar({ items, visitedCount }: InventoryBarProps) {
  return (
    <aside className="inventory">
      <div><span>Открыто мест</span><strong>{visitedCount}</strong></div>
      <div title={items.map((item) => item.description).join('\n')}>
        <span>С собой</span>
        <strong>{items.length ? items.map((item) => item.name).join(' · ') : 'ничего'}</strong>
      </div>
    </aside>
  );
}
