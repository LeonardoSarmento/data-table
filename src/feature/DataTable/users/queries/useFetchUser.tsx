import { keepPreviousData, queryOptions } from '@tanstack/react-query';

import { UserType } from '../types/User';
import { userKey } from './user-keys';

import { fakeUserData } from '../../fake-api/users';

function fetchUser(id: UserType['id']): UserType {
  const data = fakeUserData.filter((user) => user.id === id)[0];
  return { ...data, role: data.role[0] };
}

export const queryOptionsUser = (id: UserType['id']) => {
  return queryOptions({
    queryKey: [userKey, id],
    queryFn: () => fetchUser(id),
    placeholderData: keepPreviousData,
  });
};
