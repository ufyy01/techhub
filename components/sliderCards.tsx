'use client';
import { cn } from '@/lib/utils';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const SliderCards = ({
  text,
  color,
  list,
  url,
  side,
}: {
  text: string;
  color: string;
  list?: string[];
  url: string;
  side?: string;
}) => {
  return (
    <div
      className={cn(
        'h-[65vh] md:h-screen md:fixed md:w-6/12 absolute shadow-inner shadow-slate-400',
        side === 'right'
          ? `md:rounded-tl-[20%] md:rounded-bl-[10%]`
          : 'md:rounded-tr-[20%] md:rounded-br-[10%]'
      )}
      style={{ backgroundColor: color }}
    >
      <div className={cn('flex flex-col justify-center items-center h-full')}>
        <div className="lg:w-[450px]">
          <DotLottieReact src={url} loop autoplay />
        </div>
        <p className="text-white text-xl font-bold">{text}</p>
        <ul className="text-center">
          {list &&
            list.map((item, index) => (
              <li key={index} className="text-white text-xs py-1 px-4">
                {item}
              </li>
            ))}
        </ul>
      </div>
      <div className="w-full -mt-1 md:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill={color}
            fillOpacity="1"
            d="M0,192L48,170.7C96,149,192,107,288,112C384,117,480,171,576,160C672,149,768,75,864,42.7C960,11,1056,21,1152,26.7C1248,32,1344,32,1392,32L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default SliderCards;
