import { useRouter } from 'next/router';
import React from 'react';
import AccessNexusModal from './modals/AccessNexusModal';

type Props = {};

const WelcomePage = (props: Props) => {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const onClose = () => setIsModalOpen(false);

  return (
    <div className="bg-gradient-to-br from-black to-indigo-900 min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-white text-4xl mb-8 font-mono">
        Welcome to Nexus Vaults
      </h1>
      <p className="text-white text-lg text-center mb-8 font-mono">
        Deploy a new Nexus if you don´t have one or access an excisting Nexus
      </p>
      <div className="flex justify-center">
        <div
          className="cursor-pointer bg-white rounded-md font-medium text-xl px-6 py-3 mr-4 transition-colors duration-300 hover:bg-gray-200 hover:scale-105 transition-all duration-300 font-mono"
          onClick={() => router.push('/app/deploy-nexus')}
        >
          <h1 className="text-center  text-indigo-900 font-semibold ">
            Deploy Nexus
          </h1>
        </div>
        <div
          className="cursor-pointer bg-white  rounded-md font-medium text-xl px-6 py-3 transition-colors duration-300 hover:bg-gray-200 hover:bg-gray-200 hover:scale-105 transition-all duration-300 font-mono"
          onClick={() => setIsModalOpen(true)}
        >
          <h1 className="text-center text-indigo-900 font-semibold ">
            Access Nexus
          </h1>
        </div>

        {isModalOpen && <AccessNexusModal onClose={onClose} />}
      </div>
    </div>
  );
};

export default WelcomePage;
