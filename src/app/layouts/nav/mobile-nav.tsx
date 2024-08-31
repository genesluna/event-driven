import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Logo from '@/components/logo';
import { NavLink } from 'react-router-dom';

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
        <SheetHeader>
          <SheetDescription />
        </SheetHeader>
        <SheetTitle className='sr-only'>Menu</SheetTitle>
        <nav className='grid gap-6 text-lg font-medium'>
          <NavLink
            to='/'
            className='flex items-center gap-2 text-lg font-semibold'
          >
            <Logo />
            <span className='text-lg'>EventDriven</span>
          </NavLink>
          <NavLink
            to='/'
            className='text-muted-foreground hover:text-foreground'
          >
            Eventos
          </NavLink>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
