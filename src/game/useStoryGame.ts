import { useEffect, useMemo, useRef, useState } from 'react';
import { chapterOne } from './chapterOne';
import { revisitNodes } from './revisitNodes';
import { adaptStoryNode } from './storyContinuity';
import type { FestivalActivity, GameProgress, StoryChoice } from './types';

export function useStoryGame() {
  const [nodeId, setNodeId] = useState(chapterOne.startNode);
  const [itemIds, setItemIds] = useState<string[]>(chapterOne.startingItems);
  const [visitedIds, setVisitedIds] = useState<string[]>([chapterOne.startNode]);
  const [visitCounts, setVisitCounts] = useState<Record<string, number>>({ [chapterOne.startNode]: 1 });
  const [isMoving, setIsMoving] = useState(false);
  const [completedActivities, setCompletedActivities] = useState<FestivalActivity[]>([]);
  const moveTimer = useRef<number | undefined>(undefined);
  const storyNode = adaptStoryNode(chapterOne.nodes[nodeId], itemIds);
  const baseNode = visitCounts[nodeId] > 1 && revisitNodes[nodeId]
    ? { ...storyNode, ...revisitNodes[nodeId] }
    : storyNode;
  const getTarget = (choice: StoryChoice) => (
    choice.targetIfVisited && visitedIds.includes(choice.targetIfVisited.nodeId)
      ? choice.targetIfVisited.target
      : choice.target
  );
  const node = useMemo(() => ({
    ...baseNode,
    choices: baseNode.choices.filter(
      (choice) => (
        (!choice.hideAfterTargetVisited || !visitedIds.includes(getTarget(choice)))
        && (!choice.hideIfItem || !itemIds.includes(choice.hideIfItem))
        && (!choice.showIfItem || itemIds.includes(choice.showIfItem))
        && (!choice.grantsItem || !itemIds.includes(choice.grantsItem))
        && (!choice.requiresCompletedActivities
          || choice.requiresCompletedActivities.every((activity) => completedActivities.includes(activity)))
      ),
    ).map((choice) => visitedIds.includes(getTarget(choice)) ? {
      ...choice,
      detail: choice.hideAfterTargetVisited ? choice.detail : 'Вернуться в уже знакомое место',
    } : choice),
  }), [baseNode, completedActivities, itemIds, visitedIds]);

  useEffect(() => () => window.clearTimeout(moveTimer.current), []);

  const items = useMemo(
    () => itemIds.map((id) => chapterOne.items[id]),
    [itemIds],
  );

  const collectedItemsCount = itemIds.filter(
    (id) => !chapterOne.startingItems.includes(id),
  ).length;

  const canChoose = (choice: StoryChoice) => (
    (!choice.requiresItem || itemIds.includes(choice.requiresItem))
    && (!choice.requiresItems || choice.requiresItems.every((id) => itemIds.includes(id)))
    && (!choice.requiresCollectedItems || collectedItemsCount >= choice.requiresCollectedItems)
  );

  const goTo = (target: string) => {
    setNodeId(target);
    setVisitedIds((ids) => ids.includes(target) ? ids : [...ids, target]);
    setVisitCounts((counts) => ({ ...counts, [target]: (counts[target] ?? 0) + 1 }));
    setIsMoving(false);
  };

  const choose = (choice: StoryChoice) => {
    if (!canChoose(choice)) return;
    if (choice.grantsItem) {
      setItemIds((ids) => ids.includes(choice.grantsItem!) ? ids : [...ids, choice.grantsItem!]);
    }
    if (choice.completesActivity) {
      setCompletedActivities((activities) => activities.includes(choice.completesActivity!)
        ? activities
        : [...activities, choice.completesActivity!]);
    }
    setIsMoving(true);
    window.clearTimeout(moveTimer.current);
    moveTimer.current = window.setTimeout(() => {
      goTo(getTarget(choice));
    }, 420);
  };

  const completeActivity = (activity: FestivalActivity, target: string) => {
    setCompletedActivities((activities) => activities.includes(activity) ? activities : [...activities, activity]);
    goTo(target);
  };

  const restart = () => {
    setNodeId(chapterOne.startNode);
    setItemIds(chapterOne.startingItems);
    setVisitedIds([chapterOne.startNode]);
    setVisitCounts({ [chapterOne.startNode]: 1 });
    setIsMoving(false);
    setCompletedActivities([]);
  };

  const restore = (progress: GameProgress) => {
    if (!chapterOne.nodes[progress.nodeId]) return;
    setNodeId(progress.nodeId);
    setItemIds(progress.itemIds.filter((id) => Boolean(chapterOne.items[id])));
    setVisitedIds(progress.visitedIds.filter((id) => Boolean(chapterOne.nodes[id])));
    setVisitCounts(progress.visitCounts ?? Object.fromEntries(progress.visitedIds.map((id) => [id, 1])));
    setCompletedActivities(progress.completedActivities);
    setIsMoving(false);
  };

  const progress: GameProgress = { nodeId, itemIds, visitedIds, visitCounts, completedActivities };

  return { node, items, visitedCount: visitedIds.length, progress, isMoving, canChoose, choose, goTo, completeActivity, restore, restart };
}
