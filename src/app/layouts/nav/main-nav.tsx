import { auth } from '@/app/config/firebase';
import { useToast } from '@/app/hooks/use-toast';
import { useAppSelector } from '@/app/store/store';
import Logo from '@/components/logo';
import { ModeToggle } from '@/components/mode-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { signOut } from 'firebase/auth';
import { CirclePlus, CircleUser } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function MainNav() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentUser } = useAppSelector((state) => state.auth);

  async function handleSignOut() {
    await signOut(auth);
    toast({
      description: 'Logout realizado com sucesso!',
    });
    navigate('/');
  }

  return (
    <>
      <nav className='hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
        <NavLink
          to='/'
          className='flex items-center gap-2 text-lg font-semibold md:text-base'
        >
          <Logo />
          <span className='text-xl'>
            event<span className='text-xl text-primary'>driven</span>
          </span>

          <span className='ms-4 text-lg font-thin text-muted-foreground'>
            |
          </span>
        </NavLink>
        <NavLink
          to='/'
          className='text-foreground transition-colors hover:text-foreground'
        >
          Eventos
        </NavLink>
      </nav>
      <div className='flex w-full items-center gap-2 md:ml-auto md:gap-2 lg:gap-4'>
        {!currentUser ? (
          <div className='ml-auto flex gap-2 md:gap-2 lg:gap-4'>
            <Button variant='secondary' onClick={() => navigate('/auth/login')}>
              Entrar
            </Button>
            <Button
              variant='outline'
              onClick={() => navigate('/auth/register')}
            >
              Registrar
            </Button>
          </div>
        ) : (
          <div className='ml-auto flex gap-2 md:gap-2 lg:gap-4'>
            <Button
              variant='secondary'
              className='gap-2'
              onClick={() => navigate('/events/new')}
            >
              <CirclePlus className='h-4 w-4' />
              <span className='sr-only md:not-sr-only'>Novo Evento</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' size='icon' className='rounded-full'>
                  <Avatar>
                    <AvatarImage
                      src={currentUser.photoURL || undefined}
                      alt={currentUser.displayName || 'User'}
                    />
                    <AvatarFallback className='bg-transparent'>
                      <CircleUser className='h-5 w-5' />
                    </AvatarFallback>
                  </Avatar>
                  <span className='sr-only'>Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuLabel>{currentUser.displayName}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => navigate(`/profile/${currentUser.uid}`)}
                >
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuItem>Ajustes</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
        <ModeToggle />
      </div>
    </>
  );
}
