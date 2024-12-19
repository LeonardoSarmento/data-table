import { cn } from '../lib/utils';

type ActionHeaderType = {
  title: string;
  classNameTitle?: string;
} & React.HTMLAttributes<HTMLDivElement>;
export function ActionHeader({ title, classNameTitle, ...props }: ActionHeaderType) {
  return (
    <div {...props} className={cn('flex justify-center', props.className)}>
      <span className={cn('text-sm font-medium leading-none', classNameTitle)}>{title}</span>
    </div>
  );
}
