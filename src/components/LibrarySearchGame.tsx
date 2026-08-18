import { useEffect, useState, type CSSProperties } from 'react';
import '../styles/library-search-game.css';

const targetsPerRoom = [1, 2, 4];
const greenSlots = [[7], [3, 14], [1, 9, 12, 18]];
const bookColors = ['#72513d', '#8a694b', '#3e5560', '#715c5d', '#9a7748', '#59604b'];

export function LibrarySearchGame({ onComplete }: { onComplete: () => void }) {
  const [room, setRoom] = useState(0);
  const [foundSlots, setFoundSlots] = useState<number[]>([]);
  const [totalFound, setTotalFound] = useState(0);
  const [isTurning, setIsTurning] = useState(false);
  const roomComplete = foundSlots.length === targetsPerRoom[room];

  useEffect(() => {
    if (!roomComplete) return;
    if (room === targetsPerRoom.length - 1) {
      const timer = window.setTimeout(onComplete, 1100);
      return () => window.clearTimeout(timer);
    }
    setIsTurning(true);
    const timer = window.setTimeout(() => {
      setRoom((value) => value + 1);
      setFoundSlots([]);
      setIsTurning(false);
    }, 850);
    return () => window.clearTimeout(timer);
  }, [onComplete, room, roomComplete]);

  const inspect = (slot: number, isGreen: boolean) => {
    if (!isGreen || foundSlots.includes(slot) || isTurning) return;
    setFoundSlots((slots) => [...slots, slot]);
    setTotalFound((value) => value + 1);
  };

  return (
    <main className={`library-game${isTurning ? ' library-game--turning' : ''}`}>
      <div className="library-game__dust" />
      <header><span>Старые стеллажи · секция {room + 1}/3</span><strong>Зелёные книги: {totalFound}/7</strong></header>
      <section className="library-game__view" key={room}>
        {[0, 1].map((shelf) => (
          <div className="bookcase" key={shelf}>
            <div className="bookcase__top" />
            {[0, 1, 2].map((row) => <div className="bookcase__shelf" key={row}>
              {Array.from({ length: 4 }, (_, column) => {
                const slot = shelf * 12 + row * 4 + column;
                const isGreen = greenSlots[room].includes(slot);
                const found = foundSlots.includes(slot);
                return <button key={slot} type="button" aria-label="Осмотреть книгу" onClick={() => inspect(slot, isGreen)}
                  className={`${isGreen ? 'is-green' : ''}${found ? ' is-found' : ''}`}
                  style={{ '--book-color': isGreen ? '#435d47' : bookColors[(slot + room) % bookColors.length] } as CSSProperties} />;
              })}
            </div>)}
          </div>
        ))}
      </section>
      <div className="library-game__hands"><i /><i /></div>
      <footer>
        <p>{roomComplete ? (room === 2 ? 'Все семь книг найдены!' : 'Здесь всё. Переходим к следующим стеллажам…') : `В этой секции спрятано книг: ${targetsPerRoom[room]}`}</p>
        <small>Ищи спокойный тёмно-зелёный корешок и нажимай на него</small>
      </footer>
    </main>
  );
}
