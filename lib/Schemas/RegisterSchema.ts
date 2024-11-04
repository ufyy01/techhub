import * as z from 'zod';

export const RegisterSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  password: z.string().min(1, {
    message: 'Password is required',
  }),
  confirmPassword: z.string(),
  name: z.string().min(1, {
    message: 'Name is required',
  }),
  role: z.enum(['user', 'admin', 'manager']),
});
