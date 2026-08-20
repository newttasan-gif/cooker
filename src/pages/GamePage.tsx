import { useEffect, useState } from 'react';
import { GameScene } from '../components/GameScene';
import { GameStartScreen } from '../components/GameStartScreen';
import { IntroSequence } from '../components/IntroSequence';
import { FishingGame } from '../components/FishingGame';
import { ChessGame } from '../components/ChessGame';
import { HealthyFoodGame } from '../components/HealthyFoodGame';
import { LibrarySearchGame } from '../components/LibrarySearchGame';
import { PackingGame } from '../components/PackingGame';
import { SequenceChallenge } from '../components/SequenceChallenge';
import { SymbolPuzzle } from '../components/SymbolPuzzle';
import { TimingChallenge } from '../components/TimingChallenge';
import { chapterOne } from '../game/chapterOne';
import { useStoryGame } from '../game/useStoryGame';
import { createSave, deleteSave, getSaveTitle, loadSaves, type GameSave } from '../game/saves';
import type { OracleMessage } from '../game/oracleChats';
import { unlockAchievement } from '../game/achievements';

export function GamePage() {
  const [hasStarted, setHasStarted] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [outroComplete, setOutroComplete] = useState(false);
  const [saves, setSaves] = useState(loadSaves);
  const [saveMessage, setSaveMessage] = useState('');
  const [oracleMessages, setOracleMessages] = useState<OracleMessage[]>([]);
  const [activeOracleChatId, setActiveOracleChatId] = useState<string>();
  const game = useStoryGame();

  useEffect(() => {
    if (game.visitedCount >= 20) unlockAchievement('explorer');
  }, [game.visitedCount]);

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
    const startGame = () => {
      unlockAchievement('first-step');
      setHasStarted(true);
    };
    return <GameStartScreen onStart={startGame} saves={saves} onLoad={loadGame} onDeleteSave={(id) => setSaves(deleteSave(id))} />;
  }

  if (showIntro) {
    return <IntroSequence frames={chapterOne.intro} onComplete={() => setShowIntro(false)} />;
  }

  if (game.node.specialTarget === 'fishing') {
    return <FishingGame onComplete={() => { unlockAchievement('angler'); game.completeActivity('fishing', 'festival-grandma'); }} />;
  }

  if (game.node.specialTarget === 'healthy-food') {
    return <HealthyFoodGame onComplete={() => { unlockAchievement('healthy-choice'); game.completeActivity('healthyFood', 'festival-feast-toast'); }} />;
  }

  if (game.node.specialTarget === 'library-search') {
    return <LibrarySearchGame onComplete={() => { unlockAchievement('book-hunter'); game.completeActivity('library', 'festival-library-goodbye'); }} />;
  }

  if (game.node.specialTarget === 'chess') {
    return <ChessGame onLeave={() => game.goTo(game.node.specialReturnTarget ?? 'grandma-talk')} />;
  }

  const finishAdventure = () => game.goTo(game.node.specialReturnTarget ?? 'foothill');
  if (game.node.specialTarget === 'packing') return <PackingGame onComplete={finishAdventure} />;
  if (game.node.specialTarget === 'climb' || game.node.specialTarget === 'balance') {
    return <TimingChallenge mode={game.node.specialTarget} onComplete={finishAdventure} />;
  }
  if (game.node.specialTarget === 'echo') return <SequenceChallenge mode="echo" onComplete={finishAdventure} />;
  if (game.node.specialTarget === 'stepping-stones') return <SequenceChallenge mode="stones" onComplete={finishAdventure} />;
  if (game.node.specialTarget === 'symbols') return <SymbolPuzzle onComplete={finishAdventure} />;

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
