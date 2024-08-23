import { cn } from '@/app/lib/utils';
import { Oval } from 'react-loader-spinner';

type Props = {
  className?: string;
  visible?: boolean;
};

export default function LoadingSpinner({ className, visible = true }: Props) {
  return (
    <div
      className={cn(
        'flex flex-1 flex-col items-center justify-center',
        className
      )}
    >
      <Oval
        visible={visible}
        color='#f97316'
        secondaryColor='transparent'
        strokeWidth={5}
        height='80'
        width='80'
        ariaLabel='oval-loading'
      />
    </div>
  );
}
