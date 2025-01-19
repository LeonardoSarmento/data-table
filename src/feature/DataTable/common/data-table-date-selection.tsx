import * as React from 'react';

import { intlFormat } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { RegisteredRouter, RouteIds } from '@tanstack/react-router';

import { Button } from '../components/ui/button';
import { Calendar } from '../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';

import { useFilters } from '../hooks/useFilters';

import { DateLocaleType } from '../types/Date';
import { Filters } from '../types/tables/FilterExtension';

import { cn } from '../lib/utils';
import { useIsMobile } from '../hooks/use-mobile';

type DatePickerWithRangeType<R> = React.HTMLAttributes<HTMLDivElement> & {
  routeId: R;
  format?: 'short' | 'long';
  locale?: DateLocaleType;
  alignPopoverContent?: 'start' | 'center' | 'end';
};
export function DatePickerWithRange<R extends RouteIds<RegisteredRouter['routeTree']>, T>({
  routeId,
  locale = 'pt-BR',
  format = 'short',
  alignPopoverContent = 'start',
  className,
  ...props
}: DatePickerWithRangeType<R>) {
  const { filters, setFilters } = useFilters(routeId);

  const { from, to } = filters as Filters<T>;

  const selectedDate = React.useMemo(() => {
    if (!from && !to) return undefined;
    const date = { to: to, from: from };
    return date;
  }, [from, to]);

  function dateFormatter(date: Date) {
    return intlFormat(
      date,
      format === 'long'
        ? {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }
        : {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          },
      {
        locale: locale || 'pt-BR',
      },
    );
  }

  return (
    <div className={cn('grid gap-2', className)} {...props}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            size="sm"
            className={cn(
              'w-full border-dashed pl-3 text-left font-normal',
              !selectedDate?.from && !selectedDate?.to && 'text-muted-foreground',
            )}
          >
            {selectedDate?.from ? (
              selectedDate.to ? (
                `${dateFormatter(selectedDate.from)} - ${dateFormatter(selectedDate.to)}`
              ) : (
                dateFormatter(selectedDate.from)
              )
            ) : (
              <span>{'Escolha um período'}</span>
            )}
            <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align={alignPopoverContent}>
          <Calendar
            customMode="range"
            autoFocus
            customLocale={locale || 'pt-BR'}
            selected={selectedDate}
            numberOfMonths={useIsMobile() ? 1 : 2}
            disabled={{ after: new Date() }}
            onSelect={(selected: DateRange) => {
              setFilters({
                ...filters,
                from: selected ? selected.from : undefined,
                to: selected ? selected.to : undefined,
              });
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
