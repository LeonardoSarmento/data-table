import QueryProvider from './query/Query-provider';
import RouterApplication from './router/Router-provider';
import { ThemeProvider } from './theme/Theme-provider';
import 'core-js/stable/atob';

export function Application() {
  return (
    <QueryProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <RouterApplication />
      </ThemeProvider>
    </QueryProvider>
  );
}
