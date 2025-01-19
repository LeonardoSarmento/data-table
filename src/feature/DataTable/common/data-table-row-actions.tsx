import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { VariantProps } from 'class-variance-authority';
import { RegisteredRouter, RouteIds } from '@tanstack/react-router';
import { Table } from '@tanstack/react-table';

import { cn } from '@lib/utils';

import { DataTableExportToCSV } from './data-table-export-to-csv';

import { Button, buttonVariants } from '../components/ui/button';
import { DialogComponent } from '../components/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';

export interface Action {
  label?: string;
  variant?: VariantProps<typeof buttonVariants>['variant'];
  onClick?: () => void;
  dialogTitle?: string;
  protected?: boolean;
  buttonType?: 'rowAction' | 'button';
}

export interface ControlToolbarProps<TData, R extends RouteIds<RegisteredRouter['routeTree']>>
  extends React.HTMLAttributes<HTMLDivElement> {
  actions: Action[];
  menuLabel?: string;
  className?: string;
  table: Table<TData>;
  routeId: R;
  fileName?: string;
  exportTableToCSV?: boolean;
}

export function ControlToolbar<TData, R extends RouteIds<RegisteredRouter['routeTree']>>({
  actions,
  menuLabel = 'Menu',
  table,
  className,
  routeId,
  fileName,
  exportTableToCSV = true,
  ...props
}: ControlToolbarProps<TData, R>) {
  return (
    <>
      <div {...props} className={cn('flex justify-center gap-3 max-2xl:hidden', className)}>
        {actions.map((action, index) => (
          <div key={index}>
            {action.dialogTitle ? (
              <DialogComponent title={action.dialogTitle} />
            ) : !action.protected ? (
              <Button onClick={action.onClick} variant={action.variant} size="sm">
                {action.label}
              </Button>
            ) : null}
          </div>
        ))}
        {exportTableToCSV && (
          <DataTableExportToCSV table={table} routeId={routeId} filename={fileName ?? 'Table-Data'} />
        )}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="2xl:hidden">
          <Button size="sm" variant="outline" className="h-8 space-x-2 data-[state=open]:bg-muted">
            <MoreHorizontal className="h-4 w-4" />
            <span>{menuLabel}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuLabel>Opções</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {actions.map((action, index) => (
            <React.Fragment key={index}>
              {action.dialogTitle ? (
                <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                  <DialogComponent className="flex-1" title={action.dialogTitle} mutate={action.onClick} />
                </DropdownMenuItem>
              ) : !action.protected ? (
                <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                  <Button onClick={action.onClick} variant={action.variant} className="flex-1" size="sm">
                    {action.label}
                  </Button>
                </DropdownMenuItem>
              ) : null}
            </React.Fragment>
          ))}
          {exportTableToCSV && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                <DataTableExportToCSV
                  className="mx-0 flex-1"
                  table={table}
                  routeId={routeId}
                  filename={fileName ?? 'Table-Data'}
                />
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
