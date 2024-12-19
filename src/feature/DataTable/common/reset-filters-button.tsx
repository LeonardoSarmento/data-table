import { HTMLAttributes } from 'react';

import { Cross2Icon } from '@radix-ui/react-icons';
import { useNavigate } from '@tanstack/react-router';
import { RegisteredRouter, RouteIds } from '@tanstack/react-router';

import { Button } from '../components/ui/button';

import { Filters } from '../types/tables/FilterExtension';

import { useFilters } from '../hooks/useFilters';

type ResetButtonType<R extends RouteIds<RegisteredRouter['routeTree']>, _> = {
  routeId: R;
} & HTMLAttributes<HTMLButtonElement>;
export default function ResetFiltersButton<R extends RouteIds<RegisteredRouter['routeTree']>, T>({
  routeId,
  ...props
}: ResetButtonType<R, T>) {
  const { filters } = useFilters(routeId);
  const { pageIndex, pageSize, selectedIds } = filters as Filters<T>;
  const navigate = useNavigate();
  return (
    <Button
      variant="ghost"
      onClick={() =>
        navigate({
          to: '.',
          search: { pageIndex, pageSize, selectedIds: selectedIds && selectedIds.length > 0 ? selectedIds : undefined },
        })
      }
      className="h-8 px-2 lg:px-3"
      {...props}
    >
      Resetar
      <Cross2Icon className="ml-2 h-4 w-4" />
    </Button>
  );
}
