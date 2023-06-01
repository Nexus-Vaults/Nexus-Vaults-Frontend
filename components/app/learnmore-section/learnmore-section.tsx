import SavingsIcon from '@mui/icons-material/Savings';
import React from 'react';

const Learnmore = () => {
  return (
    <>
      <div className="grid grid-cols-3 justify-center justify-items-center gap-8 px-4 py-20 text-white">
        
        <h2 className="bg-header tracking-wide font-extrabold col-span-3">Features</h2>
        <div className="grid-col-1 bg-rose rounded-md text-center p-3">
          <SavingsIcon />
          Centralized exchange like experience for decentralized entities
        </div>
        <div className="grid grid-col-1 grid-rows-2 bg-rose rounded-md text-center p-3">
          <p className="">One point of access for your entire omnichain crypto treasury</p>
        </div>
        <div className="grid-col-1 bg-rose rounded-md text-center p-3">
          Fully upgradable, extendable without sacrificing security. The devs can never access your treasury.
        </div>
      </div>
    </>
  );
};

export default Learnmore;