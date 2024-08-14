import Logo from '@/components/logo';
import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CirclePlus, CircleUser } from 'lucide-react';

type MainNavProps = {
  isAuthenticated: boolean;
};

export default function MainNav({ isAuthenticated }: MainNavProps) {
  return (
    <>
      <nav className='hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
        <a
          href='#'
          className='flex items-center gap-2 text-lg font-semibold md:text-base'
        >
          <Logo />
          <span className='text-xl'>
            event<span className='text-xl text-primary'>driven</span>
          </span>

          <span className='ms-4 text-lg font-thin text-muted-foreground'>
            |
          </span>
        </a>
        <a
          href='#'
          className='text-foreground transition-colors hover:text-foreground'
        >
          Eventos
        </a>
        <a
          href='#'
          className='text-muted-foreground transition-colors hover:text-foreground'
        >
          Pessoas
        </a>
      </nav>
      <div className='flex w-full items-center gap-2 md:ml-auto md:gap-2 lg:gap-4'>
        {!isAuthenticated ? (
          <div className='ml-auto flex gap-2 md:gap-2 lg:gap-4'>
            <Button variant='secondary'>Entrar</Button>
            <Button variant='outline'>Registrar</Button>
          </div>
        ) : (
          <div className='ml-auto flex gap-2 md:gap-2 lg:gap-4'>
            <Button variant='secondary' className='gap-2'>
              <CirclePlus className='h-4 w-4' />
              <span className='sr-only md:not-sr-only'>Novo Evento</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' size='icon' className='rounded-full'>
                  <CircleUser className='h-5 w-5' />
                  <span className='sr-only'>Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Ajustes</DropdownMenuItem>
                <DropdownMenuItem>Suporte</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Sair</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
        <ModeToggle />
      </div>
    </>
  );
}
