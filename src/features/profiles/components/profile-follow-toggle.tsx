import { batchFollowToggle } from '@/app/actions/firestore-actions';
import { useAppDispatch } from '@/app/store/store';
import { auth, db } from '@/app/config/firebase';
import { useToast } from '@/app/hooks/use-toast';
import { doc, getDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Profile } from '@/app/types/profile';
import { useEffect, useState } from 'react';
import { actions } from '../profile-slice';
import { Loader2, UserRoundCheck, UserRoundX } from 'lucide-react';

type Props = {
  profile: Profile;
};

export default function ProfileFollowToggle({ profile }: Props) {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  useEffect(() => {
    const docRef = doc(
      db,
      `profiles/${profile.id}/followers/${auth.currentUser?.uid}`
    );
    getDoc(docRef).then((docSnap) => {
      dispatch(
        actions.setFollowing({
          id: profile.id,
          isFollowing: docSnap.exists(),
        })
      );
    });
  }, [dispatch, profile.id]);

  async function handleFollowToggle(follow: boolean) {
    if (!profile.id || !auth.currentUser?.uid) return;
    setLoading(true);
    try {
      await batchFollowToggle(profile, follow);
      dispatch(actions.setFollowing({ id: profile.id, isFollowing: follow }));
    } catch (error: any) {
      toast({
        title: 'Algo não saiu como esperado',
        variant: 'destructive',
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      size={'sm'}
      variant={'default'}
      onClick={() => handleFollowToggle(!profile.isFollowing)}
    >
      {loading ? (
        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
      ) : profile.isFollowing ? (
        <UserRoundX className='mr-2 h-4 w-4' />
      ) : (
        <UserRoundCheck className='mr-2 h-4 w-4' />
      )}
      {profile.isFollowing ? 'Deixar de seguir' : 'Seguir'}
    </Button>
  );
}
