import { useRouter } from 'next/router';
import React from 'react';
import AccessNexusModal from './modals/AccessNexusModal';

type Props = {};

const WelcomePage = (props: Props) => {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const onClose = () => setIsModalOpen(false);

  return (
    <div className=" flex flex-col mt-10 w-[40%] justify-center content-center h-fit border-2 rounded-lg border-gray-400 p-6 gap-4 bg-white">
      <div className="flex flex-col justify-start align-center gap-4 p-4">
        <h2 className="font-normal font-normal text-4xl leading-12 text-center ">
          Welcome to Nexus Vaults
        </h2>
        <p className="text-center ">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          ut augue libero.Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Pellentesque ut augue libero.Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Pellentesque ut augue libero.
        </p>
      </div>
      <div className="flex flex-row  gap-x-12 justify-center">
        <div
          className="cursor-pointer flex flex-col justify-center items-center text-white bg-[#0e76fd] shadow-lg rounded-xl font-bold py-1 px-3 inline-block hover:scale-105 transition-all duration-300"
          onClick={() => router.push('/app/deploy-nexus')}
        >
          <h1 className="text-center  text-gray-100 ">Deploy Nexus</h1>
        </div>
        <div
          className="cursor-pointer flex flex-col justify-center items-center text-white bg-[#0e76fd] shadow-lg rounded-xl font-bold py-1 px-3 inline-block hover:scale-105 transition-all duration-300"
          onClick={() => setIsModalOpen(true)}
        >
          <h1 className="text-center text-gray-100">Access Nexus</h1>
        </div>
      </div>
      {isModalOpen && <AccessNexusModal onClose={onClose} />}
    </div>
  );
};

export default WelcomePage;
