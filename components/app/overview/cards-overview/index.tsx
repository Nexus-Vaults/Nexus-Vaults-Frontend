import React, { useContext, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { SubChain } from 'api';
import { ChainDeployments } from '../../../Context';
import { Address } from 'viem';
type Props = {
  address: Address;
  contractChainId: number;
  nexusName: string;
  nexusId: Address;
  owner: Address;
  subChains: SubChain[];
};

const CardsOverview = ({
  address,
  nexusName,
  nexusId,
  owner,
  contractChainId,
  subChains,
}: Props) => {
  const [showCopied, setShowCopied] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleCopyClick = (event: any) => {
    setShowCopied(true);
    setCursorPosition({ x: event.clientX, y: event.clientY });
    setTimeout(() => {
      setShowCopied(false);
    }, 600);
  };

  const { chainDeployment: chainDeployments } = useContext(ChainDeployments);

  return (
    <div className="flex-1 w-full flex flex-col flex-wrap gap-4 ">
      <div className="flex-1 flex flex-row gap-4">
        <div className="flex-1 flex flex-col justify-between border-2 border-gray-400 rounded-lg bg-white hover:bg-background shadow-lg p-2">
          <div className="text-gray-500 text-base font-medium font-sans">
            Nexus
          </div>
          <div className="text-primary text-lg font-medium  font-sans">
            {
              chainDeployments.find((x) => {
                return (
                  x.contractChainId.toString().toLowerCase() ==
                  contractChainId.toString().toLowerCase()
                );
              })?.chainName
            }
          </div>
          <CopyToClipboard text={address}>
            <div
              className="flex flex-row gap-2 items-center text-sm font-medium rounded-md text-gray-500  font-sans cursor-pointer  hover:text-gray-700"
              onClick={handleCopyClick}
            >
              {address}
            </div>
          </CopyToClipboard>
          {showCopied && (
            <div
              className="modal"
              style={{
                position: 'fixed',
                top: cursorPosition.y + 20,
                left: cursorPosition.x + 10,
                backgroundColor: 'white',
                borderRadius: '0.375rem',
                boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
                fontSize: '0.875rem',
                padding: '2px',
                fontWeight: 500,
              }}
            >
              Copied!
            </div>
          )}
        </div>
        <div className="flex-1 flex flex-col justify-between border-2 border-gray-400 rounded-lg bg-white hover:bg-background shadow-lg p-2">
          <div className="text-gray-500 text-base font-medium  font-sans">
            Name
          </div>
          <div className="text-primary text-lg font-medium  font-sans">
            {nexusName}
          </div>
          <div className="w-[340px] text-sm font-medium rounded-md text-gray-500  font-sans cursor-pointer  hover:text-gray-700"></div>
        </div>
      </div>
      <div className="flex-1 flex flex-row gap-4">
        <div className="flex-1 flex flex-col justify-between border-2 border-gray-400 rounded-lg bg-white hover:bg-background shadow-lg p-2">
          <div className="text-gray-500 text-base font-medium  font-sans">
            Owner
          </div>
          <div className="text-primary text-lg font-medium  font-sans">
            {owner}
          </div>
          <div></div>
        </div>
        <div className="flex-1 flex flex-col justify-between border-2 border-gray-400 rounded-lg bg-white hover:bg-background shadow-lg p-2">
          <div className="text-gray-500 text-base font-medium  font-sans">
            Total Value
          </div>
          <div className="text-primary text-lg font-medium  font-sans">
            Coming soon...
          </div>
          <div className="flex items-center ">
            <div className=" h-fit  px-1 rounded-md bg-[#d0e2e5] text-[#4caf54] font-semibold">
              +15%
            </div>
            <div className=" text-gray-500 p-2">Since Last Month</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsOverview;
