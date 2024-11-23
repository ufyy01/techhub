import { Icon } from '@iconify/react/dist/iconify.js';

const FormSuccess = ({ message }: { message?: string }) => {
  if (!message) return null;
  return (
    <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
      <Icon icon="solar:check-circle-broken" />
      <p>{message}</p>
    </div>
  );
};

export default FormSuccess;
