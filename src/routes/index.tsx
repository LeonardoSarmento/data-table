import { useMemo } from 'react';
import { createFileRoute, useRouter } from '@tanstack/react-router';

import Header from '@components/header';

import DataTable from '@/feature/DataTable/common/data-table';
import { userColumns } from '@/feature/DataTable/users/user-columns';
import { DataTableToolbarUsers } from '@/feature/DataTable/users/user-table-toolbar';
import { queryOptionsUserTable } from '@/feature/DataTable/users/queries/useTableUser';
import { UserFilters } from '@/feature/DataTable/users/types/User';

export const Route = createFileRoute('/')({
  loaderDeps: ({ search: filters }) => filters,
  loader: async ({ context: { queryClient }, deps: filters }) => {
    const userData = await queryClient.ensureQueryData(queryOptionsUserTable(filters));
    return {
      userData,
      crumb: 'User DataTable',
    };
  },
  validateSearch: () => ({}) as UserFilters,
  component: UsersComponent,
});

function UsersComponent() {
  const { userData } = Route.useLoaderData();
  const columns = useMemo(() => userColumns, []);
  const { navigate } = useRouter();

  return (
    <>
      <Header title="Usuários" description="Listagem de todos os usuários da plataforma" />
      <DataTable
        data={userData}
        columns={columns}
        toolbar={DataTableToolbarUsers}
        routeId={Route.id}
        navigateOnDoubleClick={(id) => navigate({ to: '/', params: { userId: id.toString() } })}
      />
    </>
  );
}
