import React, { useContext, useState } from 'react';
import Sidebar from './app/sidebar';
import Navbar from './app/navbar/navbar';
import { ChainDeployments } from '../pages/app/ContractsAddressesContext';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const [isOpened, setOpened] = useState(false);

  const toggleDrawer = () => {
    setOpened((prev) => !prev);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isOpened={isOpened} toggleDrawer={toggleDrawer}></Navbar>

      <div className="flex-1 flex ">
        <Sidebar isOpened={isOpened}></Sidebar>

        <div
          className={`flex justify-center bg-whitesmoke  ${
            isOpened ? 'w-11/12' : 'w-screen'
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
