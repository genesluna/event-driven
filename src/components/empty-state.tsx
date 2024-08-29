import { cn } from '@/app/lib/utils';
import { SearchX } from 'lucide-react';

type Props = {
  className?: string;
  message?: string;
};

export default function EmpityState({
  className,
  message = 'Não há eventos',
}: Props) {
  return (
    <div
      className={cn(
        'flex flex-1 flex-col items-center justify-center gap-3',
        className
      )}
    >
      <SearchX className='h-14 w-14' />
      <h3 className='text-lg font-semibold'>{message}</h3>
    </div>
  );
}
