import { Column, Row, Table } from '@tanstack/react-table';
import { RegisteredRouter, RouteIds } from '@tanstack/react-router';

export interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export type DataTableToolbarActionsProps = React.HTMLAttributes<HTMLDivElement>;

export interface DataTableFacetedFilterProps<TData, TValue, R extends RouteIds<RegisteredRouter['routeTree']>> {
  column?: Column<TData, TValue>;
  title?: string;
  options: {
    label: string;
    id: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  routeId: R;
}
