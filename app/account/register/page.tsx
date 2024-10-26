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
import Swal from 'sweetalert2';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RegisterSchema } from '@/lib/Schemas/RegisterSchema';
import FormError from '@/components/formError';
import FormSuccess from '@/components/formSuccess';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import 'animate.css';

type RegisterFormData = z.infer<typeof RegisterSchema>;

const RegisterPage = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      role: 'user',
    },
  });

  const onSubmit = async () => {
    setError('');
    try {
      if (!user.email || !user.name || !user.password) {
        setError('All fields are required');
        return;
      }

      if (user.password !== user.confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      const signMethod = {
        method: 'POST',
        body: JSON.stringify(user),
        headers: { 'Content-Type': 'application/json' },
      };

      fetch(`${process.env.NEXT_PUBLIC_PROXY_URL}/user`, signMethod)
        .then((response) => response.json())
        .then((result) => {
          if (result.status === 400) {
            setError(result.message);
          } else {
            Swal.fire({
              icon: 'success',
              text: `${result.message}`,
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
            router.push(`${process.env.NEXT_PUBLIC_URL}/account/login`);
          }
        });
    } catch (e) {
      console.error(e);
      setError('Check your Credentials');
    }
  };

  return (
    <div className="w-11/12 mx-auto bg-white rounded-2xl shadow-lg px-8 py-3">
      <Form {...form}>
        <form action={onSubmit}>
          <div>
            <h3 className="font-bold text-center">Register</h3>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="my-2">
                  <FormLabel>Name*</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="John Doe"
                      type="name"
                      name="name"
                      value={user.name}
                      onChange={handleChange}
                    />
                  </FormControl>

                  {form.formState.errors.name && (
                    <FormMessage>
                      {form.formState.errors.name.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
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
                      value={user.email}
                      name="email"
                      onChange={handleChange}
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
                      value={user.password}
                      name="password"
                      onChange={handleChange}
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="my-2">
                  <FormLabel>Confirm Password*</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="********"
                      type="password"
                      value={user.confirmPassword}
                      name="confirmPassword"
                      onChange={handleChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="my-2 flex">
                  <FormLabel>Role*</FormLabel>
                  <FormLabel className="flex items-center gap-2">
                    <input
                      {...field}
                      type="radio"
                      value="user"
                      name="role"
                      checked={user.role === 'user'}
                      onChange={handleChange}
                    />
                    User
                  </FormLabel>
                  <FormLabel className="ms-4 flex items-center gap-2">
                    <Input
                      {...field}
                      type="radio"
                      value="manager"
                      name="role"
                      checked={user.role === 'manager'}
                      onChange={handleChange}
                    />
                    Manager
                  </FormLabel>
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
            <FormSuccess />
          </div>
          <div className="text-center">
            <Button className="mt-3" size="sm" type="submit">
              Register
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RegisterPage;
