import { Column } from '@tanstack/react-table';

interface DataTableColumnHeaderNameProps<TData, TValue> {
  column: Column<TData, TValue>;
}

export function GetDataTableColumnHeaderName<TData, TValue>({
  column,
}: DataTableColumnHeaderNameProps<TData, TValue>): string {
  return column.columnDef.meta?.name ?? column.id;
}
