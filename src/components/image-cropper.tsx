import { useRef } from 'react';
import Cropper, { ReactCropperElement } from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { Button } from './ui/button';

type Props = {
  imgSrc: string;
  minWidth: number;
  minHeight: number;
  aspectRatio: number;
  updateImage: (imgBlob: Blob) => Promise<void>;
  closeModal: () => void;
};

export default function ImageCropper({
  updateImage,
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

        updateImage(blob);
      }, 'image/webp');

    closeModal();
  }

  return (
    <div className='flex flex-col gap-4'>
      <Cropper
        className='object-cover'
        src={imgSrc}
        initialAspectRatio={aspectRatio}
        aspectRatio={aspectRatio}
        autoCropArea={aspectRatio}
        minCropBoxWidth={minWidth}
        width={minWidth}
        height={minHeight}
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
