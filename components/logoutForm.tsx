import { doLogout } from '@/app/actions/authActions';
import React from 'react';
import { Button } from './ui/button';

const LogoutForm = () => {
  return (
    <form action={doLogout}>
      <Button type="submit">Logout</Button>
    </form>
  );
};

export default LogoutForm;
