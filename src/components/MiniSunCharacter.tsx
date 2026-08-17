import type { CSSProperties } from 'react';
import '../styles/mini-sun-character.css';

const motes = Array.from({ length: 18 }, (_, index) => index);

export function MiniSunCharacter() {
  return (
    <div className="mini-sun" aria-label="Живое Малое Солнце">
      <div className="mini-sun__halo mini-sun__halo--wide" />
      <div className="mini-sun__halo mini-sun__halo--inner" />
      <div className="mini-sun__core" />
      <div className="mini-sun__motes" aria-hidden="true">
        {motes.map((mote) => (
          <i
            key={mote}
            style={{
              '--angle': `${mote * 20}deg`,
              '--distance': `${34 + (mote % 4) * 8}%`,
              '--size': `${3 + (mote % 3) * 2}px`,
              '--duration': `${3.2 + (mote % 5) * .45}s`,
            } as CSSProperties}
          />
        ))}
      </div>
    </div>
  );
}
