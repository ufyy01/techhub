import Image from 'next/image';
import { Button } from './ui/button';
import { Icon } from '@iconify/react/dist/iconify.js';

const Photocard = ({ url, onClick }: { url: string; onClick: any }) => {
  return (
    <div className="mx-auto">
      <Image src={url} alt="image" width={200} height={150} priority />
      <Button className="mt-2 w-full" type="button" onClick={onClick}>
        <Icon icon="iconamoon:trash-bold" />
      </Button>
    </div>
  );
};

export default Photocard;
