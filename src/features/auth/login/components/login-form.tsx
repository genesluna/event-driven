import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { zodResolver } from '@hookform/resolvers/zod';
import { AtSign, Loader2, RectangleEllipsis } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { string, z } from 'zod';
import SocialLogin from '../../components/social-login';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/config/firebase';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/app/hooks/use-toast';
import Input from '@/components/ui/input';

const loginSchema = z.object({
  email: string().email('Insira um email válido'),
  password: string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

export default function LoginForm() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginData>({
    mode: 'onBlur',
    criteriaMode: 'all',
    resolver: zodResolver(loginSchema),
  });

  type LoginData = z.infer<typeof loginSchema>;

  async function handleLogin(data: LoginData) {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast({
        description: 'Login realizado com sucesso!',
      });
      navigate('/');
    } catch (error: any) {
      toast({
        title: 'Algo não saiu como esperado',
        variant: 'destructive',
        description: error.message,
      });
    }
  }

  return (
    <Card className='w-full max-w-sm sm:max-w-md'>
      <CardHeader>
        <CardTitle>Entrar</CardTitle>
        <CardDescription>
          Insira seu dados para entrar no aplicativo.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(handleLogin)}>
        <CardContent className='grid gap-4'>
          <div className='grid gap-2'>
            <Input
              label='Email'
              type='email'
              id='email'
              placeholder='Email'
              icon={<AtSign className='h-4 w-4 text-muted-foreground' />}
              errorMessage={errors.email?.message}
              {...register('email')}
            />
          </div>
          <div className='grid gap-2'>
            <Input
              label='Senha'
              type='password'
              id='password'
              placeholder='Senha'
              icon={
                <RectangleEllipsis className='h-4 w-4 text-muted-foreground' />
              }
              errorMessage={errors.password?.message}
              {...register('password')}
            />
          </div>
          <Button
            type='submit'
            variant='secondary'
            className='mt-3 w-full'
            disabled={!isValid}
          >
            {isSubmitting ? (
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            ) : null}
            Entrar
          </Button>
        </CardContent>
      </form>
      <CardFooter className='grid gap-4'>
        <hr className='mb-4 mt-2 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-600 to-transparent opacity-25 dark:via-neutral-300' />
        <SocialLogin />
      </CardFooter>
    </Card>
  );
}
