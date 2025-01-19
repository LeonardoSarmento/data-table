import { roles } from '../constants/labels';

import { userTableRouteId } from './user-columns';
import { UserToolbarAction } from './user-toolbar-actions';

import { DataTableToolbar } from '../common/data-table-toolbar';
import { DebounceFilterInput } from '../common/debouncedInput';
import { DataTableFacetedFilter } from '../common/data-table-faceted-filter';

import { DataTableToolbarProps } from '../types/tables/DataTableComponents';

export function DataTableToolbarUsers<TData>({ table }: DataTableToolbarProps<TData>) {
  return (
    <DataTableToolbar
      routeId={userTableRouteId}
      table={table}
      inputs={[
        <DebounceFilterInput
          table={table}
          routeId={userTableRouteId}
          columnId="id"
          placeholder="Procure pelo id..."
        />,
        <DebounceFilterInput
          table={table}
          routeId={userTableRouteId}
          columnId="name"
          placeholder="Procure pelo nome..."
        />,
        // <DebounceFilterInput
        //   table={table}
        //   routeId={userTableRouteId}
        //   columnId="email"
        //   placeholder="Procure pelo email..."
        // />,
        table.getColumn('role') && (
          <DataTableFacetedFilter
            column={table.getColumn('role')}
            title="Perfil"
            options={roles}
            routeId={userTableRouteId}
          />
        ),
      ]}
      Action={<UserToolbarAction table={table} />}
    />
  );
}