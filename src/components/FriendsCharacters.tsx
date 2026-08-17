import '../styles/friends-characters.css';

export function FriendsCharacters() {
  return (
    <div className="friends" aria-label="Друзья Глоса: Лео и Тим">
      <svg viewBox="0 0 420 470" role="img" aria-hidden="true">
        <ellipse cx="215" cy="449" rx="170" ry="13" fill="#172b2b" opacity=".3" />
        <g aria-label="Лео">
          <path fill="#555f68" d="m55 306 52 0-7 125H52Z" /><path fill="#424d56" d="m103 306 49 0 14 125h-59Z" />
          <path fill="#263944" d="M45 425h61l3 20H38Zm61 0h65l7 20h-72Z" />
          <path fill="#ede1c9" d="M43 185q58-25 116 0l-8 130H51Z" />
          <path fill="#a95f4e" d="M45 204h112l-2 22H47Zm3 45h106l-1 22H49Zm2 45h103l-2 21H51Z" />
          <g className="friend-arm friend-arm--leo-left"><path fill="#ede1c9" d="m48 190-18 9 2 103 28-2 12-93Z" /><circle cx="45" cy="306" r="13" fill="#d4a07f" /></g>
          <g className="friend-arm friend-arm--leo-right"><path fill="#ede1c9" d="m151 190 20 11-1 101-29-2-11-94Z" /><circle cx="156" cy="307" r="13" fill="#d4a07f" /></g>
          <circle cx="108" cy="115" r="55" fill="#d4a07f" />
          <path fill="#4a362c" d="M53 110Q49 48 108 44q61 3 60 66l-13 27-16 10 4-48-14-22-13 20-18-24-17 23-17-14 8 55-15-11Z" />
          <path fill="#5b4032" d="m56 79 18-30 12 16 18-32 14 25 22-27 9 29 20 14-8 34-18-27-14 22-15-28-17 24-15-22-20 30Z" />
          <path fill="#6b4a38" d="m70 60 17-25 10 14 16-31 13 24 24-22 2 25-23 28-15-19-18 24-13-19Z" />
          <path d="M89 116v7m39-7v7" fill="none" stroke="#29353b" strokeWidth="4" strokeLinecap="round" />
          <path d="M99 143q3 3 7 3h7q4 0 7-3" fill="none" stroke="#8b5346" strokeWidth="4" strokeLinecap="round" />
          <path d="m132 128 17 4" stroke="#e8d1b1" strokeWidth="8" strokeLinecap="round" /><path d="m136 126 8 8" stroke="#b98e73" strokeWidth="2" />
        </g>
        <g aria-label="Тим">
          <path fill="#59636b" d="m259 303 51 0-7 130h-52Z" /><path fill="#4b555d" d="m306 303 50 0 14 130h-62Z" />
          <path fill="#253640" d="M246 426h62l3 19h-71Zm62 0h68l6 19h-74Z" />
          <path fill="#8a6f59" d="M237 177q63-30 130 0l14 142H228Z" />
          <path fill="#a98c6e" d="m237 177 55-25 17 167h-81Z" /><path fill="#725947" d="m309 154 58 23 14 142h-72Z" />
          <g className="friend-arm friend-arm--tim-left"><path fill="#a98c6e" d="m244 183-25 15-12 103 32 5 29-105Z" /><circle cx="222" cy="307" r="14" fill="#d6a17f" /></g>
          <g className="friend-arm friend-arm--tim-right"><path fill="#725947" d="m360 182 24 14 18 102-31 8-34-105Z" /><circle cx="387" cy="304" r="14" fill="#d6a17f" /></g>
          <circle cx="307" cy="106" r="61" fill="#d6a17f" />
          <path fill="#39444b" d="M244 110q-3-78 63-83 67 4 65 82l-14 33-18 10 4-56-13-27-13 22-17-30-17 26-19-21-7 63Z" />
          <path fill="#465159" d="m247 71 18-34 16 16 17-39 16 27 24-31 10 33 24 16-10 39-21-31-16 25-18-33-19 29-18-25-21 36Z" />
          <path fill="#566169" d="m265 44 19-27 11 18 20-31 12 27 26-20-4 27-23 28-17-24-18 29-14-23Z" />
          <path d="M285 108v8m45-8v8" fill="none" stroke="#29353b" strokeWidth="4" strokeLinecap="round" />
          <path d="M297 137q3 3 7 3h8q4 0 7-3" fill="none" stroke="#8b5346" strokeWidth="4" strokeLinecap="round" />
          <path d="m295 158 14 21 15-22" fill="#e9e0d2" />
        </g>
      </svg>
    </div>
  );
}
