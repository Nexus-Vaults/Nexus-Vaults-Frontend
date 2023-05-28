import React, { useEffect, useState } from 'react';

type Props = {
  costs: number;
  featuresCount: number;
  connected: boolean;
  handleApproval: (b: boolean) => void;
};

const ApprovePayment = ({
  costs,
  featuresCount,
  handleApproval,
  connected,
}: Props) => {
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    handleApproval(isClicked);
  });

  function approve() {
    setIsClicked(!isClicked);
  }

  return (
    <div className="flex flex-col flex-1 gap-2 ">
      <div className=" flex-1  flex flex-col p-5">
        <h2 className="font-normal font-normal text-4xl leading-12 text-center">
          Approve Payment
        </h2>
        <p className="text-center ">
          Approve the payment if you have chosen any additional costs.
        </p>
      </div>
      <div className="flex flex-col flex-1 justify-center gap-2">
        <div className="flex flex-row  border-solid border-2 border-black rounded-md py-1 px-3 ">
          <p>Features Count:</p>
          <p>{featuresCount}</p>
        </div>
        <div className="flex flex-row  border-solid border-2 border-black rounded-md py-1 px-3">
          <p>Total Cost:</p>
          <p>{costs}</p>
        </div>
      </div>

      <div className="flex flex-row justify-center  ">
        <button
          className="text-white bg-[#0e76fd] h-[40px] shadow-lg rounded-xl   font-bold py-1 px-3 inline-block "
          onClick={() => approve()}
          disabled={!connected}
          //todo: proper styling for this, move to global
          style={
            connected
              ? isClicked
                ? {
                    backgroundColor: 'green',
                    color: 'white',
                  }
                : {
                    backgroundColor: 'blue',
                    color: 'white',
                  }
              : {
                  backgroundColor: 'grey',
                  color: 'white',
                }
          }
        >
          Approve Payment
        </button>
      </div>
    </div>
  );
};

export default ApprovePayment;
