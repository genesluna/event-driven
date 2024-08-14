import MainNav from '@/app/layouts/nav/main-nav';
import MobileNav from '@/app/layouts/nav/mobile-nav';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = false;

  return (
    <div className='flex min-h-screen w-full flex-col'>
      <header className='sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6'>
        <MobileNav />

        <div className='ml-auto flex items-center justify-center md:container'>
          <MainNav isAuthenticated={isAuthenticated} />
        </div>
      </header>
      <main className='flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10'>
        <div className='container'>{children}</div>
      </main>
    </div>
  );
}
