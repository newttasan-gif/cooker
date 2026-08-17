import { useEffect, useState } from 'react';

const punctuationPause: Record<string, number> = {
  '.': 180,
  ',': 90,
  '…': 220,
};

export function useTypewriter(text: string, speed = 34) {
  const [visibleLength, setVisibleLength] = useState(0);

  useEffect(() => {
    setVisibleLength(0);
  }, [text]);

  useEffect(() => {
    if (visibleLength >= text.length) return;
    const previousCharacter = text[visibleLength - 1] ?? '';
    const delay = speed + (punctuationPause[previousCharacter] ?? 0);
    const timer = window.setTimeout(() => setVisibleLength((length) => length + 1), delay);
    return () => window.clearTimeout(timer);
  }, [speed, text, visibleLength]);

  return {
    visibleText: text.slice(0, visibleLength),
    isComplete: visibleLength >= text.length,
    reveal: () => setVisibleLength(text.length),
  };
}
