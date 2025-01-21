import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  pageselection?: boolean;
  rowcountselection?: boolean;
}

export function DataTablePagination<TData>({
  table,
  pageselection = true,
  rowcountselection = true,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-2 md:flex-row md:justify-between">
      <div className="min-w-fit flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} de {table.getFilteredRowModel().rows.length} linha(s)
        selecionadas.
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        {rowcountselection ? <RowCountSelection table={table} /> : null}
        {pageselection ? <PageSelection table={table} /> : null}
      </div>
    </div>
  );
}

interface RowCountSelectionProps<TData> {
  table: Table<TData>;
}
function RowCountSelection<TData>({ table }: RowCountSelectionProps<TData>) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 space-x-2">
      <p className="text-nowrap text-sm font-medium">Linhas por página</p>
      <Select
        value={`${table.getState().pagination.pageSize}`}
        onValueChange={(value) => {
          table.setPageSize(Number(value));
        }}
      >
        <SelectTrigger className="h-8 w-[70px]">
          <SelectValue placeholder={table.getState().pagination.pageSize} />
        </SelectTrigger>
        <SelectContent side="top">
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <SelectItem key={pageSize} value={`${pageSize}`}>
              {pageSize}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
interface RowCountSelectionProps<TData> {
  table: Table<TData>;
}
function PageSelection<TData>({ table }: RowCountSelectionProps<TData>) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <div className="flex w-[150px] items-center justify-center text-nowrap text-sm font-medium lg:w-[100px]">
        Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          className="flex h-8 w-8 p-0"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">Ir para primeira página</span>
          <DoubleArrowLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">Anterior</span>
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">Próximo</span>
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="flex h-8 w-8 p-0"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">Ir para última página</span>
          <DoubleArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
