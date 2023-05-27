import React, { useState } from 'react';
import Sidebar from './app/sidebar';
import Navbar from './app/navbar/navbar';

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

        <div className={`  ${isOpened ? 'w-[85vw]' : 'w-[100vw]'}`}>
          {children}
        </div>
      </div>
    </div>
  );
}
