import React, { useEffect, useState } from 'react';

type Props = {
  success: boolean;
};

const ConfirmationModal = ({ success }: Props) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 20000);

    return () => clearTimeout(timer);
  }, []);

  const handleCloseOnClick = () => {
    if (success) {
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div
        className={`flex flex-col items-center modal-content bg-white p-6 rounded-md shadow-md ${
          success ? 'border-green-500 font-mono font-bold' : 'border-red-500'
        }`}
      >
        {success ? (
          <>
            <h2 className="text-2xl mb-4 text-green-500">
              Deployment Successful!
            </h2>
            <p>Your Nexus has been deployed successfully.</p>
          </>
        ) : (
          <>
            <h2 className="text-2xl mb-4 text-red-500">Deployment Failed</h2>
            <p>
              There was an error during the deployment process. Please try
              again.
            </p>
          </>
        )}
        <button className="mt-2 w-fit text-white bg-indigo-900 h-[40px] shadow-lg rounded-xl   font-bold py-1 px-3  hover:scale-105 transition-all duration-300">
          Close
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
