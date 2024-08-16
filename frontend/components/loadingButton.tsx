'use client';
import { Button } from './ui/button';
import { useFormStatus } from 'react-dom';

const LoadingButton = () => {
  const { pending } = useFormStatus();
  return (
    <div>
      <Button disabled={pending}>
        {pending && <span>Loading...</span>}
        {!pending && <span>Submit</span>}
      </Button>
    </div>
  );
};

export default LoadingButton;
