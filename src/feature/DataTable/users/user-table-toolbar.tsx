import { RegisteredRouter, RouteIds } from '@tanstack/react-router';

import { UserToolbarAction } from './user-toolbar-actions';

import { DataTableFacetedFilter } from '../common/data-table-faceted-filter';
import { SelectedIdsFacetedFilter } from '../common/selected-faceted-filters';
import { DatePickerWithRange } from '../common/data-table-date-selection';
import { DataTableExportToCSV } from '../common/data-table-export-to-csv';
import { DebouncedInput } from '../common/debouncedInput';
import { DataTableViewOptions } from '../common/data-table-view-options';
import ResetFiltersButton from '../common/reset-filters-button';

import { DataTableToolbarProps } from '../types/tables/DataTableComponents';
import { UserFilters } from './types/User';

import { useFilters } from '../hooks/useFilters';

import { roles } from '../constants/labels';

import { IsColumnFiltered } from '../lib/utils';

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const userTableRouteId: RouteIds<RegisteredRouter['routeTree']> = '/';

  const { filters, setFilters } = useFilters(userTableRouteId);
  const isFiltered = IsColumnFiltered(filters);
  const fieldMetaId = table.getColumn('id')?.columnDef.meta;
  const fieldMetaName = table.getColumn('name')?.columnDef.meta;
  const fieldMetaEmail = table.getColumn('email')?.columnDef.meta;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <SelectedIdsFacetedFilter title="Selecionados" routeId={userTableRouteId} />
        {table.getColumn('id')?.getCanFilter() && fieldMetaId?.filterKey !== undefined ? (
          <DebouncedInput
            className="h-8 w-[150px] rounded border shadow lg:w-[150px]"
            onChange={(value) => {
              setFilters({
                [fieldMetaId.filterKey as keyof UserFilters['id']]: value,
              } as Partial<TData>);
            }}
            onClick={(e) => e.stopPropagation()}
            type={fieldMetaId.filterVariant === 'number' ? 'number' : 'text'}
            placeholder="Procure pelo id"
            value={filters[fieldMetaId.filterKey as keyof UserFilters['id']] ?? ''}
          />
        ) : null}
        {table.getColumn('name')?.getCanFilter() && fieldMetaName?.filterKey !== undefined ? (
          <DebouncedInput
            className="h-8 w-[150px] rounded border shadow lg:w-[150px]"
            onChange={(value) => {
              setFilters({
                [fieldMetaName.filterKey as keyof UserFilters]: value,
              } as Partial<TData>);
            }}
            onClick={(e) => e.stopPropagation()}
            type={fieldMetaName.filterVariant === 'number' ? 'number' : 'text'}
            placeholder="Procure pelo nome"
            value={filters[fieldMetaName.filterKey as keyof UserFilters['name']] ?? ''}
          />
        ) : null}
        {table.getColumn('email')?.getCanFilter() && fieldMetaEmail?.filterKey !== undefined ? (
          <DebouncedInput
            className="h-8 w-[150px] rounded border shadow lg:w-[150px]"
            onChange={(value) => {
              setFilters({
                [fieldMetaEmail.filterKey as keyof UserFilters]: value,
              } as Partial<TData>);
            }}
            onClick={(e) => e.stopPropagation()}
            type={fieldMetaEmail.filterVariant === 'number' ? 'number' : 'text'}
            placeholder="Procure pelo email"
            value={filters[fieldMetaEmail.filterKey as keyof UserFilters['email']] ?? ''}
          />
        ) : null}
        {table.getColumn('role') && (
          <DataTableFacetedFilter
            column={table.getColumn('role')}
            title="Perfil"
            options={roles}
            routeId={userTableRouteId}
          />
        )}
        <DatePickerWithRange routeId={userTableRouteId} />
        {isFiltered && <ResetFiltersButton routeId={userTableRouteId} />}
      </div>
      <UserToolbarAction />
      <DataTableExportToCSV table={table} routeId={userTableRouteId} filename="users" />
      <DataTableViewOptions table={table} />
    </div>
  );
}
