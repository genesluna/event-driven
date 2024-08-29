import { cn } from '@/app/lib/utils';
import { ImgHTMLAttributes, useState } from 'react';

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  placeholderSrc?: string;
  className?: string;
};

export default function Image({ placeholderSrc, className, ...props }: Props) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className={cn(
        `bg-cover bg-center bg-no-repeat`,
        `${placeholderSrc ? `bg-[url("${placeholderSrc}")]` : ''}`,
        { 'blur-[10px]': isLoading && placeholderSrc }
      )}
    >
      <img
        {...props}
        className={cn(
          'block h-full w-full object-cover object-center opacity-0 transition-opacity duration-300 ease-in-out',
          { 'opacity-100': !isLoading },
          className
        )}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}
