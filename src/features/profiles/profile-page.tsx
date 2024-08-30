import { useFireStore } from '@/app/hooks/firestore/use-firestore';
import LoadingSpinner from '@/components/loadind-spinner';
import { useNavigate, useParams } from 'react-router-dom';
import ProfileInfo from './components/profile-info';
import ProfileFeed from './components/profile-feed';
import { useAppSelector } from '@/app/store/store';
import EmpityState from '@/components/empty-state';
import { actions } from './profile-slice';
import { useEffect } from 'react';

export default function ProfilePage() {
  const { id } = useParams();
  const { status, data } = useAppSelector((state) => state.profiles);
  const profile = data.find((x) => x.id === id);
  const { loadDocument } = useFireStore('profiles');
  const { authenticated } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (id && authenticated) {
      loadDocument(id, actions);
    } else {
      navigate('/auth/login');
    }
  }, [id, authenticated, navigate, loadDocument]);

  if (status === 'loading') return <LoadingSpinner />;

  if (!profile) return <EmpityState message='Perfil não encontrado' />;

  return (
    <section className='flex flex-grow flex-col justify-center gap-8 lg:flex-row lg:gap-16'>
      <ProfileInfo profile={profile} />
      <ProfileFeed profile={profile} />
    </section>
  );
}
