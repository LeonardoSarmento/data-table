import { ErrorComponent } from '@components/ErrorComponent';
import { NotFoundComponent } from '@components/NotFoundComponent';
import { Outlet, ScrollRestoration, createRootRouteWithContext } from '@tanstack/react-router';
import { Toaster } from 'sonner';
import { DevTools } from '@components/DevTools';
import { SidebarComponent } from '@components/sidebar';
import { QueryClient } from '@tanstack/react-query';

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});


function RootComponent() {
  return (
    <SidebarComponent>
      <div className="max-lg:w-screen px-3">
        <ScrollRestoration getKey={(location) => location.pathname} />
        <Outlet />
      </div>
      <Toaster richColors closeButton />
      <DevTools />
    </SidebarComponent>
  );
}
