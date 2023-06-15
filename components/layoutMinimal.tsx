import React from 'react';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { ConnectButton } from '@rainbow-me/rainbowkit';

import { useRouter } from 'next/router';

type Props = {
  children: React.ReactNode;
};

export default function LayoutMinimal({ children }: Props) {
  const router = useRouter();
  return (
    <div className="flex flex-col h-full">
      <div className="top-0 left-0 w-full bg-white z-10">
        <div className="flex flex-row max-w-full sm:px-5 lg:px-4 items-center justify-between">
          <div className="p-2 ">
            <button onClick={() => router.push('/')}>
              <ChevronLeftIcon />
            </button>
          </div>
          <ConnectButton />
        </div>
      </div>
      <div className="flex overflow-auto bg-whitesmoke">{children}</div>
    </div>
  );
}
