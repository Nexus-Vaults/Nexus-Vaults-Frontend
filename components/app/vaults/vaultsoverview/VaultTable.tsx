import React from 'react';

type Props = {
  data: {
    assetName: string;
    amount: number;
    value: number;
  }[];
};

const VaultTable = ({ data }: Props) => {
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
                <button className="bg-purple hover:bg-purple text-white font-bold py-1 px-2 rounded-lg">
                  Send
                </button>
              </td>
              <td className="whitespace-nowrap px-6 py-4 font-medium">
                <button className="bg-purple hover:bg-purple text-white font-bold py-1 px-2 rounded-lg">
                  Receive
                </button>
              </td>
              <td className="whitespace-nowrap px-6 py-4 font-medium">
                <button className="bg-purple hover:bg-purple text-white font-bold py-1 px-2 rounded-lg">
                  Mint
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VaultTable;
