import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "../common/data-table";

// Função para remover parâmetros vazios ou padrão
export const cleanEmptyParams = <T extends Record<string, unknown>>(search: T): Partial<T> => {
  const newSearch = { ...search };

  // Remover parâmetros indefinidos ou vazios
  Object.keys(newSearch).forEach((key) => {
    const value = newSearch[key];
    if (value === undefined || value === '' || (typeof value === 'number' && isNaN(value))) {
      delete newSearch[key];
    }
  });

  // Remover pageIndex e pageSize se forem iguais aos valores padrão
  if (search.pageIndex === DEFAULT_PAGE_INDEX) delete newSearch.pageIndex;
  if (search.pageSize === DEFAULT_PAGE_SIZE) delete newSearch.pageSize;

  return newSearch;
};
