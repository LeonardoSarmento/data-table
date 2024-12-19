import { Download } from 'lucide-react';
import { Table } from '@tanstack/react-table';
import { RegisteredRouter, RouteIds } from '@tanstack/react-router';

import { Button } from '../components/ui/button';

import { useFilters } from '../hooks/useFilters';

import { Filters } from '../types/tables/FilterExtension';

import { exportTableToCSV } from '../lib/export';

export interface DataTableExportToCSVProps<TData, R extends RouteIds<RegisteredRouter['routeTree']>> {
  table: Table<TData>;
  routeId: R;
  filename?: string;
  excludeColumns?: (keyof TData | 'select' | 'actions')[];
}
export function DataTableExportToCSV<TData, R extends RouteIds<RegisteredRouter['routeTree']>>({
  table,
  routeId,
  filename = 'table',
  excludeColumns
}: DataTableExportToCSVProps<TData, R>) {
  const { filters } = useFilters(routeId);
  const { selection } = filters as Filters<TData>;
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() =>
        exportTableToCSV(table, {
          filename,
          excludeColumns,
          onlySelected: selection?.length === 1 && selection?.includes('SELECTED'),
        })
      }
      className="mx-2 gap-2"
    >
      <Download className="size-4" aria-hidden="true" />
      Exportar
    </Button>
  );
}
