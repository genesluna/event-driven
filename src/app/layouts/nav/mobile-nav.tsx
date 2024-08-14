import { Menu } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '../../../components/ui/sheet';
import Logo from '../../../components/logo';

export default function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline' size='icon' className='shrink-0 md:hidden'>
          <Menu className='h-5 w-5' />
          <span className='sr-only'>Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='left'>
        <nav className='grid gap-6 text-lg font-medium'>
          <a href='#' className='flex items-center gap-2 text-lg font-semibold'>
            <Logo />
            <span className='text-lg'>EventDriven</span>
          </a>
          <a href='#' className='text-muted-foreground hover:text-foreground'>
            Eventos
          </a>
          <a href='#' className='text-muted-foreground hover:text-foreground'>
            Pessoas
          </a>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
