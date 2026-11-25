import { FloatingPortal, type Placement } from '@floating-ui/react';
import { useControlledState } from '@hooks/useControlledState';
import { useFloatingUI } from '@hooks/useFloatingUI';
import { cn } from '@lib/utils';
import { cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react';

interface PopoverProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: Placement;
  trigger?: 'hover' | 'click';
  render: (props: { close: () => void }) => ReactNode;
  children: ReactElement;
  className?: string;
}

export default function Popover({
  open: controlledOpen,
  onOpenChange,
  placement = 'bottom-start',
  trigger = 'click',
  render,
  children,
  className,
}: PopoverProps) {
  const [open, setOpen] = useControlledState(controlledOpen, false, onOpenChange);

  const { refs, floatingStyles, getReferenceProps, getFloatingProps } = useFloatingUI({
    open,
    onOpenChange: setOpen,
    placement,
    trigger,
    offsetPx: 8,
  });

  const triggerEl = isValidElement(children)
    ? cloneElement(children as ReactElement<Record<string, unknown>>, {
        ref: refs.setReference,
        ...getReferenceProps(),
      })
    : children;

  return (
    <>
      {triggerEl}
      {open && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className={cn(
              'z-50 min-w-36 rounded-xl border border-border/60 bg-popover/95 p-1.5 text-popover-foreground shadow-lg backdrop-blur-md',
              className,
            )}
          >
            {render({ close: () => setOpen(false) })}
          </div>
        </FloatingPortal>
      )}
    </>
  );
}
