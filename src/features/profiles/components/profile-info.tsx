import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import ImageCropperModal from '@/components/image-cropper-modal';
import { batchSetPhoto } from '@/app/actions/firestore-actions';
import { auth, storage } from '@/app/config/firebase';
import { ChangeEvent, useRef, useState } from 'react';
import { useAppSelector } from '@/app/store/store';
import { useToast } from '@/app/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { getInitials } from '@/app/lib/utils';
import { Profile } from '@/app/types/profile';
import { Pencil, Users } from 'lucide-react';
import { updateProfile } from 'firebase/auth';

type Props = {
  profile: Profile;
};

export default function ProfileInfo({ profile }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const inputFile = useRef<HTMLInputElement | null>(null);
  const imageFile = useRef<File | null>(null);
  const { currentUser } = useAppSelector((state) => state.auth);
  const { toast } = useToast();
  const isProfileOwner = currentUser?.uid === profile.id;

  async function updateAvatarImage(imgBlob: Blob) {
    const storageRef = ref(
      storage,
      `${currentUser?.uid}/profile_images/avatar.webp`
    );

    try {
      toast({
        description: 'Alterando imagem de perfil.',
      });

      await uploadBytes(storageRef, imgBlob);
      await getDownloadURL(storageRef).then(async (url) => {
        handleSetAvatar(url);
      });
      toast({
        description: 'Imagem de perfil alterada com sucesso.',
      });
    } catch (error: any) {
      toast({
        title: 'Algo não saiu como esperado',
        variant: 'destructive',
        description: error.message,
      });
    }
  }

  async function handleSetAvatar(url: string) {
    await batchSetPhoto(url);
    await updateProfile(auth.currentUser!, {
      photoURL: url,
    });
  }

  function handleImageUpdateButtonClick(): void {
    inputFile.current?.click();
  }

  function handleFileSelect(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      imageFile.current = file;
      setModalOpen(true);
    }
  }

  function handleCloseModal(): void {
    setModalOpen(false);
    imageFile.current = null;
  }

  return (
    <div className='flex w-fit flex-col gap-2'>
      {modalOpen && imageFile.current && (
        <ImageCropperModal
          file={imageFile.current}
          minWidth={240}
          minHeight={240}
          aspectRatio={1}
          updateImage={updateAvatarImage}
          closeModal={handleCloseModal}
        />
      )}
      <div className='relative'>
        <Avatar className='h-60 w-60'>
          <AvatarImage
            src={profile.photoURL || undefined}
            alt={profile.displayName || 'User'}
          />
          <AvatarFallback className='border bg-background text-5xl dark:bg-secondary'>
            {getInitials(profile.displayName!)}
          </AvatarFallback>
        </Avatar>
        {isProfileOwner && (
          <Button
            variant={'outline'}
            size='icon'
            className='absolute bottom-4 right-4 z-10 rounded-full'
            onClick={() => handleImageUpdateButtonClick()}
          >
            <Pencil className='h-4 w-4' />
            <input
              ref={inputFile}
              type='file'
              accept='image/png, image/webp, image/jpeg,'
              className='display-none hidden'
              onChange={handleFileSelect}
            />
          </Button>
        )}
      </div>
      <span className='mt-2 text-xl font-semibold'>{profile.displayName}</span>
      <span className='text-basis -mt-2 text-muted-foreground'>
        {profile.email}
      </span>
      <span>{profile.bio}</span>
      {isProfileOwner ? (
        <Button size={'sm'} variant={'secondary'}>
          Editar perfil
        </Button>
      ) : (
        <Button size={'sm'} variant={'default'}>
          Seguir
        </Button>
      )}
      <div className='text-basis flex items-center text-muted-foreground'>
        <Users className='mr-2 h-3 w-3' />
        {`${profile.followerCount ? profile.followerCount : 0} seguidores - ${
          profile.followingCount ? profile.followingCount : 0
        } seguindo`}
      </div>
    </div>
  );
}
