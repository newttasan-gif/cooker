import { useState } from 'react';
import { GameScene } from '../components/GameScene';
import { GameStartScreen } from '../components/GameStartScreen';
import { IntroSequence } from '../components/IntroSequence';
import { FishingGame } from '../components/FishingGame';
import { ChessGame } from '../components/ChessGame';
import { chapterOne } from '../game/chapterOne';
import { useStoryGame } from '../game/useStoryGame';
import { createSave, deleteSave, getSaveTitle, loadSaves, type GameSave } from '../game/saves';
import type { OracleMessage } from '../game/oracleChats';

export function GamePage() {
  const [hasStarted, setHasStarted] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [outroComplete, setOutroComplete] = useState(false);
  const [saves, setSaves] = useState(loadSaves);
  const [saveMessage, setSaveMessage] = useState('');
  const [oracleMessages, setOracleMessages] = useState<OracleMessage[]>([]);
  const [activeOracleChatId, setActiveOracleChatId] = useState<string>();
  const game = useStoryGame();

  const restart = () => {
    game.restart();
    setHasStarted(false);
    setShowIntro(true);
    setOutroComplete(false);
    setOracleMessages([]);
    setActiveOracleChatId(undefined);
  };

  const loadGame = (save: GameSave) => {
    game.restore(save.progress);
    setHasStarted(true);
    setShowIntro(false);
    setOutroComplete(false);
  };

  const saveGame = () => {
    setSaves(createSave(getSaveTitle(game.node.id, game.node.location), game.progress));
    setSaveMessage('Сохранено');
    window.setTimeout(() => setSaveMessage(''), 1400);
  };

  if (!hasStarted) {
    return <GameStartScreen onStart={() => setHasStarted(true)} saves={saves} onLoad={loadGame} onDeleteSave={(id) => setSaves(deleteSave(id))} />;
  }

  if (showIntro) {
    return <IntroSequence frames={chapterOne.intro} onComplete={() => setShowIntro(false)} />;
  }

  if (game.node.specialTarget === 'fishing') {
    return <FishingGame onComplete={() => game.completeActivity('fishing', 'festival-grandma')} />;
  }

  if (game.node.specialTarget === 'chess') {
    return <ChessGame onLeave={() => game.goTo(game.node.specialReturnTarget ?? 'grandma-talk')} />;
  }

  if (game.node.endingFrames && !outroComplete) {
    const completeCutscene = () => {
      if (game.node.endingTarget) game.goTo(game.node.endingTarget);
      else setOutroComplete(true);
    };
    return <IntroSequence frames={game.node.endingFrames} onComplete={completeCutscene} />;
  }

  return (
    <GameScene
      node={game.node}
      items={game.items}
      visitedCount={game.visitedCount}
      isMoving={game.isMoving}
      canChoose={game.canChoose}
      onChoose={game.choose}
      onRestart={restart}
      onSave={saveGame}
      saveMessage={saveMessage}
      oracleMessages={oracleMessages}
      activeOracleChatId={activeOracleChatId}
      onOracleMessagesChange={setOracleMessages}
      onActiveOracleChatChange={setActiveOracleChatId}
    />
  );
}
