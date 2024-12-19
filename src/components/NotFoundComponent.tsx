import { useRouter } from '@tanstack/react-router';
import { CardContent, CardDescription, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { SidebarComponent } from './sidebar';

export function NotFoundComponent() {
  const router = useRouter();
  return (
    <SidebarComponent>
      <div className="my-auto flex flex-col items-center justify-center gap-2">
        <CardContent className="flex flex-col items-center justify-center gap-3">
          <CardTitle className="mt-4">Ops... Parece que a URL foi escrita de forma incorreta</CardTitle>
          <CardDescription>Tente acessar a página novamente</CardDescription>
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
              router.history.back();
            }}
            type="button"
          >
            Voltar
          </Button>
        </div>
      </div>
    </SidebarComponent>
  );
}
