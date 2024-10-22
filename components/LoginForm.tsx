'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LoginSchema } from '@/lib/Schemas/LoginSchema';
import { doLogin } from '@/app/actions/authActions';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import FormError from './formError';

type LoginFormData = z.infer<typeof LoginSchema>;

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState('');

  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      const formData = new FormData(event.currentTarget);

      const response = await doLogin(formData);

      if (!!response.error) {
        setError(response.error.message);
      } else {
        router.push('/');
      }
    } catch (e) {
      console.error(e);
      setError('Check your Credentials');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <div>
          <h3 className="font-bold text-center">Login</h3>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email*</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="example@gmail.com"
                    type="email"
                  />
                </FormControl>

                {form.formState.errors.email && (
                  <FormMessage>
                    {form.formState.errors.email.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="my-2">
                <FormLabel>Password*</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="********" type="text" />
                </FormControl>

                {form.formState.errors.password && (
                  <FormMessage>
                    {form.formState.errors.password.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormError message={error} />
        </div>
        <div className="text-center">
          <Button className="mt-3" size="sm">
            Login
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LoginPage;
