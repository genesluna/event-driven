import { cn } from '@/app/lib/utils';
import { Watch } from 'react-loader-spinner';

type Props = {
  className?: string;
};

export default function LoadingSpinner({ className }: Props) {
  return (
    <div
      className={cn(
        'flex flex-1 flex-col items-center justify-center',
        className
      )}
    >
      <Watch
        visible={true}
        color='#f97316'
        height='80'
        width='80'
        ariaLabel='watch-loading'
      />
      <span className='mt-2 font-semibold text-[#f97316]'>Carregando...</span>
    </div>
  );
}
