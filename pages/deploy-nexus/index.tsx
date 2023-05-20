import React from "react";

type Props = {};

const index = (props: Props) => {
  return (
    <div className="flex flex-col flex-wrap justify-start content-center bg-background pt-52  gap-2 h-screen ">
      <div className="flex w-[50%]  border-solid border-2 rounded-md border-white">
        <div className="flex flex-col p-5">
          <h2 className="font-normal font-normal text-4xl leading-12 text-center text-white">
            Welcome to Nexus Vaults
          </h2>
          <p className="text-center text-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque ut augue libero.Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Pellentesque ut augue libero.Lorem ipsum dolor sit
            amet, consectetur adipiscing elit. Pellentesque ut augue libero.
          </p>
        </div>
      </div>
    </div>
  );
};

export default index;
