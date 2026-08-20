import type { CSSProperties } from 'react';
import type { GameItem, StoryChoice, StoryNode } from '../game/types';
import type { OracleMessage } from '../game/oracleChats';
import { ChoicePanel } from './ChoicePanel';
import { GlosCharacter } from './GlosCharacter';
import { FriendsCharacters } from './FriendsCharacters';
import { GrandmaCharacter } from './GrandmaCharacter';
import { InventoryBar } from './InventoryBar';
import { LibrarianCharacter } from './LibrarianCharacter';
import { MiniSunCharacter } from './MiniSunCharacter';
import { OraclePanel } from './OraclePanel';
import { TravelerCharacter } from './TravelerCharacter';
import { hasSceneCollectible, SceneCollectible } from './SceneCollectible';
import '../styles/game-scene.css';

type GameSceneProps = {
  node: StoryNode;
  items: GameItem[];
  visitedCount: number;
  canChoose: (choice: StoryChoice) => boolean;
  isMoving: boolean;
  onChoose: (choice: StoryChoice) => void;
  onRestart: () => void;
  onSave: () => void;
  saveMessage: string;
  oracleMessages: OracleMessage[];
  activeOracleChatId?: string;
  onOracleMessagesChange: (messages: OracleMessage[]) => void;
  onActiveOracleChatChange: (chatId?: string) => void;
};

export function GameScene(props: GameSceneProps) {
  const { node, items, visitedCount, canChoose, isMoving, onChoose, onRestart, onSave, saveMessage } = props;
  const collectibleChoice = hasSceneCollectible(node.id)
    ? node.choices.find((choice) => choice.grantsItem && canChoose(choice))
    : undefined;
  const visibleChoices = collectibleChoice
    ? node.choices.filter((choice) => choice.id !== collectibleChoice.id)
    : node.choices;

  return (
    <main
      className={`game-scene${node.encounter ? ' game-scene--encounter' : ''}${node.festival ? ' game-scene--festival' : ''}`}
      style={{ '--scene-art': `url(${node.artwork})` } as CSSProperties}
    >
      <div className="game-scene__art" />
      <div className="game-scene__shade" />
      <SceneCollectible nodeId={node.id} choice={collectibleChoice} onCollect={onChoose} />
      <GlosCharacter pose={isMoving ? 'walk' : node.character.pose} mood={node.character.mood} />
      {node.encounter === 'traveler' && <TravelerCharacter />}
      {(node.encounter === 'friends' || node.encounter === 'tea') && <FriendsCharacters />}
      {(node.encounter === 'grandma' || node.encounter === 'tea') && <GrandmaCharacter />}
      {node.encounter === 'librarian' && <LibrarianCharacter />}
      {node.encounter === 'oracle' && <MiniSunCharacter />}
      <header className="game-header">
        <span className="game-mark">ГЛ</span>
        <p>{node.chapter ?? 'Глава I'} <i /> {node.location}</p>
        <div className="game-header__actions">
          {node.choices.length > 0 && <button type="button" onClick={onSave}>{saveMessage || 'Сохраниться'}</button>}
          <button type="button" onClick={onRestart}>С начала</button>
        </div>
      </header>

      {node.specialTarget === 'oracle' ? (
        <OraclePanel items={items} introduction={node.text} messages={props.oracleMessages}
          activeChatId={props.activeOracleChatId} onMessagesChange={props.onOracleMessagesChange}
          onActiveChatChange={props.onActiveOracleChatChange} onLeave={() => onChoose(node.choices[0])} />
      ) : (
        <section className="story-card" key={node.id}>
          <p className="story-card__view">{node.kind === 'dialogue' ? node.speaker : 'Исследование'}</p>
          <h1>{node.title}</h1>
          <p className="story-card__text">{node.text}</p>
          {!node.isEnding && <ChoicePanel choices={visibleChoices} canChoose={canChoose} onChoose={onChoose} />}
        </section>
      )}

      {!node.isEnding && <InventoryBar items={items} visitedCount={visitedCount} />}
      {node.isEnding && (
        <section className="chapter-end">
          <p className="eyebrow">история завершена</p>
          <h2>{node.title}</h2>
          <p>{node.text}</p>
          <button type="button" onClick={onRestart}>Пройти другим путём</button>
        </section>
      )}
    </main>
  );
}
