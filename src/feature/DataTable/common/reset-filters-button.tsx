import { HTMLAttributes } from 'react';

import { FilterX } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { RegisteredRouter, RouteIds } from '@tanstack/react-router';

import { Button } from '../components/ui/button';

import { Filters } from '../types/tables/FilterExtension';

import { useFilters } from '../hooks/useFilters';

import { cn } from '../lib/utils';

type ResetButtonType<R extends RouteIds<RegisteredRouter['routeTree']>, _> = {
  routeId: R;
} & HTMLAttributes<HTMLButtonElement>;
export default function ResetFiltersButton<R extends RouteIds<RegisteredRouter['routeTree']>, T>({
  routeId,
  className,
  ...props
}: ResetButtonType<R, T>) {
  const { filters } = useFilters(routeId);
  const { pageIndex, pageSize, selectedIds } = filters as Filters<T>;
  const navigate = useNavigate();
  return (
    <Button
      variant="outline"
      onClick={() =>
        navigate({
          to: '.',
          search: { pageIndex, pageSize, selectedIds: selectedIds && selectedIds.length > 0 ? selectedIds : undefined },
        })
      }
      className={cn('h-8 space-x-2 px-2 lg:px-3', className)}
      {...props}
    >
      <FilterX className="h-4 w-4" />
      <span>Resetar</span>
    </Button>
  );
}
