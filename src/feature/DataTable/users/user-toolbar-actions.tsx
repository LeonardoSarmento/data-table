import { useRouter } from '@tanstack/react-router';

import { DataTableToolbarActionsProps } from '../types/tables/DataTableComponents';

import { ControlToolbar } from '../common/data-table-row-actions';
import { userTableRouteId } from './user-columns';

export function UserToolbarAction<TData>({ className, ...props }: DataTableToolbarActionsProps<TData>) {
  const router = useRouter();
  return (
    <ControlToolbar
      {...props}
      className={className}
      routeId={userTableRouteId}
      fileName="Users"
      actions={[
        {
          label: 'Criar',
          variant: 'default',
          onClick: () => router.navigate({ to: '/' }),
        },
        {
          dialogTitle: 'Deseja remover os registros de usuários?',
        },
        // {
        //   protected: 'true',
        //   buttonType: 'toolbarActionSwitchState',
        //   buttonText: 'Ativar/Desativar',
        //   dialogTitle: 'Deseja ativar ou desativar múltiplos usuários?',
        // },
        {
          label: 'Voltar',
          variant: 'outline',
          onClick: () => router.navigate({ to: '/' }),
        },
      ]}
    />
  );
}
