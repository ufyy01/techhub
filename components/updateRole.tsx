'use client';

import { Icon } from '@iconify/react/dist/iconify.js';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from './ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from './ui/button';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

interface User {
  email: string | null | undefined;
  role: 'user' | 'manager' | 'admin';
}
const UpdateRole = ({ user }: { user: User }) => {
  const router = useRouter();

  const handleUpdate = async (formData: FormData) => {
    const user = {
      email: formData.get('email'),
      role: formData.get('role'),
    };

    const signMethod = {
      method: 'PATCH',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' },
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_PROXY_URL}/user`,
        signMethod
      );
      const result = await response.json();

      if (response.status === 400) {
        await Swal.fire({
          icon: 'error',
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
      } else {
        const sessionResponse = await fetch('/api/auth/session', {
          method: 'GET',
        });

        if (sessionResponse.ok) {
          console.log('Session refreshed successfully');
        } else {
          console.error('Failed to refresh session');
        }
        await Swal.fire({
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
        // Optionally refresh the page or update the UI
        router.refresh();
      }
    } catch (error) {
      console.error('Error updating user:', error);
      await Swal.fire({
        icon: 'error',
        text: `An unexpected error occurred. Please try again.`,
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
  };

  return (
    <>
      {user && (
        <Dialog>
          <DialogTrigger>
            <Icon icon="bxs:edit" />
          </DialogTrigger>
          <DialogContent className="glass">
            <DialogHeader>
              <DialogTitle className="text-center text-white">
                Update Profile
              </DialogTitle>
              <DialogDescription className="text-white">
                <form action={handleUpdate}>
                  <p className="my-3">Email: </p>
                  <Input
                    placeholder="John Doe"
                    type="email"
                    name="email"
                    className="my-3"
                    value={user.email!}
                  />
                  <p className="my-3">Role: </p>

                  <RadioGroup name="role" defaultValue={user.role}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="user" id="user" />
                      <Label htmlFor="user">User</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="manager" id="manager" />
                      <Label htmlFor="manager">Manager</Label>
                    </div>
                  </RadioGroup>

                  <div>
                    <p className="text-xs my-2 text-center">
                      Note that changing your role will affect the app features
                      available to you
                    </p>
                  </div>
                  <div className="my-3 flex justify-center">
                    <DialogClose asChild>
                      <Button size="sm" type="submit">
                        Update
                      </Button>
                    </DialogClose>
                  </div>
                </form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default UpdateRole;
