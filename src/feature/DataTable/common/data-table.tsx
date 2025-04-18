import { useState } from 'react';

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { RegisteredRouter, RouteIds } from '@tanstack/react-router';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';

import { DataTablePagination } from './data-table-pagination';

import { Filters, PaginatedData } from '../types/tables/FilterExtension';
import { DataTableToolbarProps } from '../types/tables/DataTableComponents';

import { useFilters } from '../hooks/useFilters';

import { sortByToState, stateToSortBy } from '../lib/tableSortMapper';
import { cn } from '../lib/utils';

export const DEFAULT_PAGE_INDEX = 0;
export const DEFAULT_PAGE_SIZE = 10;

type PropsOptionTypes = string | number | string[] | number[] | Date;
type Props<T extends Record<string, PropsOptionTypes>, R extends RouteIds<RegisteredRouter['routeTree']>> = {
  data: PaginatedData<T>;
  columns: ColumnDef<T>[];
  toolbar?: ({ table }: DataTableToolbarProps<T>) => React.JSX.Element;
  routeId: R;
  header?: boolean;
  pagination?: boolean;
  pageselection?: boolean;
  rowcountselection?: boolean;
  navigateOnDoubleClick?: (id: PropsOptionTypes) => void;
};

export default function DataTable<
  T extends Record<string, PropsOptionTypes>,
  R extends RouteIds<RegisteredRouter['routeTree']>,
>({
  data,
  columns,
  routeId,
  toolbar,
  header = true,
  pagination = true,
  pageselection = true,
  rowcountselection = true,
  navigateOnDoubleClick,
}: Props<T, R>) {
  const { filters, setFilters } = useFilters<R>(routeId);
  const { pageIndex, pageSize, sortBy } = filters as Filters<T>;
  const paginationState = {
    pageIndex: pageIndex ?? DEFAULT_PAGE_INDEX,
    pageSize: pageSize ?? DEFAULT_PAGE_SIZE,
  };
  const sortingState = sortByToState(sortBy);

  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: data.result ?? [],
    columns,
    state: { pagination: paginationState, sorting: sortingState, columnFilters, columnVisibility, rowSelection },
    onSortingChange: (updaterOrValue) => {
      const newSortingState = typeof updaterOrValue === 'function' ? updaterOrValue(sortingState) : updaterOrValue;
      return setFilters({ sortBy: stateToSortBy(newSortingState) } as typeof filters);
    },
    onPaginationChange: (pagination) => {
      const updater = typeof pagination === 'function' ? pagination(paginationState) : pagination;
      setFilters(updater as typeof filters);
    },
    rowCount: data.rowCount,
    enableRowSelection: true,
    manualPagination: true,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="flex flex-col gap-3 rounded-lg border p-2 overflow-scroll">
      {toolbar && toolbar({ table: table })}
      <Table>
        {header ? (
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
        ) : null}
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  if (navigateOnDoubleClick) navigateOnDoubleClick(row.original.id);
                }}
                className={cn(navigateOnDoubleClick ? 'cursor-pointer' : '')}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Sem resultados.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {pagination ? (
        <DataTablePagination table={table} pageselection={pageselection} rowcountselection={rowcountselection} />
      ) : null}
    </div>
  );
}
