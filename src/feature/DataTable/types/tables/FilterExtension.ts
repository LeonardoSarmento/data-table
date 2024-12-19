import { PaginationState } from '@tanstack/react-table';
import { z } from 'zod';

export type PaginatedData<T> = {
  result: T[];
  rowCount: number;
};

export const selectionSchema = z.enum(['SELECTED', 'NOT_SELECTED']);
export type SelectionType = z.infer<typeof selectionSchema>;

export const selectedIds = z.number().array().optional();
export type SelectedIdsType = z.infer<typeof selectedIds>;

export type PaginationParams = PaginationState;
export type SortParams = { sortBy: `${string}.${'asc' | 'desc'}` };
export type SelectionParams = { selection: SelectionType[]; selectedIds: SelectedIdsType };
export type DateParams = { from: Date; to: Date };
export type Filters<T> = Partial<T & PaginationParams & SortParams & DateParams & SelectionParams>;
