import { auth } from '@/app/config/firebase';
import { useFireStore } from '@/app/hooks/firestore/use-firestore';
import { Profile } from '@/app/types/profile';
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { updateProfile } from 'firebase/auth';
import { Link2, Loader2, User } from 'lucide-react';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

type Props = {
  profile: Profile;
  onEditStart: () => void;
  onEditEnd: () => void;
};

export default function ProfileEdit({
  profile,
  onEditStart,
  onEditEnd,
}: Props) {
  const { update } = useFireStore('profiles');
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      displayName: profile.displayName,
      bio: profile.bio,
      website: profile.website,
    },
  });

  async function onSubmit(data: FieldValues) {
    await update(profile.id, data);
    if (profile.displayName !== data.displayName) {
      await updateProfile(auth.currentUser!, {
        displayName: data.displayName,
      });
    }
    setOpen(false);
    onEditEnd();
  }

  return !open ? (
    <Button
      size={'sm'}
      variant={'secondary'}
      onClick={() => {
        setOpen(true);
        onEditStart();
      }}
    >
      Editar perfil
    </Button>
  ) : (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='mt-4 flex flex-col gap-3'
    >
      <Input
        label={'Nome de usuário'}
        {...register('displayName')}
        icon={<User className='h-4 w-4 text-muted-foreground' />}
        disabled
      />
      <Label className='-mb-2 ms-1 text-sm'>Bio</Label>
      <Textarea {...register('bio')} placeholder='Adicione uma bio' />
      <Input
        label='Wesite'
        placeholder='Seu website'
        icon={<Link2 className='h-4 w-4 text-muted-foreground' />}
        {...register('website')}
      />
      <div className='flex justify-end gap-2'>
        <Button
          size={'sm'}
          type='reset'
          variant={'secondary'}
          onClick={() => {
            setOpen(false);
            onEditEnd();
          }}
        >
          Cancelar
        </Button>
        <Button size={'sm'} variant={'secondary'} type='submit'>
          {isSubmitting && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          Salvar
        </Button>
      </div>
    </form>
  );
}
