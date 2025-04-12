import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@components/ui/tooltip';
import { cn } from '@lib/utils';
import React from 'react';

type TooltipComponentProps = {
  tooltipContent?: string;
  classnameTooltip?: string;
} & React.PropsWithChildren
export function TooltipComponentProvider({ tooltipContent, classnameTooltip, children, ...props }: TooltipComponentProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        {tooltipContent ? (
          <TooltipContent {...props} className={cn('', classnameTooltip)}>
            <p>{tooltipContent}</p>
          </TooltipContent>
        ) : null}
      </Tooltip>
    </TooltipProvider>
  );
}
