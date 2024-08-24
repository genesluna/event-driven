import { useLocation, useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { useAppSelector } from '@/app/store/store';
import { push, ref, set } from 'firebase/database';
import { auth, fb } from '@/app/config/firebase';
import { useToast } from '@/app/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

type Props = {
  eventId: string;
  parentId?: string | null;
  setReplyForm?: (values: any) => void;
};

export default function CommentsForm({
  eventId,
  parentId,
  setReplyForm,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    mode: 'onTouched',
    defaultValues: { comment: '' },
  });
  const { authenticated } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  async function onSubmit(data: FieldValues) {
    if (!authenticated)
      return navigate('/auth/login', { state: { from: location.pathname } });
    try {
      const chatRef = ref(fb, `comments/${eventId}`);
      const newChatRef = push(chatRef);
      await set(newChatRef, {
        displayName: auth.currentUser?.displayName,
        photoURL: auth.currentUser?.photoURL,
        uid: auth.currentUser?.uid,
        text: data.comment,
        date: Date.now(),
        parentId: parentId || null,
      });
      if (parentId && setReplyForm)
        setReplyForm({ open: false, commentId: null });
      reset();
    } catch (error: any) {
      toast({
        title: 'Algo não saiu como esperado',
        variant: 'destructive',
        description: error.message,
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
      <Textarea
        {...register('comment', { required: true })}
        placeholder='Envie seu comentário sobre o evento.'
      />
      <Button variant={'secondary'} type='submit' disabled={isSubmitting}>
        {isSubmitting ? (
          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
        ) : null}
        Enviar
      </Button>
    </form>
  );
}
