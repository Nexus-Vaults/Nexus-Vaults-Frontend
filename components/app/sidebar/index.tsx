import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { ChainDeployments } from '../../../pages/app/ContractsAddressesContext';
import Image from 'next/image';
import Logo from '../../../public/images/Logo.png';

type Props = {
  isOpened: boolean;
};

const Sidebar = ({ isOpened }: Props) => {
  const router = useRouter();

  const { chainId, address } = useContext(ChainDeployments);

  return (
    <div
      className={`bg-blue50 overflow-hidden shadow-lg  ${
        isOpened ? 'w-2/5 lg:w-1/5' : 'w-0'
      }`}
    >
      <div className="flex flex-col gap-2  mb-10 items-center">
        <div
          className="text-center text-whitesmoke text-lg font-semibold cursor-pointer border-3xl"
          onClick={() => router.push('/')}
        >
          <Image
            className="p-2 rounded-full"
            src={Logo}
            width={120}
            height={120}
            alt="Nexus Vaults Logo"
          />
        </div>
        <div>
          <div className="text-center text-whitesmoke text-lg font-semibold cursor-pointer">
            Name
          </div>
          <div className="text-center text-whitesmoke text-lg font-semibold cursor-pointer">
            Address
          </div>
        </div>
        <div className="flex flex-row justify-center">
          <div className="w-4/5 h-px bg-gray-300"></div>
        </div>
      </div>
      <div className=" flex-1 flex flex-col justify-between gap-2">
        <div
          className="flex-1"
          onClick={() => router.push(`/app/overview/${chainId}/${address}`)}
        >
          <h1 className="cursor-pointer text-center text-whitesmoke text-lg font-semibold cursor-pointer hover:bg-blue200 hover:text-white px-3 py-2 rounded-md text-sm font-medium ">
            Overview
          </h1>
        </div>
        <div className="flex-1">
          <h1
            className=" text-center text-whitesmoke text-lg font-semibold cursor-pointer hover:bg-blue200 hover:text-white px-3 py-2 rounded-md text-sm font-medium "
            onClick={() => router.push(`/app/vaults/${chainId}/${address}`)}
          >
            Vaults
          </h1>
        </div>
        <div className="flex-1">
          <h1 className="text-center text-whitesmoke text-lg font-semibold cursor-pointer hover:bg-blue200 hover:text-white px-3 py-2 rounded-md text-sm font-medium ">
            Transactors
          </h1>
        </div>
        <div className="flex-1">
          <h1
            className="text-center text-whitesmoke text-lg font-semibold cursor-pointer hover:bg-blue200 hover:text-white px-3 py-2 rounded-md text-sm font-medium "
            onClick={() => router.push('/app/extensions')}
          >
            Extensions
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
