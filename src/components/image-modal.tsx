import { CircleX } from 'lucide-react';
import { Label } from './ui/label';
import { useState } from 'react';
import { useToast } from '@/app/hooks/use-toast';
import LoadingSpinner from './loadind-spinner';
import ImageCropper from './image-cropper';
import 'react-image-crop/dist/ReactCrop.css';

type Props = {
  file: File;
  updateCoverImage: (imgBlob: Blob) => Promise<void>;
  closeModal: () => void;
};

const ImageModal = ({ updateCoverImage, closeModal, file }: Props) => {
  const [imgSrc, setImgSrc] = useState<string>('');
  const [isValid, setIsvalid] = useState<boolean>(false);
  const { toast } = useToast();

  const ASPECT_RATIO = 970 / 459;
  const MIN_WIDTH = 970;
  const MIN_HEIGHT = 459;

  const reader = new FileReader();
  reader.addEventListener('load', () => {
    const imageElement = new Image();
    const imageUrl = reader.result?.toString() || '';
    imageElement.src = imageUrl;

    imageElement.addEventListener('load', (e) => {
      if (!e.currentTarget) return;

      const { naturalWidth, naturalHeight } =
        e.currentTarget as HTMLImageElement;

      if (naturalWidth < MIN_WIDTH || naturalHeight < MIN_HEIGHT) {
        setIsvalid(false);
        toast({
          title: 'Algo não saiu como esperado',
          variant: 'destructive',
          description: `A imagem deve ter pelo menos ${MIN_WIDTH} x ${MIN_HEIGHT} pixels.`,
        });
        setImgSrc('');

        return closeModal();
      }
      setIsvalid(true);
    });
    setImgSrc(imageUrl);
  });

  reader.readAsDataURL(file);

  if (!isValid) return null;

  return (
    <div
      className='relative z-50'
      aria-labelledby='crop-image-dialog'
      role='dialog'
      aria-modal='true'
    >
      <div className='fixed inset-0 bg-gray-900 bg-opacity-20 backdrop-blur-sm transition-all'></div>
      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full justify-center px-2 py-12 text-center'>
          <div className='relative h-fit w-[95%] rounded-2xl border bg-background text-left text-foreground shadow-xl transition-all sm:max-w-4xl'>
            <div className='flex flex-col p-5'>
              <button
                type='button'
                className='absolute right-4 top-3 inline-flex items-center justify-center rounded-md p-1 text-foreground hover:bg-muted focus:outline-none'
                onClick={closeModal}
              >
                <span className='sr-only'>Close menu</span>
                <CircleX />
              </button>
              <Label className='mb-6'>Cortar a imagem</Label>
              {!imgSrc ? (
                <LoadingSpinner />
              ) : (
                <ImageCropper
                  aspectRatio={ASPECT_RATIO}
                  minWidth={MIN_WIDTH}
                  minHeight={MIN_HEIGHT}
                  updateCoverImage={updateCoverImage}
                  closeModal={closeModal}
                  imgSrc={imgSrc}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ImageModal;
