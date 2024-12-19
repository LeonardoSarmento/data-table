import { keepPreviousData, queryOptions } from '@tanstack/react-query';

import { UserFilters } from '../types/User';
import { userTableKey } from './user-keys';

import { fetchUsers } from '../../fake-api/users';

export const queryOptionsUserTable = (filters: UserFilters) => {
  return queryOptions({
    queryKey: [userTableKey, filters],
    queryFn: () => fetchUsers(filters),
    placeholderData: keepPreviousData,
  });
};
