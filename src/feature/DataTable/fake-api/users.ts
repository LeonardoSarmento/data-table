import { faker } from '@faker-js/faker';

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '../common/data-table';

import { PaginatedData } from '../types/tables/FilterExtension';

import { roleSchema, RolesType, UserFilters, UserTableType } from '../users/types/User';

function makeData(amount: number): UserTableType[] {
  return Array(amount)
    .fill(0)
    .map((_, index) => {
      return {
        id: index + 1,
        name: faker.person.fullName(),
        email: faker.internet.email(),
        company: faker.company.name(),
        role: [faker.helpers.enumValue(roleSchema.enum)],
        birthday: faker.date.birthdate(),
      };
    });
}

export const fakeUserData = makeData(1000);

export async function fetchUsers(filtersAndPagination: UserFilters): Promise<PaginatedData<UserTableType>> {
  const {
    pageIndex = DEFAULT_PAGE_INDEX,
    pageSize = DEFAULT_PAGE_SIZE,
    sortBy,
    selection,
    selectedIds,
    from,
    to,
    ...filters
  } = filtersAndPagination;
  let requestedData = fakeUserData.slice();

  if (selection) {
    requestedData = requestedData.filter((user) => {
      // Check if we need to include both 'SELECTED' and 'NOT_SELECTED'
      const isSelected = selection.includes('SELECTED'); // 'SELECTED' literal
      const isNotSelected = selection.includes('NOT_SELECTED'); // 'NOT_SELECTED' literal

      // Check if the user's ID is in the selectedIds array (which indicates whether the row is selected or not)
      const isUserSelected = user.id && selectedIds?.includes(user.id);

      // Behavior logic based on selection array:
      if (selection.length === 0) {
        // If the selection array is empty, return both selected and not selected rows
        return true;
      }
      if (isSelected && isUserSelected) {
        // If 'SELECTED' is in the selection and the user is selected, include this user
        return true;
      }
      if (isNotSelected && !isUserSelected) {
        // If 'NOT_SELECTED' is in the selection and the user is not selected, include this user
        return true;
      }
      // If none of the above conditions match, exclude this user
      return false;
    });
  }

  if (sortBy) {
    const [field, order] = sortBy.split('.');
    requestedData.sort((a, b) => {
      const aValue = a[field as keyof Omit<UserTableType, 'selectedIds'>];
      const bValue = b[field as keyof Omit<UserTableType, 'selectedIds'>];

      if (aValue === bValue) return 0;
      if (order === 'asc') return aValue > bValue ? 1 : -1;
      return aValue < bValue ? 1 : -1;
    });
  }

  const filteredData = requestedData.filter((user) => {
    const birthday = new Date(user.birthday);
    birthday.setUTCHours(0, 0, 0, 0); // Zera as horas, minutos, segundos e milissegundos

    // Validar e aplicar os filtros de intervalo de datas
    if (from && to) {
      const fromDate = new Date(from);
      const toDate = new Date(to);

      // Zerar as horas, minutos, segundos e milissegundos das datas
      fromDate.setUTCHours(0, 0, 0, 0);
      toDate.setUTCHours(23, 59, 59, 999); // Garantir o fim do dia

      // Comparação inclusiva dentro do intervalo
      if (birthday < fromDate || birthday > toDate) {
        return false;
      }
    } else if (from) {
      const fromDate = new Date(from);
      fromDate.setUTCHours(0, 0, 0, 0);
      if (birthday < fromDate) return false;
    } else if (to) {
      const toDate = new Date(to);
      toDate.setUTCHours(23, 59, 59, 999);
      if (birthday > toDate) return false;
    }
    return Object.keys(filters).every((key) => {
      const filter = filters[key as keyof Omit<UserTableType, 'selectedIds'>];
      if (filter === undefined || filter === '') return true;

      const value = user[key as keyof Omit<UserTableType, 'selectedIds'>];

      if (key === 'role') {
        if (Array.isArray(filter)) {
          if (filter.length === 0) return true;
          return Array.isArray(value) ? value.some((val) => filter.includes(val)) : filter.includes(value as RolesType);
        }
        return false;
      }

      if (typeof value === 'string') return value.toLowerCase().includes(`${filter}`.toLowerCase());
      if (typeof value === 'number') return value === +filter;

      return true;
    });
  });

  await new Promise((resolve) => setTimeout(resolve, 100));

  return {
    result: filteredData.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize),
    rowCount: filteredData.length,
  };
}
