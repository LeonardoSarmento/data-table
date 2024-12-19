import { useRouter } from '@tanstack/react-router';
import { CardContent, CardDescription, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { SidebarComponent } from './sidebar';

export function ErrorComponent() {
  const router = useRouter();
  return (
    <SidebarComponent>
      <div className="flex flex-col items-center justify-center gap-2">
        <CardContent className="flex flex-col items-center justify-center gap-3">
          <CardTitle className="mt-4">Alguma coisa quebrou inesperadamente</CardTitle>
          <CardDescription>Entre em contato com o superior responsável</CardDescription>
        </CardContent>
        <div className="flex gap-3">
          <Button
            onClick={(e) => {
              e.preventDefault();
              router.navigate({ to: '/' });
            }}
            type="button"
          >
            Home
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              router.navigate({ to: '..' });
            }}
            type="button"
          >
            Voltar
          </Button>
        </div>
      </div>
      <div />
    </SidebarComponent>
  );
}
