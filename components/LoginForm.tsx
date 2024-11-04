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
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import FormError from './formError';
import Swal from 'sweetalert2';

type LoginFormData = z.infer<typeof LoginSchema>;

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>('');
  const [pending, startTransition] = useTransition();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    setError('');

    startTransition(() => {
      doLogin(data).then((data) => {
        if (data?.error) {
          setError(data?.error);
        } else {
          Swal.fire({
            icon: 'success',
            text: `Login successful! 🎉`,
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1500,
            showClass: {
              popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `,
            },
            hideClass: {
              popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `,
            },
          });
        }
      });
    });
  };

  return (
    <div className="bg-white w-full px-3 py-3 lg:pt-10 ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full px-2">
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
                      disabled={pending}
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
                    <Input
                      {...field}
                      placeholder="********"
                      type="password"
                      disabled={pending}
                    />
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
            <Button className="mt-3" size="sm" type="submit">
              {pending ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginPage;
