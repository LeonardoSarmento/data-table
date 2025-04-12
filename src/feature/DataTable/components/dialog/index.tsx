import { DeleteIcon, Power } from 'lucide-react';

import { Button, buttonVariants } from '../ui/button';
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
import { VariantProps } from 'class-variance-authority';

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

function getButtonProps<R>(
  buttonType: DialogType<R>['buttonType'],
  buttonText?: string,
): { icon: React.ReactNode; label: string | null; variant: VariantProps<typeof buttonVariants>['variant'] } {
  switch (buttonType) {
    case 'rowActionRemove':
      return { icon: <DeleteIcon />, label: null, variant: 'outline' };
    case 'rowActionSwitchState':
      return { icon: <Power />, label: null, variant: 'outline' };
    default:
      return { icon: null, label: buttonText ?? 'Deletar', variant: 'destructive' };
  }
}

function getDialogDescription(cardText?: string, isSwitchStateType?: boolean) {
  if (cardText) return cardText;
  return isSwitchStateType
    ? 'Altere o status dos registros selecionados para ativo ou desativado. Essa alteração pode ser desfeita posteriormente, caso necessário.'
    : 'Após excluir os registros selecionados, não é possível recuperar esses registros.';
}

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
  const isActivatedState = remove === removingSchema.enum.ACTIVATED;
  const isDeactivatedState = remove === removingSchema.enum.DEACTIVATED;
  const isTogglingState = isActivatedState || isDeactivatedState;

  const { icon, label, variant } = getButtonProps(buttonType, buttonText);

  const handleOpenChange = (open: boolean) => {
    setFilters({
      ...filters,
      remove: open ? (isSwitchStateType ? removingSchema.enum.DEACTIVATED : removingSchema.enum.REMOVE) : undefined,
    });
  };

  return (
    <Dialog
      {...props}
      defaultOpen={remove === removingSchema.enum.REMOVE || isTogglingState}
      onOpenChange={handleOpenChange}
    >
      <DialogTrigger asChild>
        <ButtonWithTooltip
          variant={variant}
          className={cn('border-brand', className)}
          size="sm"
          tooltipContent={tooltipContent}
        >
          {icon}
          {label}
        </ButtonWithTooltip>
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

        <DialogDescription>{getDialogDescription(cardText, isSwitchStateType)}</DialogDescription>

        {isSwitchStateType && isTogglingState && (
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
        )}

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
