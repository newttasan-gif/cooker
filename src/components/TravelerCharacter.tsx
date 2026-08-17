import '../styles/traveler-character.css';

export function TravelerCharacter() {
  return (
    <div className="traveler" aria-label="Путешественник в мантии">
      <svg viewBox="0 0 250 470" role="img" aria-hidden="true">
        <ellipse cx="126" cy="448" rx="82" ry="12" fill="#172b2b" opacity=".34" />
        <path d="M72 159q49-35 101 0l29 270H43Z" fill="#8f7153" />
        <path d="M73 159q19 28 49 33v237H43Z" fill="#a88a68" />
        <path d="M122 192q33-4 51-33l29 270h-80Z" fill="#745943" />
        <path d="M72 159 49 214l28 16 25-52Zm101 0 28 64-29 12-25-57Z" fill="#967655" />
        <path d="M77 157q5-88 48-101 45 13 49 101l-27 30h-45Z" fill="#b39a78" />
        <path d="M89 143q7-57 36-67 31 12 37 67l-22 25h-31Z" fill="#302b27" />
        <path d="M77 157q18-22 33-28l15 24 16-24q17 7 33 28l-27 30h-45Z" fill="#9d8060" />
        <path d="M189 192 213 421" fill="none" stroke="#4f3827" strokeWidth="9" strokeLinecap="round" />
        <path d="M176 227q14-10 27 2l3 23q-18 11-34-1Z" fill="#d3a57d" />
        <path d="M187 182h19l8 15-8 18h-19l-8-18Z" fill="#ddbd72" stroke="#5a422e" strokeWidth="5" />
        <circle className="traveler__lamp" cx="197" cy="198" r="11" fill="#ffe5a0" />
        <path d="M64 429h143l10 18H51Z" fill="#5d4637" />
      </svg>
    </div>
  );
}
