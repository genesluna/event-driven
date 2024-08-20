import MainNav from '@/app/layouts/nav/main-nav';
import MobileNav from '@/app/layouts/nav/mobile-nav';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex min-h-screen w-full flex-col'>
      <header className='sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6'>
        <MobileNav />

        <div className='ml-auto flex items-center justify-center md:container'>
          <MainNav />
        </div>
      </header>
      <main className='flex min-h-[calc(100vh_-_theme(spacing.16))] bg-muted p-4 dark:bg-muted/40 md:gap-8 md:px-10 md:pb-0 md:pt-10'>
        <div className='container flex flex-1 flex-col gap-4 px-0 sm:px-8'>
          {children}
        </div>
      </main>
    </div>
  );
}
