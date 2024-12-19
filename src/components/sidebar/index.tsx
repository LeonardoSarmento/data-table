import { Breadcrumbs } from '@components/BreadcrumbsTSR';
import { Separator } from '@components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@components/ui/sidebar';
import { PropsWithChildren } from 'react';
import { AppSidebar } from './app-sidebar';

export function SidebarComponent({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <header className="flex pt-4 shrink-0 items-center gap-2">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumbs />
            </div>
          </header>
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
