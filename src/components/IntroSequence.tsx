import { useCallback, useEffect, useState } from 'react';
import type { IntroFrame } from '../game/types';
import { useTypewriter } from '../game/useTypewriter';
import '../styles/intro.css';

type IntroSequenceProps = {
  frames: IntroFrame[];
  onComplete: () => void;
};

export function IntroSequence({ frames, onComplete }: IntroSequenceProps) {
  const [frameIndex, setFrameIndex] = useState(0);
  const [isLeaving, setIsLeaving] = useState(false);
  const frame = frames[frameIndex];
  const typewriter = useTypewriter(frame.text);

  const next = useCallback(() => {
    if (!typewriter.isComplete) {
      typewriter.reveal();
      return;
    }
    if (frameIndex < frames.length - 1) {
      setFrameIndex((index) => index + 1);
      return;
    }
    setIsLeaving(true);
  }, [frameIndex, frames.length, typewriter]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space' || event.code === 'Enter') {
        event.preventDefault();
        next();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [next]);

  useEffect(() => {
    if (!typewriter.isComplete || isLeaving) return;
    const timer = window.setTimeout(next, frame.duration);
    return () => window.clearTimeout(timer);
  }, [frame.duration, isLeaving, next, typewriter.isComplete]);

  useEffect(() => {
    if (!isLeaving) return;
    const timer = window.setTimeout(onComplete, 900);
    return () => window.clearTimeout(timer);
  }, [isLeaving, onComplete]);

  return (
    <main className={`intro${isLeaving ? ' intro--leaving' : ''}`} onClick={next}>
      <div className="intro__story" aria-live="polite">
        <p className="intro__line">{typewriter.visibleText}<span className="intro__cursor" /></p>
        <span className="intro__progress">{String(frameIndex + 1).padStart(2, '0')} / {String(frames.length).padStart(2, '0')}</span>
      </div>
      <button
        className="intro__skip"
        type="button"
        onClick={(event) => { event.stopPropagation(); next(); }}
      >
        {typewriter.isComplete ? 'Дальше' : 'Показать текст'}
      </button>
      <span className="intro__hint">Space / Enter</span>
    </main>
  );
}
