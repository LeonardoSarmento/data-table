import { clsx, type ClassValue } from 'clsx';
import { intlFormat } from 'date-fns';
import { twMerge } from 'tailwind-merge';

import { DateLocaleType } from '../types/Date';
import { Filters } from '../types/tables/FilterExtension';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dateFormatter({
  date,
  customLocale = 'pt-BR',
}: {
  date: string | number | Date;
  customLocale?: DateLocaleType;
}) {
  return intlFormat(
    date,
    {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    },
    {
      locale: customLocale,
    },
  );
}

export function IsColumnFiltered<T>(filters: Filters<T>) {
  return (
    Object.keys(filters).filter((filter) => filter !== 'pageSize' && filter !== 'pageIndex' && filter !== 'selectedIds')
      .length > 0
  );
}
