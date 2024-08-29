import { useNavigate } from 'react-router-dom';
import { HeartCrack } from 'lucide-react';
import { Button } from './ui/button';

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className='flex flex-grow flex-col items-center justify-center'>
      <div className='-mt-28 w-full max-w-md space-y-6 text-center'>
        <HeartCrack className='mx-auto h-40 w-40 transition duration-700 ease-in-out hover:text-destructive' />
        <div className='space-y-2'>
          <h1 className='text-4xl font-bold'>Oops! Pagina não encontrada.</h1>
          <p className='text-muted-foreground'>
            A página que você está procurando não existe ou foi movida.
          </p>
        </div>
        <Button onClick={() => navigate('/')}>Voltar para Casa</Button>
      </div>
    </div>
  );
}
