import { selectionSchema } from '../types/tables/FilterExtension';
import { roleSchema } from '../users/types/User';

export const roles = [
  {
    id: roleSchema.Enum.ADMIN,
    label: 'Administrador',
  },
  {
    id: roleSchema.Enum.OPERATOR,
    label: 'Operador',
  },
];

export const selection = [
  {
    id: selectionSchema.Enum.SELECTED,
    label: 'Selecionados',
  },
  {
    id: selectionSchema.Enum.NOT_SELECTED,
    label: 'Não selecionados',
  },
];
