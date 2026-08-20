export type GameItem = {
  id: string;
  name: string;
  description: string;
};

export type CharacterPose = 'stand' | 'walk' | 'stop' | 'interact' | 'receive' | 'dialogue';
export type CharacterMood = 'neutral' | 'focused' | 'alert' | 'wonder' | 'happy';

export type CharacterState = {
  pose: CharacterPose;
  mood: CharacterMood;
};

export type FestivalActivity = 'fishing' | 'friends' | 'library' | 'healthyFood';

export type StoryChoice = {
  id: string;
  label: string;
  detail: string;
  target: string;
  targetIfVisited?: { nodeId: string; target: string };
  grantsItem?: string;
  requiresItem?: string;
  requiresItems?: string[];
  hideIfItem?: string;
  showIfItem?: string;
  requiresCollectedItems?: number;
  lockedDetail?: string;
  hideAfterTargetVisited?: boolean;
  activity?: FestivalActivity;
  completesActivity?: FestivalActivity;
  requiresCompletedActivities?: FestivalActivity[];
};

export type StoryNode = {
  id: string;
  kind: 'scene' | 'dialogue';
  location: string;
  artwork: string;
  character: CharacterState;
  title: string;
  text: string;
  speaker?: string;
  encounter?: 'traveler' | 'friends' | 'grandma' | 'tea' | 'librarian' | 'oracle';
  chapter?: string;
  festival?: boolean;
  choices: StoryChoice[];
  isEnding?: boolean;
  endingFrames?: IntroFrame[];
  endingTarget?: string;
  specialTarget?: 'fishing' | 'oracle' | 'chess' | 'healthy-food' | 'library-search'
    | 'packing' | 'climb' | 'stepping-stones' | 'echo' | 'balance' | 'symbols';
  specialReturnTarget?: string;
};

export type IntroFrame = {
  text: string;
  duration: number;
};

export type Chapter = {
  id: string;
  title: string;
  startNode: string;
  startingItems: string[];
  intro: IntroFrame[];
  items: Record<string, GameItem>;
  nodes: Record<string, StoryNode>;
};

export type GameProgress = {
  nodeId: string;
  itemIds: string[];
  visitedIds: string[];
  visitCounts?: Record<string, number>;
  completedActivities: FestivalActivity[];
};
