import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import EthLogo from '../../../public/images/eth.png';
import AdaLogo from '../../../public/images/ada.png';
import BnbLogo from '../../../public/images/bnb.png';
import BtcLogo from '../../../public/images/btc.png';
import UsdtLogo from '../../../public/images/usdt.png';
import black from '../../../public/images/black.png';
import { Chain } from 'api';

type Props = {
  handleTargetChain: (chain: Chain) => void;
};

const TargetChain = ({ handleTargetChain }: Props) => {
  const [selectedItem, setSelectedItem] = useState<Chain>('Ethereum');

  useEffect(() => {
    handleTargetChain(selectedItem);
  }, [selectedItem]);

  const handleItemClick = (item: Chain) => {
    setSelectedItem(item);
  };

  return (
    <div className="flex flex-col w-[50%]  p-5 gap-10">
      <div className="flex flex-col p-5 gap-2">
        <h2 className="font-normal font-normal text-4xl leading-12 text-center ">
          Choose your target chain
        </h2>
        <p className="text-center ">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          ut augue libero.Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Pellentesque ut augue libero.Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Pellentesque ut augue libero.
        </p>
        <p>Selected target chain: {selectedItem}</p>
      </div>
      {process.env.NEXT_PUBLIC_TESTNET ? (
        <div className="flex flex-wrap justify-center gap-6 p-2">
          <div
            className={`border p-2 rounded ${
              selectedItem === 'Localhost' ? 'bg-black' : 'hover:bg-black'
            }`}
            onClick={() => handleItemClick('Localhost')}
          >
            <Image src={black} width={32} height={32} alt="" />
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-6 p-2">
          <div
            className={`border p-2 rounded ${
              selectedItem === 'Ethereum' ? 'bg-black' : 'hover:bg-black'
            }`}
            onClick={() => handleItemClick('Ethereum')}
          >
            <Image src={EthLogo} width={32} height={32} alt="" />
          </div>
          <div
            className={`border p-2 rounded ${
              selectedItem === 'Ada' ? 'bg-black' : 'hover:bg-black'
            }`}
            onClick={() => handleItemClick('Ada')}
          >
            <Image src={AdaLogo} width={32} height={32} alt="" />
          </div>
          <div
            className={`border p-2 rounded ${
              selectedItem === 'Binance' ? 'bg-black' : 'hover:bg-black'
            }`}
            onClick={() => handleItemClick('Binance')}
          >
            <Image src={BnbLogo} width={32} height={32} alt="" />
          </div>
          <div
            className={`border p-2 rounded ${
              selectedItem === 'Bitcoin' ? 'bg-black' : 'hover:bg-black'
            }`}
            onClick={() => handleItemClick('Bitcoin')}
          >
            <Image src={BtcLogo} width={32} height={32} alt="" />
          </div>
          <div
            className={`border p-2 rounded ${
              selectedItem === 'USDT' ? 'bg-black' : 'hover:bg-black'
            }`}
            onClick={() => handleItemClick('USDT')}
          >
            <Image src={UsdtLogo} width={32} height={32} alt="" />
          </div>
        </div>
      )}
    </div>
  );
};

export default TargetChain;
