import type { CharacterMood, CharacterPose } from '../game/types';
import '../styles/glos-character.css';

type GlosCharacterProps = {
  pose: CharacterPose;
  mood: CharacterMood;
  hasHandCrystal?: boolean;
};

function GlosFace({ mood }: { mood: CharacterMood }) {
  return (
    <g className={`glos-face glos-face--${mood}`}>
      <path className="glos-mouth" d="M109 114h22" fill="none" stroke="#8b5346" strokeWidth="4" strokeLinecap="round" />
    </g>
  );
}

export function GlosCharacter({ pose, mood, hasHandCrystal = false }: GlosCharacterProps) {
  return (
    <div className={`glos glos--${pose}${hasHandCrystal ? ' glos--hand-crystal' : ''}`} aria-label={`Глос: ${mood}`}>
      <svg viewBox="0 0 240 460" role="img" aria-hidden="true">
        <ellipse className="glos-shadow" cx="121" cy="440" rx="77" ry="12" fill="#172b2b" opacity=".32" />
        <g className="glos-legs">
          <path className="glos-leg glos-leg--left" fill="#697178" d="m78 302 49 0-10 126-48 0Z" />
          <path className="glos-leg glos-leg--right" fill="#59636b" d="m121 302 48 0 14 126-49 0Z" />
          <path fill="#253640" d="m65 421 54 0 3 21-66 0Z" /><path fill="#253640" d="m133 421 53 0 7 21-63 0Z" />
        </g>
        <g className="glos-body">
          <path fill="#f1eee4" d="m96 176 49 0 19 102-83 0Z" />
          <path fill="#203e59" d="m72 171 35-17 13 146-58 17-12-117Z" />
          <path fill="#294b68" d="m133 154 38 20 22 117-68 11-5-148Z" />
          <path fill="#162f47" d="m120 154 13 0-3 148-10 0Z" />
          <g className="glos-arm glos-arm--left"><path fill="#203e59" d="m57 184 28 5-13 116-34-8Z" /><circle cx="53" cy="305" r="15" fill="#d4a07f" /></g>
          <g className="glos-arm glos-arm--right"><path fill="#294b68" d="m161 181 30 1 16 108-34 7Z" /><circle cx="192" cy="297" r="15" fill="#d4a07f" /><path className="glos-hand-crystal" fill="#78d8f2" d="m184 286 9-17 14 10 1 17-13 11-14-9Z" /></g>
          <path fill="none" stroke="#6b4932" strokeWidth="11" d="M83 164q84 62 98 128" />
          <path fill="#795137" d="m155 267 57 9-8 70-61-9Z" /><path fill="#976b48" d="m155 267 57 9-34 28Z" />
          <path className="glos-crystal" fill="#80c6c4" d="m119 274 13-17 18 5 6 20-14 16-19-5Z" />
        </g>
        <g className="glos-head">
          <path fill="#35404a" d="M52 101Q48 25 119 18q73 4 70 83l-10 33-22 10-37-8-37 8-22-10Z" />
          <circle cx="120" cy="95" r="53" fill="#d6a17f" />
          <path fill="#35404a" d="M58 61 86 43l-5 85-20 17-12-47Zm124 0-28-18 5 85 20 17 12-47Z" />
          <path fill="#35404a" d="M55 94Q51 24 119 19q69 3 72 72l-32-42-13 21-23-29-21 29-27-19Z" />
          <path fill="#35404a" d="M59 58q28-33 61-32 34 0 62 32l-10 58-19-22-12 23-21-28-21 28-12-23-19 22Z" />
          <path fill="#263c52" d="M68 75 94 66l28 11-9 31-37-1Z" opacity=".24" />
          <g fill="#fff" stroke="#172f43" strokeWidth="7" strokeLinejoin="round">
            <path d="M69 77q24-9 45 2l-5 27q-23 8-37-5Z" /><path d="M126 79q21-11 45-2l-3 24q-15 13-38 5Z" />
          </g>
          <path d="M113 84q7-5 14 0" fill="none" stroke="#172f43" strokeWidth="7" strokeLinecap="round" />
          <GlosFace mood={mood} />
          <path fill="#35404a" d="m63 58 33-43 17 31 20-35 23 39 31-22 4 55-35-34-12 20-24-27-21 27Z" />
        </g>
      </svg>
    </div>
  );
}
