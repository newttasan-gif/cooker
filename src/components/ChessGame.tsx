import { useEffect, useRef, useState } from 'react';
import { Chess, type Square } from 'chess.js';
import { chooseGrandmaMove } from '../game/chessBot';
import { ChessBoard } from './ChessBoard';
import '../styles/chess-game.css';

function getResult(game: Chess) {
  if (game.isCheckmate()) return game.turn() === 'b' ? 'Мат! Глос победил.' : 'Мат. В этот раз победила бабушка.';
  if (game.isStalemate()) return 'Пат. Получилась ничья.';
  if (game.isDraw()) return 'Ничья. Хорошая спокойная партия.';
  return undefined;
}

export function ChessGame({ onLeave }: { onLeave: () => void }) {
  const gameRef = useRef(new Chess());
  const botTimer = useRef<number>();
  const [position, setPosition] = useState(gameRef.current.fen());
  const [selected, setSelected] = useState<Square>();
  const [targets, setTargets] = useState<Square[]>([]);
  const [isBotThinking, setIsBotThinking] = useState(false);
  const [result, setResult] = useState<string>();

  useEffect(() => () => window.clearTimeout(botTimer.current), []);

  const finishTurn = () => {
    const game = gameRef.current;
    const gameResult = getResult(game);
    setPosition(game.fen());
    if (gameResult) {
      setResult(gameResult);
      return;
    }
    setIsBotThinking(true);
    botTimer.current = window.setTimeout(() => {
      const move = chooseGrandmaMove(game);
      if (move) game.move({ from: move.from, to: move.to, promotion: move.promotion });
      setPosition(game.fen());
      setResult(getResult(game));
      setIsBotThinking(false);
    }, 650);
  };

  const selectSquare = (square: Square) => {
    const game = gameRef.current;
    if (result || isBotThinking || game.turn() !== 'w') return;
    const piece = game.get(square);
    if (selected && targets.includes(square)) {
      game.move({ from: selected, to: square, promotion: 'q' });
      setSelected(undefined);
      setTargets([]);
      finishTurn();
      return;
    }
    if (piece?.color === 'w') {
      setSelected(square);
      setTargets(game.moves({ square, verbose: true }).map((move) => move.to));
    } else {
      setSelected(undefined);
      setTargets([]);
    }
  };

  const restart = () => {
    window.clearTimeout(botTimer.current);
    gameRef.current = new Chess();
    setPosition(gameRef.current.fen());
    setSelected(undefined);
    setTargets([]);
    setIsBotThinking(false);
    setResult(undefined);
  };

  const status = result ?? (isBotThinking ? 'Бабушка думает над ходом…' : gameRef.current.isCheck() ? 'Глосу объявлен шах.' : 'Ваш ход. Глос играет белыми.');

  return (
    <main className="chess-game" data-position={position}>
      <header><p>Дом бабушки · мини-игра</p><h1>Шахматная партия</h1></header>
      <div className="chess-game__table">
        <section className="chess-game__board-wrap"><div className="chess-game__opponent">Бабушка <span>чёрные</span></div>
          <ChessBoard game={gameRef.current} selected={selected} targets={targets} disabled={Boolean(result) || isBotThinking} onSquareClick={selectSquare} />
          <div className="chess-game__player">Глос <span>белые</span></div>
        </section>
        <aside className="chess-game__panel"><p className="story-card__view">Состояние партии</p><h2>{status}</h2>
          <p>Выберите фигуру, затем подсвеченную клетку. Пешка на последней линии станет ферзём.</p>
          <div className="chess-game__moves">{gameRef.current.history().length ? gameRef.current.history().map((move, index) => <span key={`${move}-${index}`}>{index + 1}. {move}</span>) : <span>Пока ходов нет</span>}</div>
          {result && <button type="button" onClick={restart}>Сыграть ещё раз</button>}
          <button type="button" className="chess-game__leave" onClick={onLeave}>{result ? 'Вернуться к бабушке' : 'Закончить партию'}</button>
        </aside>
      </div>
    </main>
  );
}
