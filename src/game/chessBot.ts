import { Chess, type Move } from 'chess.js';

const pieceValue = { p: 100, n: 320, b: 330, r: 500, q: 900, k: 0 };

function evaluate(game: Chess) {
  if (game.isCheckmate()) return game.turn() === 'w' ? 100_000 : -100_000;
  let score = 0;
  for (const row of game.board()) {
    for (const piece of row) {
      if (piece) score += pieceValue[piece.type] * (piece.color === 'b' ? 1 : -1);
    }
  }
  return score;
}

function scoreMove(move: Move) {
  const game = new Chess(move.after);
  if (game.isCheckmate()) return 100_000;
  const answers = game.moves({ verbose: true });
  if (answers.length === 0) return evaluate(game);
  return Math.min(...answers.map((answer) => evaluate(new Chess(answer.after))));
}

export function chooseGrandmaMove(game: Chess) {
  const moves = game.moves({ verbose: true });
  if (moves.length === 0) return undefined;
  const scored = moves.map((move) => ({ move, score: scoreMove(move) + Math.random() * 16 }));
  scored.sort((first, second) => second.score - first.score);
  return scored[0].move;
}
