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
import { AtSign, Loader2, RectangleEllipsis, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { string, z } from 'zod';
import { auth } from '@/app/config/firebase';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/app/hooks/use-toast';
import Input from '@/components/ui/input';
import SocialLogin from '../../components/social-login';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';
import { useFireStore } from '@/app/hooks/firestore/use-firestore';

const registerSchema = z
  .object({
    displayName: string().min(6, 'O nome deve ter pelo menos 4 caracteres'),
    email: string().email('Insira um email válido'),
    password: string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
    confirmPassword: string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas devem ser iguais',
    path: ['confirmPassword'],
  });

export default function RegisterForm() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { set } = useFireStore('profiles');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<RegisterData>({
    mode: 'onBlur',
    criteriaMode: 'all',
    resolver: zodResolver(registerSchema),
  });

  type RegisterData = z.infer<typeof registerSchema>;

  async function onSubmit(data: RegisterData) {
    try {
      const userCreds = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await updateProfile(userCreds.user, {
        displayName: data.displayName,
      });
      await set(userCreds.user.uid, {
        displayName: data.displayName,
        email: data.email,
        createdAt: Timestamp.now(),
      });
      navigate('/');
      toast({
        description: 'Conta criada com sucesso!',
      });
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
        <CardTitle>Registrar</CardTitle>
        <CardDescription>
          Insira seu dados para registar uma nova conta.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className='grid gap-4'>
          <div className='grid gap-2'>
            <Input
              label='Nome de usuário'
              type='name'
              id='displayName'
              placeholder='Nome de usuário'
              icon={<User className='h-4 w-4 text-muted-foreground' />}
              errorMessage={errors.displayName?.message}
              {...register('displayName')}
            />
          </div>
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
          <div className='grid gap-2'>
            <Input
              label='Confirmar a senha'
              type='password'
              id='password-confirm'
              placeholder='Confirme a senha'
              icon={
                <RectangleEllipsis className='h-4 w-4 text-muted-foreground' />
              }
              errorMessage={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />
          </div>
          <Button
            type='submit'
            variant='secondary'
            className='mt-3 w-full'
            disabled={!isValid}
          >
            {isSubmitting && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            Registrar
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
