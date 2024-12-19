import { H1 } from '@components/typography/h1';
import { H4 } from '@components/typography/h4';
import { Skeleton } from '@components/ui/skeleton';
import { cn } from '@lib/utils';
import { HTMLAttributes } from 'react';

type HeaderProps = {
  title: string;
  description?: string;
  classNameTitle?: string;
  classNameDescription?: string;
  user?: string;
  isLoading?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export default function Header({
  description,
  title,
  classNameDescription,
  classNameTitle,
  user,
  isLoading,
  ...props
}: HeaderProps) {
  return (
    <div className={cn('my-6 flex flex-col gap-3', props.className)} {...props}>
      <H1 className={cn('flex gap-3 text-3xl lg:text-4xl', classNameTitle)}>
        {title}
        {isLoading ? <Skeleton className="h-10 w-[350px] rounded-sm" /> : user ? user : null}
      </H1>
      {description ? <H4 className={cn('', classNameDescription)}>{description}</H4> : null}
    </div>
  );
}
