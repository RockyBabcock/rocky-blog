import {
  autoUpdate,
  flip,
  offset,
  type Placement,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react';

export interface UseFloatingUIOptions {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  placement?: Placement;
  trigger?: 'hover' | 'click';
  offsetPx?: number;
}

export function useFloatingUI({
  open,
  onOpenChange,
  placement = 'bottom-start',
  trigger = 'click',
  offsetPx = 8,
}: UseFloatingUIOptions) {
  const floating = useFloating({
    open,
    onOpenChange,
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [offset(offsetPx), flip(), shift({ padding: 8 })],
  });

  const hover = useHover(floating.context, {
    enabled: trigger === 'hover',
    delay: { open: 60, close: 150 },
  });
  const click = useClick(floating.context, { enabled: trigger === 'click' });
  const dismiss = useDismiss(floating.context);
  const role = useRole(floating.context);

  const interactions = useInteractions([hover, click, dismiss, role]);

  return { ...floating, ...interactions };
}
