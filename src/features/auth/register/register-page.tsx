import RegisterForm from './components/register-form';
import { useAppSelector } from '@/app/store/store';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const { authenticated } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  if (authenticated) {
    navigate('/');
    return null;
  }

  return (
    <div className='flex flex-col items-center justify-center'>
      <RegisterForm />
    </div>
  );
}
