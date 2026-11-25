import { type MotionLevel, readMotionLevel, subscribeMotionLevel } from '@lib/motion-level';
import { useSyncExternalStore } from 'react';

export function useMotionLevel(): MotionLevel {
  return useSyncExternalStore(subscribeMotionLevel, readMotionLevel, () => 'lively');
}
