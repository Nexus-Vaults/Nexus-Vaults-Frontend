import React, { useState } from 'react';
import SendModal from '../../modals/SendModal';
import ReceiveModal from '../../modals/ReceiveModal';
import MintModal from '../../modals/MintModal';

type Props = {
  data: {
    assetName: string;
    amount: number;
    value: number;
  }[];
};

const VaultTable = ({ data }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReceiveModalOpen, setIsReceiveModalOpen] = useState(false);
  const [isMintModalOpen, setIsMintModalOpen] = useState(false);
  const qrData = 'https://etherscan.io/';

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openReceiveModal = () => {
    setIsReceiveModalOpen(true);
  };

  const closeReceiveModal = () => {
    setIsReceiveModalOpen(false);
  };

  const openMintModal = () => {
    setIsMintModalOpen(true);
  };

  const closeMintModal = () => {
    setIsMintModalOpen(false);
  };

  return (
    <div
      className="w-full border-sold bg-white shadow-lg border-2 border-gray-400 rounded-lg h-[30vh] overflow-y-auto  px-6"
      style={{ scrollbarWidth: 'thin' }}
    >
      <style>
        {`
    .overflow-y-auto::-webkit-scrollbar {
      width: 0.5rem; /* Adjust as needed */
    }
  
    .overflow-y-auto::-webkit-scrollbar-track {
      background-color: transparent;
    }
  
    .overflow-y-auto::-webkit-scrollbar-thumb {
      background-color: transparent;
    }
    `}
      </style>
      <table className="w-full min-w-full text-left text-sm font-light sticky top-0">
        <thead className="sticky top-0 bg-white  border-b font-medium dark:border-neutral-500">
          <tr>
            <th scope="col" className="px-6 py-4">
              Asset Name
            </th>
            <th scope="col" className="px-6 py-4">
              Amount
            </th>
            <th scope="col" className="px-6 py-4">
              Value
            </th>
            <th scope="col" className="px-6 py-4">
              Send
            </th>
            <th scope="col" className="px-6 py-4">
              Receive
            </th>
            <th scope="col" className="px-6 py-4">
              Mint
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-b dark:border-neutral-500">
              <td className="whitespace-nowrap px-6 py-4 font-medium">
                {item.assetName}
              </td>
              <td className="whitespace-nowrap px-6 py-4 font-medium">
                {item.amount}
              </td>
              <td className="whitespace-nowrap px-6 py-4 font-medium">
                {item.value}
              </td>
              <td className="whitespace-nowrap px-6 py-4 font-medium">
                <button
                  className="bg-purple hover:bg-purple text-white font-bold py-1 px-2 rounded-lg"
                  onClick={openModal}
                >
                  Send
                </button>
              </td>
              <td className="whitespace-nowrap px-6 py-4 font-medium">
                <button
                  className="bg-purple hover:bg-purple text-white font-bold py-1 px-2 rounded-lg"
                  onClick={openReceiveModal}
                >
                  Receive
                </button>
              </td>
              <td className="whitespace-nowrap px-6 py-4 font-medium">
                <button
                  className="bg-purple hover:bg-purple text-white font-bold py-1 px-2 rounded-lg"
                  onClick={openMintModal}
                >
                  Mint
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && <SendModal onClose={closeModal} />}
      {isReceiveModalOpen && (
        <ReceiveModal onClose={closeReceiveModal} qrData={qrData} />
      )}
      {isMintModalOpen && <MintModal onClose={closeMintModal} />}
    </div>
  );
};

export default VaultTable;
