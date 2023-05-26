import React from 'react';

type Props = {};

const ApprovePayment = (props: Props) => {
  return (
    <div className="flex flex-col w-[30%]">
      <div className="flex flex-col p-5">
        <h2 className="font-normal font-normal text-4xl leading-12 text-center">
          Approve Payment
        </h2>
        <p className="text-center ">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          ut augue libero.Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Pellentesque ut augue libero.Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Pellentesque ut augue libero.
        </p>
      </div>
      <div className="flex flex-col border-solid border-2 border-black">
        <div className="flex flex-row">
          <p>Name:</p>
          <p>Nexus Name</p>
        </div>
        <div className="flex flex-row">
          <p>Feature Address:</p>
          <p>...</p>
        </div>
        <div className="flex flex-row">
          <p>Target Chain:</p>
          <p>Polygon</p>
        </div>
        <div className="flex flex-row">
          <p>Available Chains:</p>
          <p>Etherum , Polygon ...</p>
        </div>
      </div>
    </div>
  );
};

export default ApprovePayment;
