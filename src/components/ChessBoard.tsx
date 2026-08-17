import type { Chess, Square } from 'chess.js';

const pieces = {
  wp: '♙', wn: '♘', wb: '♗', wr: '♖', wq: '♕', wk: '♔',
  bp: '♟', bn: '♞', bb: '♝', br: '♜', bq: '♛', bk: '♚',
};

type ChessBoardProps = {
  game: Chess;
  selected?: Square;
  targets: Square[];
  disabled: boolean;
  onSquareClick: (square: Square) => void;
};

export function ChessBoard({ game, selected, targets, disabled, onSquareClick }: ChessBoardProps) {
  return (
    <div className="chess-board" role="grid" aria-label="Шахматная доска">
      {game.board().flat().map((piece, index) => {
        const file = String.fromCharCode(97 + (index % 8));
        const rank = 8 - Math.floor(index / 8);
        const square = `${file}${rank}` as Square;
        const isTarget = targets.includes(square);
        return (
          <button key={square} className={`chess-square${selected === square ? ' chess-square--selected' : ''}${isTarget ? ' chess-square--target' : ''}`}
            type="button" role="gridcell" disabled={disabled} onClick={() => onSquareClick(square)}
            aria-label={`${square}${piece ? `, фигура ${piece.type}` : ''}`}>
            {piece && <span>{pieces[`${piece.color}${piece.type}`]}</span>}
            {file === 'a' && <small className="chess-square__rank">{rank}</small>}
            {rank === 1 && <small className="chess-square__file">{file}</small>}
          </button>
        );
      })}
    </div>
  );
}
