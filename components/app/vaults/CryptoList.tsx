import React from 'react';

type Coin = {
  id: number;
  name: string;
  amount: number;
  amountUSD: number;
};

type Props = {
  coins: Coin[];
};

const CryptoList = ({ coins }: Props) => {
  return (
    <div className="flex flex-col gap-2 ">
      {coins.map((coin) => (
        <>
          <div className="flex flex-row justify-center">
            <div className="w-[100%] h-[1px] bg-gray-300"></div>
          </div>
          <div key={coin.id} className="flex flex-row items-center  gap-4">
            <div className="rounded-full bg-gray-400 text-white w-4 h-4 flex items-center justify-center">
              {coin.id}
            </div>
            <div className="flex-1 flex flex-row items-center justify-between">
              <div className="flex flex-row justify-between">
                <div className="ml-2 font-mono font-medium text-black">
                  {coin.amount}
                </div>
                <div className="ml-2 font-sans font-medium text-black">
                  {coin.name}
                </div>
              </div>

              <div className="ml-2 font-mono font-medium">
                {coin.amountUSD}$
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default CryptoList;
