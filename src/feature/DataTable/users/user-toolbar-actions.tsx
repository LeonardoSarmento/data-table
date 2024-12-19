import { useRouter } from '@tanstack/react-router';

import { Button } from '../components/ui/button';
import { DialogComponent } from '../components/dialog';

import { DataTableToolbarActionsProps } from '../types/tables/DataTableComponents';

import { cn } from './../lib/utils';

export function UserToolbarAction({ className, ...props }: DataTableToolbarActionsProps) {
  const router = useRouter();
  return (
    <div className={cn('mx-2 flex justify-center gap-3', className)} {...props}>
      <Button onClick={() => router.navigate({ to: '/' })} size="sm" variant="default">
        Criar
      </Button>
      <DialogComponent size="sm" title="Deseja remover os registros de usuários?" />
      <Button
        onClick={() =>
          router.navigate({
            to: '..',
          })
        }
        variant="outline"
        size="sm"
      >
        Voltar
      </Button>
    </div>
  );
}
