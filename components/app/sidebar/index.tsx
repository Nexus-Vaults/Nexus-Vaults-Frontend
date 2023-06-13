import { useRouter } from 'next/router';
import Image from 'next/image';
import Logo from '../../../public/images/Logo.png';
import Link from 'next/link';

type Props = {
  isOpened: boolean;
};

const Sidebar = ({ isOpened }: Props) => {
  const router = useRouter();

  const { contractChainId, nexusAddress } = router.query;

  return (
    <div
      className={`bg-blue50 overflow-hidden shadow-lg grid grid-cols-1 gap-4 auto-rows-max ${
        isOpened ? 'w-2/5 lg:w-1/5' : 'w-0'
      }`}
    >
      <div className="flex flex-col gap-2 items-center">
        <div
          className="p-4 text-center text-whitesmoke text-lg font-semibold cursor-pointer border-3xl flex flex-col gap-4 items-center"
          onClick={() => router.push('/')}
        >
          <h1>Nexus Vaults</h1>
          <Image
            className="rounded-full"
            src={Logo}
            width={100}
            height={100}
            alt="Nexus Vaults Logo"
          />
        </div>
      </div>

      <hr className="border-black border-2"></hr>

      <div className=" flex-1 flex flex-col justify-between gap-2">
        <Link
          href={
            '/app/chain/' + contractChainId + '/nexus/' + nexusAddress + '/'
          }
          className="text-center text-whitesmoke cursor-pointer hover:bg-blue200 hover:text-white px-3 py-2 rounded-md text-sm font-medium "
        >
          Overview
        </Link>

        <Link
          className=" text-center text-whitesmoke cursor-pointer hover:bg-blue200 hover:text-white px-3 py-2 rounded-md text-sm font-medium "
          href={
            '/app/chain/' +
            contractChainId +
            '/nexus/' +
            nexusAddress +
            '/vaults'
          }
        >
          Vaults
        </Link>

        <Link
          className="text-center text-whitesmoke cursor-pointer hover:bg-blue200 hover:text-white px-3 py-2 rounded-md text-sm font-medium "
          href={
            '/app/chain/' +
            contractChainId +
            '/nexus/' +
            nexusAddress +
            '/transactors'
          }
        >
          Transactors
        </Link>

        <Link
          className="text-center text-whitesmoke cursor-pointer hover:bg-blue200 hover:text-white px-3 py-2 rounded-md text-sm font-medium "
          href={
            '/app/chain/' +
            contractChainId +
            '/nexus/' +
            nexusAddress +
            '/extensions'
          }
        >
          Extensions
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
