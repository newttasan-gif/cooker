import { useState } from 'react';
import '../styles/adventure-games.css';

const symbols = ['△', '○', '◇'];
const answer = [2, 0, 1];

export function SymbolPuzzle({ onComplete }: { onComplete: () => void }) {
  const [rings, setRings] = useState([0, 0, 0]);
  const turn = (index: number) => setRings((values) => values.map((value, ring) => ring === index ? (value + 1) % 3 : value));
  const solved = rings.every((value, index) => value === answer[index]);
  return <main className="adventure-game adventure-game--symbols">
    <header><span>Круглый зал</span><strong>Каменный указатель</strong></header>
    <section className="symbol-wall"><div className="symbol-clue">◇ · △ · ○</div><div className="symbol-rings">
      {rings.map((value, index) => <button key={index} type="button" onClick={() => turn(index)}>{symbols[value]}</button>)}
    </div></section>
    <footer><p>Поверни три диска по вырезанному над ними знаку.</p><button type="button" disabled={!solved} onClick={onComplete}>Нажать на центр</button></footer>
  </main>;
}
