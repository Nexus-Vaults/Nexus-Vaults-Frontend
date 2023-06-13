import { useRouter } from 'next/router';
import React from 'react';

type Props = {
  isSuccess: boolean;
  contractChainId: number;
  nexusAddress: string;
};

const ConfirmationModal = ({
  isSuccess,
  contractChainId,
  nexusAddress,
}: Props) => {
  const router = useRouter();

  async function goToNexus() {
    await router.push(
      '/app/chain/' + contractChainId + '/nexus/' + nexusAddress + '/'
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div
        className={`flex flex-col items-center modal-content bg-white p-6 rounded-md shadow-md ${
          isSuccess ? 'border-green-500 font-mono font-bold' : 'border-red-500'
        }`}
      >
        {isSuccess ? (
          <>
            <h2 className="text-2xl mb-4 text-green-500">
              Deployment Successful!
            </h2>
            <p>Your Nexus has been deployed successfully.</p>
            <br></br>
            <button
              className='className="w-fit text-white bg-indigo-900 h-[40px] shadow-lg rounded-xl font-bold py-1 px-3 hover:scale-105 transition-all duration-300"'
              onClick={goToNexus}
            >
              Go to Overview
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl mb-4 text-red-500">Deployment Failed</h2>
            <p>
              There was an error during the deployment process. Please reload
              the page and try again.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ConfirmationModal;
