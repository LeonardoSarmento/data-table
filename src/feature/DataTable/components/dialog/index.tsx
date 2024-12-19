import React from 'react';

import { DeleteIcon } from 'lucide-react';

import { Button, ButtonProps } from '../ui/button';
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

type DialogType = {
  title: string;
  description?: string;
  buttonText?: string;
  mutate?: () => void;
  buttonType?: 'rowAction' | 'button';
} & ButtonProps;

export const DialogComponent = React.forwardRef<HTMLButtonElement, DialogType>(
  ({ title, buttonText, mutate, buttonType = 'button', ...props }, ref) => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button {...props} ref={ref} variant={buttonType === 'rowAction' ? 'outline' : 'destructive'}>
            {buttonType === 'rowAction' ? <DeleteIcon /> : buttonText ? buttonText : 'Deletar'}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              Após excluir os registros selecionados, não é possível recuperar esses registros.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="button" onClick={mutate} variant="destructive">
                Deletar
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
);
