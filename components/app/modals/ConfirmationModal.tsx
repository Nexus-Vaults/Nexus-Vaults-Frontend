import React, { useEffect, useState } from 'react';

type Props = {
  success: boolean;
};

const ConfirmationModal = ({ success }: Props) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className={`modal-content bg-white p-6 rounded-md shadow-md ${
          success ? 'border-green-500' : 'border-red-500'
        }`}
      >
        {success ? (
          <>
            <h2 className="text-2xl mb-4 text-green-500">
              Deployment Successful
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
      </div>
    </div>
  );
};

export default ConfirmationModal;
