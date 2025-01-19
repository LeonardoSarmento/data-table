import { useRouter } from '@tanstack/react-router';
import { EditIcon } from 'lucide-react';

import { Button } from '../components/ui/button';
import { DialogComponent } from '../components/dialog';

import { UserTable } from './types/User';
import { DataTableRowActionsProps } from '../types/tables/DataTableComponents';

export function UserButtonAction<TData>({ row }: DataTableRowActionsProps<TData>) {
  const user = UserTable.parse(row.original);
  const router = useRouter();
  return (
    <div className="flex justify-center gap-3">
      <Button
        onClick={() =>
          router.navigate({
            to: '/',
          })
        }
        variant="outline"
      >
        <EditIcon />
      </Button>
      <DialogComponent buttonType="rowAction" title={`Deseja remover o usuário ${user.name}?`} />
    </div>
  );
}
