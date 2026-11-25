import type { TocContextValue } from '@hooks/useTocController';
import { createContext, useContext } from 'react';

const defaultTocContext: TocContextValue = {
  activeId: '',
  expandedIds: new Set(),
  onHeadingClick: () => {},
  toggleExpanded: () => {},
};

const TocContext = createContext<TocContextValue>(defaultTocContext);

export const TocProvider = TocContext.Provider;

export function useTocContext(): TocContextValue {
  return useContext(TocContext);
}
