import { useRef } from 'react';
import Cropper, { ReactCropperElement } from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { Button } from './ui/button';

type Props = {
  imgSrc: string;
  minWidth: number;
  minHeight: number;
  aspectRatio: number;
  updateCoverImage: (imgBlob: Blob) => Promise<void>;
  closeModal: () => void;
};

export default function ImageCropper({
  updateCoverImage,
  closeModal,
  imgSrc,
  minWidth,
  minHeight,
  aspectRatio,
}: Props) {
  const cropperRef = useRef<ReactCropperElement>(null);

  function handleCropSelection() {
    const cropper = cropperRef.current?.cropper;
    cropper
      ?.getCroppedCanvas({
        width: minWidth,
        height: minHeight,
        imageSmoothingEnabled: false,
        imageSmoothingQuality: 'high',
      })
      .toBlob((blob) => {
        if (!blob) return;

        updateCoverImage(blob);
      }, 'image/webp');

    closeModal();
  }

  return (
    <div className='flex flex-col gap-4'>
      <Cropper
        className='max-h-[70vh] w-full object-cover'
        src={imgSrc}
        initialAspectRatio={aspectRatio}
        aspectRatio={aspectRatio}
        autoCropArea={aspectRatio}
        minCropBoxWidth={minWidth}
        cropBoxResizable={false}
        background={false}
        zoomable={false}
        responsive={true}
        guides={false}
        viewMode={1}
        ref={cropperRef}
      />
      <Button variant={'secondary'} onClick={() => handleCropSelection()}>
        Salvar nova imagem
      </Button>
    </div>
  );
}
