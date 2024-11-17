'use client';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Dispatch, SetStateAction, useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { MapPin } from 'lucide-react';
import { Hubs } from './nearme';
import { useRouter } from 'next/navigation';

interface Hub {
  _id: string;
  name: string;
  username: string;
  password: string;
  images: Array<{
    public_id: string;
    secure_url: string;
  }>;
  address: string;
  state: string;
  schedule: string[];
  dist: {
    calculated: number;
  };
  hubClaimed: boolean;
}

const NearMeCard = ({
  hub,
  setHubs,
  cards,
  index,
}: {
  hub: Hub;
  cards: Hub[];
  setHubs: Dispatch<SetStateAction<Hubs | null>>;
  index: number;
}) => {
  const x = useMotionValue(0);
  const rotateRaw = useTransform(x, [-150, 150], [-5, 5]);
  const [showCancel, setShowCancel] = useState(false);
  const [showGo, setShowGo] = useState(false);

  const router = useRouter();

  const isFront = hub._id === cards[0]._id;

  const rotate = useTransform(() => {
    const offset = isFront ? 0 : index % 2 ? 3 : -3;
    return `${rotateRaw.get() + offset}deg`;
  });

  const handleDragEnd = () => {
    if (Math.abs(x.get()) > 70) {
      setHubs((prevHubs) => {
        if (!prevHubs) return prevHubs;
        const updatedData = prevHubs.data.filter(
          (card) => card._id !== hub._id
        );
        return {
          ...prevHubs,
          data: updatedData,
        };
      });
    }
  };

  const handleDrag = () => {
    setShowCancel(x.get() < 0);
    setShowGo(x.get() > 0);
    if (x.get() > 60) {
      router.push(`/get-hubs/${hub._id}`);
    }
  };

  return (
    <motion.div
      key={hub._id}
      style={{
        gridRow: 1,
        gridColumn: 1,
        x,
        rotate,
        transition: '0.125s transform',
        zIndex: index === 0 ? 100 : 100 - index,
      }}
      className={`w-10/12 lg:w-9/12 rounded-xl hover:cursor-grab active:cursor-grabbing relative origin-bottom `}
      drag="x"
      dragConstraints={{ left: 50, right: 50 }}
      onDragEnd={handleDragEnd}
      onDrag={handleDrag}
      animate={{ scale: isFront ? 1 : 0.98 }}
    >
      <div className="relative w-full h-[350px] lg:h-[450px]">
        {hub.images.length > 0 && (
          <Image
            src={hub.images[0]['secure_url']}
            alt="hub"
            priority
            fill
            className="object-cover rounded-xl "
            draggable="false"
          />
        )}
      </div>
      {showCancel && (
        <div
          style={{
            position: 'absolute',
            top: '40%',
            zIndex: 100,
          }}
        >
          <Icon
            icon="ic:outline-cancel"
            style={{
              width: '100',
              height: '100',
              color: 'red',
            }}
          />
        </div>
      )}
      {showGo && (
        <div
          style={{
            position: 'absolute',
            top: '40%',
            right: '2%',
            zIndex: 100,
          }}
        >
          <Icon
            icon="mdi:arrow"
            style={{
              width: '100',
              height: '100',
              color: '#fc045c',
            }}
          />
        </div>
      )}
      <div className="mt-2 absolute bottom-3 right-3 z-20">
        <h2 className={cn('text-xl mx-1 text-white mb-2')}>{hub.name}</h2>
        <div className="flex justify-end text-[#fc045c] text-xl">
          <MapPin />
          <p>{hub.state}</p>
        </div>
      </div>
      <div className="mt-2 absolute top-3 left-3 z-20 ">
        <div className="flex text-[#fc045c] text-base gap-2 font-bold">
          <Icon icon="gis:map-poi" />
          <p>{Math.ceil(hub.dist.calculated).toLocaleString()}m</p>
        </div>
      </div>
      <div className="z-10 bg-black/40 hover:bg-black/10 absolute top-0 bottom-0 w-full h-full"></div>
    </motion.div>
  );
};

export default NearMeCard;
