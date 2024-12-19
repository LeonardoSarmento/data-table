import { TanStackRouterDevtools } from '@components/DevTools/TanStackRouterDevtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Suspense } from 'react';

export function DevTools() {
  return (
    <Suspense>
      <ReactQueryDevtools initialIsOpen={false} />
      <TanStackRouterDevtools position="bottom-left" />
    </Suspense>
  );
}
