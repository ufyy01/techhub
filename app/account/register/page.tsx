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
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RegisterSchema } from '@/lib/Schemas/RegisterSchema';
import FormError from '@/components/formError';
import FormSuccess from '@/components/formSuccess';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { doRegister } from '@/app/actions/authActions';

type RegisterFormData = z.infer<typeof RegisterSchema>;

const RegisterPage = () => {
  const router = useRouter();
  const [error, setError] = useState('');

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
      role: 'user',
    },
  });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      const formData = new FormData(event.currentTarget);

      const response = await doRegister(formData);

      // if (!!response.error) {
      //   setError(response.error.message);
      // } else {
      //   router.push('/');
      // }
      console.log(response);
    } catch (e) {
      console.error(e);
      setError('Check your Credentials');
    }
  };

  return (
    <div className="w-11/12 mx-auto bg-white rounded-2xl shadow-lg px-8 py-3">
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <div>
            <h3 className="font-bold text-center">Register</h3>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="my-2">
                  <FormLabel>Name*</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="John Doe" type="name" />
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
                    <Input {...field} placeholder="********" type="password" />
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
              name="role"
              render={({ field }) => (
                <FormItem className="my-2">
                  <FormLabel>Role*</FormLabel>
                  <FormControl>
                    <RadioGroup
                      defaultValue="user"
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="user" id="user" />
                        <Label htmlFor="user">User</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="manager" id="manager" />
                        <Label htmlFor="manager">Manger</Label>
                      </div>
                    </RadioGroup>
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
            <FormError />
            <FormSuccess message="Successful" />
          </div>
          <div className="text-center">
            <Button className="mt-3 bg-[#ffa62b]" size="sm">
              Register
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RegisterPage;
