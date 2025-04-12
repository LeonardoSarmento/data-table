import { DeleteIcon, Power } from 'lucide-react';

import { Button } from '../ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Switch } from '../ui/switch';
import { cn } from '../../lib/utils';
import { DialogProps } from '@radix-ui/react-dialog';
import { useFilters } from '../../hooks/useFilters';
import { Filters, removingSchema } from '../../types/tables/FilterExtension';
import { RegisteredRouter, RouteIds } from '@tanstack/react-router';
import { ButtonWithTooltip } from '../button/button-with-tooltip';
import { Card } from '@components/ui/card';
import { Large } from '@components/typography/large';
import { Label } from '@components/ui/label';

export type DialogType<R> = {
  title: string;
  description?: string;
  buttonText?: string;
  cardText?: string;
  mutate?: () => void;
  buttonType?: 'rowActionRemove' | 'rowActionSwitchState' | 'toolbarRemove' | 'toolbarActionSwitchState' | 'button';
  className?: string;
  tooltipContent?: string;
  routeId: R;
} & DialogProps;

export function DialogComponent<R extends RouteIds<RegisteredRouter['routeTree']>, T>({
  title,
  buttonText,
  mutate,
  buttonType = 'button',
  tooltipContent,
  cardText,
  className,
  routeId,
  ...props
}: DialogType<R>) {
  const { filters, setFilters } = useFilters(routeId);
  const { remove } = filters as Filters<T>;
  const isSwitchStateType = buttonType === 'rowActionSwitchState' || buttonType === 'toolbarActionSwitchState';
  return (
    <Dialog
      {...props}
      defaultOpen={
        remove === removingSchema.enum.REMOVE ||
        remove === removingSchema.enum.ACTIVATED ||
        remove === removingSchema.enum.DEACTIVATED
      }
      onOpenChange={(open) =>
        setFilters({
          ...filters,
          remove: open ? (isSwitchStateType ? removingSchema.enum.DEACTIVATED : removingSchema.enum.REMOVE) : undefined,
        })
      }
    >
      <DialogTrigger asChild>
        {buttonType === 'rowActionRemove' ? (
          <ButtonWithTooltip
            variant={buttonType === 'rowActionRemove' ? 'outline' : 'destructive'}
            className={cn('border-brand', className)}
            size="sm"
            tooltipContent={tooltipContent ? tooltipContent : undefined}
          >
            {buttonType === 'rowActionRemove' ? <DeleteIcon /> : buttonText ? buttonText : 'Deletar'}
          </ButtonWithTooltip>
        ) : buttonType === 'rowActionSwitchState' ? (
          <ButtonWithTooltip
            variant={buttonType === 'rowActionSwitchState' ? 'outline' : 'destructive'}
            className={cn('border-brand', className)}
            size="sm"
            tooltipContent={tooltipContent ? tooltipContent : undefined}
          >
            {buttonType === 'rowActionSwitchState' ? <Power /> : buttonText ? buttonText : 'Deletar'}
          </ButtonWithTooltip>
        ) : buttonType === 'toolbarActionSwitchState' ? (
          <ButtonWithTooltip
            variant="destructive"
            className={cn('border-brand', className)}
            size="sm"
            tooltipContent={tooltipContent ? tooltipContent : undefined}
          >
            {buttonText ? buttonText : 'Deletar'}
          </ButtonWithTooltip>
        ) : buttonType === 'toolbarRemove' ? (
          <ButtonWithTooltip
            variant="destructive"
            className={cn('border-brand', className)}
            size="sm"
            tooltipContent={tooltipContent ? tooltipContent : undefined}
          >
            {buttonText ? buttonText : 'Deletar'}
          </ButtonWithTooltip>
        ) : (
          <ButtonWithTooltip
            variant="destructive"
            className={cn('border-brand', className)}
            size="sm"
            tooltipContent={tooltipContent ? tooltipContent : undefined}
          >
            {buttonText ? buttonText : 'Deletar'}
          </ButtonWithTooltip>
        )}
      </DialogTrigger>
      <DialogContent
        className="max-w-[320px] rounded-lg sm:max-w-[400px] md:max-w-[500px]"
        onDoubleClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {cardText
            ? cardText
            : isSwitchStateType
              ? 'Altere o status dos registros selecionados para ativo ou desativado. Essa alteração pode ser desfeita posteriormente, caso necessário.'
              : 'Após excluir os registros selecionados, não é possível recuperar esses registros.'}
        </DialogDescription>
        {(remove === removingSchema.enum.ACTIVATED || remove === removingSchema.enum.DEACTIVATED) &&
        isSwitchStateType ? (
          <Card className="flex flex-col flex-wrap items-center gap-3 py-3">
            <Large>Alterar o status para:</Large>
            <div className="flex items-center space-x-2">
              <Label htmlFor="status-switch">Desativado</Label>
              <Switch
                id="status-switch"
                checked={remove === removingSchema.Enum.ACTIVATED}
                onCheckedChange={(checked) =>
                  setFilters({
                    ...filters,
                    remove: checked ? removingSchema.Enum.ACTIVATED : removingSchema.Enum.DEACTIVATED,
                  })
                }
                onClick={(e) => e.stopPropagation()}
              />
              <Label htmlFor="status-switch">Ativado</Label>
            </div>
          </Card>
        ) : null}
        <DialogFooter className="gap-3">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="button"
              onClick={mutate}
              variant={
                isSwitchStateType
                  ? remove === removingSchema.Enum.ACTIVATED
                    ? 'default'
                    : 'destructive'
                  : 'destructive'
              }
            >
              {isSwitchStateType ? (remove === removingSchema.Enum.ACTIVATED ? 'Ativar' : 'Desativar') : 'Deletar'}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
