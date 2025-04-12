import { useRouter } from '@tanstack/react-router';
import { EditIcon } from 'lucide-react';


import { ButtonWithTooltip } from '../components/button/button-with-tooltip';
import { DialogComponent } from '../components/dialog';

import { UserTable } from './types/User';
import { DataTableRowActionsProps } from '../types/tables/DataTableComponents';
import { userTableRouteId } from './user-columns';

export function UserButtonAction<TData>({ row }: DataTableRowActionsProps<TData>) {
  const user = UserTable.parse(row.original);
  const router = useRouter();
  return (
    <div className="flex justify-center gap-3">
      <ButtonWithTooltip
        onClick={() =>
          router.navigate({
            to: '/',
          })
        }
        size="sm"
        variant="outline"
        tooltipContent="Editar"
      >
        <EditIcon />
      </ButtonWithTooltip>
      <DialogComponent
        buttonType="rowActionRemove"
        tooltipContent="Remover"
        title={`Deseja remover o usuário ${user.name}?`}
        routeId={userTableRouteId}
      />
    </div>
  );
}
