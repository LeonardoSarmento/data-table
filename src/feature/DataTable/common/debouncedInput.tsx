import { InputHTMLAttributes, useEffect, useState } from 'react';
import { Table } from '@tanstack/react-table';
import { RegisteredRouter, RouteIds } from '@tanstack/react-router';

import { cn } from '../lib/utils';

import { useFilters } from '../hooks/useFilters';

import { Input } from '../components/ui/input';

export function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 300,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = useState<string | number>(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Input
      {...props}
      min={props.min ?? 0}
      step={props.step ?? '0.01'}
      value={value ?? ''}
      onChange={(e) => {
        if (e.target.value === '') return setValue('');
        if (props.type === 'number') {
          setValue(e.target.valueAsNumber);
        } else {
          setValue(e.target.value);
        }
      }}
    />
  );
}

export function DebounceFilterInput<TData, R extends RouteIds<RegisteredRouter['routeTree']>>({
  columnId,
  table,
  placeholder,
  routeId,
  className,
}: {
  columnId: string;
  placeholder?: string;
  table: Table<TData>;
  routeId: R;
  className?: string;
}) {
  const { filters, setFilters } = useFilters(routeId);
  const fieldMeta = table.getColumn(columnId)?.columnDef.meta;
  return table.getColumn(columnId)?.getCanFilter() && fieldMeta?.filterKey !== undefined ? (
    <DebouncedInput
      className={cn('h-8 max-w-auto flex-1 rounded border shadow lg:w-full', className)}
      onChange={(value) => {
        setFilters({
          [fieldMeta.filterKey as string]: value,
        } as Partial<typeof filters>);
      }}
      onClick={(e) => e.stopPropagation()}
      type={fieldMeta.filterVariant === 'number' ? 'number' : 'text'}
      placeholder={placeholder ?? `Procure pelo ${columnId}...`}
      value={(filters[fieldMeta.filterKey as keyof typeof filters] as string) ?? ''}
    />
  ) : null;
}
