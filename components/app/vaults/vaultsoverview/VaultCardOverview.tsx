import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

type Props = {};

const VaultCardOverview = (props: Props) => {
  const [address, setAddress] = useState(
    '0x71C7656EC7ab88b098defB751B7401B5f6d897'
  );
  const [name, setName] = useState('My Nexus');

  const [showCopied, setShowCopied] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleCopyClick = (event: any) => {
    setShowCopied(true);
    setCursorPosition({ x: event.clientX, y: event.clientY });
    setTimeout(() => {
      setShowCopied(false);
    }, 600);
  };

  return (
    <div className="w-full flex flex-col flex-wrap gap-4 ">
      <div className="flex-1 flex flex-row gap-4">
        <div className="flex-1 flex flex-col justify-between border-2 border-gray-400 rounded-lg bg-white hover:bg-background shadow-lg p-2">
          <div className="text-gray-500 text-base font-medium font-sans">
            Vault Chain
          </div>
          <div className="text-purple50 text-lg font-medium  font-sans">
            ethereum
          </div>
          <CopyToClipboard text="0x71C7656EC7ab88b098defB751B7401B5f6d897">
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
            Value
          </div>
          <div className="text-purple50 text-lg font-medium  font-sans">
            69420.23 USDT
          </div>
          <div className="flex items-center ">
            <div className=" h-fit  px-1 rounded-md bg-[#d0e2e5] text-[#4caf54] font-semibold">
              +3%
            </div>
            <div className=" text-gray-500 p-2">Since Last Month</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaultCardOverview;
