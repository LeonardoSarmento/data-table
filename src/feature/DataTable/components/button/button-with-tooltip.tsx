import { TooltipComponentProvider } from '../tooltip';
import { Button, ButtonProps } from '../ui/button';

type ButtonWithTooltipProps = ButtonProps & { tooltipContent?: string; classnameTooltip?: string };
export function ButtonWithTooltip({ tooltipContent, children, classnameTooltip, ...props }: ButtonWithTooltipProps) {
  return (
    <TooltipComponentProvider tooltipContent={tooltipContent} classnameTooltip={classnameTooltip}>
      <Button {...props}>{children}</Button>
    </TooltipComponentProvider>
  );
}
