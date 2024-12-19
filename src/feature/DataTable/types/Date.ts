import { z } from 'zod';

export const DateSchema = z.date({
  required_error: 'A data é obrigatória.',
});
export type DateType = z.infer<typeof DateSchema>;

export const DateRangeSchema = z.object(
  {
    from: z.date().nullable().optional(),
    to: z.date().nullable().optional(),
  },
  {
    required_error: 'A data é obrigatória.',
  },
);
export type DateRangeType = z.infer<typeof DateRangeSchema>;

export const DateLocaleSchema = z.enum(['pt-BR', 'en-US', 'zh-CN', 'es', 'fr']);
export type DateLocaleType = z.infer<typeof DateLocaleSchema>;

export const DateModeSchema = z.enum(['single', 'range']);
export type ModeSchemaType = z.infer<typeof DateModeSchema>;
