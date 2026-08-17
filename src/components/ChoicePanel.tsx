import type { StoryChoice } from '../game/types';

type ChoicePanelProps = {
  choices: StoryChoice[];
  canChoose: (choice: StoryChoice) => boolean;
  onChoose: (choice: StoryChoice) => void;
};

export function ChoicePanel({ choices, canChoose, onChoose }: ChoicePanelProps) {
  return (
    <div className="choice-panel" aria-label="Доступные действия">
      {choices.map((choice, index) => {
        const available = canChoose(choice);
        return (
          <button key={choice.id} className="choice" type="button" disabled={!available} onClick={() => onChoose(choice)}>
            <span className="choice__number">0{index + 1}</span>
            <span><strong>{choice.label}</strong><small>{available ? choice.detail : choice.lockedDetail ?? 'Нужен подходящий предмет'}</small></span>
            <span className="choice__arrow" aria-hidden="true">{available ? '↗' : '—'}</span>
          </button>
        );
      })}
    </div>
  );
}
